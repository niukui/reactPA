import * as constants from './constants';

export function loadPocPart3(dataId, clientId, prefix) {
  return {type: constants.LOAD_POC_PART3, dataId, clientId, prefix};
}

export function pocPart3Loaded(pocPart3, dataId, clientId, capCategorys, caps, prioritys, problems, problemOtherId, goals, goalOtherId, interventions, interventionOtherId, owners, haveDateCloseds, haveDateClosedTbdId, securityContext) {
  return {
    type: constants.LOAD_POC_PART3_SUCCESS,
    pocPart3,
    dataId,
    clientId,
    capCategorys,
    caps,
    prioritys,
    problems,
    problemOtherId,
    goals,
    goalOtherId,
    interventions,
    interventionOtherId,
    owners,
    haveDateCloseds,
    haveDateClosedTbdId,
    securityContext
  };
}

export function refreshPlayGroundSharedPlanning(sharedPlanning) {
  return {type: constants.CHANGE_PLAYGROUND_SHARED_PLANNING, sharedPlanning};
}

export function editPlayGroundSharedPlanning(sharedPlanning,index) {
  return {type: constants.EDIT_PLAYGROUND_SHARED_PLANNING, sharedPlanning,index};
}
