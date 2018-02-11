import React, {PropTypes} from 'react';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import TextBoxInput from 'components/Common/TextBox';
import { formatJsonDateTime ,formatJsonDate} from 'utils/dateHelper';
const DateTimePicker = ({
  name,
  item,
  value,
  required
}) => {

  let wrapperClass = 'row';
  let result=formatJsonDateTime(value,item.DisplayFormat);
  return (
    <div className={wrapperClass}>
        <label htmlFor={name}>{item.DisplayName}{required && <RequiredIndicator /> }</label>
        <TextBoxInput
        id={name}
        name={name}
        value={result}
        readonly/>
    </div>
  );
};

DateTimePicker.propTypes = {
  name: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  value: PropTypes.any,
  required: PropTypes.bool
};

export default DateTimePicker;
