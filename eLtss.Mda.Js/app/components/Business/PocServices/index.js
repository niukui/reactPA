import React, {PropTypes} from 'react';
import NewCollapsiblePanel from 'components/Common/NewCollapsiblePanel';
import SectionStatus from 'components/MetadataDriven/SectionStatus';
import AuthorizedLink from 'components/Common/links/AuthorizedLink';
import * as aclHelper from 'utils/aclHelper';
import {formatJsonDate} from 'utils/dateHelper';
import OutpatientPopupView from './OutpatientPopupView';
import InpatientPopupView from './InpatientPopupView';

class PocServices extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state={
            outpatientIsOpen:false,
            inpatientIsOpen:false, 
            outPatientService:{},
            inPatientService:{}   
        }
        this.onClickViewOutpatient = this
            .onClickViewOutpatient
            .bind(this);
        this.onClickViewInpatient = this
            .onClickViewInpatient
            .bind(this);
        this.initializePopupState = this
            .initializePopupState
            .bind(this);
    }
    onClickViewOutpatient(service){
        this.setState({'outpatientIsOpen':true,'outPatientService':service})
    }
    
    onClickViewInpatient(service){
        this.setState({'inpatientIsOpen':true,'inPatientService':service})
    }
    
    initializePopupState(){
        this.setState({'outpatientIsOpen':false,'inpatientIsOpen':false})
    }

    render(){
        const {
            data,
            securityContext,
            metadata,
            section,
            componentsState,
            linkName,
            onSwitchExpandStatus,
            assignedProviders,
            moduleName,
            context
        } = this.props;

        if (!section || !section.Name) {
            return null;
        }
        
        if (!aclHelper.canAccess(securityContext, section.Name)) {
            return null;
        }

        const entityData = data[metadata.Name] && data[metadata.Name];
        
        const query = context
            .router
            .getCurrentLocation()
            .query;
  
        if (query.currentSection) {
            metadata.CurrentSection = query.currentSection.trim().split('.');
        }

        return (
            <NewCollapsiblePanel   
                statusIcon={(<SectionStatus fieldNamePrefix={''} section={section} data={entityData}/>)}
                title={section.DisplayName}
                name={section.Name}
                isExpand={this.props.isExpand}
                onStatusChange={this.props.onStatusChange}
                headers={[(<AuthorizedLink
                securityContext={securityContext}
                resourceName={section.Name}
                prefix={ metadata && metadata.Options.Prefix }
                key="1"
                text="Manage"
                to={{
                pathname: "pocServices",
                query: {
                    dataId: entityData.Id,
                    clientId: entityData.ClientId,
                    moduleName: moduleName,
                    prefix:  metadata && metadata.Options.Prefix
                }
            }}  
                activeClassName="active"/>)]}>   

                <OutpatientPopupView isOpen={this.state.outpatientIsOpen} service={this.state.outPatientService} initializePopupState={()=>{this.initializePopupState()}}/>
                
                <InpatientPopupView isOpen={this.state.inpatientIsOpen} service={this.state.inPatientService} initializePopupState={()=>{this.initializePopupState()}}/>
                
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
                            {entityData['InpatientServices'] && entityData['InpatientServices'].map((serviceinpatient, index) => (
                                <tr key={index}>
                                     {<td>{ serviceinpatient.Provider&&serviceinpatient.Provider.ProviderName } </td>}
                                    <td>{formatJsonDate(serviceinpatient.AdmissionDate)}</td>
                                    <td>{serviceinpatient.TotalLengthOfStay}</td>
                                    <td>{formatJsonDate(serviceinpatient.ExpectedDischargeDate)}</td>
                                    <td>{formatJsonDate(serviceinpatient.ActualDischargeDate)}</td>                              
                                    <td>{ <td>
                                        {<span>
                                                 <a
                                                    onClick={()=>{
                                                        this.onClickViewInpatient(serviceinpatient)
                                                        }
                                                    }
                                                 title="Quick View">Quick View</a>
                                            </span>
                                        }
                                    </td> }</td>
                                </tr>
                            ))}
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
                            {entityData['OutpatientServices'] && entityData['OutpatientServices'].map((serviceoutpatient, index) => (
                                <tr key={index}>
                                   <td>{serviceoutpatient.ServiceName}</td>
                                    <td>{serviceoutpatient.Provider&&serviceoutpatient.Provider.ProviderName}</td>
                                    <td>{serviceoutpatient.FrequencyUnits*serviceoutpatient.FrequencyDuration}</td>
                                    <td>{serviceoutpatient.FrequencyType && serviceoutpatient.FrequencyType.Name}</td>   
                                    { <td>
                                            {<span>
                                                 <a

                                                onClick={()=>{
                                                    this.onClickViewOutpatient(serviceoutpatient)
                                                    }
                                                }
                                                 title="Quick View">Quick View</a>
                                            </span>
                                            }
                                    </td> }
                                </tr>
                            ))}
                        </tbody> 
                    </table>                                         
                
            </NewCollapsiblePanel>
        )
    }
}

PocServices.propTypes = {
    isExpand: PropTypes.bool.isRequired,
    onStatusChange: PropTypes.func,
    data: PropTypes.object.isRequired,
    securityContext: PropTypes.object.isRequired,
    onClickDeleteInpatient: PropTypes.func,
    onClickViewInpatient: PropTypes.func,
    metadata: PropTypes.object,
    section: PropTypes.object,
    componentsState: PropTypes.object.isRequired,
    moduleName: PropTypes.string
};

export default PocServices;