import * as constants from './constants';
import {fromJS} from 'immutable';
import lodash from "lodash";

const initialState = fromJS({});

function ispPat5OutcomeReducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOAD_SERVICE_AND_OUTCOMES_SUCCESS:
      {
        return state
        .set('serviceAndOutComes', Object.assign({}, action.serviceAndOutComes))
        .set('serviceDefinitions', Object.assign([], action.serviceDefinitions))
        .set('sharedPlannings', Object.assign([], action.sharedPlannings));
      }
    case constants.SERVICE_AND_OUTCOMES_UPDATE_FORM:
      {
        let serviceAndOutComes = state.get('serviceAndOutComes');
        lodash.set(serviceAndOutComes, action.name, action.value);
        return state.set('serviceAndOutComes', Object.assign({}, serviceAndOutComes));
      }
    case constants.SERVICE_AND_OUTCOMES_CHANGE_OUTCOME:
      {
        let serviceAndOutComes = state.get('serviceAndOutComes');
        const outcomeIndex = lodash.findIndex(serviceAndOutComes.ServiceOutcomes, (item) => {
          return item.Id === action.outcomeId;
        });
        lodash.set(serviceAndOutComes, 'ServiceOutcomes[' + outcomeIndex + ']', action.outcome);
        return state.set('serviceAndOutComes', Object.assign({}, serviceAndOutComes));
      }
    case constants.SERVICE_AND_OUTCOMES_SAVED:
      {
        return state.set('serviceAndOutComes', Object.assign({}, action.serviceOutcomes));
      }
    case constants.ADD_SERVICE_AND_OUTCOMES:
      {
        let serviceAndOutComes = state.get('serviceAndOutComes');
        serviceAndOutComes.ServiceOutcomes.push(action.outcome);
        return state.set('serviceAndOutComes', Object.assign({}, serviceAndOutComes));
      }
    case constants.DELETE_SERVICE_AND_OUTCOMES:
      {
        let serviceAndOutComes = state.get('serviceAndOutComes');
        lodash.remove(serviceAndOutComes.ServiceOutcomes, (item) => {
          return item.Id === action.outcomeId;
        });
        return state.set('serviceAndOutComes', Object.assign({}, serviceAndOutComes));
      }
    default:
      return state;
  }
}

export default ispPat5OutcomeReducer;
