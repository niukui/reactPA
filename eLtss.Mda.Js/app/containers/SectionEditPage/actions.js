import * as constants from './constants';

export function saveSection(parentDataId, dataId, clientId, data, sectionPath, redirectTo, metadata) {
  return {type: constants.SAVE_SECTION, parentDataId, dataId, clientId, data, sectionPath, redirectTo, metadata};
}

export function sectionSaved(dataId, clientId, data,sectionPath, redirectTo,metadata) {
  return {type: constants.SAVE_SECTION_SUCCESS, dataId, clientId, data,sectionPath, redirectTo,metadata};
}

export function loadSection(dataId, clientId, path, moduleName) {
  return {type: constants.LOAD_SECTION, dataId, clientId, path,moduleName};
}

export function sectionLoaded(data, currentIdentity, metadata,workflowStatus) {
  return {type: constants.LOAD_SECTION_SUCCESS, data, currentIdentity, metadata,workflowStatus};
}

export function updateForm(changes, path) {
  return {type: constants.UPDATE_FORM, changes, path};
}

export function initComponentsRefState(path, data, metadata) {
  return {type: constants.INIT_COMPONENTS_REF_STATE, path, data, metadata};
}

export function refreshComponentsRefState(changes, path) {
  return {type: constants.REFRESH_COMPONENTS_REF_STATE, changes, path};
}

export function updateValidationList(name, validate, compare) {
  return {type: constants.UPDATE_VALIDATION_LIST, name, validate, compare};
}

export function clearValidationList() {
  return {type: constants.CLEAR_VALIDATION_LIST};
}

export function loadProviderSearchCriteriaData(){
  return {type:constants.LOAD_PROVIDER_SEARCH_CRITERIA_DATA}
}

export function providerSearchCriteriaDataLoaded(result){
  return {type:constants.LOAD_PROVIDER_SEARCH_CRITERIA_DATA_SUCCESS,result}
}

export function searchProviders(searchCriteria){
  return {type:constants.SEARCH_PROVIDERS,searchCriteria}
}
export function providersSearched(searchResults){
  return {type:constants.SEARCH_PROVIDERS_SUCCESS,searchResults}
}
export function providerSelected(){
  return {type:constants.PROVIDER_SELECTED}
}

export function continueButton(parentDataId, dataId, clientId, data, sectionPath, metadata, Incomplete) {
  return {type: constants.CONTINUE_BUTTON_SECTION, parentDataId, dataId, clientId, data, sectionPath, metadata, Incomplete};
}

export function wipeOffStateData() {
  return {type: constants.WIPE_OFF_STATE_DATA};
}
