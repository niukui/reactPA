import React, { PropTypes } from 'react';
import { get } from 'lodash';
import Icons from 'components/Common/Icons';
import {LIFE_AREA_IDS} from 'utils/constants';

const SharedPlanningStatus = ({sharedPlannings}) => {
  if (sharedPlannings && sharedPlannings.length > 0) {
    let complete = sharedPlannings.find(x => x.LifeArea.Id === LIFE_AREA_IDS.workAndAlternatesToWork);
    if (!complete) {
      return <Icons value="in-progress" />;
    }
    complete = sharedPlannings.find(x => x.LifeArea.Id === LIFE_AREA_IDS.learningOtherPursuits);
    if (!complete) {
      return <Icons value="in-progress" />;
    }
    complete = sharedPlannings.find(x => x.LifeArea.Id === LIFE_AREA_IDS.communityInterests);
    if (!complete) {
      return <Icons value="in-progress" />;
    }
    complete = sharedPlannings.find(x => x.LifeArea.Id === LIFE_AREA_IDS.home);
    if (!complete) {
      return <Icons value="in-progress" />;
    }
    complete = sharedPlannings.find(x => x.LifeArea.Id === LIFE_AREA_IDS.money);
    if (!complete) {
      return <Icons value="in-progress" />;
    }
    return <Icons value="complete" />;
  } else {
    return <Icons value="not-started" />;
  }

};

SharedPlanningStatus.propTypes = {
  sharedPlannings: PropTypes.array
};
export default SharedPlanningStatus;
