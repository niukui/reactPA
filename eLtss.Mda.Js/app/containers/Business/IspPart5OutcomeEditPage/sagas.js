import {takeEvery} from 'redux-saga';
import {put, call} from 'redux-saga/effects';
import requestApi from 'utils/requestApi';
import toastr from "utils/toastr";
import {getRoutePrefix, combineUrlByQuery} from 'config';
import * as constants from './constants';
import * as actions from './actions';
import lodash from "lodash";
import {browserHistory} from 'react-router';
import path from 'path';
import moment from 'moment';
import {getPart5ServiceAndOutcomeStatus} from 'services/completionStatusService';

export function * getServiceAndOutComes(action) {
  const parentDataId = action.parentDataId;
  const dataId = action.dataId;
  const clientId = action.clientId;

  try {

    const query = {
      parentDataId,
      dataId,
      clientId
    }

    const requestURL = combineUrlByQuery("/IndividualSupportPlans/IndividualSupportPlan", "GetServiceOutcomesSection", query);
    const model = yield call(requestApi, requestURL, {credentials: 'include'});
    let result = model && model.DataObject
      ? lodash.cloneDeep(model.DataObject)
      : {};
    yield put(actions.serviceAndOutComesLoaded({
      'ServiceOutcomes': result.ServiceOutcomes,
      'ProviderName': result.ProviderName,
      'LxServiceId': result.LxServiceId,
      'ServiceName': result.ServiceName,
      'ProviderId': result.ProviderId,
      'ClientId': result.ClientId,
      'EffectiveDate': result.EffectiveDate,
      'IndividualSupportPlanId': result.IndividualSupportPlanId,
      'Id': result.PlanForSupportId,
      'IspEffectiveDate': result.IspEffectiveDate,
      'ServiceAndOutcomesComment': result.ServiceAndOutcomesComment,
      'ParentPlanForSupportId': result.ParentPlanForSupportId,
      'LifeAreas': result.LifeAreas,
      'WorkflowStatus': result.WorkflowStatus
    }, result.ServiceDefinitions, result.SharedPlannings, parentDataId, dataId));
  } catch (err) {
    toastr.error(err);
  }
}

export function * saveServiceAndOutComes(action) {
  const parentDataId = action.parentDataId;
  const dataId = action.dataId;
  const serviceId = action.serviceOutcomes.LxServiceId;
  const effectiveDate = action.serviceOutcomes.EffectiveDate;
  const serviceAndOutcomesComment = action.serviceOutcomes.ServiceAndOutcomesComment;
  const clientId = action.clientId;
  const query = {
      serviceId:serviceId,
      dataId,
      clientId
    }

  const requestURL = combineUrlByQuery("/IndividualSupportPlans/IndividualSupportPlan", "ChangeServiceOutcomes", query);
 
  const serviceOutcomesStatus = getPart5ServiceAndOutcomeStatus(action.serviceOutcomes);
  let completionStatus = {
    'ServiceAndOutcomes': serviceOutcomesStatus
  };
  try {
    window.activateBlockUi && window.activateBlockUi();

    const formData = new FormData();
    formData.append("sectionJson", JSON.stringify(action.serviceOutcomes.ServiceOutcomes));
    formData.append("completionStatusJson", JSON.stringify(completionStatus));
    formData.append("serviceAndOutcomesComment", serviceAndOutcomesComment || '');
    formData.append("effectiveDate", effectiveDate && (effectiveDate.toISOString
      ? effectiveDate.toISOString()
      : moment(effectiveDate).toISOString()));
    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      body: formData
    });

    yield put(actions.serviceAndOutComesSaved(action.serviceOutcomes, clientId, parentDataId, dataId));

    window.deActivateBlockUi && window.deActivateBlockUi();

  } catch (err) {
    window.deActivateBlockUi && window.deActivateBlockUi();
    toastr.error(err);
  }
}

export function * saveServiceOutcomesSuccess(action) {
  const query = {
    clientId: action.clientId,
    parentDataId: action.parentDataId,
    dataId: action.dataId,
    moduleName: "PlanForSupport"

  };
  const prefix = getRoutePrefix("/IndividualSupportPlans/IndividualSupportPlan");
  yield call(browserHistory.push, {
    pathname: path.resolve(prefix, 'ispPart5Summary'),
    query
  });
}

export function * ispPart5Outcome() {
  yield takeEvery(constants.LOAD_SERVICE_AND_OUTCOMES, getServiceAndOutComes);
  yield takeEvery(constants.SAVE_SERVICE_AND_OUTCOMES, saveServiceAndOutComes);
  yield takeEvery(constants.SERVICE_AND_OUTCOMES_SAVED, saveServiceOutcomesSuccess);
}

export default[ispPart5Outcome];
