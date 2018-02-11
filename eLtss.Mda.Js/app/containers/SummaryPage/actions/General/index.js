import * as constants from '../../constants';

export function loadSummary(dataId, clientId, moduleName) {
  return {type: constants.LOAD_SUMMARY, dataId, clientId, moduleName};
}
export function summaryLoaded(data, metadata) {
  return {type: constants.LOAD_SUMMARY_SUCCESS, data, metadata};
}
export function printLoaded(printData,printMetadata,printAccessModel)
{
  return {type: constants.LOAD_PRINT_SUCCESS, printData,printMetadata,printAccessModel}
}

export function processEvent(dataId, clientId, moduleName, eventName, hasConfirmation, workflowData,printHTML) {
  return {
    type: constants.PROCESS_EVENT,
    dataId,
    clientId,
    moduleName,
    eventName,
    hasConfirmation,
    workflowData,
    printHTML
  }
}

export function cancelEvent(eventName) {
  return {type: constants.CANCEL_EVENT, eventName}
}

export function eventProcessed(data, eventName, hasConfirmation) {
  return {type: constants.PROCESS_EVENT_SUCCESS, data, eventName, hasConfirmation}
}

export function preProcessEvent(dataId, moduleName, eventName) {
  return {type: constants.PRE_PROCESS_EVENT, dataId, moduleName, eventName}
}

export function preEventProcessed(result, eventName) {
  return {type: constants.PRE_PROCESS_EVENT_SUCCESS, result, eventName}
}

export function initComponentsRefState(data, metadata) {
  return {type: constants.INIT_COMPONENTS_REF_STATE, data, metadata};
}

export function addFormNote(content, accessOuId, isCreatedBySc, dataId, clientId, moduleName) {
  return {
    type: constants.ADD_FORM_NOTE,
    content,
    accessOuId,
    isCreatedBySc,
    dataId,
    clientId,
    moduleName
  };
}

export function formNoteAdded(formNote) {
  return {type: constants.ADD_FORM_NOTE_SUCCESS, formNote};
}

export function deleteFormNote(dataId,formNoteId) {
  return {
    type: constants.DELETE_FORM_NOTE,
    dataId,
    formNoteId
  };
}

export function formNoteDeleted(formNotes) {
  return {type: constants.DELETE_FORM_NOTE_SUCCESS, formNotes};
}

export function uploadAttachment(clientId, dataId, files, category, comment, moduleName) {
  return {
    type: constants.UPLOAD_ATTACHMENT,
    clientId,
    dataId,
    files,
    category,
    comment,
    moduleName
  };
}

export function attachmentUploaded(attachment) {
  return {type: constants.UPLOAD_ATTACHMENT_SUCCESS, attachment};
}

export function deleteAttachment(dataId, attachmentId, clientId, moduleName) {
  return {type: constants.DELETE_ATTACHMENT, dataId, attachmentId, clientId, moduleName};
}

export function attachmentDeleted(attachments) {
  return {type: constants.DELETE_ATTACHMENT_SUCCESS, attachments};
}

export function summaryAuditTrailsLoaded(auditTrails) {
  return {type: constants.LOAD_SUMMARY_AUDIT_TRAILS_SUCCESS, auditTrails};
}
