import { takeLatest, takeEvery } from 'redux-saga';
import * as constants from '../constants';
import * as actions from '../actions';
import * as general from './General'
import * as isp from './IndividualSupportPlan'
import * as ipc from './IndividualPlanningCalendar'
import * as sp from './SupportsPackage'
import * as poc from './PlanOfCare'

export function* summary() {
  yield takeLatest(constants.LOAD_SUMMARY, general.loadSummary);
  yield takeLatest(constants.PRE_PROCESS_EVENT, general.preProcessEvent);
  yield takeLatest(constants.PROCESS_EVENT, general.processEvent);
  yield takeLatest(constants.ADD_FORM_NOTE, general.addFormNote);
  yield takeLatest(constants.DELETE_FORM_NOTE, general.deleteFormNote);
  yield takeLatest(constants.UPLOAD_ATTACHMENT, general.uploadAttachment);
  yield takeLatest(constants.DELETE_ATTACHMENT, general.deleteAttachment);

  
  yield takeLatest(constants.ADD_PLAN_FOR_SUPPORT, isp.addPlanForSupport);
  yield takeLatest(constants.REDIRECT_TO_PLAN_FOR_SUPPORT_SUMMARY, isp.redirectToPlanForSupportSummaryPage);
  yield takeLatest(constants.SEARCH_PROVIDERS, isp.searchProviders);
  yield takeLatest(constants.SELECT_PROVIDER, isp.selectProvider);
  yield takeLatest(constants.DELETE_PROVIDER, isp.deleteProvider);
  
  yield takeLatest(constants.SAVE_SERVICE, sp.saveService);
  yield takeLatest(constants.DELETE_SERVICE, sp.deleteSpService);
  yield takeLatest(constants.SAVE_BUDGETS, sp.saveBudgets);

  yield takeLatest(constants.ADD_GENERAL_EVENT, ipc.addGeneralEvent);
  yield takeLatest(constants.EDIT_GENERAL_EVENT, ipc.editGeneralEvent);
  yield takeLatest(constants.DELETE_GENERAL_EVENT, ipc.deleteGeneralEvent);
}

export default [summary];