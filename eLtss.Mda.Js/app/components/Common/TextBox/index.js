import React, {PropTypes} from 'react';

const TextBox = ({
  id,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  readonly,
  isRequired,
  extraProps
}) => {

  const checkIsReadonly = () => {
    if (readonly && readonly == true) {
      return (<input
        id={name}
        name={name}
        type={type}
        value={value}
        readOnly="readonly"
        className="readonly"
        {...extraProps}/>);
    } else {
      return (<input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={isRequired && 'required'}
        {...extraProps}/>);
    }
  };

  return (checkIsReadonly());
};

TextBox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  isRequired: PropTypes.bool,
  extraProps: PropTypes.object
};

export default TextBox;
