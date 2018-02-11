import {take, call, put, fork} from 'redux-saga/effects';
import {calculateSectionsStatus} from 'services/completionStatusService';
import lodash from 'lodash';
import requestApi from 'utils/requestApi';
import {HOST, DEFAULT_MODULE} from 'config';

export function LoadPreProcessISP(dataId, data, metadata) {
  let entityData = data.DataObject[metadata.Name];
  if (!entityData) {
    return;
  }
  if (!entityData.EssentialInformation && entityData.EssentialInformationJson) {
    lodash.set(entityData, "EssentialInformation", JSON.parse(entityData.EssentialInformationJson));
    lodash.set(entityData, "EssentialInformationJson", null);
  }

  if (!entityData.PersonalProfile && entityData.PersonalProfileJson) {
    lodash.set(entityData, "PersonalProfile", JSON.parse(entityData.PersonalProfileJson));
    lodash.set(entityData, "PersonalProfileJson", null);
  }
  if (!entityData.CompletionStatus && entityData.CompletionStatusJson) {
    lodash.set(entityData, "CompletionStatus", JSON.parse(entityData.CompletionStatusJson));
    lodash.set(entityData, "CompletionStatusJson", null);
  }

  let completionStatus = lodash.get(entityData, 'CompletionStatus');

  completionStatus = calculateSectionsStatus(entityData, metadata);
  lodash.set(entityData, 'CompletionStatus', completionStatus);
}
export function LoadPreProcessPOC(dataId, data, metadata) {
  let entityData = data.DataObject[metadata.Name];
  if (!entityData) {
    return;
  }
  if (!entityData.EssentialInformation && entityData.EssentialInformationJson) {
    lodash.set(entityData, "EssentialInformation", JSON.parse(entityData.EssentialInformationJson));
    lodash.set(entityData, "EssentialInformationJson", null);
  }
  
  if (!entityData.PersonalProfile && entityData.PersonalProfileJson) {
    lodash.set(entityData, "PersonalProfile", JSON.parse(entityData.PersonalProfileJson));
    lodash.set(entityData, "PersonalProfileJson", null);
  }

  if (!entityData.Agreement.ServicesSatisfactionSurvey && entityData.Agreement.ServicesSatisfactionSurveyJson) {
    lodash.set(entityData.Agreement, "ServicesSatisfactionSurvey", JSON.parse(entityData.Agreement.ServicesSatisfactionSurveyJson));
    lodash.set(entityData.Agreement, "ServicesSatisfactionSurveyJson", null);
  }

  if (!entityData.CompletionStatus && entityData.CompletionStatusJson) {
    lodash.set(entityData, "CompletionStatus", JSON.parse(entityData.CompletionStatusJson));
    lodash.set(entityData, "CompletionStatusJson", null);
  }

  let completionStatus = lodash.get(entityData, 'CompletionStatus');

  completionStatus = calculateSectionsStatus(entityData, metadata);
  lodash.set(entityData, 'CompletionStatus', completionStatus);
}
export function * LoadPostProcessISP(dataId, data, metadata, actions, constants) {
  const actionList = constants
    .CHANGE_HISTORY_ACTIONS
    .join();
    let entityData = data.DataObject[metadata.Name];
    entityData.FormNotes=entityData.IspFormNotes;

  const auditTrailRequestURL = `${HOST}/AuditTrail/FindDomainAuditTrailsByActions?documentId=${dataId}&actions=${actionList}`;
  const planForSupportURL = `${HOST + metadata.Options.Prefix}/GetPlanForSupportList?ispId=${dataId}`;
  const planForSupports = yield call(requestApi, planForSupportURL, {credentials: 'include'});
  yield put(actions.planForSupportsLoaded(planForSupports.DataObject));
  const auditTrails = yield call(requestApi, auditTrailRequestURL, {credentials: 'include'});
  yield put(actions.summaryAuditTrailsLoaded(auditTrails.DomainAuditTrails));
}

export function * LoadPostProcessPOC(dataId, data, metadata, actions, constants) {
  const actionList = constants
    .POC_CHANGE_HISTORY_ACTIONS
    .join();

  const auditTrailRequestURL = `${HOST}/PlanOfCares/PlanOfCare/FindDomainAuditTrailsByActions?documentId=${dataId}&actions=${actionList}`;
  const auditTrails = yield call(requestApi, auditTrailRequestURL, {credentials: 'include'});
  yield put(actions.summaryAuditTrailsLoaded(auditTrails.DomainAuditTrails));
}
