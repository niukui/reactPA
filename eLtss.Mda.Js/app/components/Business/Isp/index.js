import React, {PropTypes} from 'react';
import {get} from 'lodash';
import ModalConfirm from "components/Common/ModalConfirm";
import AuthorizedLink from 'components/Common/links/AuthorizedLink';
import * as aclHelper from 'utils/aclHelper';
import NewCollapsiblePanel from 'components/Common/NewCollapsiblePanel';
import IspOverviewDetails from 'components/Business/Isp/IspOverviewDetails';

class Overview extends React.Component {
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
            ispId,
            clientId
        } = this.props;

        if (!section || !section.Name) {
            return null;
        }
        
        const entityData = data[metadata.Name] && data[metadata.Name];
        if(!entityData)
        {
            return null;
        }

        return (
             <NewCollapsiblePanel
              title={section.DisplayName}
              name={section && section.Name}
              isExpand={this.props.isExpand}
              onStatusChange={this.props.onStatusChange}
              headers={[(<AuthorizedLink
              securityContext={securityContext}
              resourceName={`${metadata.Name}.Overview`}
              key="1"
              text="Edit"
              prefix={ metadata && metadata.Options.Prefix }
              to={{
              pathname: 'overviewedit',
              query: {
                dataId: entityData.Id,
                clientId: entityData.ClientId,
                moduleName: metadata.Name
              }
            }}
              activeClassName="active"/>)]}>
              <IspOverviewDetails
                entityData = {entityData}
                metadata = {metadata}
                workflowStatus={securityContext.WorkflowStatus}/>
            </NewCollapsiblePanel>
        );
    }
}

Overview.propTypes = {
    isExpand: PropTypes.bool.isRequired,
    onStatusChange: PropTypes.func,
    data: PropTypes.object.isRequired,
    metadata: PropTypes.object,
    section: PropTypes.object,
    securityContext: PropTypes.object.isRequired,
    componentsState: PropTypes.object.isRequired,

};

export default Overview;