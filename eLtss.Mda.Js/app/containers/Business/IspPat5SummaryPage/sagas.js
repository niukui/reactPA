import {takeLatest, takeEvery} from 'redux-saga';
import {take, call, put, fork} from 'redux-saga/effects';
import requestApi from 'utils/requestApi';
import toastr from "utils/toastr";
import {getRoutePrefix, combineUrlByQuery} from 'config';
import getMetadataFromCache from 'services/metadataServices';
import * as constants from './constants';
import * as actions from './actions';
import lodash from "lodash";
import {COMPLETION_STATUSES, calculateSectionsStatus} from 'services/completionStatusService';
import {browserHistory} from 'react-router';
import path from 'path';

export function * getIspPart5Summary(action) {
  const parentDataId = action.parentDataId;
  const dataId = action.dataId;
  const clientId = action.clientId;

  try {

    const query = {
      parentDataId,
      dataId,
      clientId
    }

    const metadata = action.metadata;

    const requestURL = combineUrlByQuery(metadata.Options.Prefix, metadata.Options.LoadAction, query);
    const model = yield call(requestApi, requestURL, {credentials: 'include'});
    let ispPart5 = {};

    if (model && model.DataObject) {
      ispPart5 = lodash.cloneDeep(model.DataObject);
      if (ispPart5.PlanForSupport) {
        if (!ispPart5.PlanForSupport.CompletionStatus && ispPart5.PlanForSupport.CompletionStatusJson) {
          lodash.set(ispPart5.PlanForSupport, "CompletionStatus", JSON.parse(ispPart5.PlanForSupport.CompletionStatusJson));
          lodash.set(ispPart5.PlanForSupport, "CompletionStatusJson", null);
        }
      }
      let completionStatus = lodash.get(ispPart5, 'PlanForSupport.CompletionStatus');
      if (!completionStatus || !completionStatus.Signatures) {
        completionStatus = calculateSectionsStatus(ispPart5, action.metadata, true);
        lodash.set(ispPart5, 'PlanForSupport.CompletionStatus', completionStatus);
      }
    }

    yield put(actions.ispSummaryPart5Loaded(ispPart5));
    yield put(actions.initComponentsRefState(ispPart5, action.metadata));
  } catch (err) {
    console.log(err);
    toastr.error(err);
  }
}
export function * addGeneralScheduleSupport(action) {
  try {
    const metadata = action.metadata;
    const requestURL = combineUrlByQuery(metadata.Options.Prefix, metadata.Options.AddGeneralScheduleSupportAction);
    let formData = new FormData();
    let activity = action.activity;
    let completionStatus = {
      'GeneralScheduleSupports': COMPLETION_STATUSES.Complete
    };
    formData.append("planForSupportId", action.planForSupportId);
    formData.append("sectionJson", JSON.stringify(activity));
    formData.append("completionStatusJson", JSON.stringify(completionStatus));
    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      body: formData
    });
    lodash.set(activity, "Id", result.DataObject);
    yield put(actions.addGeneralScheduleSupportSuccess(action.planForSupportId, activity));
  } catch (err) {
    toastr.error(err);
  }
}
export function * editGeneralScheduleSupport(action) {
   try {
    const metadata = action.metadata;
    const requestURL = combineUrlByQuery(metadata.Options.Prefix, metadata.Options.EditGeneralScheduleSupportAction);
    let formData = new FormData();
    formData.append("planForSupportId", action.planForSupportId);
    formData.append("sectionJson", JSON.stringify(action.activity));
    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      body: formData
    });
    yield put(actions.editGeneralScheduleSupportSuccess(action.planForSupportId, action.activity));
  } catch (err) {
    toastr.error(err);
  }
}

export function * deleteGeneralScheduleSupport(action) {
  const metadata = action.metadata;
  const requestURL = combineUrlByQuery(metadata.Options.Prefix, metadata.Options.DeleteGeneralScheduleSupportAction);
  try {
    let formData = new FormData();
    let completionStatus = action.currentListCount > 1
      ? {
        'GeneralScheduleSupports': COMPLETION_STATUSES.Complete
      }
      : {
        'GeneralScheduleSupports': COMPLETION_STATUSES.NotStarted
      };
    formData.append("planForSupportId", action.planForSupportId);
    formData.append("generalScheduleSupportId", action.generalScheduleSupportId);
    formData.append("completionStatusJson", JSON.stringify(completionStatus));
    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      body: formData
    });
    yield put(actions.deleteGeneralScheduleSupportSuccess(action.planForSupportId, action.generalScheduleSupportId));
  } catch (err) {
    toastr.error(err);
  }
}
export function * editGeneralScheduleSupportComment(action) {
  try {
    const metadata = action.metadata;
    const requestURL = combineUrlByQuery(metadata.Options.Prefix, metadata.Options.EditGeneralScheduleSupportCommentAction);
    let formData = new FormData();
    formData.append("planForSupportId", action.planForSupportId);
    formData.append("comment", action.comment);
    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      body: formData
    });
    yield put(actions.editGeneralScheduleSupportCommentSuccess(action.planForSupportId, action.comment));
  } catch (err) {
    toastr.error(err);
  }
}

function findWorkflowActions(workflowEvent) {
  const eventControllerActionMap = {
    'complete': 'CompletePlanForSupport',
    'submit': 'ProviderSubmitPlanForSupport',
    'scSubmit': 'ScSubmitPlanForSupport',
    'scApprove': 'ScApprovePlanForSupport',
    'scReject': 'ScRejectPlanForSupport',
    'providerApprove': 'ProviderApprovePlanForSupport',
    'providerReject': 'ProviderRejectPlanForSupport',
    'discard': 'DiscardPlanForSupport'
  };
  return eventControllerActionMap[workflowEvent];
}

export function * triggerWorkflowEventPlanForSupport(action) {
  const controllerAction = findWorkflowActions(action.workflowEvent);
  const metadata = action.metadata;
  const requestURL = combineUrlByQuery(metadata.Options.Prefix, controllerAction);
  const planId = action.id;
  const ispId = action.ispId;
  const clientId = action.clientId;
  const comment = action.comment;
  try {
    let formData = new FormData();
    formData.append("id", planId);
    formData.append("comment", comment);
    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      body: formData
    });
    yield put(actions.triggerWorkflowEventPlanForSupportSuccess(action.workflowEvent, result.DataObject));

  } catch (err) {
    toastr.error(err);
  }
}

export function * revisePlanForSupport(action) {
  const controllerAction = findWorkflowActions(action.workflowEvent);
  const metadata = action.metadata;
  const requestURL = combineUrlByQuery(metadata.Options.Prefix, metadata.Options.RevisePlanForSupportAction);
  const planId = action.planId;
  const ispId = action.ispId;
  const clientId = action.clientId;
  try {
    let formData = new FormData();
    formData.append("planId", planId);
    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      body: formData
    });
    yield put(actions.revisePlanForSupportSuccess(result.DataObject.PlanForSupportId, clientId, ispId));
  } catch (err) {
    toastr.error(err);
  }
}

export function * refreshIspPart5Summary(action) {
  yield call(() => {
    window
      .location
      .reload();
  });
}

export function * redirectToNewIspPart5Summary(action) {
  const query = {
    clientId: action.clientId,
    parentDataId: action.ispId,
    dataId: action.planId,
    moduleName: "PlanForSupport"

  };
  const prefix = getRoutePrefix("/IndividualSupportPlans/IndividualSupportPlan");
  yield call(browserHistory.push, {
    pathname: path.resolve(prefix, 'ispPart5Summary'),
    query
  });
  yield call(() => {
    window
      .location
      .reload();
  });
}

export function * ispPart5() {
  yield takeEvery(constants.LOAD_ISP_PART5_SUMMARY, getIspPart5Summary);
  yield takeEvery(constants.ADD_GENERAL_SCHEDULE_SUPPORT, addGeneralScheduleSupport);
  yield takeEvery(constants.EDIT_GENERAL_SCHEDULE_SUPPORT, editGeneralScheduleSupport);
  yield takeEvery(constants.DELETE_GENERAL_SCHEDULE_SUPPORT, deleteGeneralScheduleSupport);
  yield takeEvery(constants.EDIT_GENERAL_SCHEDULE_SUPPORT_COMMENT, editGeneralScheduleSupportComment);
  yield takeEvery(constants.TRIGGER_WORKFLOW_EVENT_PLAN_FOR_SUPPORT, triggerWorkflowEventPlanForSupport);
  yield takeEvery(constants.TRIGGER_WORKFLOW_EVENT_PLAN_FOR_SUPPORT_SUCCESS, refreshIspPart5Summary);
  yield takeEvery(constants.REVISE_PLAN_FOR_SUPPORT, revisePlanForSupport);
  yield takeEvery(constants.REVISE_PLAN_FOR_SUPPORT_SUCCESS, redirectToNewIspPart5Summary);

}

export default[ispPart5];
