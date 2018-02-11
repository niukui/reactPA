import {takeLatest, takeEvery} from 'redux-saga';
import {take, call, put, fork, cancel} from 'redux-saga/effects';
import {browserHistory} from 'react-router';
import requestApi from 'utils/requestApi';
import * as constants from './constants';
import * as actions from './actions';
import { combineUrlByQuery } from 'config';
import path from "path";
import toastr from "utils/toastr";
import getMetadataFromCache from 'services/metadataServices';
import lodash from 'lodash';
import { create } from 'domain';
import {HOST} from 'config';

export function * loadListPage(action) {
  const moduleName = action.moduleName;
  const metadata = yield call(getMetadataFromCache, moduleName);
  const query = {
    clientId:action.clientId
  };
  const requestURL = combineUrlByQuery(metadata.Options.Prefix, metadata.Options.LoadListAction, query);
  
  try {
    const listModel = yield call(requestApi, requestURL, {credentials: 'include'});
    yield put(actions.listPageLoaded(action.clientId, listModel.DataObject && listModel.DataObject.ListItems || [], listModel, metadata));
  } catch (err) {
    console.log(err);
    console.log("loadListPage");  
    toastr.error(err);
  }
}

export function * onSearch(action) {
  try {
    const moduleName = action.moduleName;
    const metadata = yield call(getMetadataFromCache, moduleName);
    const queryClient = {
      clientId:action.clientId
    };
    let requestURL = combineUrlByQuery(metadata.Options.Prefix, metadata.Options.OnSearchAction, queryClient);
    let query = Object.assign({moduleName}, action.searchCriteria);
    lodash.mapKeys(action.searchCriteria, (value, key) => {
      if (value !== null) {
        if (!requestURL.endsWith('?')) {
          requestURL += "&";
        }
        requestURL += key;
        requestURL += "=";
        if (typeof value === 'object' && value.Id) {
          requestURL += value.Id;
          lodash.set(query, key, value.Id);
        } else if (typeof value === 'object' && value.Value) {
          requestURL += value.Value;
          lodash.set(query, key, value.Value);
        }
        else {
          requestURL += value;
        }
      }
    });

    const currentLocation = browserHistory.getCurrentLocation();
    yield call(browserHistory.push, {
      pathname: currentLocation.pathname,
      query: query
    });

    const data = yield call(requestApi, requestURL, {credentials: 'include'});
    yield put(actions.OnSearchSuccess(action.clientId, data && data.DataObject && data.DataObject.ListItems || [], metadata));
  } catch (err) {
    console.log(err);
    console.log("onSearch");  
    toastr.error(err);
  }
}

export function * preCreate(action) {
  const moduleName = action.moduleName || DEFAULT_MODULE;
  if (moduleName) {
    try {
      const metadata = yield call(getMetadataFromCache, moduleName);
      const url = `${action.navigateTo.pathname}?clientId=${action.clientId}&moduleName=${action.moduleName}&sectionName=${action.navigateTo.query.sectionName}`;
;
      if (metadata.Options.PreCreate) {
        const query = {
          clientId:action.clientId
        };
        const requestURL = combineUrlByQuery(metadata.Options.Prefix, metadata.Options.PreCreate, query);
        let data = yield call(requestApi, requestURL, {credentials: 'include'});        
        yield browserHistory.push(url); 
      } else {
        yield browserHistory.push(url);
      }
    } catch (err) {
      toastr.error(err);
    }
  } else {
    toastr.error("missing module name");
  }
}

export function * addToOutreachQueue(action){
  const requestURL = `${HOST}/Outreach/OutreachQueue/AddToOutreachQueue?clientId=${action.clientId}`;
  const response = yield call(requestApi, requestURL, { credentials: 'include' });
  const url = `${HOST}/Outreach/OutreachSummary/Index/summary?clientId=${action.clientId}&dataId=${response.Data}&moduleName=OutreachSummary`;
  yield browserHistory.push(url)
}

function * listPage() {
  yield takeLatest(constants.LOAD_LIST, loadListPage);
  yield takeLatest(constants.LOAD_PRE_CREATE_MODEL, preCreate);
  yield takeLatest(constants.ON_SEARCH, onSearch);
  yield takeLatest(constants.ADD_TO_OUTREACH_QUEUE,addToOutreachQueue);
}

export default[listPage];
