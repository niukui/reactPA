import React, {PropTypes} from 'react';
import {toString} from 'lodash';

const String = ({value}) => {
  return (
    <span>
      {toString(value)}
    </span>
  );
};

String.propTypes = {
  value: PropTypes.any
};

export default String;
