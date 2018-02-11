import React, {PropTypes} from 'react';
import TextBox from './wrapper/viewer/TextBox';
import Dropdown from './wrapper/viewer/Dropdown';
import RadioButtonList from './wrapper/viewer/RadioButtonList';
import YesNoRadioButtonWithSpecify from './Wrapper/viewer/YesNoRadioButtonWithSpecify';
import Textarea from './Wrapper/viewer/Textarea';
import StringViewer from '../Common/String';
import YesNoRadioButtons from './Wrapper/viewer/YesNoRadioButtons';
import CheckboxList from './wrapper/viewer/CheckboxList';
import DatePicker from './wrapper/viewer/DatePicker';
import DateTimePicker from './wrapper/viewer/DateTimePicker';
import Address from './wrapper/viewer/Address';
import SignaturePad from './wrapper/viewer/SignaturePad';
import Description from './wrapper/viewer/Description';
import ActionLink from './wrapper/viewer/ActionLink';
import Label from './wrapper/viewer/Label'
import {get} from 'lodash';
import {buildDefaultStateByItem} from 'services/componentsServices';

const wrapperComponents = {
  TextBox: TextBox,
  Dropdown: Dropdown,
  RadioButtonList: RadioButtonList,
  RadioButtonWithSpecify: YesNoRadioButtonWithSpecify,
  YesNoRadioButtons: YesNoRadioButtons,
  CheckboxList: CheckboxList,
  Textarea: Textarea,
  DatePicker: DatePicker,
  DateTimePicker: DateTimePicker,
  Address: Address,
  Description: Description,
  SignaturePad: SignaturePad,
  ActionLink: ActionLink,
  Label: Label
};

const wrapperInListComponents = Object.assign({}, wrapperComponents, {});

const getReferredFieldName = (displayName) => {
  if (displayName) {
    const indexStart = displayName.indexOf('{{');
    if (indexStart >= 0) {
      const indexEnd = displayName.indexOf('}}');
      if (indexEnd > 0) {
        return displayName.substring(indexStart + 2, indexEnd);
      }
    }
  }
  return null;
};

const getFormattedFieldDisplayName = (currentDisplayName, currentReferredFieldName, data) => {
  if (currentDisplayName && currentReferredFieldName && data) {
    const currentReferredFieldValue = get(data, currentReferredFieldName);
    const displayName = currentDisplayName.replace(`{{${currentReferredFieldName}}}`, currentReferredFieldValue);
    const referredFieldName = getReferredFieldName(displayName);
    if (referredFieldName) {
      return getFormattedFieldDisplayName(displayName, referredFieldName, data);
    } else {
      return displayName;
    }
  }

  return currentDisplayName;
};

class ItemViewer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.getFieldName = this
      .getFieldName
      .bind(this);
  }

  getFieldName() {
    return this.props.fieldNamePrefix
      ? `${this.props.fieldNamePrefix}.${this.props.item.Name}`
      : this.props.item.Name;
  }

  render() {
    const {fieldNamePrefix, item, data, metadata} = this.props;

    let componentState = this.props.componentState || buildDefaultStateByItem(this.props.item);

    if (!componentState._display) {
      return null;
    }

    const currentFieldNamePrefix = fieldNamePrefix
      ? fieldNamePrefix + "." + item.Name
      : item.Name;

    const Wrapper = wrapperComponents[item.Type] || TextBox;

    let displayName = item.DisplayName;
    const referredFieldName = getReferredFieldName(displayName);
    if (referredFieldName) {
      displayName = getFormattedFieldDisplayName(displayName, referredFieldName, data);
    }
    const value = get(data, item.DataPath || currentFieldNamePrefix);

    
    if(item.Type === 'Info' || item.Type === 'InfoViewer')
    {      
      return(
        <StringViewer 
        value = {item.DisplayName}
        />
      )
    }

    return (<Wrapper
      item={item}
      name={currentFieldNamePrefix}
      label={displayName}
      value={value}
      metadata={metadata}
      data={data}
      required={item.IsRequired}/>);
  }
}

ItemViewer.propTypes = {
  fieldNamePrefix: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  metadata: PropTypes.object,
  componentState: PropTypes.object
};

export default ItemViewer;
