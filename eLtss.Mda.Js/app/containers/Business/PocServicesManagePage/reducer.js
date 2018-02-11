import * as constants from './constants';
import {fromJS} from 'immutable';
import lodash from "lodash";
import {SUPPORT_TYPE_IDS} from 'utils/constants'

const initialState = fromJS({pocId: '', pocPart5: [],
    inpatientIndex: "",providerSearchCriteriaData:{},
    providerSearchResults:[],playGroundServices:{},
    outpatientIndex: ""
});
 
function pocPart5ManageReducer(state = initialState, action) {

    switch (action.type) {
    case constants.LOAD_POC_Part5_SUCCESS:
        return state
            .set('dataId', action.dataId)
            .set('clientId', action.clientId)
            .set('pocPart5', action.pocPart5 || [])
            .set('treatmentTypes', action.treatmentTypes)
            .set('frequencyItems', action.frequencyItems)
            .set('serviceDefinitionItems', action.serviceDefinitionItems)
            .set('serviceDefinitions', action.serviceDefinitions)
            .set('serviceOutcomeItems', action.serviceOutcomeItems)
            .set('inpatientId', action.inpatientId)
            .set('outpatientId', action.outpatientId)
            .set('securityContext', action.securityContext)
            .set('underEditing', false)
            .set('underInpatientEditing', false)
            .set('underOutpatientEditing', false)
            .set('clientDefaultCounty', action.clientDefaultCounty)
            .set('frequencyIds', action.frequencyIds)
            .set('playGroundServices',
            {
                TreatmentType: {},
                Provider: {}
            })
            .set('stateProvinceSelectList',action.stateProvinceSelectList)

    case constants.EDIT_INOUTPATIENTSERVICES:
    {   if(action.inOutpatient == 'inpatient'){
            return state.set('playGroundServices', Object.assign({}, action.service))
            .set('inpatientIndex',  action.index)
            .set('underEditing', true)
            .set('underInpatientEditing', true)
            .set('underOutpatientEditing', false);
        }
        if(action.inOutpatient == 'outpatient'){
            return state.set('playGroundServices', Object.assign({}, action.service))
            .set('outpatientIndex',  action.index)
            .set('underEditing', true)
            .set('underInpatientEditing', false)
            .set('underOutpatientEditing', true);
            
        }
    }

        case constants.CHANGE_INPATIENTSERVICES_FORM:
            {
                let services = state.get('playGroundServices');
                let inpatientId = state.get('inpatientId');
                let outpatientId = state.get('outpatientId');
                lodash.set(services, action.name, action.value);
                if(action && action.name==="ServiceId"){
                    lodash.set(services,"Provider",{})
                    lodash.set(services,"FrequencyType",{})
                }                  
                if(action && action.value && action.value.Id && action.value.Id === inpatientId){
                    return state.set('playGroundServices', Object.assign({}, 
                        { 
                            TreatmentType: action.value,           
                          }
                    ));
                }
                if(action && action.value && action.value.Id && action.value.Id === outpatientId){
                    return state.set('playGroundServices', Object.assign({}, 
                        {  
                            TreatmentType: action.value,
                            FrequencyType: {},
                            ServiceOutcome: {},
                            Provider:{}
                          }
                    ));
                }
                if(action && (action.name=="FrequencyDuration"||action.name=="FrequencyUnits")){
                    services.TotalUnitsRequested=services.FrequencyDuration*services.FrequencyUnits||""
                }                         
                return state.set('playGroundServices', Object.assign({}, services));
            }

    case constants.ADD_POC_PATIENTSERVICES_FORM:
    {
        let patient = state.get('playGroundServices');
        let serviceList = state.get('pocPart5');
        let inpatientId = state.get('inpatientId');
        let outpatientId = state.get('outpatientId');
        if (patient.TreatmentType.Id === inpatientId) {
            serviceList.InpatientServices.push(patient);
        }
        if (patient.TreatmentType.Id === outpatientId) {
            serviceList.OutpatientServices.push(patient);
        }
        return state.set('pocPart5', serviceList)
            .set("playGroundServices",
                {
                    TreatmentType: {},
                    Provider: {}
                }
            );
    }

    case constants.SAVE_INPATIENT_FORM:
    {
        let serviceList = Object.assign({}, state.get('pocPart5'));
        let inpatientId = state.get('inpatientId');
        let outpatientId = state.get('outpatientId');

        let playGroundServices = state.get('playGroundServices');
        if (playGroundServices.TreatmentType.Id === inpatientId) {
            let index = state.get('inpatientIndex');
            if (index >= 0) {
                serviceList.InpatientServices.splice(index, 1, Object.assign({}, playGroundServices));
                return state.set('pocPart5', serviceList)
                    .set("playGroundServices",
                        {
                            TreatmentType: {},
                            Provider: {}
                        }
                    )
                    .set('underInpatientEditing', false)
                    .set('underEditing', false);
            }
        } else {
            let index = state.get('outpatientIndex');
            if (index >= 0) {
                serviceList.OutpatientServices.splice(index, 1, Object.assign({}, playGroundServices));
                return state.set('pocPart5', serviceList)
                    .set("playGroundServices",
                        {
                            TreatmentType: {},
                            Provider: {}
                        }
                    )
                    .set('underOutpatientEditing', false)
                    .set('underEditing', false);
            }
        }
    }

    case constants.SWITCH_TO_INPATIENTEDIT_MODE:
        return state.set('underEditing', true);

    case constants.SWITCH_TO_INPATIENTCREATE_MODE:
        return state.set('underEditing', false)
            .set('playGroundServices', { TreatmentType: {} })
            .set('inpatientIndex', '')
            .set('outpatientIndex', '');

    case constants.DELETE_POC_Part5_ITEM_SUCCESS:
    {
        return state.set('pocPart5', Object.assign([], action.Part5s));
    }
    
    case constants.DELETE_INPATIENT:
    {
        let servicesList = state.get('pocPart5');
        let index = state.get('inpatientIndex');
        if (index >= 0) {
            servicesList.InpatientServices.splice(index, 1);
            return state.set('pocPart5', servicesList).set('underEditing', false);
        }
    }    case constants.DELETE_OUTPATIENT:
    {
        let servicesList = state.get('pocPart5');
        let index = state.get('outpatientIndex');
        if (index >= 0) {
            servicesList.OutpatientServices.splice(index, 1);
            return state.set('pocPart5', servicesList).set('underEditing', false);
        }
    }

    case constants.FORM_VALIDATED:
        return state.set('errors', action.errors);

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

    case constants.PROVIDER_SELECTED_SUCCESS:
    {
        let selectedProvider=action.provider;
        let playGroundService = Object.assign({}, state.get('playGroundServices'));
        selectedProvider.ProviderName = lodash.isEmpty(selectedProvider.ProviderFirstName)
            ? selectedProvider.ProviderLastNameOrBusinessName
            : selectedProvider.ProviderFirstName + " " + selectedProvider.ProviderLastNameOrBusinessName
        selectedProvider.ProviderId=action.provider.ProviderId;
        selectedProvider.ProviderLocationId = action.provider.ProviderLocationId;
        selectedProvider.OwnerOrganizationUnitId = action.provider.OwnerOrganizationUnitId;
        selectedProvider.Tin=action.provider.TaxIdentificationNumber;
        selectedProvider.ProviderAddress=action.provider.ServiceAddress;
        selectedProvider.ProviderPhoneNumber=action.provider.PhoneNumber;
        selectedProvider.ProviderEffectiveDate=action.provider.EffectiveDateStartedInNetwork;
        selectedProvider.ProviderTerminationDate=action.provider.EffectiveDateNoLongerInNetwork;
        selectedProvider.ContractStatus=action.provider.Disabled===true?"Terminated":(action.provider.Disabled===false?"Active":"");
        selectedProvider.Specialty=action.provider.PrimarySpecialtyCode;
        lodash.set(playGroundService, 'Provider', selectedProvider);
        return state.set('providerSearchResults', [])
            .set('playGroundServices', Object.assign({}, playGroundService));
    }

    case constants.TREATMENT_TYPE_OUTPATIENT:
    {
        return state
            .set('treatmentType', action.outpatient)
    }

    case constants.TREATMENT_TYPE_INPATIENT:
    {
        return state
            .set('treatmentType', action.inpatient)
    }

    case constants.TREATMENT_TYPE_DEFAULT:
    {
        return state
            .set('treatmentType', '')
    }
    case constants.TREATMENT_TYPE_DEFAULT:
    {
        return state
        .set('treatmentType','')
    }
    case constants.CANCEL_INT_OUT_PATIENT:
    {
        return state.set("playGroundServices",{TreatmentType: {}})
            .set("inpatientIndex", "")
            .set("outpatient", "")
            .set("underEditing", false)
            .set('underInpatientEditing', false)
            .set('underOutpatientEditing', false);
    }
    case constants.ADD_TEMPORARY_PROVIDER_SUCCESS:
    {
        let currentService = state.get('playGroundServices');
        lodash.set(currentService, "Provider", action.data);
        currentService.Provider.TemporaryProvider=true;
        currentService.Provider.ProviderId=action.data.Id;
        return state.set('playGroundServices', Object.assign({},currentService))
    }
    case constants.REMOVE_TEMPORARY_PROVIDER:
    {
        let serviceData=state.get('playGroundServices');
        lodash.set(serviceData,"Provider",{})
        return state.set('playGroundServices', Object.assign({}, serviceData))
    }
    default:
            return state;
    }
}

export default pocPart5ManageReducer;
