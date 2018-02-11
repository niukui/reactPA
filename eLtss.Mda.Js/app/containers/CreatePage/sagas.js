import {takeLatest, takeEvery} from 'redux-saga';
import {take, call, put, fork} from 'redux-saga/effects';
import requestApi from 'utils/requestApi';
import * as constants from './constants';
import * as actions from './actions';
import { DEFAULT_MODULE,  getRoutePrefix,  combineUrlByQuery} from 'config';
import {browserHistory} from 'react-router';
import path from 'path';
import lodash from 'lodash';
import {calculateSectionsStatus} from 'services/completionStatusService';
import toastr from "utils/toastr";
import {ISP_WORKFLOW_STATUS} from 'utils/constants';
import getMetadataFromCache from 'services/metadataServices';

export function * preCreate(action) {
  let moduleName = action.moduleName || DEFAULT_MODULE;
  if (moduleName) {
    try {
      const metadata = yield call(getMetadataFromCache, moduleName);
      if (metadata.Options.PreCreate) {
        const query = {
          clientId:action.clientId
        };
        const requestURL = combineUrlByQuery(metadata.Options.Prefix, metadata.Options.PreCreate, query);
        let data = yield call(requestApi, requestURL, {credentials: 'include'});
        yield put(actions.preCreate_Success(data, metadata));
      } else {
        yield put(actions.preCreate_Success({}, metadata));
      }
    } catch (err) {
      toastr.error(err);
    }
  } else {
    toastr.error("missing module name");
  }
}

export function * create(action) {
  let moduleName = action.moduleName
    ? action.moduleName
    : DEFAULT_MODULE;
  if (moduleName) {
    try {
      const query = {
        clientId:action.clientId
      };
      const metadata = yield call(getMetadataFromCache, moduleName);
      const requestURL = combineUrlByQuery(metadata.Options.Prefix, metadata.Options.CreateAction, query);
      let formData = new FormData();
      formData.append("sectionJson", JSON.stringify(action.data[action.section] || action.data));

      const result = yield call(requestApi, requestURL, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      yield put(actions.create_Success(metadata, result.DataObject, action.clientId))
    } catch (err) {
      toastr.error(err);
    }
  } else {
    toastr.error("missing module name");
  }
}

export function * createdSuccess(action) {

  const moduleName = action.metadata.ModuleName || action.metadata.Name;
  const prefix = getRoutePrefix(action.metadata.Options.Prefix);

  const query = {
    dataId: action.dataId,
    moduleName: moduleName,
    clientId: action.clientId
  };

  yield call(browserHistory.push, {
    pathname: path.resolve(prefix, 'summary'),
    query
  });
}

export function * createPage() {
  yield takeEvery(constants.LOAD_PRE_CREATE_MODEL, preCreate);
  yield takeEvery(constants.SAVE_MODEL, create);
  yield takeEvery(constants.SAVE_MODEL_SUCCESS, createdSuccess);
}

export default[createPage];