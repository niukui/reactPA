import React, {PropTypes} from 'react';

const String = ({value}) => {
  return (
    <span>
      {value
        ? "Yes"
        : "No"}
    </span>
  );
};

String.propTypes = {
  value: PropTypes.any
};

export default String;
