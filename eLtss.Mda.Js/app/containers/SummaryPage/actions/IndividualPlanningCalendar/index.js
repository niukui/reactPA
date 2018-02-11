import * as constants from '../../constants';
export function addGeneralEvent(dataId, activity) {
  return {type: constants.ADD_GENERAL_EVENT, dataId, activity};
}
export function editGeneralEvent(dataId, activity) {
  return {type: constants.EDIT_GENERAL_EVENT, dataId, activity};
}
export function deleteGeneralEvent(dataId, generalEventId) {
  return {type: constants.DELETE_GENERAL_EVENT, dataId, generalEventId};
}
export function addGeneralEventSuccess(dataId, activity) {
  return {type: constants.ADD_GENERAL_EVENT_SUCCESS, dataId, activity};
}
export function editGeneralEventSuccess(dataId, activity) {
  return {type: constants.EDIT_GENERAL_EVENT_SUCCESS, dataId, activity};
}
export function deleteGeneralEventSuccess(dataId, generalEventId) {
  return {type: constants.DELETE_GENERAL_EVENT_SUCCESS, dataId, generalEventId};
}