import React, {PropTypes} from 'react';
import YesNoRadioButtons from 'components/Common/YesNoRadioButtons';
import RequiredIndicator from 'components/Common/RequiredIndicator';
/*
value:{
  value:true,
  specify:"this is specify"
}
*/
const YesNoRadioButtonWithSpecify = ({
  name,
  item,
  label,
  onChange,
  value,
  error,
  readonly,
  required
}) => {

  let wrapperClass = item.ClassName || 'row';
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }
  const prepareChanges = (event) => {
    let changes = [];
    let newValue = {};

    if (event.target.name === name) {
      if (!event.target.value.Value) {
        newValue = {
          Value: event.target.value,
          Specify: ""
        };
      } else {
        newValue = {
          Value: event.target.value,
          Specify: value.Specify
        };
      }
    } else if (event.target.name === name + "_specify") {
      newValue = {
        Value: value.Value,
        Specify: event.target.value
      };
    }

    changes.push({name: name, value: newValue});

    onChange(changes);
  };  
  
  // To specify when 'No' is selected set the SpecifyOnNo property to true in the metadata 
  let selectedValue = (value ? value.Value : value);
  let showSpecify = ((selectedValue == false && item.SpecifyOnNo == true) || (item.SpecifyOnNo != true && selectedValue == true)) ? true : false;
  

  return (
    <div>
      <div className={wrapperClass}>
        <span htmlFor={name} className="label">{label}{required && <RequiredIndicator /> }</span>
        <YesNoRadioButtons
          readonly={readonly}
          onChange={prepareChanges}
          name={name}
          id={name}
          value={value
          ? value.Value
          : value}/>
      </div>
      {(showSpecify)
        ? <fieldset className={"fieldset-container-three"}>
            <label htmlFor={name + "_specify"}>{item.AdditionalDisplayName}{item.Required && <RequiredIndicator /> }</label>
            
            <textarea
              readOnly={readonly}
              className={readonly
              ? "comments-textarea required readonly"
              : "comments-textarea required"}
              name={name + "_specify"}
              id={name + "_specify"}
              onChange={prepareChanges}
              value={value
              ? value.Specify
              : value} 
              maxLength="2000" />
          </fieldset>
        : null}
         {error && <div className="error alert alert-danger">{error}</div>}
    </div>
  );
};

YesNoRadioButtonWithSpecify.propTypes = {
  name: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  error: PropTypes.string,
  readonly: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired
};

export default YesNoRadioButtonWithSpecify;
