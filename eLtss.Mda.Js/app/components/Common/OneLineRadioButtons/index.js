import React, { PropTypes } from 'react';
import OneLineRadioButtonsItem from './OneLineRadioButtonsItem';

const OneLineRadioButtons = ({ name, onChange, value, options }) => {
  return (
    <div className="grouped-radiobuttons">
      <div className="row">
        {options.map((item) => <OneLineRadioButtonsItem
          key={item.value}
          checked={item.value === value}
          onChange={onChange}
          name={name}
          label={item.text}
          value={item.value} />)}
      </div>
    </div>
  );
};

OneLineRadioButtons.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
};

export default OneLineRadioButtons;
