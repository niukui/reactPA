import React, {PropTypes} from 'react';
import YesNoRadioButtons from 'components/Common/YesNoRadioButtons';
import RequiredIndicator from 'components/Common/RequiredIndicator';

const YesNoRadioButtonWithSpecify = ({
  name,
  item,
  label,
  value,
  error,
  required
}) => {

  
  let wrapperClass = 'row';
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  let selectedValue = (value ? value.Value : value);
  let showSpecify = ((selectedValue == false && item.SpecifyOnNo == true) || (item.SpecifyOnNo != true && selectedValue == true)) ? true : false;
  
  return (
    <div>
      <div className={wrapperClass}>
        <span className={'label'}>{label}{required && <RequiredIndicator /> }</span>
        <YesNoRadioButtons readonly name={name} value={value ? value.Value : value}/>
      </div>
      {(showSpecify) //(value ? value.Value : value)
        ? <fieldset className={'fieldset-container-three'}>
              <legend className="legend-header-three ui-hide hide-for-print">{item.AdditionalDisplayName}</legend>
              <label htmlFor={name + "_specify"}>{item.AdditionalDisplayName}{required && <RequiredIndicator /> }</label>
              <textarea
                className={'comments-textarea readonly'}
                name={name + "_specify"}
                readOnly="readonly"
              value={value ? value.Specify : value}></textarea>
          </fieldset>
        : null}
    </div>
  );
};

YesNoRadioButtonWithSpecify.propTypes = {
  name: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  value: PropTypes.any,
  error: PropTypes.string,
  required: PropTypes.bool.isRequired,
  label: PropTypes.string
};

export default YesNoRadioButtonWithSpecify;
