import React, {PropTypes} from 'react';
import moment from 'moment';
import CollapsiblePanel from 'components/Common/CollapsiblePanel';
import NewCollapsiblePanel from 'components/Common/NewCollapsiblePanel';
import SubCollapsiblePanel from 'components/Common/SubCollapsiblePanel';
import SectionViewer from 'components/MetadataDriven/SectionViewer';
import ModalConfirm from "components/Common/ModalConfirm";
import * as aclHelper from 'utils/aclHelper';
import {get} from 'lodash';
import ReactModal from "react-modal";
import requestApi from 'utils/requestApi';
import TextBox from 'components/Common/TextBox';
import Textarea from 'components/Common/Textarea';
import {formatJsonDate} from 'utils/dateHelper';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import {formatPhoneNumber} from './phoneNumberConverter';

class OutpatientPopupView extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this
            .handleClose
            .bind(this);      
    }
        
    handleClose(e) {
        this.closeDialog(e);
    }


    closeDialog(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.initializePopupState();
    }

    render() {
        const {
            isOpen,
            service
        } = this.props;
        return (
            <ReactModal
                className="providerSearchModal"
                overlayClassName="overlay"
                contentLabel=""
                isOpen={isOpen}>    
                <h4 className="confirm-title">Outpatient Service Detail
                    <span>
                        <button onClick={this.handleClose}>X</button>
                    </span>
                </h4>
                <fieldset className="fieldset-container-one">
                    <legend className="legend-header-one">Outpatient Service</legend>
                    <fieldset className="fieldset-container-three">
                        <div className="row">
                            <label  htmlFor="ServiceType" className="complete-required">POC Service:<RequiredIndicator/>
                            </label>
                            <TextBox 
                                name="service.ServiceName"
                                value={service.ServiceName} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.Explain">Explain:</label>
                            <Textarea 
                                name="service.Explain" 
                                value={service.Explain} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.FrequencyType" className="complete-required">Frequency Type:<RequiredIndicator/></label>
                            <TextBox 
                                name="service.FrequencyType.Name" 
                                value={service.FrequencyType && service.FrequencyType.Name} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.FrequencyUnits" className="complete-required">Frequency Units:<RequiredIndicator/></label>
                            <TextBox 
                                name="service.FrequencyUnits" 
                                value={service.FrequencyUnits} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.FrequencyDuration" className="complete-required">Frequency Duration:<RequiredIndicator/></label>
                            <TextBox 
                                name="service.FrequencyDuration" 
                                value={service.FrequencyDuration} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.TotalUnitsRequested">Total Units Requested:</label>
                            <TextBox 
                                name="service.TotalUnitsRequested" 
                                value={service.TotalUnitsRequested} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.PreferredSchedule">Preferred Schedule:</label>
                            <TextBox 
                                name="service.PreferredSchedule"
                                value={service.PreferredSchedule}
                                readonly={true}/>              
                        </div>
                        <div className="row">
                            <label  htmlFor="service.ServiceStartDate" className="complete-required">Service Start Date:<RequiredIndicator/></label>
                            <TextBox 
                                name="service.ServiceStartDate" 
                                value={formatJsonDate(service.ServiceStartDate)} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.ServiceEndDate" className="complete-required">Service End Date:<RequiredIndicator/></label>
                            <TextBox 
                                name="service.ServiceEndDate" 
                                value={formatJsonDate(service.ServiceEndDate)} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.ServiceOutcome.Name" className="complete-required">Service Outcome:<RequiredIndicator/></label>
                            <TextBox 
                                name="service.ServiceOutcome.Name" 
                                value={service.ServiceOutcome && service.ServiceOutcome.Name} 
                                readonly={true}/>
                        </div>
                    </fieldset>    
                </fieldset>

                <fieldset className="fieldset-container-one">
                    <legend className="legend-header-one">Provider Information</legend>
                    <fieldset className="fieldset-container-three">
                        <div className="row">
                            <label  htmlFor="service.Provider.ProviderName" className="complete-required">Provider Name:<RequiredIndicator/></label>
                            <TextBox 
                                name="Provider.ProviderName" 
                                value={service.Provider && service.Provider.ProviderName} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.Provider.ProviderId">MCO Provider Number:</label>
                            <TextBox 
                                name="Provider.ProviderId" 
                                value = {service.Provider && service.Provider.ProviderNumber || ""} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.Provider.Tin">TIN:</label>
                            <TextBox 
                                name="Provider.Tin" 
                                value={service.Provider && service.Provider.Tin} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.Provider.Npi">NPI:</label>
                            <TextBox 
                                name="Provider.Npi" 
                                value={service.Provider && service.Provider.Npi} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.Provider.ProviderEffectiveDate">Provider Effective Date:</label>
                            <TextBox 
                                name="Provider.ProviderEffectiveDate" 
                                value={service.Provider && formatJsonDate(service.Provider.ProviderEffectiveDate || "")}
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.Provider.EffectiveDateNoLongerInNetwork">Provider Termination Date:</label>
                            <TextBox 
                                name="Provider.EffectiveDateNoLongerInNetwork" 
                                value={service.Provider && formatJsonDate(service.Provider.ProviderTerminationDate || "")} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.Provider.ContractStatus">Contract Status:</label>
                            <TextBox 
                                name="Provider.ContractStatus" 
                                value={service.Provider && service.Provider.ContractStatus} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.Provider.Par">PAR:</label>
                            <TextBox 
                                name="Provider.Par" 
                                value={service.Provider && (service.Provider.Par===true?"Yes": (service.Provider.Par===false?"No":""))} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.Provider.NetworkId">Network ID:</label>
                            <TextBox 
                                name="Provider.NetworkId" 
                                value={service.Provider && service.Provider.NetworkId ||""}
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.Provider.ProviderAddress">Provider Address:</label>
                            <TextBox 
                                name="Provider.ProviderAddress" 
                                value={service.Provider && service.Provider.ProviderAddress && service.Provider.ProviderAddress.FullAddress ||""} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.Provider.ProviderFaxNumber">Provider Fax Number:</label>
                            <TextBox 
                                name="Provider.ProviderFaxNumber" 
                                value={service.Provider && service.Provider.ProviderFaxNumber ||""} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.Provider.Specialty">Specialty:</label>
                            <TextBox 
                                name="Provider.Specialty" 
                                value={service.Provider && service.Provider.Specialty ||""} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.Provider.ProviderPhoneNumber.Number">Provider Phone Number:</label>
                            <TextBox 
                                name="Provider.ProviderPhoneNumber" 
                                value={service.Provider && service.Provider.ProviderPhoneNumber && formatPhoneNumber(service.Provider.ProviderPhoneNumber) ||""} 
                                readonly={true}/>
                        </div>
                    </fieldset>    
                </fieldset>        
            </ReactModal>
            
        );
    }
}

OutpatientPopupView.propTypes = {
    service:PropTypes.object,
    isOpen:PropTypes.bool
};

export default OutpatientPopupView;