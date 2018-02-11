import * as constants from '../../constants';
export function saveService(id, service) {
  return {type: constants.SAVE_SERVICE, id, service};
}

export function serviceSaved(services) {
  return {type: constants.SAVE_SERVICE_SUCCESS, services};
}

export function deleteService(id, serviceId) {
  return {type: constants.DELETE_SERVICE, id, serviceId};
}

export function serviceDeleted(services) {
  return {type: constants.DELETE_SERVICE_SUCCESS, services};
}

export function saveBudgets(id, budgets){
  return {type: constants.SAVE_BUDGETS, id, budgets};
}

export function budgetsSaved(budgets){
  return {type: constants.SAVE_BUDGETS_SUCCESS, budgets};
}