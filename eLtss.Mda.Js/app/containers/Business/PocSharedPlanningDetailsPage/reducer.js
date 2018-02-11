import * as constants from './constants';
import {fromJS} from 'immutable';
import lodash from "lodash";
import {SUPPORT_TYPE_IDS} from 'utils/constants'

const initialState = fromJS({pocId: '', pocPart3: [], playGroundSharedPlanning: {},sharePlanningIndex: null});
 
function pocPart3DetailsReducer(state = initialState, action) {

  switch (action.type) {
    case constants.LOAD_POC_PART3_SUCCESS:
      return state
        .set('dataId', action.dataId)
        .set('clientId', action.clientId)
        .set('pocPart3', action.pocPart3 || [])
        .set('capCategorys', action.capCategorys)
        .set('caps', action.caps)
        .set('prioritys', action.prioritys)
        .set('problems', action.problems)
        .set('problemOtherId', action.problemOtherId)
        .set('goals', action.goals)
        .set('goalOtherId', action.goalOtherId)
        .set('interventions', action.interventions)
        .set('interventionOtherId', action.interventionOtherId)
        .set('owners', action.owners)
        .set('haveDateCloseds', action.haveDateCloseds)
        .set('haveDateClosedTbdId', action.haveDateClosedTbdId)
        .set('securityContext', action.securityContext)
        .set('underEditing', false);

      case constants.CHANGE_PLAYGROUND_SHARED_PLANNING:
        { return state.set('playGroundSharedPlanning', Object.assign({},action.sharedPlanning));
        }

      case constants.EDIT_PLAYGROUND_SHARED_PLANNING:
      { return state.set('playGroundSharedPlanning', Object.assign({},action.sharedPlanning))
        .set('sharePlanningIndex', action.index)
        .set('underEditing', true);
      }    

    default:
      return state;
  }
}

export default pocPart3DetailsReducer;
