import * as constants from '../../constants';
import {fromJS} from 'immutable';
import lodash from "lodash";
import {initComponentsState, combineComponentsState} from 'services/componentsServices';

// The initial state of the App
const initialState = fromJS({dataId: '', data: {}, metadata: {}});

function ispReducer(state = initialState, action) {
  switch (action.type) {

    case constants.PLAN_FOR_SUPPORTS_LOADED:
      {
        let data = state.get('data');
        lodash.set(data, 'PlanForSupportList', action.planForSupportList || []);
        return state.set('data', Object.assign({}, data));
      }
    case constants.LOAD_PROVIDER_SEARCH_CRITERIA_DATA_SUCCESS:
      {
        let data = state.get('data');
        lodash.set(data, 'ProviderSearchCriteriaData', action.providerSearchCriteriaData);
        return state.set('data', Object.assign({}, data));
      }
    case constants.LOAD_PROVIDER_SEARCH_RESULT_SUCCESS:
      {
        let data = state.get('data');
        lodash.set(data, 'ProviderSearchResults', action.providerSearchResult);
        return state.set('data', Object.assign({}, data));
      }
    case constants.ADD_PROVIDER_SUCCESS:
      {
        let data = state.get('data');
        lodash.set(data, 'IndividualSupportPlan.AssignedProviders', action.assignedProviders);
        return state.set('data', Object.assign({}, data));
      }
    case constants.DELETE_PROVIDER_SUCCESS:
      {
        let data = state.get('data');
        lodash.set(data, 'IndividualSupportPlan.AssignedProviders', action.assignedProviders);
        const SharedPlannings = lodash.get(data, 'IndividualSupportPlan.SharedPlannings');
        const newPlannings = SharedPlannings.map((planning) => {
          if (planning && planning.AttachedProviderIds && planning.AttachedProviderIds.includes(action.providerId)) {
            const index = planning
              .AttachedProviderIds
              .findIndex(x => x === action.providerId);
            if (index >= 0) {
              planning
                .AttachedProviderIds
                .splice(index, 1);
            }
          }
          return planning;
        });
        lodash.set(data, 'IndividualSupportPlan.SharedPlannings', newPlannings);
        return state.set('data', Object.assign({}, data));
      }
    case constants.PLAN_FOR_SUPPORT_ADDED:
      {
        let data = state.get('data');
        data.IndividualSupportPlan.PlanForSupportList = data.IndividualSupportPlan.PlanForSupportList || [];
        const plan = lodash.find(data.IndividualSupportPlan.PlanForSupportList, {'Id': action.plan.Id});
        if (!plan) {
          data
            .IndividualSupportPlan
            .PlanForSupportList
            .push(action.plan);
        } else {
          let index = lodash.indexOf(data.IndividualSupportPlan.PlanForSupportList, plan);
          data
            .IndividualSupportPlan
            .PlanForSupportList
            .splice(index, 1, action.plan);
        }
        return state.set('data', Object.assign({}, data));
      }
    
    default:
      return state;
  }
}

export default ispReducer;
