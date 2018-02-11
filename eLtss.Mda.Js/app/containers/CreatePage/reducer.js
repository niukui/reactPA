import * as constants from './constants';
import {fromJS} from 'immutable';
import lodash from "lodash";
import {initComponentsState, combineComponentsState} from 'services/componentsServices';
import * as metadataHelper from 'utils/metadataHelper';

// The initial state of the App
const initialState = fromJS({dataId: '', data: {}, metadata: {}});

const getMetadataSectionByName = (metadata, name) => {
  if (metadata && metadata.Sections && metadata.Sections.length > 0) {
    const section = metadata
      .Sections
      .filter(section => section.Name == name);
    if (section) 
      return section[0];
    }
  return null;
};

function createReducer(state = initialState, action) {
  switch (action.type) {
    case constants.INIT_CREATE_DATA:
      {
        return state.set('data', {});
      }
    case constants.UPDATE_FORM:
      {
        if (action.changes && action.changes.length > 0) {
          let data = Object.assign({}, state.get("data"));
          const metadata = state.get("metadata");

          for (let change of action.changes) {
            metadataHelper.captureChangesHistory(data, change, metadata);
            lodash.set(data, metadata.Name + "." + change.name, change.value);
          }
          let componentsState = initComponentsState(metadata, action.path);
          let combinedComponentsState = combineComponentsState(componentsState, data[metadata && metadata.Name]);
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
          let combinedComponentsState = combineComponentsState(componentsState, data);
          return state.set('componentsState', Object.assign({}, combinedComponentsState));
        }
        return state;
      }
    case constants.INIT_COMPONENTS_REF_STATE:
      {
        if (state.get('data') && state.get('data').Id && state.get('metadata') && state.get('metadata').Id) {
          let componentsState = initComponentsState(state.get('metadata'), action.path);
          let combinedComponentsState = combineComponentsState(componentsState, state.get('data'));
          return state.set('componentsState', Object.assign(combinedComponentsState));
        }
        return state;
      }
    case constants.PRE_CREATE_MODEL_LOAD_SUCCESS:
      {
        return state
          .set('data', action.data.DataObject)
          .set('metadata', action.metadata);
      }
    case constants.UPDATE_VALIDATION_LIST:
      {
        let validationList = state.get('validationList');
        const currentValidation = {
          name: action.name,
          validate: action.validate
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
    default:
      return state;
  }
}

export default createReducer;
