import React, { PropTypes } from 'react';
import Multiselect from 'components/Common/Multiselect';
import { findNamesByCategory, findLookupItemsByCategory } from 'services/lookupServices';
import { selectListItemsForMultiSelect } from 'utils/dropdownTransformer';

class MultipleSelection extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      options: [],
      lookupItems: []
    };
  }
  componentDidMount() {
    const _this = this;
    findLookupItemsByCategory(`isp${this.props.item.Name.toLowerCase()}s`).then((lookups) => {
      _this.setState({
        lookupItems: Object.assign([], lookups),
        options: selectListItemsForMultiSelect(lookups, 'Id', 'Name')
      });
    });
  }

  render() {
    // const prepareChanges = (event) => {   let changes = [];   changes.push({name:
    // event.target.name, value: event.target.value});   onChange(changes); };
    const {
      name,
      label,
      onChange,
      placeholder,
      value,
      error,
      readonly
    } = this.props;

    let wrapperClass = item.ClassName || 'row';
    if (error && error.length > 0) {
      wrapperClass += " has-error";
    }
    
    return (
      <div className={wrapperClass}>
        <label htmlFor={name}>{label}</label>
        <Multiselect
          readonly={readonly}
          name={name}
          placeholder={placeholder}
          value={value}
          options={this.state.options}
          onChange={onChange}/>
      </div>
    );
  }
}

MultipleSelection.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array,
  item: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.string,
  readonly: PropTypes.bool.isRequired
};

export default MultipleSelection;
