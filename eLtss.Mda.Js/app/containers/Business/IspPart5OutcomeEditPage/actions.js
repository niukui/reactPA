import * as constants from './constants';

export function loadServiceAndOutcomes(parentDataId, dataId, clientId) {
  return {type: constants.LOAD_SERVICE_AND_OUTCOMES, parentDataId, dataId, clientId};
}

export function serviceAndOutComesLoaded(serviceAndOutComes, serviceDefinitions, sharedPlannings, parentDataId, dataId) {
  return {
    type: constants.LOAD_SERVICE_AND_OUTCOMES_SUCCESS,
    serviceAndOutComes,
    serviceDefinitions,
    sharedPlannings,
    parentDataId,
    dataId
  };
}

export function updateForm(name, value) {
  return {type: constants.SERVICE_AND_OUTCOMES_UPDATE_FORM, name, value};
}

export function updateOutcome(outcomeId, outcome) {
  return {type: constants.SERVICE_AND_OUTCOMES_CHANGE_OUTCOME, outcomeId, outcome};
}

export function saveServiceOutcome(serviceOutcomes, parentDataId, dataId, clientId){
  return {type: constants.SAVE_SERVICE_AND_OUTCOMES, serviceOutcomes, parentDataId, dataId, clientId};
}

export function serviceAndOutComesSaved(serviceOutcomes, clientId, parentDataId, dataId){
  return {type: constants.SERVICE_AND_OUTCOMES_SAVED, serviceOutcomes, parentDataId, dataId, clientId};
}

export function addOutcome(outcome){
  return {type: constants.ADD_SERVICE_AND_OUTCOMES, outcome};
}

export function deleteOutcome(outcomeId){
  return {type: constants.DELETE_SERVICE_AND_OUTCOMES, outcomeId};
}

