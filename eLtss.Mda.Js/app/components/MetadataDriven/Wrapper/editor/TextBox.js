import React, {PropTypes} from 'react';
import TextBoxInput from 'components/Common/TextBox';
import {toString} from 'lodash';
import {getMinValidation, getMaxValidation} from 'services/validationServices';
import RequiredIndicator from 'components/Common/RequiredIndicator';

const TextBox = ({
  item,
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
  readonly,
  required,
  type = 'text'
}) => {
  //let id = name.replace(/\./g, '_');
  const valueType = item.ValueType;
  let extraProps = {};
  let max = getMaxValidation(item);
  let min = getMinValidation(item);
  if (valueType === 'Number') {
    if (max) {
      extraProps = Object.assign({}, extraProps, {max: max});
    }
    if (min) {
      extraProps = Object.assign({}, extraProps, {min: min});
    }
  } else {
    extraProps = {
      maxLength: 2000
    };
    if (max) {
      extraProps = Object.assign({}, extraProps, {maxLength: max});
    }
    if (min) {
      extraProps = Object.assign({}, extraProps, {minLength: min});
    }
  }

  const prepareChanges = (event) => {
    let changes = [];
    changes.push({name: event.target.name, value: event.target.value});
    onChange(changes);
  };

  let wrapperClass = item.ClassName || 'row';
  if (error) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>
        {label}{required
          ? <RequiredIndicator />
          : null}
      </label>
      <TextBoxInput
        readonly={readonly}
        id={name}
        type={valueType === 'Number'
        ? 'number'
        : 'text'}
        name={name}
        className={item.isRequired
        ? 'required'
        : ''}
        placeholder={placeholder}
        value={toString(value)}
        onChange={prepareChanges}
        isRequired={item.IsRequired}
        extraProps={extraProps}/> {error && <div className="error alert alert-danger">{error}</div>}
    </div>
  );
};

TextBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.string,
  readonly: PropTypes.bool.isRequired,
  required: PropTypes.bool,
  item: PropTypes.any,
  type: PropTypes.any
};

export default TextBox;
