import React, {PropTypes} from 'react';
import TextBoxInput from 'components/Common/TextBox';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import {toString} from 'lodash';

const TextBox = ({
  item,
  name,
  label,
  value,
  required,
  error
}) => {
  let displayValue;
  let wrapperClass = item.ClassName || 'row';
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  if (item.DataSource && item.DataSource.Options) {
    displayValue = value.Name || value.Text;
  } else {
    displayValue = value && value.UniqueAttribute && value.UniqueAttribute.Description;
  }
  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}{required && <RequiredIndicator/>}</label>
      <TextBoxInput
        name={name}
        value={toString(displayValue)}
        readonly/> {error && <div className="error alert alert-danger">{error}</div>}
    </div>
  );
};
TextBox.propTypes = {
  item: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  required: PropTypes.bool.isRequired,
  error: PropTypes.any
};

export default TextBox;
