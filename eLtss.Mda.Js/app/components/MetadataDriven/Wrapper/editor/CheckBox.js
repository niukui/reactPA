import React, {PropTypes} from 'react';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import {toString} from 'lodash';

const CheckBox = ({
  item,
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
  readonly,
  required
}) => {
  let id = name.replace(/\./g, '_');

  const prepareChanges = (event) => {
    let changes = [];
    changes.push({name: event.target.name, value: event.target.checked});
    onChange(changes);
  };

  let wrapperClass = 'row';
  if (error) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <label
        htmlFor={id}>
        {label}{required && <RequiredIndicator /> }
      </label>
      <input
        id={id}
        {...(readonly ? {readOnly:'readonly', disabled:'disabled', className:'readonly'}:{})}
        type="checkbox"
        checked={value === true}
        onChange={prepareChanges}
        name={name}/> {error && <div className="error alert alert-danger">{error}</div>}
    </div>
  );
};

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.string,
  readonly: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired
};

export default CheckBox;
