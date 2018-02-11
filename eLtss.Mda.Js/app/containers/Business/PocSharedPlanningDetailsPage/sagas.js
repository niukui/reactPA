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

export function * pocPart3() {
  yield takeEvery(constants.LOAD_POC_PART3, getPocPart3);
}

export default[pocPart3];
