import React, {PropTypes} from 'react';
import {toString} from 'lodash';
import moment from 'moment';

const String = ({
  value,
  format = 'MM/DD/YYYY'
}) => {
  const getFormattedDate = () => {
    return moment(toString(value)).format('MM/DD/YYYY');
  };

  return (
    <span>
      {getFormattedDate()}
    </span>
  );
};

String.propTypes = {
  value: PropTypes.any,
  format: PropTypes.string
};

export default String;
