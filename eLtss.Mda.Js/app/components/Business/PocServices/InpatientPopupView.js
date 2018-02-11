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

class InpatientPopupView extends React.Component {
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
            service,
            isOpen
        } = this.props;
        return (
            <ReactModal
                className="providerSearchModal"
                overlayClassName="overlay"
                contentLabel=""
                isOpen={isOpen}>
                <h4 className="confirm-title">Inpatient Service Detail
                    <span>
                        <button onClick={this.handleClose}>X</button>
                    </span>
                </h4>
                <fieldset className="fieldset-container-one">
                    <legend className="legend-header-one">Inpatient Service</legend>
                    <fieldset className="fieldset-container-three">
                        <div className="row">
                            <label  htmlFor="service.AdmissionDate" className="complete-required">Admission Date:<RequiredIndicator/></label>
                            <TextBox 
                                name="service.AdmissionDate" 
                                value={formatJsonDate(service.AdmissionDate)} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.TotalLengthOfStay" className="complete-required">Total Length Of Stay:<RequiredIndicator/></label>
                            <TextBox 
                                name="service.TotalLengthOfStay" 
                                value={service.TotalLengthOfStay} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.ExpectedDischargeDate">Expected Discharge Date:</label>
                            <TextBox 
                                name="service.ExpectedDischargeDate" 
                                value={formatJsonDate(service.ExpectedDischargeDate)} 
                                readonly={true}/>
                        </div>
                        <div className="row">
                            <label  htmlFor="service.ActualDischargeDate">Actual Discharge Date:</label>
                            <TextBox 
                                name="service.ActualDischargeDate" 
                                value={formatJsonDate(service.ActualDischargeDate)} 
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

InpatientPopupView.propTypes = {
    service:PropTypes.object,
    isOpen:PropTypes.bool
};

export default InpatientPopupView;