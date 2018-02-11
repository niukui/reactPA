import {call, put} from 'redux-saga/effects';
import requestApi from 'utils/requestApi';
import * as constants from '../../constants';
import * as actions from '../../actions';
import {HOST} from 'config';
import {browserHistory} from 'react-router';
import path from 'path';
import lodash from 'lodash';
import toastr from "utils/toastr";
import {calculateSectionsStatus} from 'services/completionStatusService';
import getMetadataFromCache from 'services/metadataServices';

export function * saveBudgets(action) {
  const requestURL = `${HOST}/SupportsPackages/SupportsPackage/ChangeBudgets`
  try {
    let formData = new FormData();
    formData.append("budgetsJson", JSON.stringify(action.budgets));
    formData.append("dataId", action.id);

    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    yield put(actions.budgetsSaved(result.DataObject));
  } catch (err) {
    toastr.error(err);
  }
}

export function * saveService(action) {
  const requestURL = `${HOST}/SupportsPackages/SupportsPackage/CreateOrUpdateService`;

  try {
    let formData = new FormData();
    formData.append("dataId", action.id);
    formData.append("serviceJson", JSON.stringify(action.service));

    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    yield put(actions.serviceSaved(result.DataObject));
  } catch (err) {
    toastr.error(err);
  }
}

export function * deleteSpService(action) {
  const requestURL = `${HOST}/SupportsPackages/SupportsPackage/RemoveService`;

  try {
    let formData = new FormData();
    formData.append("dataId", action.id);
    formData.append("serviceId", action.serviceId);

    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    yield put(actions.serviceDeleted(result.DataObject));
  } catch (err) {
    toastr.error(err);
  }
}
