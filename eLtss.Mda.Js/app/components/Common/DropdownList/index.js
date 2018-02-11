import React, {PropTypes} from 'react';

const DropdownList = ({
  name,
  id,
  onChange,
  defaultOption,
  value,
  options,
  saveRequired = false,
  dropdownSize,
  readonly 
}) => {
  /* "dropdownSize" prop used to set className to adjust width of dropdowns.
    Use 'small,' 'medium,' or 'large' to set respective class. */
  const saveRequiredCalculated = (saveRequired === undefined || saveRequired === null)
    ? false
    : saveRequired;
  return (
    <select
      name={name}
      disabled={readonly}
      id={id}
      value={(value && (value.Id || value.Value))||value || ""}
      onChange={(e) => {
      e.target = {
        name: name,
        value: {
          Id: e.target.value,
          Name: e.target.options[e.target.selectedIndex].text
        }
      };
      onChange(e);
    }}
      className={`${saveRequiredCalculated && 'required'} ${'selector-'+ dropdownSize}`}>
      <option value="">{defaultOption}</option>
      {options.map((option) => <option key={option.value} value={option.value}>{option.text}</option>)
}
    </select>
  );
};

DropdownList.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  saveRequired: PropTypes.bool.isRequired,
  dropdownSize: PropTypes.string,
  disabled: PropTypes.bool
};

export default DropdownList;
