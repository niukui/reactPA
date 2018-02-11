import * as constants from './constants';

export function preCreate (moduleName, clientId){
    return {type: constants.LOAD_PRE_CREATE_MODEL, moduleName, clientId};
}

export function preCreate_Success(data, metadata){
    return {type: constants.PRE_CREATE_MODEL_LOAD_SUCCESS, data, metadata};
}

export function create(moduleName, data, section, clientId){
    return {type: constants.SAVE_MODEL, moduleName, data, section, clientId}
}

export function create_Success(metadata, dataId, clientId) {
  return {type: constants.SAVE_MODEL_SUCCESS, metadata, dataId, clientId};
}

export function updateForm(changes, path) {
  return {type: constants.UPDATE_FORM, changes, path};
}

export function initComponentsRefState(path) {
  return {type: constants.INIT_COMPONENTS_REF_STATE, path};
}

export function refreshComponentsRefState(changes, path) {
  return {type: constants.REFRESH_COMPONENTS_REF_STATE, changes, path};
}

export function updateValidationList(name, validate) {
  return {type: constants.UPDATE_VALIDATION_LIST, name, validate};
}

export function clearValidationList() {
  return {type: constants.CLEAR_VALIDATION_LIST};
}

export function initCreateData(moduleName, clientId) {
  return {type: constants.INIT_CREATE_DATA};
}