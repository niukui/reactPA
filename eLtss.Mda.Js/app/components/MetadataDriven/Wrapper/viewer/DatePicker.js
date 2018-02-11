import React, {PropTypes} from 'react';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import PureDatePicker from 'components/Common/DatePicker';

const DatePicker = ({
  name,
  item,
  value,
  required
}) => {

  let wrapperClass = item.ClassName || 'row';
  
  return (
    <div className={wrapperClass}>
        <label htmlFor={name}>{item.DisplayName}{required && <RequiredIndicator /> }</label>
        <PureDatePicker readonly id={name} name={name} value={value} saveRequired={item.IsRequired}/>
    </div>
  );
};

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  value: PropTypes.any,
  required: PropTypes.bool
};

export default DatePicker;
