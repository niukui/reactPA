import * as constants from './constants';

export function loadListPage(moduleName, clientId) {
  return {type: constants.LOAD_LIST, moduleName, clientId};
}

export function listPageLoaded(clientId, data, listModel, metadata) {
  return {type: constants.LOAD_LIST_SUCCESS, clientId, data, listModel, metadata};
}

export function OnSearch(moduleName, searchCriteria) {
  return {type: constants.ON_SEARCH, moduleName, searchCriteria};
}

export function OnSearchSuccess(clientId, data, metadata) {
  return {type: constants.ON_SEARCH_SUCCESS, clientId, data, metadata};
}

export function preCreate (moduleName, clientId, navigateTo){
    return {type: constants.LOAD_PRE_CREATE_MODEL, moduleName, clientId, navigateTo};
}

export function preCreate_Success(data, metadata){
    return {type: constants.PRE_CREATE_MODEL_LOAD_SUCCESS, data, metadata};
}

export function addToOutreachQueue(clientId){
  return {type: constants.ADD_TO_OUTREACH_QUEUE,clientId}
}