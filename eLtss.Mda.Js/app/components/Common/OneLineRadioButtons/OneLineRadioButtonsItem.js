import React, { PropTypes } from 'react';

const OneLineRadioButtonsItem = ({ name, label, onChange, value, checked }) => (
  <span>
    <input
      type="radio"
      id={name + value}
      name={name}
      checked={checked}
      value={value}
      onChange={onChange}
    />
    <label htmlFor={name + value} className="auto-width">{label}</label>
  </span>
);

OneLineRadioButtonsItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  checked: PropTypes.bool,
};

export default OneLineRadioButtonsItem;
