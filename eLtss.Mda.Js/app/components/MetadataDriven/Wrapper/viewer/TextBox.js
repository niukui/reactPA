import React, {PropTypes} from 'react';
import TextBoxInput from 'components/Common/TextBox';
import {toString} from 'lodash';
import RequiredIndicator from 'components/Common/RequiredIndicator';

const TextBox = ({name, label, value, required, item}) => {
  let result=toString(value);
  if(item.Mask)
  {
    const position=result.length-4;
    result=item.Mask+result.substring(position);
  }
  return (
    <div className="row">
      <label htmlFor={name}>{label} {required ? <RequiredIndicator /> : ''}</label>
      <TextBoxInput
        id={name}
        name={name}
        value={result}
        readonly/>
    </div>
  );
};

TextBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  item: PropTypes.any,
  required: PropTypes.bool,
};

export default TextBox;
