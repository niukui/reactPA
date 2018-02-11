import {LOAD_ISP_OVERVIEW, LOAD_ISP_OVERVIEW_SUCCESS, CHANGE_ISP_OVERVIEW_FORM_SUCCESS} from './constants';
import {fromJS} from 'immutable';
import lodash from 'lodash';

// The initial state of the App
const initialState = fromJS({dataId: '', data: {}});

function ispOverviewReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ISP_OVERVIEW_SUCCESS:
      return state
        .set('data', action.data);

    case CHANGE_ISP_OVERVIEW_FORM_SUCCESS:
      {
        let data = state.get('data');
        lodash.set(data, action.changedValueSet.path, action.changedValueSet.value);
        if (action.changedValueSet.path === "IndividualSupportPlan.EffectiveDateRange.StartDate") {
          const startDate = new Date(action.changedValueSet.value);
          const year = startDate.getFullYear();
          const month = startDate.getMonth();
          const day = startDate.getDate();
          const endDate = new Date(year + 1, month, day - 1);
          lodash.set(data, "IndividualSupportPlan.EffectiveDateRange.EndDate", endDate);
        }
        data = Object.assign({}, data);
        return state.set('data', data);
      }

    default:
      return state;
  }
}

export default ispOverviewReducer;
