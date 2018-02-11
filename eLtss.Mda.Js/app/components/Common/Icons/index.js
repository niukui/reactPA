import React, {PropTypes} from 'react';

const status = {
  "not-started": function () {
    return (
      <span className="icon-circle-blank" title="All Required fields are missing.">
        <span className="ui-hide hide-for-print">All Required fields are missing.</span>
      </span>
    );
  },
  "in-progress": function () {
    return (
      <span className="icon-adjust" title="Some Required fields are missing.">
        <span className="ui-hide hide-for-print">Some Required fields are missing.</span>
      </span>
    );
  },
  "complete": function () {
    return (
      <span
        className="icon-circle"
        title="All Required fields have been completed. Ready for submission.">
        <span className="ui-hide hide-for-print">All Required fields have been completed. Ready for submission.</span>
      </span>
    );
  },
  "submitted": function () {
    return (
      <span className="icon-ok-sign" title="Submitted.">
        <span className="ui-hide hide-for-print">Submitted.</span>
      </span>
    );
  },
  "none": function () {
    return null;
  }
};

const Icons = ({value}) => {
  if(status[value])
  {
    return status[value]();
  }
  return null;
};

Icons.propTypes = {
  value: PropTypes.any
};

export default Icons;
