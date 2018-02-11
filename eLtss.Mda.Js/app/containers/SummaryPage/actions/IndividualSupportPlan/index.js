import * as constants from '../../constants';


export function providerSearchCriteriaDataLoaded(providerSearchCriteriaData) {
  return {type: constants.LOAD_PROVIDER_SEARCH_CRITERIA_DATA_SUCCESS, providerSearchCriteriaData};
}

export function searchProviders(searchCriteria) {
  return {type: constants.SEARCH_PROVIDERS, searchCriteria};
}

export function providerSearchResultLoaded(providerSearchResult) {
  return {type: constants.LOAD_PROVIDER_SEARCH_RESULT_SUCCESS, providerSearchResult};
}

export function selectProvider(providerId, ownerOrganizationUnitId, id, clientId, data, metadata) {
  return {
    type: constants.SELECT_PROVIDER,
    providerId,
    ownerOrganizationUnitId,
    id,
    clientId,
    data,
    metadata
  };
}

export function ProviderAdded(assignedProviders) {
  return {type: constants.ADD_PROVIDER_SUCCESS, assignedProviders};
}

export function deleteProvider(id, providerId, clientId, data, metadata) {
  return {
    type: constants.DELETE_PROVIDER,
    id,
    providerId,
    clientId,
    data,
    metadata
  };
}
export function ProviderDeleted(assignedProviders,providerId) {

  return {type: constants.DELETE_PROVIDER_SUCCESS, assignedProviders,providerId};
}

export function planForSupportsLoaded(planForSupportList) {
  return {type: constants.PLAN_FOR_SUPPORTS_LOADED, planForSupportList};
}

export function addPlanForSupport(dataId, clientId, metadata) {
  return {type: constants.ADD_PLAN_FOR_SUPPORT, dataId, clientId, metadata};
}

export function planForSupportAdded(plan) {
  return {type: constants.PLAN_FOR_SUPPORT_ADDED, plan};
}

export function toPlanForSupportSummaryPage(plan, parentDataId, clientId, metadata) {
  return {type: constants.REDIRECT_TO_PLAN_FOR_SUPPORT_SUMMARY, plan, parentDataId, clientId, metadata};
}