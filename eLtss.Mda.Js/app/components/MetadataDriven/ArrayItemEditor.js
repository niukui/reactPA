import React, {PropTypes} from 'react';
import ItemEditor, {wrapperComponents} from './ItemEditor';
import lodash from 'lodash';
import StringViewer from '../Common/String';

class ArrayItemEditor extends ItemEditor {
  constructor(props, context) {
    super(props, context);
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
      if (nextProps.componentState._required !== this.props.componentState._required && nextProps.componentState._required === false) {
        this.setState({error: ""});
      }
    }
  }

  getFieldValue() {
    return this.props.value;
  }

  onValueChanged(changes) {
    if (this.props.formValidated) {
      const change = changes.filter(change => change.name = this.props.item.Name);
      if (change) {
        this.validate(change[0].value);
      }
    }

    this
      .props
      .onChange(changes);
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

    let componentValue = componentState._value || this.props.value;

    const Wrapper = wrapperComponents[itemType] || wrapperComponents.TextBox;

    if (itemType === 'Info' || itemType === 'InfoViewer') {
      return (<StringViewer value={this.props.item.DisplayName}/>)
    }

    if (Wrapper) {

      return (<Wrapper
        item={this.props.item}
        name={this.props.item.Name}
        label={this.getFieldDisplayName()}
        value={componentValue}
        onChange={this.onValueChanged}
        eventType={this.props.eventType}
        error={this.state.error}
        registerValidate={this.registerValidate}
        readonly={componentState._readonly}
        customAttribute={componentState._customAttribute}
        required={componentState._required}
        ruleAttributes={this.selectRuleAttribute()}
        dropdownDataSource={this.props.dropdownDataSource}/>);
    }
  }

  render() {
    return (this.selectWrapper());
  }
}

ArrayItemEditor.propTypes = {
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  eventType: PropTypes.string,
  onUiUpdate: PropTypes.func.isRequired,
  componentState: PropTypes.object,
  currentIdentity: PropTypes.object,
  ruleAttributes: PropTypes.array
};

export default ArrayItemEditor;
