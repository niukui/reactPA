import React, {PropTypes} from 'react';
import PureDatePicker from 'components/Common/DatePicker';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import moment from 'moment';
import lodash from 'lodash';
import {getMinValidation, getMaxValidation} from 'services/validationServices';

const DatePicker = ({
  name,
  item,
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

  wrapperClass += " rdtp-fix";

  const prepareChanges = (event) => {
    let changes = [];
    changes.push({name: event.target.name, value: event.target.value});
    onChange(changes);
  };

  let extraProps = {};
  let max = getMaxValidation(item);
  if (max) {
    if (max.Expression === 'today') {
      extraProps = Object.assign({}, extraProps, {maxDate: moment()});
    } else {
      extraProps = Object.assign({}, extraProps, {
        maxDate: moment(max.Expression)
      });
    }
  }

  let min = getMinValidation(item);
  if (min) {
    if (min.Expression === 'today') {
      extraProps = Object.assign({}, extraProps, {minDate: moment()});
    } else {
      extraProps = Object.assign({}, extraProps, {
        minDate: moment(min.Expression)
      });
    }
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{item.DisplayName}{required && <RequiredIndicator/>}</label>
      <PureDatePicker
        className={required
        ? 'required'
        : ''}
        readonly={readonly}
        onChange={prepareChanges}
        id={name}
        name={name}
        value={value}
        saveRequired={required}
        extraProps={extraProps}/> {error && <div className="error alert alert-danger">{error}</div>}
    </div>
  );
};

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  error: PropTypes.string,
  readonly: PropTypes.bool.isRequired,
  required: PropTypes.bool
};

export default DatePicker;
