import React, {PropTypes} from 'react';
import CommonYesNoRadioButtons from 'components/Common/YesNoRadioButtons';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import {toString} from 'lodash';

class YesNoRadioButtons extends React.Component {

  render() {
    const {
      item,
      name,
      label,
      onChange,
      placeholder,
      value,
      error,
      readonly,
      required
    } = this.props;

    const prepareChanges = (event) => {
      let changes = [];
      changes.push({name: event.target.name, value: event.target.value});
      onChange(changes);
    };

    let wrapperClass = item.ClassName || 'row';
    if (error && error.length > 0) {
      wrapperClass += " has-error";
    }

    return (
      <div>
        <div className={wrapperClass}>
          <span className="label">
          {label}{required && <RequiredIndicator /> }
          </span>
          <CommonYesNoRadioButtons
            readonly={readonly}
            onChange={prepareChanges}
            name={name}
            value={value}/>
        </div>
        {value && item.AdditionalDisplayName && <div className={wrapperClass}>
          <span htmlFor={name + "_specify"}>{item.AdditionalDisplayName}</span>
        </div>}
         {error && <div className="error alert alert-danger">{error}</div>}
      </div>
    );
  }
}

YesNoRadioButtons.propTypes = {
  item: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.string,
  readonly: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired
};

export default YesNoRadioButtons;
