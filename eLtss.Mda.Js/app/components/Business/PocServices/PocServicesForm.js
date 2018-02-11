import React, {PropTypes} from 'react';
import moment from 'moment';
import {formatJsonDate} from 'utils/dateHelper';
import {selectListItemsForDropdown, selectListItemsForMultiSelect} from 'utils/dropdownTransformer';
import DropdownList from 'components/Common/DropdownList';
import GroupDropdownList from 'components/Common/GroupDropdownList';
import DatePicker from 'components/Common/DatePicker';
import Multiselect from 'components/Common/Multiselect';
import TextInput from 'components/Common/TextInput';
import {ISP_WORKFLOW_STATUS} from 'utils/constants';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import * as aclHelper from 'utils/aclHelper';
import TextBox from 'components/Common/TextBox';
import Textarea from 'components/Common/Textarea';
import ServicesOutpatientSection from 'components/Business/PocServices/ServicesOutpatientSection';
import ServicesInpatientSection from 'components/Business/PocServices/ServicesInpatientSection';
import YesNoRadioButtonsViewer from 'components/MetadataDriven/Wrapper/editor/YesNoRadioButtons';
import PocProvider from './../PocProviders/index';
import OutpatientPopupView from './OutpatientPopupView';
import InpatientPopupView from './InpatientPopupView';
import TemporaryProviderPopup from './TemporaryProviderPopup';
import lodash from 'lodash';
import {formatPhoneNumber} from './phoneNumberConverter'

class PocServicesForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
          selectedProvider:'',
          providerServiceIds:[],
          frequencyItems: [],
          outpatientIsOpen:false,
          inpatientIsOpen:false,
          temporaryProviderIsOpen:false, 
          outPatientService:{},
          inPatientService:{},
          temporaryProvider:{},
          temporaryProviderErrors:{}
        }; 
        this.onClickViewOutpatient = this
            .onClickViewOutpatient
            .bind(this);
        this.onClickViewInpatient = this
            .onClickViewInpatient
            .bind(this);
        this.onAlertTemporaryProviderSection = this
            .onAlertTemporaryProviderSection
            .bind(this)    
        this.initializePopupState = this
            .initializePopupState
            .bind(this);
        this.onChangeForm = this
            .onChangeForm
            .bind(this);
        this.addTemporaryProvider = this
            .addTemporaryProvider
            .bind(this);
        this.temporaryProviderfieldValidation = this
            .temporaryProviderfieldValidation
            .bind(this);
        this.editTemporaryProvider=this
            .editTemporaryProvider
            .bind(this)
        this.removeTemporaryProvider=this
            .removeTemporaryProvider
            .bind(this)                       
    }

  onClickViewOutpatient(service){
    this.setState({'outpatientIsOpen':true,'outPatientService':service})
  }
  
  onClickViewInpatient(service){
    this.setState({'inpatientIsOpen':true,'inPatientService':service})
  }
  
  onAlertTemporaryProviderSection(e){
    this.setState({'temporaryProviderIsOpen':true,'temporaryProviderErrors':{},'temporaryProvider':this.props.playGroundServices.Provider&&this.props.playGroundServices.Provider.TemporaryProvider===true?this.props.playGroundServices.Provider:{}})
  }

  initializePopupState(){
    this.setState({'outpatientIsOpen':false,'inpatientIsOpen':false,'temporaryProviderIsOpen':false})
  }

  onChangeForm(e){
    if (e.preventDefault) {
      e.preventDefault();
    }
    let temporaryProvider = this.state.temporaryProvider;
    lodash.set(temporaryProvider, e.target.name, e.target.value);
    this.setState({temporaryProvider});
    this.setState({"temporaryProviderErrors":{}})
  }

  addTemporaryProvider(){
    let temporaryProvider=this.state.temporaryProvider;
    if(this.temporaryProviderfieldValidation(temporaryProvider)){    
      temporaryProvider.TemporaryProvider=true;
      this.props.addTemporaryProvider(temporaryProvider)
      this.setState({temporaryProviderIsOpen:false})
    }else{
      return false
    }  
  }

  editTemporaryProvider(e){
    e.preventDefault();
    e.stopPropagation();
    this.setState({'temporaryProviderIsOpen':true,'temporaryProviderErrors':{},'temporaryProvider':this.props.playGroundServices.Provider})
  }

  removeTemporaryProvider(e){
    e.preventDefault();
    e.stopPropagation();
    this.props.removeTemporaryProvider();
  }

  temporaryProviderfieldValidation(temporaryProvider){
    let temporaryProviderErrors={}
    let postalCodeReg=/^[0-9]{5}$/g;
    let phoneNumberReg=/^\(?[\d]{3}\)?[\s-\.]?[\d]{3}[\s-\.]?[\d]{4}$/g;
    if(!temporaryProvider.ProviderName){
      lodash.set(temporaryProviderErrors,"ProviderName","Provider Name is Required")
    }
    if(!temporaryProvider.Tin){
      lodash.set(temporaryProviderErrors,"Tin","Tin is Required")
    }
    if(!temporaryProvider.ProviderAddress){
      lodash.set(temporaryProviderErrors,"AddressLine1","AddressLine1 is Required")
      lodash.set(temporaryProviderErrors,"ProviderAddress.City","City is Required")
      lodash.set(temporaryProviderErrors,"ProviderAddress.StateProvince","State Province is Required")
      lodash.set(temporaryProviderErrors,"ProviderAddress.PostalCode","Zip Code is Required")
    }else{
      if(!temporaryProvider.ProviderAddress.AddressLine1){
        lodash.set(temporaryProviderErrors,"ProviderAddress.AddressLine1","AddressLine1 is Required")
      }
      if(!temporaryProvider.ProviderAddress.City){
        lodash.set(temporaryProviderErrors,"ProviderAddress.City","City is Required")
      }
      if(lodash.isEmpty(temporaryProvider.ProviderAddress.StateProvince)||!temporaryProvider.ProviderAddress.StateProvince.Id){
        lodash.set(temporaryProviderErrors,"ProviderAddress.StateProvince","State Province is Required")
      }
      if(!temporaryProvider.ProviderAddress.PostalCode){
        lodash.set(temporaryProviderErrors,"ProviderAddress.PostalCode","Zip Code is Required")
      }else{
        if(!postalCodeReg.test(temporaryProvider.ProviderAddress.PostalCode)){
          lodash.set(temporaryProviderErrors,"ProviderAddress.PostalCode","Zip Code Must be 5 digits")
        }
      }
    }
    
    if(!temporaryProvider.ProviderPhoneNumber){
      lodash.set(temporaryProviderErrors,"ProviderPhoneNumber","Phone Number is Required")
    }else{
      if(!phoneNumberReg.test(temporaryProvider.ProviderPhoneNumber.Number)){
        lodash.set(temporaryProviderErrors,"ProviderPhoneNumber","Please specify a valid phone number")
      }
    }
    if(lodash.isEmpty(temporaryProviderErrors)){
      return true
    }else{
      this.setState({"temporaryProviderErrors":temporaryProviderErrors})
    }
    return false
  }

  formUpdate(name, value) {
    this
      .props
      .onFormChange({
        target: {
          name: name,
          value: value
        }
      });
  }

  render() {
    const {
      pocPart5,
      underEditing,
      underDeleting,
      onClickCreateInpatient,
      onClickUpdateInpatient,
      onClickCancel,
      onClickEditInOutpatient,
      onClickDeleteInpatient,
      onClickDeleteOutpatient,
      treatmentTypes,
      frequencyItems,
      serviceDefinitionItems,
      serviceDefinitions,
      serviceOutcomeItems,
      inpatientId,
      outpatientId,
      errors,
      securityContext,
      playGroundServices,
      inpatientIndex,
      outpatientIndex,
      onFormChange,
      providerSearchResults,
      frequencyIds,
      underInpatientEditing,
      underOutpatientEditing,
      stateProvinceSelectList
    } = this.props;
    const renderActions = (playGroundServices, underEditing, securityContext) => {
      if (underEditing) {
        return (
          <div>
            <span className="addTo-button">
              <a
                onClick={(e) => {
                  onClickUpdateInpatient(e, playGroundServices, this.state.selectedProvider,this.props.inpatientIndex);
              }}
                role="button">Save Changes </a>
            </span>
            <span className="CancelEdit-link">
              <a
                onClick={(e) => {
                onClickCancel(e, playGroundServices);
              }}
                role="button">Cancel</a>
            </span>
          </div>
        );
      } else {
        const canAdd = aclHelper.canAdd(securityContext, "Services");
        return (
          <span className="addTo-button">
            <a
        onClick={(e) => {
              onClickCreateInpatient(e, playGroundServices, this.state.selectedProvider);
            }}
              role="button">Add New</a>
          </span>
        );
      }
    };

    const canDelete = ((securityContext) => {
      return aclHelper.canEdit(securityContext, "Services");
    })(securityContext);

    const canEdit = ((securityContext) => {
      return aclHelper.canEdit(securityContext, "Services");
    })(securityContext);

    return (
      <div>
        <fieldset className="fieldset-container-one">
          <legend className="legend-header-one">Manage Services</legend>
          <div className="row">
            <label  htmlFor="TreatmentType" className="complete-required">Treatment Type:
            <RequiredIndicator/></label>
            <DropdownList
              name="TreatmentType"
              id="TreatmentType"
              saveRequired={true}
              onChange={onFormChange}
              value={playGroundServices.TreatmentType}
              options={selectListItemsForDropdown(treatmentTypes || [], 'Value', "Text")}
              readonly={underEditing}
              />
               {errors.TreatmentType && <div className="error alert alert-danger">{errors.TreatmentType}</div>}
          </div>
          {
            playGroundServices.TreatmentType && playGroundServices.TreatmentType.Id === outpatientId
              ? <ServicesOutpatientSection
                  serviceDefinitionItems={serviceDefinitionItems}
                  onFormChange={onFormChange}
                  serviceOutcomeItems={serviceOutcomeItems}
                  frequencyItems={frequencyItems}
                  playGroundServices={playGroundServices}
                  serviceDefinitions={serviceDefinitions}
                  frequencyIds={frequencyIds}
                  errors={errors}/>
              : playGroundServices.TreatmentType && playGroundServices.TreatmentType.Id ===inpatientId ?<ServicesInpatientSection onFormChange={onFormChange} playGroundServices={playGroundServices}
              errors={errors}
            /> : '' 
                                             
          }
        </fieldset>
        
   {(!lodash.isEmpty(playGroundServices.TreatmentType)) && 
   ((playGroundServices.TreatmentType && playGroundServices.TreatmentType.Id===outpatientId && !lodash.isEmpty(playGroundServices.ServiceId))||playGroundServices.TreatmentType.Id===inpatientId)&&
      <fieldset className="fieldset-container-one">
        <legend className="legend-header-one float-left">Provider</legend>
        <div className="header-link">
          <div className="float-right" style={{marginLeft:"10px"}}><a href="javascript:void(0);" onClick={(e) => {this.onAlertTemporaryProviderSection (e)}}>Assign Temporary Provider</a></div>
          <PocProvider  title={"Search Provider"} onLoad={
              this.props.loadProviderSearchCriteriaData
              }
              searchProviders={this.props.searchProviders}
              providerSearchCriteriaData={this.props.providerSearchCriteriaData}
              providerSearchResults={providerSearchResults}
              providerSelected={this.props.selectedProvider}
              providerServiceIds={this.state.providerServiceIds}
              clientDefaultCounty={this.props.clientDefaultCounty}
              playGroundServices={playGroundServices}
              outpatientId={outpatientId}
              inpatientId={inpatientId}
              />
        </div>
        <div className="row  ">
          <label  htmlFor="ProviderName" className="complete-required">Provider Name:<RequiredIndicator/></label>
          < TextBox value = {playGroundServices.Provider &&  playGroundServices.Provider.ProviderName|| ""}
            name = "ProviderName" error = {errors.ProviderName}
            readonly = {true}
            onFormChange = {onFormChange} />

           {playGroundServices.Provider && playGroundServices.Provider.TemporaryProvider==true && 
           <button 
            style={{marginLeft:"10px"}} 
            onClick={this.removeTemporaryProvider}
            >Remove</button>}
            
            {lodash.isEmpty(playGroundServices.Provider)?<div className="error alert alert-danger">{errors.ProviderName}</div>:""} 
        </div>  
    
        <div className="row ">
          < label htmlFor = "ProviderId" >MCO Provider Number: </label> 
          < TextBox value = {playGroundServices.Provider && playGroundServices.Provider.ProviderNumber || ""}
              name = "ProviderId" error = {errors.ProviderId}readonly = {true} /> 
          {errors.ProviderId && <div className="error alert alert-danger">{errors.ProviderId}</div>}
        </div>  
    
        <div className="row ">
          <label  htmlFor="Tin">TIN:</label>
          <TextBox value={playGroundServices.Provider && playGroundServices.Provider.Tin ||""}
            name="Tin" error={errors.Tin} readonly= {true}/>
          {errors.Tin && <div className="error alert alert-danger">{errors.Tin}</div>}   
        </div>
    
        <div className="row ">
          <label  htmlFor="Npi">NPI:</label>
          <TextBox value={playGroundServices.Provider && playGroundServices.Provider.Npi ||""}
            name="Npi" error={errors.Npi} readonly= {true}/>
          {errors.Npi && <div className="error alert alert-danger">{errors.Npi}</div>}   
        </div> 
                  
        <div className="row ">  
          <label  htmlFor="ProviderEffectiveDate">Provider Effective Date:</label>
          <TextBox value={playGroundServices.Provider && formatJsonDate(playGroundServices.Provider.ProviderEffectiveDate ||"")}
            name="ProviderEffectiveDate" error={errors.ProviderEffectiveDate} readonly= {true}/>
          {errors.ProviderEffectiveDate && <div className="error alert alert-danger">{errors.ProviderEffectiveDate}</div>}
        </div>  
          
        <div className="row ">
          <label  htmlFor="ProviderTerminationDate">Provider Termination Date:</label>
            <TextBox value={playGroundServices.Provider && formatJsonDate(playGroundServices.Provider.ProviderTerminationDate ||"")}
              name="ProviderTerminationDate" error={errors.ProviderTerminationDate} readonly= {true}/>
            {errors.ProviderTerminationDate && <div className="error alert alert-danger">{errors.ProviderTerminationDate}</div>}
        </div>

        <div className="row ">  
          <label  htmlFor="ContractStatus">Contract Status:</label>
            <TextBox value={playGroundServices.Provider && playGroundServices.Provider.ContractStatus}
              name="ContractStatus" error={errors.ContractStatus} readonly= {true}/>
            {errors.ContractStatus && <div className="error alert alert-danger">{errors.ContractStatus}</div>}
        </div>
    
        <div className="row ">  
          <label  htmlFor="Par">PAR:</label>
          <TextBox value={playGroundServices.Provider && (playGroundServices.Provider.Par===true?"Yes": (playGroundServices.Provider.Par===false?"No":""))}
            name="Par" error={errors.Par} readonly= {true}/>
          {errors.Par && <div className="error alert alert-danger">{errors.Par}</div>}
        </div> 
    
        <div className="row ">   
          <label  htmlFor="NetworkId">Network ID:</label>
          <TextBox value={playGroundServices.Provider && playGroundServices.Provider.NetworkId ||""}
            name="NetworkId" error={errors.NetworkId} readonly= {true}/>
          {errors.NetworkId && <div className="error alert alert-danger">{errors.NetworkId}</div>}
        </div>
    
        <div className="row ">  
          <label  htmlFor="ProviderAddress">Provider Address:</label>
          <TextBox value={playGroundServices.Provider && playGroundServices.Provider.ProviderAddress && playGroundServices.Provider.ProviderAddress.FullAddress ||""}
            name="ProviderAddress" error={errors.ProviderAddress} readonly= {true}/>
          {errors.ProviderAddress && <div className="error alert alert-danger">{errors.ProviderAddress}</div>}
        </div> 
    
        <div className="row ">   
          <label  htmlFor="ProviderFaxNumber">Provider Fax Number:</label>
          <TextBox value={playGroundServices.Provider && playGroundServices.Provider.FaxNumber ||""}
            name="ProviderFaxNumber" error={errors.ProviderFaxNumber} readonly= {true}/>
          {errors.ProviderFaxNumber && <div className="error alert alert-danger">{errors.ProviderFaxNumber}</div>}
        </div>
    
        <div className="row ">  
          <label  htmlFor="Specialty">Specialty:</label>
          <TextBox value={playGroundServices.Provider && playGroundServices.Provider.Specialty ||""}
            name="Specialty" error={errors.Specialty} readonly= {true}/>
          {errors.Specialty && <div className="error alert alert-danger">{errors.Specialty}</div>}       
        </div>
    
        <div className="row ">     
          <label  htmlFor="ProviderPhoneNumber">Provider Phone Number:</label>
          <TextBox value={playGroundServices.Provider && playGroundServices.Provider.ProviderPhoneNumber && formatPhoneNumber(playGroundServices.Provider.ProviderPhoneNumber) ||""}
            name="ProviderPhoneNumber" error={errors.ProviderPhoneNumber} readonly= {true}/>
          {errors.ProviderPhoneNumber && <div className="error alert alert-danger">{errors.ProviderPhoneNumber}</div>}
        </div>
    
        <div>
          <label  htmlFor="ReasonForService">Reason for Service/Details:</label>
          <Textarea
            value={playGroundServices.ReasonForService}
            onChange={onFormChange}
            name="ReasonForService"
            id="ReasonForService">
          </Textarea>
        </div> 
      </fieldset>}
        <TemporaryProviderPopup isOpen={this.state.temporaryProviderIsOpen} temporaryProvider={this.state.temporaryProvider} initializePopupState={()=>{this.initializePopupState()}} errors={this.state.temporaryProviderErrors} onChangeForm={this.onChangeForm} addTemporaryProvider={this.addTemporaryProvider} stateProvinceSelectList={stateProvinceSelectList}/>
        <OutpatientPopupView isOpen={this.state.outpatientIsOpen} service={this.state.outPatientService} initializePopupState={()=>{this.initializePopupState()}}/>
        <InpatientPopupView isOpen={this.state.inpatientIsOpen} service={this.state.inPatientService} initializePopupState={()=>{this.initializePopupState()}}/>   
        <div className="add-to-table">
          <div className="center">
              {renderActions(playGroundServices, underEditing, securityContext)}
          </div>
          <table className="generalTable">
          <caption className="caption-header"><span>Inpatient Services</span></caption>
              <thead>
                  <tr>
                      <th>Provider Name</th>
                      <th>Admission Date</th>
                      <th>Total Length of Stay</th>
                      <th>Expected Discharge Date</th>
                      <th>Actual Discharge Date</th>
                      <th>Actions</th>                             
                  </tr>
              </thead>
              <tbody>
                { pocPart5 && pocPart5.InpatientServices && pocPart5.InpatientServices.map((service,index)=>(
                  <tr key={index}>
                    {<td>{ service.Provider&&service.Provider.ProviderName } </td>}
                    <td>{formatJsonDate(service.AdmissionDate)}</td>
                    <td>{service.TotalLengthOfStay}</td>
                    <td>{formatJsonDate(service.ExpectedDischargeDate)}</td>
                    <td>{formatJsonDate(service.ActualDischargeDate)}</td>
                    {<td>
                        {underInpatientEditing && inpatientIndex === index
                          ? <span>
                              <span className="icon-pencil"></span>
                              <b>Editing...</b>
                            </span>
                          : <span>
                              {canEdit && <a
                                  onClick={(e) => {
                                  onClickEditInOutpatient(e, service,index,'inpatient');
                              }}
                                  title="Edit this item">Edit</a>}
                              {canDelete && !underEditing && <a
                                  onClick={(e) => {
                                      onClickDeleteInpatient(e, service,index);
                              }}
                              title="Permanently delete this item">Delete</a>}
                                  
                                                 <a
                                  onClick={() => {
                                      this.onClickViewInpatient(service);
                                      }}
                                  title="Quick View">Quick View</a>
                          </span>
                          }
                    </td>}
                  </tr>
                  ))  
                }                    
              </tbody>
          </table>
          <table className="generalTable">
          <caption className="caption-header"><span>Outpatient Services</span></caption>
            <thead>
              <tr>
                <th>POC Service</th>
                <th>Provider Name(s)</th>
                <th>Units</th>
                <th>Frequency</th>
                <th>Actions</th>                             
              </tr>
            </thead>
            <tbody>
              { pocPart5 && pocPart5.OutpatientServices && pocPart5.OutpatientServices.map((service,index)=>(
                  <tr key={index}>
                    <td>{service.ServiceName}</td>
                    <td>{service.Provider&&service.Provider.ProviderName}</td>
                    <td>{service.FrequencyUnits*service.FrequencyDuration}</td>
                    <td>{service.FrequencyType && service.FrequencyType.Name}</td>                    
                    {<td>
                        {underOutpatientEditing && outpatientIndex === index
                          ? <span>
                              <span className="icon-pencil"></span>
                              <b>Editing...</b>
                            </span>
                          : <span>
                              {canEdit && <a
                                  onClick={(e) => {
                                  onClickEditInOutpatient(e, service,index, 'outpatient');
                              }}
                                  title="Edit this item">Edit</a>}
                              {canDelete && !underEditing &&<a
                                  onClick={(e) => {
                                      onClickDeleteOutpatient(e, service,index);
                              }}
                              title="Permanently delete this item">Delete</a>}

                                  
                              <a
                                  onClick={()=>{
                                    this.onClickViewOutpatient(service)
                                  }
                                  }
                                  title="Quick View">Quick View</a>
                          </span>
                          }
                    </td>}
                  </tr>
                  ))  
                }    
            </tbody>
        </table>                    
      </div>              
      </div>
        );
    }
}

        PocServicesForm.propTypes = {
            onClickCreateInpatient: PropTypes.func,
            onClickUpdateInpatient: PropTypes.func,
            onClickCancel: PropTypes.func,
            onClickEditInOutpatient: PropTypes.func,
            onClickDeleteInpatient: PropTypes.func,
            onClickViewInpatient: PropTypes.func,
            onClickDeleteOutpatient: PropTypes.func,
            onClickViewOutpatient: PropTypes.func,
            securityContext: PropTypes.object.isRequired,
            onFormChange: PropTypes.func,
            errors: PropTypes.object

        };

export default PocServicesForm;