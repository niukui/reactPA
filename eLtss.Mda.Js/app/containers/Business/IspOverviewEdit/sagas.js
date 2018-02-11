import {takeLatest} from 'redux-saga';
import {browserHistory} from 'react-router';
import {call, put} from 'redux-saga/effects';
import requestApi from 'utils/requestApi';
import {LOAD_ISP_OVERVIEW, SAVE_ISP_OVERVIEW, CHANGE_ISP_OVERVIEW_FORM, SAVE_ISP_OVERVIEW_SUCCESS} from './constants';
import {ispOverviewLoaded, overviewFormChanged, ispOverviewSaved} from './actions';
import {HOST, getRoutePrefix, combineUrlByQuery} from 'config';
import path from "path";
import toastr from "utils/toastr";

export function * redirectToSummary(action) {
  const metadata = action.metadata;
  const query = {
    dataId: action.entityData.Id,
    clientId: action.entityData.ClientId,
    moduleName: metadata.Name
  };
  
  const prefix = getRoutePrefix(metadata.Options.Prefix);
  yield call(browserHistory.push, {
    pathname: path.resolve(prefix, 'summary'),
    query
  });
}

export function * loadIspOverview(action) {

  try {
    const query = {
      id:action.dataId
    };
    const metadata = action.metadata;
    const requestURL = combineUrlByQuery(metadata.Options.Prefix, metadata.Options.GetOverviewModelAction, query);
    const result = yield call(requestApi, requestURL, {credentials: 'include'});

    yield put(ispOverviewLoaded(result.DataObject));
  } catch (err) {
    toastr.error(err);
  }
}

export function * saveIspOverview(action) {
  
  try {
    const metadata = action.metadata;
    const requestURL = combineUrlByQuery(metadata.Options.Prefix, metadata.Options.SaveOverviewAction);
   
    let formData = new FormData();
    formData.append("ispJson", JSON.stringify(action.entityData));
    const isp = yield call(requestApi, requestURL, {
      method: 'POST',
      body: formData
    });
    yield put(ispOverviewSaved(action.entityData, metadata));

  } catch (err) {
    toastr.error(err);

  }
}

export function * updateIspOverview(action) {
  const evt = action.event;
  try {
    const changedValueSet = {
      path: evt.target.name,
      value: evt.target.value
    };
    yield put(overviewFormChanged(changedValueSet));
  } catch (err) {
    toastr.error(err);
  }
}

function * ispOverview() {
  yield takeLatest(LOAD_ISP_OVERVIEW, loadIspOverview);
  yield takeLatest(SAVE_ISP_OVERVIEW, saveIspOverview);
  yield takeLatest(CHANGE_ISP_OVERVIEW_FORM, updateIspOverview);
  yield takeLatest(SAVE_ISP_OVERVIEW_SUCCESS, redirectToSummary);
}

export default[ispOverview];
