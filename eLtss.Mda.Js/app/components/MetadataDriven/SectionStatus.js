import React, {PropTypes} from 'react';
import {getSectionStatus} from 'services/completionStatusService';
import Icons from 'components/Common/Icons';
import lodash from 'lodash';

const SectionStatus = ({fieldNamePrefix, section, data}) => {

  let value = getSectionStatus(fieldNamePrefix, section, data);
  if (value === undefined || value === 'none') {
    return null;
  }

  const overallStatus = lodash.get(value,"OverallStatus");
  if(overallStatus)
  {
    value=overallStatus;
  }
  return <Icons value={value}/>;
};

SectionStatus.propTypes = {
  fieldNamePrefix: PropTypes.string,
  section: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired
};

export default SectionStatus;