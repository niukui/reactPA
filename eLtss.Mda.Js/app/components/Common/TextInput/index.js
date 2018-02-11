import React, { PropTypes } from 'react';
import RequiredIndicator from 'components/Common/RequiredIndicator';

const TextInput = ({
  name,
  label,
  onChange,
  value,
  error,
  saveRequired = false,
  type = 'text',
  stackedInput
}) => {

  return (
    <div className={stackedInput ? 'row stacked' : 'row'}>
      <label
        className={saveRequired
          ? 'complete-required'
          : ''}
        htmlFor={name}>{label}{saveRequired ? <RequiredIndicator />
          : null}</label>
      <input
        id={name}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        className={`${saveRequired
          ? 'required '
          : ''}input-auto-resize selector-medium valid form-control`} /> {error && <div className="error alert alert-danger red">{error}</div>}
    </div>

  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  saveRequired: PropTypes.bool.isRequired,
  stackedInput: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.string
};

export default TextInput;
