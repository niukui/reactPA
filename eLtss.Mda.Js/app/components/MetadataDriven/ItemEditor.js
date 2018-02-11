import React, {PropTypes} from 'react';
import TextBox from './Wrapper/editor/TextBox';
import Dropdown from './Wrapper/editor/Dropdown';
import RadioButtonList from './Wrapper/editor/RadioButtonList';
import YesNoRadioButtons from './Wrapper/editor/YesNoRadioButtons';
import DatePicker from './Wrapper/editor/DatePicker';
import DateTimePicker from './Wrapper/editor/DateTimePicker';
import YesNoRadioButtonWithSpecify from './Wrapper/editor/YesNoRadioButtonWithSpecify';
import Textarea from './Wrapper/editor/Textarea';
import StringViewer from '../Common/String';
import CheckboxList from './Wrapper/editor/CheckboxList';
import Checkbox from './Wrapper/editor/Checkbox';
import Address from './Wrapper/editor/Address';
import MultipleSelection from './wrapper/editor/MultipleSelection';
import Description from './wrapper/editor/Description';
import TextBoxViewer from './wrapper/viewer/TextBox';
import DropdownViewer from './wrapper/viewer/Dropdown';
import RadioButtonListViewer from './wrapper/viewer/RadioButtonList';
import YesNoRadioButtonWithSpecifyViewer from './Wrapper/viewer/YesNoRadioButtonWithSpecify';
import TextareaViewer from './Wrapper/viewer/Textarea';
import YesNoRadioButtonsViewer from './Wrapper/viewer/YesNoRadioButtons';
import CheckboxListViewer from './wrapper/viewer/CheckboxList';
import DatePickerViewer from './wrapper/viewer/DatePicker';
import DateTimePickerViewer from './wrapper/viewer/DateTimePicker';
import AddressViewer from './wrapper/viewer/Address';
import DescriptionViewer from './wrapper/viewer/Description';
import SignaturePad from './wrapper/editor/SignaturePad';
import SignaturePadViewer from './wrapper/viewer/SignaturePad';
import AttributeFilterDropdown from './wrapper/editor/AttributeFilterDropdown';
import lodash from 'lodash';
import * as metadataHelper from 'utils/metadataHelper';
import {buildDefaultStateByItem} from 'services/componentsServices';
import {getRegexValidation, getCompareValidation} from 'services/validationServices';

export const wrapperComponents = {
  TextBox: TextBox,
  Dropdown: Dropdown,
  RadioButtonList: RadioButtonList,
  YesNoRadioButtons: YesNoRadioButtons,
  DatePicker: DatePicker,
  RadioButtonWithSpecify: YesNoRadioButtonWithSpecify,
  CheckboxList: CheckboxList,
  Checkbox: Checkbox,
  Textarea: Textarea,
  Address: Address,
  MultipleSelection: MultipleSelection,
  TextBoxViewer: TextBoxViewer,
  DropdownViewer: DropdownViewer,
  RadioButtonListViewer: RadioButtonListViewer,
  RadioButtonWithSpecifyViewer: YesNoRadioButtonWithSpecifyViewer,
  YesNoRadioButtonsViewer: YesNoRadioButtonsViewer,
  CheckboxListViewer: CheckboxListViewer,
  TextareaViewer: TextareaViewer,
  DatePickerViewer: DatePickerViewer,
  AddressViewer: AddressViewer,
  SignaturePad: SignaturePad,
  SignaturePadViewer: SignaturePadViewer,
  Description: Description,
  DescriptionViewer: DescriptionViewer,
  AttributeFilterDropdown: AttributeFilterDropdown,
  DateTimePicker: DateTimePicker,
  DateTimePickerViewer: DateTimePickerViewer,
  AttributeFilterDropdown: AttributeFilterDropdown
};
class ItemEditor extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      error: ""
    };

    this.getFieldName = this
      .getFieldName
      .bind(this);
    this.getFieldDisplayName = this
      .getFieldDisplayName
      .bind(this);
    this.getFieldValue = this
      .getFieldValue
      .bind(this);
    this.validate = this
      .validate
      .bind(this);
    this.onValueChanged = this
      .onValueChanged
      .bind(this);
    this.updateValidationList = this
      .updateValidationList
      .bind(this);
    this.selectWrapper = this
      .selectWrapper
      .bind(this);
    this.findComponentState = this
      .findComponentState
      .bind(this);
    this.registerValidate = this
      .registerValidate
      .bind(this);
  }

  componentDidMount() {
    this.updateValidationList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.componentState && this.props.componentState) {
      if (nextProps.componentState._display !== this.props.componentState._display && nextProps.componentState._display === false) {
        this
          .props
          .onChange([
            {
              name: this.getFieldName(),
              value: null
            }
          ]);
      }
    }
  }

  componentDidUpdate(preProps, preState)
  {
    this.updateValidationList();
    if (preProps.componentState && this.props.componentState) {
      if (preProps.componentState._required !== this.props.componentState._required) {
        if (!this.props.componentState._required) {
          this.validate(this.state.value);
        }
      }
      if (preProps.componentState._readonly !== this.props.componentState._readonly) {
        if (this.props.readonly) {
          this.validate(this.state.value);
        }
      }
    }
  }

  findComponentState() {
    return this.props.componentState || buildDefaultStateByItem(this.props.item);
  }

  registerValidate(validate) {
    this.setState({validate});
  }

  getFieldName() {
    if (this.props.item.DataPath) {
      return this.props.item.DataPath;
    }
    return this.props.fieldNamePrefix
      ? `${this.props.fieldNamePrefix}.${this.props.item.Name}`
      : this.props.item.Name;
  }

  getFieldDisplayName() {
    const displayName = metadataHelper.getDisplayName(this.props.item.DisplayName, this.props.data);
    return displayName;
  }

  getFieldValue() {
    return lodash.get(this.props.data, this.getFieldName());
  }

  hasValue(item, value)
  {
    if (item.ValueType === "LookupIdentifier") {
      return (value !== undefined && value !== null && value.Id !== null);
    } else if (item.ValueType === "bool") {
      return (value !== undefined && value !== null);
    } else if (item.Type === "CheckboxList") {
      return (value !== undefined && value !== null && value.length > 0 && value[0]);
    } else {
      return (value !== undefined && value !== null && value !== "");
    }
  }

  validate(value, validationResult) {
    if (this.state.validate) {
      return this
        .state
        .validate(value);
    }
    const {item} = this.props;
    this.setState({error: ""});

    let componentState = this.findComponentState();
    if (!componentState._display) {
      return true;
    }
    if (componentState && componentState._required) {
      if (!this.hasValue(item, value)) {
        this.setState({
          error: this.getFieldDisplayName() + " is required"
        });
        return false;
      }
    }
    if (componentState._readonly) {
      return true;
    }
    if (value) {
      const regexValidation = getRegexValidation(item);
      if (regexValidation) {
        const regex = new RegExp(regexValidation.Expression);
        const match = regex.test(value);
        if (!match) {
          this.setState({error: regexValidation.Message});
          return false;
        }
      }
    }

    if (item && item.Type === 'RadioButtonWithSpecify') {

      if (((value && value.Value && !item.SpecifyOnNo) || (value && item.SpecifyOnNo && !value.Value)) && !value.Specify) {
        this.setState({
          error: metadataHelper.getDisplayName(item.AdditionalDisplayName, this.props.data) + " is required"
        });
        return false;
      }
    }

    if (validationResult != undefined && validationResult == false) {
      const compareValidation = getCompareValidation(item);
      if (compareValidation) {
        this.setState({error: compareValidation.Message});
        return false;
      }
    }

    return true;
  }

  onValueChanged(changes) {
    if (this.props.formValidated) {
      var fieldName = this.getFieldName();
      var change = changes.filter(change => change.name = fieldName);
      if (change) {
        this.validate(change[0].value);
      }
    }
    this
      .props
      .onChange(changes);
  }

  updateValidationList() {
    let componentState = this.findComponentState();
    const {item, onUiUpdate} = this.props;
    if (componentState._required || (item.Validations && item.Validations.length > 0) || item.Type === 'RadioButtonWithSpecify' || item.Type === 'Address') {
      const fieldName = this.getFieldName();
      const compareValidation = getCompareValidation(item);
      if (compareValidation) {
        onUiUpdate(fieldName, (validationResult) => this.validate(this.getFieldValue(), validationResult), {
          expression: compareValidation.Expression,
          compareTo: compareValidation.CompareTo,
          valueType: item.ValueType
        });
      } else {
        onUiUpdate(fieldName, () => this.validate(this.getFieldValue()));
      }
    }
  }

  selectRuleAttribute()
  {
    let filterSource = this.props.item.FilterSource;
    return filterSource
      ? lodash.get(this.props.data, filterSource)
      : (this.props.currentIdentity
        ? this.props.currentIdentity.Attributes
        : []);
  }

  selectWrapper() {
    let componentState = this.findComponentState();

    if (!componentState._display) {
      return null;
    }

    let itemType = this.props.item.Type;

    if (componentState._readonly) {
      itemType = itemType + 'Viewer';
    }

    const Wrapper = wrapperComponents[itemType] || TextBox;

    if (itemType === 'Info' || itemType === 'InfoViewer') {
      return (<StringViewer value={this.props.item.DisplayName}/>)
    }

    if (Wrapper) {
      return (<Wrapper
        item={this.props.item}
        name={this.getFieldName()}
        label={this.getFieldDisplayName()}
        value={componentState._value || this.getFieldValue()}
        onChange={this.onValueChanged}
        error={this.state.error}
        readonly={componentState._readonly}
        customAttribute={componentState._customAttribute}
        registerValidate={this.registerValidate}
        required={componentState._required}
        ruleAttributes={this.selectRuleAttribute()}
        dropdownDataSource={this.props.dropdownDataSource}/>);
    }
  }

  render() {
    return (this.selectWrapper());
  }
}

ItemEditor.propTypes = {
  fieldNamePrefix: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onUiUpdate: PropTypes.func.isRequired,
  componentState: PropTypes.object,
  readonly: PropTypes.bool,
  formValidated: PropTypes.bool,
  ruleAttributes: PropTypes.array
};

export default ItemEditor;
