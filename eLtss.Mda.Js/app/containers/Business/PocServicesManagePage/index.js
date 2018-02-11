import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PageHeader from 'components/Common/PageHeader';
import PocServicesForm from 'components/Business/PocServices/PocServicesForm';
import * as pocPart5Actions from './actions';
import ModalConfirm from "components/Common/ModalConfirm";
import AuthorizedLink from 'components/Common/links/AuthorizedLink';
import * as aclHelper from 'utils/aclHelper';
import {getAccessControlFromCache} from 'services/accessControlServices';
import toastr from "utils/toastr";
import {browserHistory} from 'react-router';
import path from 'path';
import moment from 'moment';
import lodash from 'lodash';
import { formatJsonDateTime ,formatJsonDate} from 'utils/dateHelper';

class PocPart5Page extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      accessModel: {},
      isOpenInpatientUpdateConfirm: false,
      isOpenOutpatientUpdateConfirm: false,
      isOpenServiceSubmitConfirm:false
    };
    this.onClickSave= this
      .onClickSave
      .bind(this);
    this.onClickCreateInpatient = this
      .onClickCreateInpatient
      .bind(this);
    this.onClickUpdateInpatient = this
      .onClickUpdateInpatient
      .bind(this);
    this.onFormChange = this
      .onFormChange
      .bind(this);
    this.onClickEditInOutpatient = this
      .onClickEditInOutpatient
      .bind(this);
    this.onClickDeleteInpatient = this
      .onClickDeleteInpatient
      .bind(this);
    this.onClickViewInpatient = this
      .onClickViewInpatient
      .bind(this);
    this.onClickDeleteOutpatient = this
      .onClickDeleteOutpatient
      .bind(this);
    this.onClickViewOutpatient = this
      .onClickViewOutpatient
      .bind(this);
    this.onClickCancel = this
      .onClickCancel
      .bind(this);
    this.onDeleteInpatientConfirmed = this
      .onDeleteInpatientConfirmed
      .bind(this);
    this.onDeleteOutpatientConfirmed = this
      .onDeleteOutpatientConfirmed
      .bind(this);
    this.formValidation = this
      .formValidation
      .bind(this);
    this.fieldValidation = this
      .fieldValidation
      .bind(this);
    this.onSubmitServiceConfirmed = this
      .onSubmitServiceConfirmed
      .bind(this);
  }

  componentWillMount() {
    const _this = this;
    const query = this
      .context
      .router
      .getCurrentLocation()
      .query;
    getAccessControlFromCache(query.moduleName).then((accessModel) => {
      _this.setState({accessModel});
    });
  }

  componentDidMount() {
  //  this
    //  .props
   //   .actions
   //  .refreshPlayGroundSharedPlanning(findEmptyServices());
    const query = this
      .context
      .router
      .getCurrentLocation()
      .query;
    this
      .props
      .actions
      .loadPocPart5(query.dataId, query.clientId, query.prefix);
    this
      .props
      .actions
      .formValidated({});
  }

  fieldValidation(field) {
    let errors = this.props.errors;
    if(field.name==="FrequencyUnits"||field.name==="FrequencyDuration"){
      errors.TotalUnitsRequested = null;
    }
    if ((!field.value || field.value.Id==='') && field.name != 'ActualDischargeDate') {
      errors[field.name] = "Field is required.";
    } else {
      errors[field.name] = null;
    }

    this
      .props
      .actions
      .formValidated(errors);
  }

    formValidation(service, provider,index) {
        let formIsValid = true;
        let errors = {};
        let inpatientService = this.props.pocPart5.InpatientServices || [];
        if (service.TreatmentType.Id === this.props.inpatientId)
        {
            if (!service.AdmissionDate) {
                errors.AdmissionDate = "Admission Date is required.";
                formIsValid = false;
            }
            if( typeof(service.AdmissionDate) == "string")
            {
              service.AdmissionDate = 
                new Date(parseInt(service.AdmissionDate.replace("/Date(", "").replace(")/", ""), 10));
            }
            if( typeof(service.ActualDischargeDate) == "string")
            {
              service.ActualDischargeDate = 
                new Date(parseInt(service.ActualDischargeDate.replace("/Date(", "").replace(")/", ""), 10));
            }

            let ServiceEndDate = service.ActualDischargeDate ? service.ActualDischargeDate : service.ExpectedDischargeDate;
            if( typeof(ServiceEndDate) == "string")
            {
              ServiceEndDate = 
                new Date(parseInt(ServiceEndDate.replace("/Date(", "").replace(")/", ""), 10));
            }

            let ListActualDischargeDate;
            let ListExpectedDischargeDate;
            let ListAdmissionDate;
            for(var i = 0; i < inpatientService.length; i++ )
            {
                ListActualDischargeDate = inpatientService[i].ActualDischargeDate;
                ListExpectedDischargeDate = inpatientService[i].ExpectedDischargeDate;
                ListAdmissionDate = inpatientService[i].AdmissionDate;               


                if( typeof(ListActualDischargeDate) == "string")
                {
                  ListActualDischargeDate = 
                    new Date(parseInt(ListActualDischargeDate.replace("/Date(", "").replace(")/", ""), 10));
                }
                if( typeof(ListExpectedDischargeDate) == "string")
                {
                  ListExpectedDischargeDate = 
                    new Date(parseInt(ListExpectedDischargeDate.replace("/Date(", "").replace(")/", ""), 10));
                }
                if( typeof(ListAdmissionDate) == "string")
                {
                  ListAdmissionDate = 
                    new Date(parseInt(ListAdmissionDate.replace("/Date(", "").replace(")/", ""), 10));
                }
                if(index == i){continue}     
                let ListEndDate = ListActualDischargeDate ? ListActualDischargeDate : ListExpectedDischargeDate;      
                
                if(!((service.AdmissionDate > ListEndDate && ServiceEndDate > ListEndDate) || (ServiceEndDate < ListAdmissionDate && service.AdmissionDate < ListAdmissionDate)))
                {
                  errors.AdmissionDate = "Participant is already in a facility for the dates chosen.";
                  formIsValid = false;
                }

                // if(service.ActualDischargeDate && ListActualDischargeDate)
                // {
                //     if((service.AdmissionDate < ListActualDischargeDate) && (service.AdmissionDate >= ListAdmissionDate))
                //         {
                //           errors.AdmissionDate = "Participant is already in a facility for the dates chosen.";
                //           formIsValid = false;
                //         }
                //         if((service.ActualDischargeDate > ListAdmissionDate) && (service.ActualDischargeDate < ListActualDischargeDate))
                //         {
                //           errors.AdmissionDate = "Participant is already in a facility for the dates chosen.";
                //           formIsValid = false;
                //         }
                //         if((ListActualDischargeDate > service.AdmissionDate) && (ListActualDischargeDate < service.ActualDischargeDate))
                //         {
                //           errors.AdmissionDate = "Participant is already in a facility for the dates chosen.";
                //           formIsValid = false;
                //         }
                //         if((ListAdmissionDate >= service.AdmissionDate) && (ListAdmissionDate <= service.ActualDischargeDate))
                //         {
                //           errors.AdmissionDate = "Participant is already in a facility for the dates chosen.";
                //           formIsValid = false;
                //         }
                // }
                // else if(service.ActualDischargeDate && !ListActualDischargeDate)
                // {
                //     if((service.AdmissionDate < ListExpectedDischargeDate) && (service.AdmissionDate >= ListAdmissionDate))
                //         {
                //           errors.AdmissionDate = "Participant is already in a facility for the dates chosen.";
                //           formIsValid = false;
                //         }
                //         if((service.ActualDischargeDate > ListAdmissionDate) && (service.ActualDischargeDate < ListExpectedDischargeDate))
                //         {
                //           errors.AdmissionDate = "Participant is already in a facility for the dates chosen.";
                //           formIsValid = false;
                //         }
                //         if((ListExpectedDischargeDate > service.AdmissionDate) && (ListExpectedDischargeDate < service.ActualDischargeDate))
                //         {
                //           errors.AdmissionDate = "Participant is already in a facility for the dates chosen.";
                //           formIsValid = false;
                //         }
                //         if((ListAdmissionDate >= service.AdmissionDate) && (ListAdmissionDate <= service.ActualDischargeDate))
                //         {
                //           errors.AdmissionDate = "Participant is already in a facility for the dates chosen.";
                //           formIsValid = false;
                //         }
                // }
                // else if(!service.ActualDischargeDate && ListActualDischargeDate)
                // {
                //     if((service.AdmissionDate < ListActualDischargeDate) && (service.AdmissionDate >= ListAdmissionDate))
                //         {
                //           errors.AdmissionDate = "Participant is already in a facility for the dates chosen.";
                //           formIsValid = false;
                //         }
                //         if((service.ExpectedDischargeDate > ListAdmissionDate) && (service.ExpectedDischargeDate < ListActualDischargeDate))
                //         {
                //           errors.AdmissionDate = "Participant is already in a facility for the dates chosen.";
                //           formIsValid = false;
                //         }
                //         if((ListActualDischargeDate > service.AdmissionDate) && (ListActualDischargeDate < service.ExpectedDischargeDate))
                //         {
                //           errors.AdmissionDate = "Participant is already in a facility for the dates chosen.";
                //           formIsValid = false;
                //         }
                //         if((ListAdmissionDate >= service.AdmissionDate) && (ListAdmissionDate <= service.ExpectedDischargeDate))
                //         {
                //           errors.AdmissionDate = "Participant is already in a facility for the dates chosen.";
                //           formIsValid = false;
                //         }
                // }
                // else if(!service.ActualDischargeDate && !ListActualDischargeDate)
                // {
                //     if((service.AdmissionDate < ListExpectedDischargeDate) && (service.AdmissionDate >= ListAdmissionDate))
                //         {
                //           errors.AdmissionDate = "Participant is already in a facility for the dates chosen.";
                //           formIsValid = false;
                //         }
                //         if((service.ExpectedDischargeDate > ListAdmissionDate) && (service.ExpectedDischargeDate < ListExpectedDischargeDate))
                //         {
                //           errors.AdmissionDate = "Participant is already in a facility for the dates chosen.";
                //           formIsValid = false;
                //         }
                //         if((ListExpectedDischargeDate > service.AdmissionDate) && (ListExpectedDischargeDate < service.ExpectedDischargeDate))
                //         {
                //           errors.AdmissionDate = "Participant is already in a facility for the dates chosen.";
                //           formIsValid = false;
                //         }
                //         if((ListAdmissionDate >= service.AdmissionDate) && (ListAdmissionDate <= service.ExpectedDischargeDate))
                //         {
                //           errors.AdmissionDate = "Participant is already in a facility for the dates chosen.";
                //           formIsValid = false;
                //         }
                // }
            }
          
            if (!service.TotalLengthOfStay) 
            {
                errors.TotalLengthOfStay = "Total Length of Stay is required.";
                formIsValid = false;
            }
            if (service && service.TotalLengthOfStay && (isNaN(service.TotalLengthOfStay) == true)) 
            {
                errors.TotalLengthOfStay = "Total Length of Stay should be Numberic.";
                formIsValid = false;
            }
            if(service.AdmissionDate > service.ActualDischargeDate && service.ActualDischargeDate)
            {
              errors.ActualDischargeDate = "Actual Discharge Date should be greater than Admission Date";
              formIsValid = false;
            }

        }

        if (service.TreatmentType.Id === this.props.outpatientId) {
            if (!service.ServiceId ) {
                errors.ServiceId = "POC Service is required.";
                formIsValid = false;
            }
            if (!service.FrequencyType.Id) {
                errors.FrequencyType = "Frequency Type is required.";
                formIsValid = false;
            }
            if (!service.ServiceStartDate) {
                errors.ServiceStartDate = "Service Start Date is required.";
                formIsValid = false;
            }
            if (!service.ServiceEndDate) {
                errors.ServiceEndDate = "Service End Date is required.";
                formIsValid = false;
            }
            if (!service.ServiceOutcome || !service.ServiceOutcome.Id) {
                errors.ServiceOutcome = "Service Outcome is required.";
                formIsValid = false;
            }
            if (service.FrequencyType.Id && service.FrequencyType.Id===this.props.frequencyIds.FrequencyDailyId ) {
                if(!service.FrequencyUnits){
                  errors.FrequencyUnits = "Units per Day is required.";
                  formIsValid = false;
                }            
                if(!service.FrequencyDuration){
                  errors.FrequencyDuration = "Duration is required.";
                  formIsValid = false;
                }                              
            }

            if (service.FrequencyType.Id && service.FrequencyType.Id===this.props.frequencyIds.FrequencyWeeklyId ) {
              if(!service.FrequencyUnits){
                errors.FrequencyUnits = "Units Per Week is required.";
                formIsValid = false;
              }         
              if(!service.FrequencyDuration){
                errors.FrequencyDuration = "Duration is required.";
                formIsValid = false;
              }                            
            }

          if (service.FrequencyType.Id && service.FrequencyType.Id===this.props.frequencyIds.FrequencyBiWeeklyId ) {
            if(!service.FrequencyUnits){
              errors.FrequencyUnits = "Units Per Bi-Weekly is required.";
              formIsValid = false;
            }         
            if(!service.FrequencyDuration){
              errors.FrequencyDuration = "Duration is required.";
              formIsValid = false;
            }                                  
          }

        if (service.FrequencyType.Id && service.FrequencyType.Id===this.props.frequencyIds.FrequencyMonthlyId ) {
          if(!service.FrequencyUnits){
            errors.FrequencyUnits = "Units Per Month is required.";
            formIsValid = false;
          }        
          if(!service.FrequencyDuration){
            errors.FrequencyDuration = "Duration is required.";
            formIsValid = false;
          }                            
        }

        if (service.FrequencyType.Id && service.FrequencyType.Id===this.props.frequencyIds.FrequencyQuarterlyId ) {
          if(!service.FrequencyUnits){
            errors.FrequencyUnits = "Units Per Quarter is required.";
            formIsValid = false;
          }           
          if(!service.FrequencyDuration){
            errors.FrequencyDuration = "Duration is required.";
            formIsValid = false;
          }                                  
        }

        if (service.FrequencyType.Id && service.FrequencyType.Id===this.props.frequencyIds.FrequencyAnnualId ) {
          if(!service.FrequencyUnits){
            errors.FrequencyUnits = "Units Per Year is required.";
            formIsValid = false;
          }
          if(!service.FrequencyDuration){
            errors.FrequencyDuration = "Duration is required.";
            formIsValid = false;
          }                                               
        }
        }

        if (!service.Provider||!service.Provider.ProviderName) {
            errors.ProviderName = "Provider Name is required.";
            formIsValid = false;
        }
        if(service.TotalUnitsRequested && service.TotalUnitsRequested>9999){
          errors.TotalUnitsRequested="Total Units Requested should not be greater than 9999";
          formIsValid = false;
        }

        this
            .props
            .actions
            .formValidated(errors);
        return formIsValid;
    }


    onClickSave(e) {
      e.preventDefault();
      let query = Object.assign({}, this.context.router.getCurrentLocation().query);
      if(lodash.isEmpty((this.props.playGroundServices && this.props.playGroundServices.TreatmentType)) || !(this.props.playGroundServices && this.props.playGroundServices.TreatmentType&&this.props.playGroundServices.TreatmentType.Id)){
        this
        .props
        .actions
        .saveServices(this.props.dataId, query.clientId, this.props.pocPart5, null, query.prefix);
      }else{
        if (this.formValidation(this.props.playGroundServices,null,null)) {
          this.setState({isOpenServiceSubmitConfirm : true})
        }
      }
      
  }

  onClickCreateInpatient(e, inpatient, provider) {
    e.preventDefault();
      if (this.formValidation(inpatient, provider)) {
      this
        .props
        .actions
        .addPocInpatientServicesForm(lodash.merge(inpatient,provider));
     };
  }
  onClickUpdateInpatient(e, inpatient,provider,index) {
    e.preventDefault();
     if (this.formValidation(inpatient,provider,index)) {
        this
        .props
        .actions
        .saveInpatientForm(lodash.merge(inpatient,provider),index);     
     }
  }

  onFormChange(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    if(e.target){
      this
      .props
      .actions
      .changeInpatientServicesForm(e.target.name, e.target.value);
    }

    this.fieldValidation( e.target);
  }

 onClickViewInpatient(e, index) {  
  }
  onClickEditInOutpatient(e, service,index,inOutpatient) {
    this
      .props
      .actions
      .editInOutpatientServices(service,index,inOutpatient);
    this
      .props
      .actions
      .formValidated({});    
  }

  onClickDeleteInpatient(e, inpatient,index) {
    e.preventDefault();
    this
      .props
      .actions
      .startInpatientDeleting(inpatient,index);
      this.setState({isOpenInpatientUpdateConfirm : true})
  }

  onDeleteInpatientConfirmed(confirmDelete) {
    if (confirmDelete) {      
      this
        .props
        .actions
        .deleteInpatient(this.props.preDeleteInpatient,this.props.pocPart5);
    }
      this.setState({isOpenInpatientUpdateConfirm : false})
  }

 onClickViewOutpatient(e, index) {  
  }

  onClickDeleteOutpatient(e, outpatient,index) {
    e.preventDefault();
    this
      .props
      .actions
      .startOutpatientDeleting(outpatient,index);
      this.setState({isOpenOutpatientUpdateConfirm : true})
  }

  onDeleteOutpatientConfirmed(confirmDelete) {
    if (confirmDelete) {      
      this
        .props
        .actions
        .deleteOutpatient(this.props.preDeleteOutpatient,this.props.pocPart5);
    }
      this.setState({isOpenOutpatientUpdateConfirm : false})
  }

  onSubmitServiceConfirmed(confirmSubmit){
    if (confirmSubmit) {      
      let query = Object.assign({}, this.context.router.getCurrentLocation().query);
      this
        .props
        .actions
        .saveServices(this.props.dataId, query.clientId, this.props.pocPart5, null, query.prefix);
    }
      this.setState({isOpenServiceSubmitConfirm : false})
  }


  onClickCancel(e) {
    this
      .props
      .actions
      .cancelInOutPatient();
  }

  render() {
    const {
      dataId,
      pocPart5,
      playGroundServices,
      underEditing,
      underDeleting,
      treatmentTypes,
      frequencyItems,
      serviceDefinitionItems,
      serviceDefinitions,
      serviceOutcomeItems,
      inpatientId,
      outpatientId,
      errors,
      securityContext,
      providerSearchCriteriaData,
      providerSearchResults,
      treatmentType,
      clientDefaultCounty,
      frequencyIds,
      inpatientIndex,
      outpatientIndex,
      underOutpatientEditing,
      underInpatientEditing,
      stateProvinceSelectList
    } = this.props;
    const {accessModel} = this.state;
    if (lodash.keys(accessModel).length === 0) {
      return <div>Loading</div>;
    }
    if (pocPart5.size === 0) {
      return <div>Loading</div>;
    }

    lodash.set(securityContext, "AccessModel", accessModel);

    const canManage = aclHelper.canManage(securityContext, 'Services');
    if (canManage === false) {
      toastr.error("Access denied. You are not authorized to access this page.");
      return <div>You are not authorized to access this page.</div>;
    }

    return (
      <div role="presentation" className="workspace p-client-layout">
         { <ModalConfirm
          isOpen={this.state.isOpenOutpatientUpdateConfirm}
          title="Delete Outpatient Service"
          style={"margin: 0 auto !important;"}
          message="Are you sure you want to delete this item from the list? Please note that after the item has been removed from the list, you have to click Save to preserve the changes."
          onYes={() => {
          this.onDeleteOutpatientConfirmed(true);
        }}
          onNo={() => {
          this.onDeleteOutpatientConfirmed(false);
        }}
          onClose={() => {
          this.onDeleteOutpatientConfirmed(false);
        }}/> }

      { <ModalConfirm
          isOpen={this.state.isOpenInpatientUpdateConfirm}
          title="Delete Inpatient Service"
          style={"margin: 0 auto !important;"}
          message="Are you sure you want to delete this item from the list? Please note that after the item has been removed from the list, you have to click Save to preserve the changes."
          onYes={() => {
          this.onDeleteInpatientConfirmed(true);
        }}
          onNo={() => {
          this.onDeleteInpatientConfirmed(false);
        }}
          onClose={() => {
          this.onDeleteInpatientConfirmed(false);
        }}/> }

      { <ModalConfirm
          isOpen={this.state.isOpenServiceSubmitConfirm}
          title="Submit POC Service"
          style={"margin: 0 auto !important;"}
          message="You have unsaved data. Are you sure to continue then any unsaved data will be lost?"
          onYes={() => {
          this.onSubmitServiceConfirmed(true);
        }}
          onNo={() => {
          this.onSubmitServiceConfirmed(false);
        }}
          onClose={() => {
          this.onSubmitServiceConfirmed(false);
        }}/> }
        <PageHeader
          title="Plan Of Care - Part V. Services"
          manageMode="WorkspaceIndicator_Manage"
          links={[(<AuthorizedLink
          key="1"
          prefix={this
          .props
          .dataId
          .startsWith('poc')
          ? "/PlanOfCare/PlanOfCare"
          : "/PlanOfCares/PlanOfCare"}
          to={{
          pathname: 'summary',
          query: {
            dataId: this.props.dataId,
            clientId: this.props.clientId,
            moduleName: this
              .props
              .dataId
              .startsWith('poc')
              ? 'PlanOfCare'
              : 'PlanOfCare'
          }
        }}
          text="Back to Summary"/>)]}
          buttons={[(
            <button key="1" type="button" onClick={this.onClickSave}>Save</button>
          )]}/>
          <div className="reactWorkspace workspace-content-container">
          <form>
            <div className="genericform-style">
              <h4>Part V. Services</h4>
              <PocServicesForm 
                pocPart5={pocPart5}
                onClickCreateInpatient={this.onClickCreateInpatient}
                onClickUpdateInpatient={this.onClickUpdateInpatient}
                onClickCancel={this.onClickCancel}
                onClickEditInOutpatient={this.onClickEditInOutpatient}
                onClickDeleteInpatient={this.onClickDeleteInpatient}
                onClickViewInpatient={this.onClickViewInpatient}
                onClickDeleteOutpatient={this.onClickDeleteOutpatient}
                onClickViewOutpatient={this.onClickViewOutpatient}
                underEditing={underEditing}
                treatmentTypes={treatmentTypes}
                frequencyItems={frequencyItems}
                serviceDefinitionItems={serviceDefinitionItems}
                serviceDefinitions={serviceDefinitions}
                serviceOutcomeItems={serviceOutcomeItems}
                inpatientId={inpatientId}
                outpatientId={outpatientId}
                errors={errors}
                onFormChange={this.onFormChange}
                securityContext={securityContext}
                providerSearchResults={providerSearchResults}
                providerSearchCriteriaData={providerSearchCriteriaData}
                searchProviders={(searchCriteria)=>{this.props.actions.searchProviders(searchCriteria);}}
                selectedProvider={(provider)=>{this.props.actions.providerSelected(provider);this.fieldValidation({name:'ProviderName',value:provider.Id})}}
                loadProviderSearchCriteriaData={()=>{this.props.actions.loadProviderSearchCriteriaData()}}
                playGroundServices={playGroundServices}
                clientDefaultCounty={clientDefaultCounty}
                frequencyIds={frequencyIds}
                inpatientIndex={inpatientIndex}
                outpatientIndex={outpatientIndex}
                underOutpatientEditing={underOutpatientEditing}
                underInpatientEditing={underInpatientEditing}
                addTemporaryProvider={(provider)=>{this.props.actions.addTemporaryProvider(provider,this
      .context
      .router
      .getCurrentLocation()
      .query.prefix)}}
                removeTemporaryProvider={()=>{this.props.actions.removeTemporaryProvider()}}
                stateProvinceSelectList={stateProvinceSelectList}
                />
            </div>               
          </form>
        </div>
      </div>
    );

  }
}

PocPart5Page.contextTypes = {
  router: PropTypes.object
};

function readPlainJsonObjectFromState(stateObj) {
  return stateObj && stateObj.toJS
    ? stateObj.toJS()
    : stateObj;
}

function findEmptyServices() {
  return {
    TreatmentType: {} 
  };
}

PocPart5Page.propTypes = {
  actions: PropTypes.object.isRequired,
  pocPart5: PropTypes.any,
  dataId: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  errors: PropTypes.any,
  securityContext: PropTypes.object.isRequired,
  preDeleteSharedPlanning: PropTypes.object,
  planId: PropTypes.string,
  underEditing: PropTypes.bool,
  underDeleting: PropTypes.bool,
  sharePlanningIndex: PropTypes.any,
};

function mapStateToProps(state) {
  return {
    pocPart5: state
      .get('pocPart5Manage')
      .get('pocPart5') || [],
    dataId: state
      .get('pocPart5Manage')
      .get('dataId') || "",
    clientId: state
      .get('pocPart5Manage')
      .get('clientId') || "",
    playGroundServices: readPlainJsonObjectFromState(state.get('pocPart5Manage').get('playGroundServices')) || findEmptyServices(),
    preDeleteSharedPlanning: readPlainJsonObjectFromState(state.get('pocPart5Manage').get('preDeleteSharedPlanning')) || findEmptyServices(),
    underEditing: state
      .get('pocPart5Manage')
      .get('underEditing') || false,
    underDeleting: state
      .get('pocPart5Manage')
      .get('underDeleting') || false,
    treatmentTypes: state
      .get('pocPart5Manage')
      .get('treatmentTypes') || [],
    frequencyItems: state
      .get('pocPart5Manage')
      .get('frequencyItems') || [],
    serviceDefinitions: state
      .get('pocPart5Manage')
      .get('serviceDefinitions') || '',
    serviceDefinitionItems: state
      .get('pocPart5Manage')
      .get('serviceDefinitionItems') || [],
    serviceOutcomeItems: state
      .get('pocPart5Manage')
      .get('serviceOutcomeItems') || '',    
    errors: state
      .get('pocPart5Manage')
      .get('errors') || [],
    inpatientId: state
      .get('pocPart5Manage')
      .get('inpatientId') || '',
    outpatientId: state
      .get('pocPart5Manage')
      .get('outpatientId') || '',
    frequencyIds:state
      .get('pocPart5Manage')
      .get('frequencyIds') || {},    
    securityContext: state
      .get("pocPart5Manage")
      .get("securityContext") || {},
     providerSearchCriteriaData:state
      .get('pocPart5Manage')
      .get('providerSearchCriteriaData') ||{},
    providerSearchResults : state
      .get('pocPart5Manage')
      .get('providerSearchResults') && state
      .get('pocPart5Manage')
      .get('providerSearchResults')
      .toJS
      ? state
        .get('pocPart5Manage')
        .get('providerSearchResults')
        .toJS()
      : state
        .get('pocPart5Manage')
        .get('providerSearchResults') || [],
    clientDefaultCounty  : state
        .get('pocPart5Manage')
        .get('clientDefaultCounty'),
    inpatientIndex: state
        .get('pocPart5Manage')
        .get('inpatientIndex') || 0,
    outpatientIndex: state
        .get('pocPart5Manage')
        .get('outpatientIndex') || 0,
    underInpatientEditing: state
        .get('pocPart5Manage')
        .get('underInpatientEditing') || false,
    underOutpatientEditing: state
        .get('pocPart5Manage')
        .get('underOutpatientEditing') || false,
    stateProvinceSelectList: state
        .get('pocPart5Manage')
        .get('stateProvinceSelectList') || {},   
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(pocPart5Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PocPart5Page);