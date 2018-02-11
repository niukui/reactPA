import { takeLatest, takeEvery } from 'redux-saga';
import { take, call, put, fork } from 'redux-saga/effects';
import requestApi from 'utils/requestApi';
import * as constants from '../../constants';
import * as actions from '../../actions';
import { HOST } from 'config';
import { browserHistory } from 'react-router';
import path from 'path';
import lodash from 'lodash';
import toastr from "utils/toastr";

export function * addGeneralEvent(action) {
  const requestURL = `${HOST}/IndividualPlanningCalendars/IndividualPlanningCalendar/AddGeneralEvent`;
  try {
    let formData = new FormData();
    let activity = action.activity;
    formData.append("dataId", action.dataId);
    formData.append("sectionJson", JSON.stringify(activity));
    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      body: formData
    });
    lodash.set(activity, "Id", result.DataObject.Id);
    yield put(actions.addGeneralEventSuccess(action.dataId, activity));
  } catch (err) {
    toastr.error(err);
  }
}

export function * editGeneralEvent(action) {
  const requestURL = `${HOST}/IndividualPlanningCalendars/IndividualPlanningCalendar/EditGeneralEvent`;
  try {
    let formData = new FormData();
    formData.append("dataId", action.dataId);
    formData.append("sectionJson", JSON.stringify(action.activity));
    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      body: formData
    });
    yield put(actions.editGeneralEventSuccess(action.dataId, action.activity));
  } catch (err) {
    toastr.error(err);
  }
}

export function * deleteGeneralEvent(action) {
  const requestURL = `${HOST}/IndividualPlanningCalendars/IndividualPlanningCalendar/DeleteGeneralEvent`;
  try {
    let formData = new FormData();
    formData.append("dataId", action.dataId);
    formData.append("generalEventId", action.generalEventId);
    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      body: formData
    });
    yield put(actions.deleteGeneralEventSuccess(action.dataId, action.generalEventId));
  } catch (err) {
    toastr.error(err);
  }
}
