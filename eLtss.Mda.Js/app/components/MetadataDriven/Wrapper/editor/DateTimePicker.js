import React, {PropTypes} from 'react';
import DatePicker from 'react-datepicker';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import moment from 'moment';
import lodash from 'lodash';

const DateTimePicker = ({
  name,
  item,
  onChange,
  value,
  error,
  readonly,
  required
}) => {
  let wrapperClass = item.ClassName || 'row';
  if (error) {
    wrapperClass += " has-error";
  }
  wrapperClass += " rdtp-fix";
  const prepareChanges = (value) => {
    let changes = [];
    changes.push({name: item.Name, value: value});
    onChange(changes);
  };

  let result=new moment(value);

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{item.DisplayName}{required && <RequiredIndicator/>}</label>
      <DatePicker
        autoComplete="off"
        id={name}
        name={name}
        utcOffset={moment().utcOffset()}
        showYearDropdown
        scrollableYearDropdown
        selected={value
          ? moment(value).utcOffset(moment().utcOffset())
          : null}
        showTimeSelect
        dateFormat="L LT"
        className={required
          ? 'required'
          : ''}
        onChange={prepareChanges} /> {error && <div className="error alert alert-danger">{error}</div>}
    </div>
  );
};

DateTimePicker.propTypes = {
  name: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  error: PropTypes.string,
  readonly: PropTypes.bool.isRequired,
  required: PropTypes.bool
};

export default DateTimePicker;
