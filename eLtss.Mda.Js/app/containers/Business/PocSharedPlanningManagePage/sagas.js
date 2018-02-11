import {takeLatest, takeEvery} from 'redux-saga';
import {take, call, put, fork} from 'redux-saga/effects';
import requestApi from 'utils/requestApi';
import * as constants from './constants';
import * as actions from './actions';
import toastr from "toastr";
import {HOST} from 'config';
import lodash from 'lodash';
import {browserHistory} from 'react-router';
import path from "path";
import {getSharedPlanningStatus} from 'services/completionStatusService';
import {getRoutePrefix} from "config";

const getEntityNameByDataId = (dataId) => {
  if (dataId.startsWith('planofcare')) {
    return 'PlanOfCare';
  }
}

export function * getPocPart3(action) {
  const dataId = action.dataId;
  const requestURL = `${HOST}${action.prefix}/GetSharedPlanningSection?dataId=${dataId}&clientId=${action.clientId}`;

  try {
    const response = yield call(requestApi, requestURL, {credentials: 'include'});
    const entityName = getEntityNameByDataId(dataId);
    const entityData = response.DataObject[entityName];
    const securityContext = {
      AccessModel: {},
      CurrentIdentity: response.DataObject.CurrentIdentity,
      WorkflowStatus: entityData.WorkflowStatus
    };
    yield put(actions.pocPart3Loaded(entityData.SharedPlannings, dataId, response.DataObject.ClientId, response.DataObject.CapCategorys, response.DataObject.Caps, response.DataObject.Prioritys, response.DataObject.Problems, response.DataObject.ProblemOtherId, response.DataObject.Goals, response.DataObject.GoalOtherId, response.DataObject.Interventions, response.DataObject.InterventionOtherId, response.DataObject.Owners, response.DataObject.HaveDateCloseds, response.DataObject.HaveDateClosedTbdId, securityContext));
  } catch (err) {
    console.log(err);
    toastr.error(err);
  }
}

export function * createSharedPlanning(action) {
  const pocId = action.pocId;
  const requestURL = `${HOST}${action.prefix}/AddSharedPlanning?pocId=${pocId}`;
  try {
    let sharedPlannings = lodash.cloneDeep(action.pocPart3);
    sharedPlannings.push(action.sharedPlanning);

    let formData = new FormData();
    formData.append("sharedPlanningJson", JSON.stringify(action.sharedPlanning));
    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      body: formData
    });

    yield put(actions.sharedPlanningSaved(result.DataObject.SharedPlanning, result.DataObject.SharedPlannings));
  } catch (err) {
    console.log(err);
    console.log("createSharedPlanning");
    toastr.error(err);
  }
}

export function * updateSharedPlanning(action) {
  const pocId = action.pocId;
  const planId = action.sharedPlanning.Id;

  try {

    let sharedPlannings = lodash.cloneDeep(action.pocPart3);
    const index = sharedPlannings.findIndex(x => x.Id === action.sharedPlanning.Id);
    if (index >= 0) {
      sharedPlannings.splice(index, 1, action.sharedPlanning);
    }

  } catch (err) {
    console.log(err);
    console.log("updateSharedPlanning");
    toastr.error(err);
  }
}

export function * deleteSharedPlanning(action) {

  const pocId = action.pocId;
  const planId = action.pocPart3Item.Id;
  const requestURL = `${HOST}${action.prefix}/DeleteSharedPlanning?pocId=${pocId}&planId=${planId}`;
  try {

    const sharedPlannings = lodash.cloneDeep(action.pocPart3);
    let theDeleteOne = lodash.find(sharedPlannings, {'Id': planId});

    let formData = new FormData();
    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      body: formData
    });
    yield put(actions.PocPart3ItemDeleted(action.pocPart3Item, result.DataObject));

  } catch (err) {
    console.log(err);
    toastr.error(err);
  }
}

export function * saveSharedPlannings(action)
{
  const pocId = action.dataId;
  const requestURL = `${HOST}${action.prefix}/SaveSharedPlannings?pocId=${pocId}`;
  try {
    let formData = new FormData();  
      const overallStatus = getSharedPlanningStatus(action.pocPart3);
    let completionStatus = {
      'OverallStatus': overallStatus
    };
    formData.append("sharedPlanningsJson", JSON.stringify(action.pocPart3));
    formData.append("completionStatusJson", JSON.stringify(completionStatus) || null);
    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      body: formData
    });

    yield put(actions.sharedPlanningsSaved(action.dataId, action.clientId, action.redirectTo, action.prefix));
  } catch (err) {
    console.log(err);
    console.log("saveSharedPlanning");
    toastr.error(err);
  }
}
export function * saveSharedPlanningsSuccess(action) {
  const moduleName = getEntityNameByDataId(action.dataId);
  const prefix = getRoutePrefix(action.prefix);

  if (action.redirectTo) {
    yield call(browserHistory.push, {
      pathname: path.resolve(prefix, action.redirectTo.pathname),
      query: action.redirectTo.query,
      moduleName: moduleName
    });
  } else {
    const query = {
      dataId: action.dataId,
      clientId: action.clientId,
      moduleName: moduleName,
      currentSection: ''
    };
    yield call(browserHistory.push, {
      pathname: path.resolve(prefix, 'summary'),
      query
    });
  }
}

export function * pocPart3() {
  yield takeEvery(constants.LOAD_POC_PART3, getPocPart3);
  yield takeEvery(constants.CREATE_SHARED_PLANNING, createSharedPlanning);
  yield takeEvery(constants.UPDATE_SHARED_PLANNING, updateSharedPlanning);
  yield takeEvery(constants.SAVE_SHARED_PLANNINGS, saveSharedPlannings);
  yield takeEvery(constants.SAVE_SHARED_PLANNINGS_SUCCESS, saveSharedPlanningsSuccess);
  // yield takeEvery(constants.DELETE_POC_PART3_ITEM, deleteSharedPlanning);
}

export default[pocPart3];
