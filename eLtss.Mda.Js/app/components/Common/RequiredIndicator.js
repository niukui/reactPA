import React from 'react';

const RequiredIndicator = () => {
  return (
     <span
    className="required-indicator-style"
    title="This field is required to submit."
    aria-hidden="true"
    role="presentation"
    >*
    </span>
  );
};


export default RequiredIndicator;

