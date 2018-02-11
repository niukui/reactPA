import React, {PropTypes} from 'react';

const GroupDropdownList = ({
  name,
  id,
  onChange,
  defaultOption,
  value,
  groups,
  options,
  saveRequired = false,
  dropdownSize
}) => {
  /* "dropdownSize" prop used to set className to adjust width of dropdowns.
    Use 'small,' 'medium,' or 'large' to set respective class. */
  const saveRequiredCalculated = (saveRequired === undefined || saveRequired === null)
    ? false
    : saveRequired;
  return (
    <select
      name={name}
      id={id}
      value={(value && (value.Id || value.Value)) || ""}
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
      className={`${saveRequiredCalculated && 'required'} ${ 'selector-' + dropdownSize}`}>
      <option value="">{defaultOption}</option>
      {groups.map((group) => {
        let optionsInGroup = options.filter(item => item.RuleAttributes.find(x => x.Guid === group.UniqueAttribute.Guid));
        return (
          <optgroup label={group.Name} key={group.Id}>
            {optionsInGroup.map((option) => {
              return (
                <option key={option.Id} value={option.Id}>{option.Name}</option>
              )
            })
}
          </optgroup>
        )
      })}
    </select>
  );
};

GroupDropdownList.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.object,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  groups: PropTypes.arrayOf(PropTypes.object),
  saveRequired: PropTypes.bool.isRequired,
  dropdownSize: PropTypes.string
};

export default GroupDropdownList;
