import React, {PropTypes} from 'react';

const String = ({value}) => {
  const getName = () => {
    if (value && value.Name) {
      return value.Name;
    } else {
      return null;
    }
  };
  const getDescription = () => {
    if (value && value.Description) {
      return value.Description;
    } else {
      return null;
    }
  };

  return (
    <span>
      {getName() || getDescription()}
    </span>
  );
};

String.propTypes = {
  value: PropTypes.any
};

export default String;
