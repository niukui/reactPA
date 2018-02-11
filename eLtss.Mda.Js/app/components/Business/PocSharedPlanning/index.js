import React, {PropTypes} from 'react';
import NewCollapsiblePanel from 'components/Common/NewCollapsiblePanel';
import SectionStatus from 'components/MetadataDriven/SectionStatus';
import AuthorizedLink from 'components/Common/links/AuthorizedLink';
import * as aclHelper from 'utils/aclHelper';
import {formatJsonDate} from 'utils/dateHelper';
//import SharnPlaningList from 'components/Business/SharedPlaning/SharnPlaningList';

class PocSharedPlanning extends React.Component {

    constructor(props, context) {
        super(props, context);
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
        
        const hasReadonlyAccess = aclHelper.canAccess(securityContext, section.Name);

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
                pathname: "sharedPlanning",
                query: {
                    dataId: entityData.Id,
                    clientId: entityData.ClientId,
                    moduleName: moduleName,
                    prefix:  metadata && metadata.Options.Prefix
                }
            }}  
                activeClassName="active"/>),
                (<AuthorizedLink
                    securityContext={securityContext}
                    resourceName={section.Name}
                    prefix={ metadata && metadata.Options.Prefix }
                    hasReadonlyAccess= {hasReadonlyAccess}
                    key="2"
                    text="Details"
                    to={{
                    pathname: "sharedPlanningDetail",
                    query: {
                        dataId: entityData.Id,
                        clientId: entityData.ClientId,
                        moduleName: moduleName,
                        prefix:  metadata && metadata.Options.Prefix
                    }
                }}  
                    activeClassName="active"/>)]}>    

                <table className="generalTable">
                        <thead>
                            <tr>
                                <th>CAP</th>
                                <th>Priority</th>
                                <th>Date Initiated</th>
                                <th>Date Next Review</th>
                                <th>Date Closed</th>                             
                            </tr>
                        </thead>
                        <tbody>
                            {entityData[section.Name] && entityData[section.Name].map((sharedPlanning, index) => (
                                <tr key={index}>
                                    <td>{sharedPlanning.Cap && sharedPlanning.Cap.Name}</td>
                                    <td>{sharedPlanning.Priority && sharedPlanning.Priority.Name}</td>
                                    <td>{formatJsonDate(sharedPlanning.DateInitiated)}</td> 
                                    <td>{formatJsonDate(sharedPlanning.DateNextReview)}</td>
                                    <td>{sharedPlanning.HaveDateClosed===this.props.data.HaveDateClosedTbdId?'TBD':formatJsonDate(sharedPlanning.DateClosed)}</td>                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>                                    
                
            </NewCollapsiblePanel>
        )
    }
}

PocSharedPlanning.propTypes = {
    isExpand: PropTypes.bool.isRequired,
    onStatusChange: PropTypes.func,
    data: PropTypes.object.isRequired,
    securityContext: PropTypes.object.isRequired,
    metadata: PropTypes.object,
    section: PropTypes.object,
    componentsState: PropTypes.object.isRequired,
    moduleName: PropTypes.string
};

export default PocSharedPlanning;