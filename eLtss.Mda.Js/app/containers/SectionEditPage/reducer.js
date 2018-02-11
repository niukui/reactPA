import * as constants from './constants';
import {fromJS} from 'immutable';
import lodash from "lodash";
import {initComponentsState, combineComponentsState} from 'services/componentsServices';
import * as metadataHelper from 'utils/metadataHelper';

const initialState = fromJS({data: {}, metadata: {},providerSearchCriteriaData:{},providerSearchResults:[]});

function sectionEditReducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOAD_SECTION_SUCCESS:
      {
        const entityData = action.data[action.metadata.Name];
        const workflowStatus = action.data.WorkflowStatus || entityData && entityData.WorkflowStatus;

        return state    
        .set('data', action.data)
        .set('currentIdentity', action.currentIdentity)
        .set('metadata', action.metadata)
        .set('workflowStatus', workflowStatus);
      }

    case constants.UPDATE_FORM:
      {
        if (action.changes && action.changes.length > 0) {
          let data = Object.assign({}, state.get("data"));
          const metadata = state.get("metadata");

          for (let change of action.changes) {
            metadataHelper.captureChangesHistory(data, change, metadata);
            lodash.set(data, metadata.Name+"."+change.name, change.value);
          }
          let componentsState = initComponentsState(metadata, action.path);
          let combinedComponentsState = combineComponentsState(componentsState, data[metadata && metadata.Name],{PageType:'Edit'});
          return state.set('data', Object.assign({}, data)).set('componentsState', Object.assign(combinedComponentsState));
        }
        return state;
      }

    case constants.REFRESH_COMPONENTS_REF_STATE:
      {
        if (action.changes && action.changes.length > 0) {
          let data = lodash.cloneDeep(state.get("data"));
          for (let change of action.changes) {
            lodash.set(data, change.name, change.value);
          }
          let componentsState = initComponentsState(state.get('metadata'), action.path);
          let combinedComponentsState = combineComponentsState(componentsState, data,{PageType:'Edit'});
          return state.set('componentsState', Object.assign({}, combinedComponentsState));
        }
        return state;
      }

    case constants.INIT_COMPONENTS_REF_STATE:
      {
          let componentsState = initComponentsState(action.metadata, action.path);
          let combinedComponentsState = combineComponentsState(componentsState, action.data,{PageType:'Edit'});
          return state.set('componentsState', Object.assign(combinedComponentsState));
      }

    case constants.UPDATE_VALIDATION_LIST:
      {
        let validationList = state.get('validationList');
        const currentValidation = {
          name: action.name,
          validate: action.validate,
          compare: action.compare,
        };

        const validation = lodash.find(validationList, {name: action.name});
        if (!validation || validation.length === 0) {
          validationList.push(currentValidation);
          return state.set('validationList', validationList);
        }
        return state;
      }

    case constants.CLEAR_VALIDATION_LIST:
      {
        return state.set('validationList', []);
      }

    case constants.LOAD_PROVIDER_SEARCH_CRITERIA_DATA_SUCCESS:
      {
        return state
        .set('providerSearchCriteriaData', action.result);
      }
    case constants.SEARCH_PROVIDERS_SUCCESS:
      {
        return state
        .set('providerSearchResults', action.searchResults);
      }  
    case constants.PROVIDER_SELECTED:
      {
        return state
        .set('providerSearchResults',[])
      }
    case constants.WIPE_OFF_STATE_DATA:
      {
        return state.set('data', {})
      }
    
    default:
      return state;
  }
}

export default sectionEditReducer;
