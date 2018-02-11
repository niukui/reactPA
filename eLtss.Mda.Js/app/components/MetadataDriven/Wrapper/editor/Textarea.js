import React, {PropTypes} from 'react';
import TextareaInput from 'components/Common/Textarea';
import {toString} from 'lodash';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import {getMinValidation, getMaxValidation} from 'services/validationServices';

const Textarea = ({
  item,
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
  readonly,
  required,
  description
}) => {

  const prepareChanges = (event) => {
    let changes = [];
    changes.push({name: event.target.name, value: event.target.value});
    onChange(changes);
  };

  let wrapperClass = item.ClassName || 'row';
  if (error) {
    wrapperClass += " has-error";
  }

  let extraProps = {
    maxLength: 2000
  };
  let max = getMaxValidation(item);
  if (max) {
    extraProps = Object.assign({}, extraProps, {maxLength: max.Value});
  }
  let min = getMinValidation(item);
  if (min) {
    extraProps = Object.assign({}, extraProps, {minLength: min.Value});
  }
  return (
    <div className={wrapperClass}>
      <label className="auto-width" htmlFor={name}>
        {label}{required && <RequiredIndicator/>}
      </label>
      {item.Description
        ? <span className='label-info'>{item.Description}</span>
        : ``}
      <TextareaInput
        readonly={readonly}
        id={name}
        name={name}
        className={required
        ? 'comments-textarea required'
        : 'comments-textarea'}
        isRequired={required}
        placeholder={placeholder}
        value={toString(value)}
        onChange={prepareChanges}
        extraProps={extraProps}/> {item.AdditionalDisplayName && <div className={wrapperClass}>
        <span>{item.AdditionalDisplayName} {item.HyperLink && item.HyperLink.Type === 'AdditionalDisplayName' && <a href={item.HyperLink.Href} target='_blank'>{item.HyperLink.Text}</a>}</span>
      </div>}
      {error && <div className="error alert alert-danger">{error}</div>}
    </div>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.string,
  readonly: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  description: PropTypes.string
};

export default Textarea;
