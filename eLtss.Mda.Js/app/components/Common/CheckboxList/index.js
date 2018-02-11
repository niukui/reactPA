import React, {PropTypes} from 'react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

const CheckboxList = ({
  name,
  value,
  options,
  onChange,
  saveRequired = false,
  disabled = false,
  orientation,
  extraProps
}) => {
  return (
    <CheckboxGroup
      name={name}
      value={value}
      onChange={onChange}
      className={`${saveRequired
      ? 'required'
      : ''} input-auto-resize selector-medium valid`}
      {...extraProps}>

      {options.map((option, index) => {
        
        if (orientation === 'Vertical') {
          return ([< div className = "row InnerRow" key = {
              index
            } > <Checkbox
              key={name + index}
              id={name + '.' + option.value}
              value={option.value}
              disabled={disabled}/> < label htmlFor = {
              name + '.' + option.value
            }
            className = "auto-width" > {
              option.text
            } </label>
              </div >]);
        } else {
          return ([ < Checkbox key = {
              name + index
            }
            id = {
              name + '.' + option.value
            }
            value = {
              option.value
            }
            disabled = {
              disabled
            }
            {
              ...extraProps
            } />, < label key = {
              "For" + name + index
            }
            htmlFor = {
              name + '.' + option.value
            }
            className = "auto-width" > {
              option.text
            } </label>
          ]);
        }
      })}
    </CheckboxGroup>
  );
};

CheckboxList.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.array,
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  saveRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  orientation: PropTypes.string
};

export default CheckboxList;
