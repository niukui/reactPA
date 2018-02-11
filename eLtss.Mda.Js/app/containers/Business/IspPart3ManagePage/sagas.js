import {takeLatest, takeEvery} from 'redux-saga';
import {take, call, put, fork} from 'redux-saga/effects';
import requestApi from 'utils/requestApi';
import * as constants from './constants';
import * as actions from './actions';
import toastr from "toastr";
import {HOST} from 'config';
import {getSharedPlanningStatus} from 'services/completionStatusService';
import lodash from 'lodash';
import {sharedPlanningStatus} from 'components/Business/IspPart3/IspPart3List';

const getEntityNameByDataId = (dataId) => {
  if (dataId.startsWith('individualsupportplan')) {
    return 'IndividualSupportPlan';
  } else {
    return 'PlanOfCare';
  }
}

export function * getIspPart3(action) {
  const dataId = action.dataId;
  const requestURL = `${HOST}${action.prefix}/GetSummaryInfo?dataId=${dataId}&clientId=${action.clientId}`;

  try {
    const response = yield call(requestApi, requestURL, {credentials: 'include'});
    const entityName = getEntityNameByDataId(dataId);
    const entityData = response.DataObject[entityName];
    const securityContext = {
      AccessModel: {},
      CurrentIdentity: response.DataObject.CurrentIdentity,
      WorkflowStatus: entityData.WorkflowStatus,
      EffectiveDateRange: entityData.EffectiveDateRange
    };
    yield put(actions.ispPart3Loaded(entityData.SharedPlannings, dataId, response.DataObject.ClientId, response.DataObject.LifeAreas, response.DataObject.SupportTypes, entityData.AssignedProviders, securityContext));
    yield put(actions.loadSharedPlanningAuditTrials(dataId));
  } catch (err) {
    console.log(err);
    toastr.error(err);
  }
}

export function * createSharedPlanning(action) {
  const ispId = action.ispId;
  const requestURL = `${HOST}${action.prefix}/AddSharedPlanning?ispId=${ispId}`;
  try {
    let sharedPlannings = lodash.cloneDeep(action.ispPart3);
    sharedPlannings.push(action.sharedPlanning);
    const overallStatus = getSharedPlanningStatus(sharedPlannings);
    let completionStatus = {
      'OverallStatus': overallStatus
    };

    let formData = new FormData();
    formData.append("sharedPlanningJson", JSON.stringify(action.sharedPlanning));
    formData.append("completionStatusJson", JSON.stringify(completionStatus) || null);
    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      body: formData
    });

    yield put(actions.sharedPlanningSaved(result.DataObject.SharedPlanning, result.DataObject.SharedPlannings));
    //yield put(actions.loadSharedPlanningAuditTrials(ispId));
  } catch (err) {
    console.log(err);
    console.log("createSharedPlanning");
    toastr.error(err);
  }
}

export function * updateSharedPlanning(action) {
  const ispId = action.ispId;
  const planId = action.sharedPlanning.Id;
  const requestURL = `${HOST}${action.prefix}/EditSharedPlanning?ispId=${ispId}&planId=${planId}`;
  try {

    let sharedPlannings = lodash.cloneDeep(action.ispPart3);
    const index = sharedPlannings.findIndex(x => x.Id === action.sharedPlanning.Id);
    if (index >= 0) {
      sharedPlannings.splice(index, 1, action.sharedPlanning);
    }
    const overallStatus = getSharedPlanningStatus(sharedPlannings);
    let completionStatus = {
      'OverallStatus': overallStatus
    };

    let formData = new FormData();
    formData.append("sharedPlanningJson", JSON.stringify(action.sharedPlanning));
    formData.append("completionStatusJson", JSON.stringify(completionStatus) || null);
    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      body: formData
    });
    yield put(actions.sharedPlanningSaved(result.DataObject));
    yield put(actions.loadSharedPlanningAuditTrials(ispId));

  } catch (err) {
    console.log(err);
    console.log("updateSharedPlanning");
    toastr.error(err);
  }
}

export function * deleteSharedPlanning(action) {

  const ispId = action.ispId;
  const planId = action.ispPart3Item.Id;
  const requestURL = `${HOST}${action.prefix}/DeleteSharedPlanning?ispId=${ispId}&planId=${planId}`;
  try {

    const sharedPlannings = lodash.cloneDeep(action.ispPart3);
    let theDeleteOne = lodash.find(sharedPlannings, {'Id': planId});

    if (theDeleteOne) {
      theDeleteOne.Status = sharedPlanningStatus.Discarded;
    }
    const overallStatus = getSharedPlanningStatus(sharedPlannings);
    let completionStatus = {
      'OverallStatus': overallStatus
    };

    let formData = new FormData();
    formData.append("completionStatusJson", JSON.stringify(completionStatus) || null);
    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      body: formData
    });
    yield put(actions.IspPart3ItemDeleted(action.ispPart3Item, result.DataObject));
    yield put(actions.loadSharedPlanningAuditTrials(ispId));

  } catch (err) {
    console.log(err);
    toastr.error(err);
  }
}

export function * loadSharedPlanningAuditTrialsFromServer(action) {
  const ispId = action.ispId;
  const actionList = constants.SHARED_PLANNING_CHANGE_HISTORY_ACTIONS.join();
  const auditTrailRequestURL = `${HOST}/AuditTrail/FindDomainAuditTrailsByActions?documentId=${ispId}&actions=${actionList}`;
  try {
    const auditTrails = yield call(requestApi, auditTrailRequestURL, {credentials: 'include'});
    yield put(actions.sharedPlanningAuditTrialsLoaded(auditTrails.DomainAuditTrails || []));
  } catch (err) {
    toastr.error(err);
  }
}

export function * ispPart3() {
  yield takeEvery(constants.LOAD_ISP_PART3, getIspPart3);
  yield takeEvery(constants.CREATE_SHARED_PLANNING, createSharedPlanning);
  yield takeEvery(constants.UPDATE_SHARED_PLANNING, updateSharedPlanning);
  yield takeEvery(constants.DELETE_ISP_PART3_ITEM, deleteSharedPlanning);
  yield takeEvery(constants.LOAD_SHARED_PLANNING_AUDIT_TRIALS, loadSharedPlanningAuditTrialsFromServer);
}

export default[ispPart3];
