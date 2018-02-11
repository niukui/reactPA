import React, {PropTypes} from 'react';

const Textarea = ({
  name,
  id,
  value,
  placeholder,
  onChange,
  readonly,
  isRequired,
  extraProps
}) => {

  const checkIsReadonly = () => {
    if (readonly && readonly == true) {
      return (
        <textarea
          id={id}
          name={name}
          value={value || ''}
          readOnly="readonly"
          className={isRequired
          ? 'required comments-textarea readonly'
          : 'comments-textarea readonly'} />
      );
    } else {
      return (
        <textarea
          name={name}
          id={id}
          value={value || ''}
          placeholder={placeholder}
          className={isRequired
          ? 'required comments-textarea valid'
          : 'comments-textarea valid'}
          onChange={onChange}
          {...extraProps} />
      );
    }
  };

  return (checkIsReadonly());
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  isRequired: PropTypes.bool,
  extraProps: PropTypes.object
};

export default Textarea;
