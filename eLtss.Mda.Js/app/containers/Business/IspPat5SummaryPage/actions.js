import * as constants from './constants';

export function initComponentsRefState(ispPart5, metadata) {
  return {type: constants.INIT_COMPONENTS_REF_STATE, metadata, ispPart5};
}

export function loadIspPart5Summary(parentDataId, dataId, clientId, metadata) {
  return {type: constants.LOAD_ISP_PART5_SUMMARY, parentDataId, dataId, clientId, metadata};
}

export function ispSummaryPart5Loaded(ispPart5Summary) {
  return {type: constants.LOAD_ISP_PART5_SUMMARY_SUCCESS,ispPart5Summary};
}
export function addGeneralScheduleSupport(planForSupportId, activity, metadata) {
  return {type: constants.ADD_GENERAL_SCHEDULE_SUPPORT, planForSupportId, activity, metadata};
}
export function editGeneralScheduleSupport(planForSupportId, activity, metadata) {
  return {type: constants.EDIT_GENERAL_SCHEDULE_SUPPORT, planForSupportId, activity, metadata};
}
export function deleteGeneralScheduleSupport(planForSupportId, generalScheduleSupportId, currentListCount, metadata) {
  return {type: constants.DELETE_GENERAL_SCHEDULE_SUPPORT, planForSupportId, generalScheduleSupportId, currentListCount, metadata};
}
export function addGeneralScheduleSupportSuccess(planForSupportId, activity) {
  return {type: constants.ADD_GENERAL_SCHEDULE_SUPPORT_SUCCESS, planForSupportId, activity};
}
export function editGeneralScheduleSupportSuccess(planForSupportId, activity) {
  return {type: constants.EDIT_GENERAL_SCHEDULE_SUPPORT_SUCCESS, planForSupportId, activity};
}
export function deleteGeneralScheduleSupportSuccess(planForSupportId, generalScheduleSupportId) {
  return {type: constants.DELETE_GENERAL_SCHEDULE_SUPPORT_SUCCESS, planForSupportId, generalScheduleSupportId};
}
export function editGeneralScheduleSupportComment(planForSupportId, comment, metadata) {
  return {type: constants.EDIT_GENERAL_SCHEDULE_SUPPORT_COMMENT, planForSupportId, comment, metadata};
}
export function editGeneralScheduleSupportCommentSuccess(planForSupportId, comment) {
  return {type: constants.EDIT_GENERAL_SCHEDULE_SUPPORT_COMMENT_SUCCESS, planForSupportId, comment};
}

export function triggerWorkflowEventPlanForSupport(workflowEvent, id,ispId,clientId, comment, metadata) {
  return {type: constants.TRIGGER_WORKFLOW_EVENT_PLAN_FOR_SUPPORT, workflowEvent, id, ispId, clientId,comment, metadata};
}

export function triggerWorkflowEventPlanForSupportSuccess(workflowEvent, planForSupport) {
  return {type: constants.TRIGGER_WORKFLOW_EVENT_PLAN_FOR_SUPPORT_SUCCESS, workflowEvent, planForSupport};
}

export function revisePlanForSupport(planId, clientId, ispId, metadata) {
  return {type: constants.REVISE_PLAN_FOR_SUPPORT, planId, clientId, ispId, metadata};
}

export function revisePlanForSupportSuccess(planId, clientId, ispId) {
  return {type: constants.REVISE_PLAN_FOR_SUPPORT_SUCCESS, planId, clientId, ispId};
}

