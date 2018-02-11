import React, {PropTypes} from 'react';
import moment from 'moment';
import CollapsiblePanel from 'components/Common/CollapsiblePanel';
import NewCollapsiblePanel from 'components/Common/NewCollapsiblePanel';
import SubCollapsiblePanel from 'components/Common/SubCollapsiblePanel';
import SectionStatus from 'components/MetadataDriven/SectionStatus';
import SectionViewer from 'components/MetadataDriven/SectionViewer';
import IspPart3List from 'components/Business/IspPart3/IspPart3List';
import AuthorizedLink from 'components/Common/links/AuthorizedLink';
import * as aclHelper from 'utils/aclHelper';
import {get} from 'lodash';

class IspPart3 extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {
            data,
            securityContext,
            metadata,
            section,
            componentsState,
            linkName,
            onSwitchExpandStatus,
            assignedProviders,
            moduleName
        } = this.props;

        if (!section || !section.Name) {
            return null;
        }
        
        if (!aclHelper.canAccess(securityContext, section.Name)) {
            return null;
        }
        const entityData = data[metadata.Name] && data[metadata.Name];
        if(!entityData)
        {
            return null;
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
                pathname: "part3Manage",
                query: {
                    dataId: entityData.Id,
                    clientId: entityData.ClientId,
                    moduleName: moduleName,
                    prefix:  metadata && metadata.Options.Prefix
                }
            }}
                activeClassName="active"/>)]}>
                {entityData.SharedPlannings && <IspPart3List
                    noActions
                    securityContext={securityContext}
                    sharedPlannings={entityData.SharedPlannings}
                    assignedProviders={entityData.AssignedProviders}/>}
                    
            </NewCollapsiblePanel>
        );
    }
}

IspPart3.propTypes = {
    isExpand: PropTypes.bool.isRequired,
    onStatusChange: PropTypes.func,
    data: PropTypes.object.isRequired,
    securityContext: PropTypes.object.isRequired,
    metadata: PropTypes.object,
    section: PropTypes.object,
    componentsState: PropTypes.object.isRequired,
    moduleName: PropTypes.string
};

export default IspPart3;