import React, {PropTypes} from 'react';
import TextBoxInput from 'components/Common/TextBox';
import {toString} from 'lodash';
import RequiredIndicator from 'components/Common/RequiredIndicator';

const Label = ({name, label, value, required, item}) => {
  return (
    <div className="row">
      <label htmlFor={name}>{label} {required ? <RequiredIndicator /> : ''}</label>
    </div>
  );
};

Label.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  item: PropTypes.any
};

export default Label;
