import * as constants from '../../constants';
import {fromJS} from 'immutable';
import lodash from "lodash";
import {initComponentsState, combineComponentsState} from 'services/componentsServices';

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

function generalReducer(state = initialState, action) {
  switch (action.type) {
    case constants.INIT_COMPONENTS_REF_STATE:
      {
        let componentsState = initComponentsState(action.metadata);
        let combinedComponentsState = combineComponentsState(componentsState, action.data, {PageType: 'Summary'});
        return state.set('componentsState', Object.assign(combinedComponentsState));
      }
    case constants.LOAD_SUMMARY_SUCCESS:
      {
        const entityData = action.data[action.metadata.Name];
        const workflowStatus = action.data.WorkflowStatus || entityData && entityData.WorkflowStatus;

        return state
          .set('data', action.data)
          .set('metadata', action.metadata)
          .set('workflowStatus', Object.assign({}, workflowStatus || {}));
      }      
    case constants.LOAD_PRINT_SUCCESS:
      {
          var printComponentsState=[];
              let componentsState = initComponentsState(action.printMetadata);
              let combinedComponentsState = combineComponentsState(componentsState, action.printData, {PageType: 'Summary'});
        
        return state 
          .set('printAccessModel', action.printAccessModel)
          .set('printData',action.printData)
          .set('printMetadata', action.printMetadata)
          .set('printComponentsState',Object.assign(combinedComponentsState));
      }
    case constants.PRE_PROCESS_EVENT_SUCCESS:
      {
        let workflowActionConfirmations = state.get('workflowActionConfirmations');
        if (lodash.isEmpty(workflowActionConfirmations)) {
          workflowActionConfirmations = {};
        }
        let message = action.result.Message;
        let processConfirmation = {
          IsOpen: true,
          Message: message
        };
        workflowActionConfirmations[action.eventName] = processConfirmation;
        return state.set('workflowActionConfirmations', Object.assign({}, workflowActionConfirmations))
      }
    case constants.PROCESS_EVENT_SUCCESS:
      {
        if (action.hasConfirmation) {
          let workflowActionConfirmations = state.get('workflowActionConfirmations');
          if (lodash.isEmpty(workflowActionConfirmations)) {
            workflowActionConfirmations = {};
          }
          let processConfirmation = {
            IsOpen: false
          };
          workflowActionConfirmations[action.eventName] = processConfirmation;
          state.set('workflowActionConfirmations', Object.assign({}, workflowActionConfirmations))
        }
        const metadata = state.get('metadata');
        const entityData = action.data[metadata.Name];
        const workflowStatus = action.data.WorkflowStatus || entityData && entityData.WorkflowStatus;

        return state
          .set('data', action.data)
          .set('workflowStatus', Object.assign({}, workflowStatus || {}));
      }
    case constants.CANCEL_EVENT:
      {
        let workflowActionConfirmations = state.get('workflowActionConfirmations');
        if (lodash.isEmpty(workflowActionConfirmations)) {
          workflowActionConfirmations = {};
        }
        let processConfirmation = {
          IsOpen: false
        };
        workflowActionConfirmations[action.eventName] = processConfirmation;
        return state.set('workflowActionConfirmations', Object.assign({}, workflowActionConfirmations));
      }
    case constants.ADD_FORM_NOTE_SUCCESS:
      {
        let data = lodash.cloneDeep(state.get('data'));
        const metadata = state.get('metadata');
        const entityData = data && data[metadata.Name];
        entityData && entityData.FormNotes && entityData
          .FormNotes
          .push(action.formNote);
        return state.set('data', Object.assign({}, data));
      }
    case constants.DELETE_FORM_NOTE_SUCCESS:
      {
        let data = state.get('data');
        const metadata = state.get('metadata');
        const entityData = data && data[metadata.Name];
        entityData.FormNotes=action.formNotes;
        return state.set('data', Object.assign({}, data));
      }

    case constants.UPLOAD_ATTACHMENT_SUCCESS:
      {
        let data = Object.assign({}, state.get('data'));
        data && data.Attachments && data
          .Attachments
          .push(action.attachment);
        return state.set('data', Object.assign({}, data));
      }
    case constants.DELETE_ATTACHMENT_SUCCESS:
      {
        let data = Object.assign({}, state.get('data'));   
        data.Attachments = action.attachments;
        return state.set('data', data);
      }
    case constants.LOAD_SUMMARY_AUDIT_TRAILS_SUCCESS:
      {
        let data = state.get('data');
        lodash.set(data, 'AuditTrails', action.auditTrails);
        return state.set('data', Object.assign({}, data));
      }
    default:
      return state;
  }
}

export default generalReducer;
