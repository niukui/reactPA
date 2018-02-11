import React, {PropTypes} from 'react';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import CommonYesNoRadioButtons from 'components/Common/YesNoRadioButtons';

import {toString} from 'lodash';

const YesNoRadioButtons = ({
  item,
  name,
  label,
  value,
  error,
  required
}) => {

  let wrapperClass = 'row';
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }
  return (
    <div>
      <div className={wrapperClass}>
        <span className="label">{label}
        {required && <RequiredIndicator /> }
        </span>
        <CommonYesNoRadioButtons readonly name={name} value={value}/>
      </div>
      {value && item.AdditionalDisplayName && <div className={wrapperClass}>
         <span htmlFor={name + "_specify"}>{item.AdditionalDisplayName}</span>
      </div>}
    </div>
  );
};

YesNoRadioButtons.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  error: PropTypes.string,
  required: PropTypes.bool,
  item: PropTypes.any
};

export default YesNoRadioButtons;
