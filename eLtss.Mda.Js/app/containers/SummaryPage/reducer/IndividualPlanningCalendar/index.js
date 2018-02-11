import * as constants from '../../constants';
import {fromJS} from 'immutable';
import lodash from "lodash";
import {initComponentsState, combineComponentsState} from 'services/componentsServices';

// The initial state of the App
const initialState = fromJS({dataId: '', data: {}, metadata: {}});

function ipcReducer(state = initialState, action) {
  switch (action.type) {
    case constants.ADD_GENERAL_EVENT_SUCCESS:
      {
        let data = state.get('data');
        let activities = data.IndividualPlanningCalendar && data.IndividualPlanningCalendar.GeneralEvents || [];
        activities.push(action.activity);
        lodash.set(data, 'IndividualPlanningCalendar.GeneralEvents', activities);
        return state.set('data', Object.assign({}, data));
      }
    case constants.EDIT_GENERAL_EVENT_SUCCESS:
      {
        let data = state.get('data');
        let activities = data.IndividualPlanningCalendar && data.IndividualPlanningCalendar.GeneralEvents || [];
        const index = activities.findIndex(x => x.Id === action.activity.Id);
        if (index >= 0) {
          activities.splice(index, 1, action.activity);
        }
        lodash.set(data, 'IndividualPlanningCalendar.GeneralEvents', activities);
        return state.set('data', Object.assign({}, data));
      }
    case constants.DELETE_GENERAL_EVENT_SUCCESS:
      {
        let data = state.get('data');
        let activities = data.IndividualPlanningCalendar && data.IndividualPlanningCalendar.GeneralEvents || [];
        const index = activities.findIndex(x => x.Id === action.generalEventId);
        if (index >= 0) {
          activities.splice(index, 1);
        }
        lodash.set(data, 'IndividualPlanningCalendar.GeneralEvents', activities);
        return state.set('data', Object.assign({}, data));
      }
    default:
      return state;
  }
}

export default ipcReducer;
