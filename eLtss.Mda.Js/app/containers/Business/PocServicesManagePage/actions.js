import * as constants from './constants';

export function loadPocPart5(dataId, clientId, prefix) {
  return {type: constants.LOAD_POC_Part5, dataId, clientId, prefix};
}

export function pocPart5Loaded(pocPart5, dataId, clientId, treatmentTypes, frequencyItems, serviceDefinitionItems, 
serviceDefinitions,serviceOutcomeItems,inpatientId,outpatientId,frequencyIds,securityContext,clientDefaultCounty,stateProvinceSelectList) {
  return {
    type: constants.LOAD_POC_Part5_SUCCESS,
    pocPart5,
    dataId,
    clientId,
    treatmentTypes,
    frequencyItems,
    serviceDefinitionItems,
    serviceDefinitions,
    serviceOutcomeItems,
    inpatientId,
    outpatientId,
    securityContext,
    clientDefaultCounty,
    frequencyIds,
    stateProvinceSelectList
  };
}
export function formValidated(errors) {
  return {type: constants.FORM_VALIDATED, errors};
}
export function changeInpatientServicesForm(name, value) {
  return {type: constants.CHANGE_INPATIENTSERVICES_FORM, name, value};
}

export function changeOutpatientServicesForm(name, value) {
  return {type: constants.CHANGE_OUTPATIENTSERVICES_FORM, name, value};
}

export function deleteInpatient(inpatient, pocPart5) {
  return {type: constants.DELETE_INPATIENT, inpatient, pocPart5};
}

export function deleteOutpatient(outpatient, pocPart5) {
  return {type: constants.DELETE_OUTPATIENT, outpatient, pocPart5};
}

export function editInOutpatientServices(service,index, inOutpatient) {
    return {type: constants.EDIT_INOUTPATIENTSERVICES, service,index, inOutpatient};
}

export function editOutPatinetServices(outpatient,index) {
    return {type: constants.EDIT_OUTPATIENTSERVICES, outpatient,index};
}

export function addPocInpatientServicesForm(inpatient) {
    return {type: constants.ADD_POC_PATIENTSERVICES_FORM, inpatient};
}
export function addPocOutpatientServicesForm(name, value) {
  return {type: constants.ADD_POC_OUTPATIENTSERVICES_FORM, name, value};
}
export function startInpatinetEditing() {
    return {type: constants.SWITCH_TO_INPATIENTEDIT_MODE};
}
export function startOutpatinetEditing() {
    return {type: constants.SWITCH_TO_OUTPATIENTEDIT_MODE};
}

export function startOutpatinetCreating() {
    return {type: constants.SWITCH_TO_INPATIENTCREATE_MODE};
}

export function saveInpatientForm(inpatient,index) {
    return {type: constants.SAVE_INPATIENT_FORM,inpatient,index};
}

export function servicesSaved(dataId, clientId, redirectTo,prefix) {
  return {type: constants.SAVE_SERVICES_SUCCESS, dataId, clientId, redirectTo,prefix};
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
export function providerSelected(provider){
  return {type:constants.PROVIDER_SELECTED_SUCCESS,provider}
}
export function providersSearchedSucess(result){
  return {type:constants.PROVIDER_SELECTED_SUCCESS,result}
}
export function treatmentTypeOutpatient(outpatient){
  return {type:constants.TREATMENT_TYPE_OUTPATIENT, outpatient}
}

export function treatmentTypeInpatient(inpatient){
  return {type:constants.TREATMENT_TYPE_INPATIENT, inpatient}
}

export function treatmentTypeDefault(){
  return {type:constants.TREATMENT_TYPE_DEFAULT}
}

export function saveServices(dataId,clientId,pocPart5,redirectTo, prefix) {
  return {type: constants.SAVE_SERVICES,dataId,clientId,pocPart5,redirectTo,prefix};
}

export function cancelInOutPatient(){
  return {type:constants.CANCEL_INT_OUT_PATIENT}
}


export function startOutpatientDeleting(outpatient,index) {
  return {type: constants.OUTPATIENT_START_DELETING, outpatient, index};
}

export function startInpatientDeleting(inpatient,index) {
  return {type: constants.INPATIENT_START_DELETING, inpatient, index};
}

export function addTemporaryProvider(temporaryProvider,prefix){
  return {type: constants.ADD_TEMPORARY_PROVIDER,temporaryProvider,prefix}
}

export function addTemporaryProviderSuccess(data){
  return {type:constants.ADD_TEMPORARY_PROVIDER_SUCCESS,data}
}

export function removeTemporaryProvider(){
  return {type: constants.REMOVE_TEMPORARY_PROVIDER}
}