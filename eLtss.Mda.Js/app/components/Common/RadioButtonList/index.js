import React, {PropTypes} from 'react';
import {RadioGroup, Radio} from 'react-radio-group';

const RadioButtonList = ({
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
    <RadioGroup
      id={name}
      name={name}
      selectedValue={value}
      onChange={onChange}
      className={`${saveRequired
      ? 'required'
      : ''} input-auto-resize selector-medium valid`}
      {...extraProps}>

      {options.map((option, index) => {

        if (orientation === "Vertical") {
          return (
            <div className="row InnerRow" key={index}><Radio value={option.value} disabled={disabled}/>
              < label key={index} className="auto-width">
                {option.text}
              </label>
            </div>
          );
        } else {
          return (
            <span  key={index}><Radio value={option.value} disabled={disabled}/>
              < label key={index} className="auto-width">
                {option.text}
              </label>
            </span>
          );
        }
      })}
    </RadioGroup>
  );
};

RadioButtonList.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.any,
  disabled: PropTypes.bool,
  required: PropTypes.bool
};

export default RadioButtonList;
