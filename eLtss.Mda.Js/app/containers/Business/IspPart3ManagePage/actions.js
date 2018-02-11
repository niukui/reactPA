import * as constants from './constants';

export function loadIspPart3(dataId, clientId, prefix) {
  return {type: constants.LOAD_ISP_PART3, dataId, clientId, prefix};
}

export function ispPart3Loaded(ispPart3, dataId, clientId, lifeAreas, supportTypes, assignedProviders, securityContext) {
  return {
    type: constants.LOAD_ISP_PART3_SUCCESS,
    ispPart3,
    dataId,
    clientId,
    lifeAreas,
    supportTypes,
    assignedProviders,
    securityContext
  };
}
export function formValidated(errors) {
  return {type: constants.FORM_VALIDATED, errors};
}
export function createSharedPlanning(sharedPlanning, ispId, ispPart3, prefix) {
  return {type: constants.CREATE_SHARED_PLANNING, sharedPlanning, ispId, ispPart3, prefix};
}

export function updateSharedPlanning(sharedPlanning, ispId, ispPart3, prefix) {
  return {type: constants.UPDATE_SHARED_PLANNING, sharedPlanning, ispId, ispPart3, prefix};
}

export function sharedPlanningSaved(sharedPlanning, sharedPlannings) {
  return {type: constants.SAVE_SHARED_PLANNING_SUCCESS, sharedPlanning, sharedPlannings};
}

export function changeSharedPlanningForm(name, value) {
  return {type: constants.CHANGE_SHARED_PLANNING_FORM, name, value};
}

export function deleteIspPart3Item(ispPart3Item, ispId, ispPart3, prefix) {
  return {type: constants.DELETE_ISP_PART3_ITEM, ispPart3Item, ispId, ispPart3, prefix};
}

export function IspPart3ItemDeleted(ispPart3Item, part3s) {
  return {type: constants.DELETE_ISP_PART3_ITEM_SUCCESS, ispPart3Item, part3s};
}

export function refreshPlayGroundSharedPlanning(sharedPlanning) {
  return {type: constants.CHANGE_PLAYGROUND_SHARED_PLANNING, sharedPlanning};
}

export function startSharedPlanningEditing() {
  return {type: constants.SWITCH_TO_EDIT_MODE};
}

export function startSharedPlanningCreating() {
  return {type: constants.SWITCH_TO_CREATE_MODE};
}

export function startSharedPlanningDeleting(sharedPlanning) {
  return {type: constants.SHARED_PLANNING_START_DELETING, sharedPlanning};
}

export function sharedPlanningDeletingConfirmed() {
  return {type: constants.SHARED_PLANNING_DELETING_CONFIRMED};
}

export function loadSharedPlanningAuditTrials(ispId) {
  return {type: constants.LOAD_SHARED_PLANNING_AUDIT_TRIALS, ispId};
}

export function sharedPlanningAuditTrialsLoaded(auditTrails) {
  return {type: constants.LOAD_SHARED_PLANNING_AUDIT_TRIALS_SUCCESS, auditTrails};
}
