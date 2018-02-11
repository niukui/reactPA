import * as constants from './constants';
import {fromJS} from 'immutable';
import lodash from "lodash";
import {SUPPORT_TYPE_IDS} from 'utils/constants'

const initialState = fromJS({ispId: '', ispPart3: [], playGroundSharedPlanning: {}});

const calculateIsEligibilityBased = (sharedPlanning) => {
  return sharedPlanning.SupportType && sharedPlanning.SupportType.Id === SUPPORT_TYPE_IDS.eligibilityBased;
};

const calculateSharedPlanning = (sharedPlanning) => {
  let s = Object.assign({}, sharedPlanning);
  let isEligibilityBased = calculateIsEligibilityBased(sharedPlanning);
  s.IsEligibilityBased = isEligibilityBased;
  if (isEligibilityBased) {
    s.SupportProviderName = '';
  } else {
    s.AttachedProviderIds = [];
    s.NaturalSupport = '';
  }
  return s;
};

function ispPartManageReducer(state = initialState, action) {

  switch (action.type) {
    case constants.LOAD_ISP_PART3_SUCCESS:
      return state
        .set('dataId', action.dataId)
        .set('clientId', action.clientId)
        .set('ispPart3', action.ispPart3 || [])
        .set('lifeAreas', action.lifeAreas)
        .set('supportTypes', action.supportTypes)
        .set('assignedProviders', action.assignedProviders)
        .set('securityContext', action.securityContext)
        .set('underEditing', false);

    case constants.CHANGE_PLAYGROUND_SHARED_PLANNING:
      return state.set('playGroundSharedPlanning', calculateSharedPlanning(action.sharedPlanning));

    case constants.CHANGE_SHARED_PLANNING_FORM:
      {
        let sharedPlanning = state.get('playGroundSharedPlanning');
        lodash.set(sharedPlanning, action.name, action.value);
        sharedPlanning = calculateSharedPlanning(sharedPlanning);
        return state.set('playGroundSharedPlanning', sharedPlanning);
      }

    case constants.SWITCH_TO_EDIT_MODE:
      return state.set('underEditing', true);

    case constants.SWITCH_TO_CREATE_MODE:
      return state.set('underEditing', false);

    case constants.DELETE_ISP_PART3_ITEM_SUCCESS:
      {
        return state.set('ispPart3', Object.assign([], action.part3s));
      }

    case constants.SAVE_SHARED_PLANNING_SUCCESS:
      {
        let sharedPlannings = Object.assign([], state.get('ispPart3'));
        const index = lodash.indexOf(sharedPlannings, lodash.find(sharedPlannings, {
          Id: action.sharedPlanning && action.sharedPlanning.Id
        }));
        if (index >= 0) {
          sharedPlannings.splice(index, 1, action.sharedPlanning);
        } else {
          sharedPlannings = action.sharedPlannings || [];
        }
        return state
          .set('ispPart3', [...sharedPlannings])
          .set('playGroundSharedPlanning', {
            LifeArea: {},
            DesiredOutcome: "",
            WhenNoLongerNeedSupport: "",
            SupportType: {},
            SupportProviderName: "",
            AttachedProviderIds: [],
            StartDate: null,
            EndDate: null,
            NaturalSupport: ""
          })
          .set('underEditing', false);
      }

    case constants.SHARED_PLANNING_START_DELETING:
      return state
        .set('underDeleting', true)
        .set('preDeleteSharedPlanning', action.sharedPlanning);

    case constants.SHARED_PLANNING_DELETING_CONFIRMED:
      return state
        .set('underDeleting', false)
        .set('preDeleteSharedPlanning', null);

    case constants.FORM_VALIDATED:
      return state.set('errors', action.errors);

    case constants.LOAD_SHARED_PLANNING_AUDIT_TRIALS_SUCCESS:
      return state.set('auditTrails', [...action.auditTrails]);

    default:
      return state;
  }
}

export default ispPartManageReducer;
