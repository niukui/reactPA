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
export function formValidated(errors) {
  return {type: constants.FORM_VALIDATED, errors};
}
export function createSharedPlanning(sharedPlanning, pocId, pocPart3, prefix) {
  return {type: constants.CREATE_SHARED_PLANNING, sharedPlanning, pocId, pocPart3, prefix};
}

export function updateSharedPlanning(sharedPlanning, pocId, pocPart3, prefix) {
  return {type: constants.UPDATE_SHARED_PLANNING_DELETE, sharedPlanning, pocId, pocPart3, prefix};
}

export function sharedPlanningSaved( sharedPlannings) {
  return {type: constants.SAVE_SHARED_PLANNING_SUCCESS,  sharedPlannings};
}

export function changeSharedPlanningForm(name, value) {
  return {type: constants.CHANGE_SHARED_PLANNING_FORM, name, value};
}

export function deletePocPart3Item(pocPart3Item, pocPart3) {
  return {type: constants.DELETE_POC_PART3_ITEM, pocPart3Item, pocPart3};
}

export function PocPart3ItemDeleted(pocPart3Item, part3s) {
  return {type: constants.DELETE_POC_PART3_ITEM_SUCCESS, pocPart3Item, part3s};
}

export function refreshPlayGroundSharedPlanning(sharedPlanning) {
  return {type: constants.CHANGE_PLAYGROUND_SHARED_PLANNING, sharedPlanning};
}

export function editPlayGroundSharedPlanning(sharedPlanning,index) {
  return {type: constants.EDIT_PLAYGROUND_SHARED_PLANNING, sharedPlanning,index};
}

export function startSharedPlanningEditing() {
  return {type: constants.SWITCH_TO_EDIT_MODE};
}

export function startSharedPlanningCreating() {
  return {type: constants.SWITCH_TO_CREATE_MODE};
}

export function startSharedPlanningDeleting(sharedPlanning,index) {
  return {type: constants.SHARED_PLANNING_START_DELETING, sharedPlanning, index};
}

export function sharedPlanningDeletingConfirmed() {
  return {type: constants.SHARED_PLANNING_DELETING_CONFIRMED};
}

export function addSharedPlanningForm(name, value) {
  return {type: constants.ADD_SHARED_PLANNING_FORM, name, value};
}

export function saveSharedPlannings(dataId,clientId,pocPart3,redirectTo, prefix) {
  return {type: constants.SAVE_SHARED_PLANNINGS,dataId,clientId,pocPart3,redirectTo,prefix};
}

export function sharedPlanningsSaved(dataId, clientId, redirectTo,prefix) {
  return {type: constants.SAVE_SHARED_PLANNINGS_SUCCESS, dataId, clientId, redirectTo,prefix};
}
export function saveSharedPlanningForm() {
  return {type: constants.SAVE_SHARED_PLANNING_FORM};
}