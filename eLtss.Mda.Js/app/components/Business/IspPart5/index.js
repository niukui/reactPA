import React, {PropTypes} from 'react';
import moment from 'moment';
import {get, forEach, forOwn, every} from 'lodash';
import CollapsiblePanel from 'components/Common/CollapsiblePanel';
import NewCollapsiblePanel from 'components/Common/NewCollapsiblePanel';
import SubCollapsiblePanel from 'components/Common/SubCollapsiblePanel';
import SectionStatus from 'components/MetadataDriven/SectionStatus';
import SectionViewer from 'components/MetadataDriven/SectionViewer';
import IspPart5List from 'components/Business/IspPart5/IspPart5List';
import * as aclHelper from 'utils/aclHelper';
import ModalConfirm from "components/Common/ModalConfirm";
class Part5Section extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpenPlanSupportConfirm: false
        };
        this.providerHasBeenAssigned = this
            .providerHasBeenAssigned
            .bind(this);
        this.providerHasNotCompletedIsp = this
            .providerHasNotCompletedIsp
            .bind(this);
        this.onAddPlanSupport = this
            .onAddPlanSupport
            .bind(this);
        this.clickAddPlanSupport = this
            .clickAddPlanSupport
            .bind(this);
    }

    onAddPlanSupport(yes) {
        if (yes) {
            const query=this.context.router.getCurrentLocation().query;
            this
                .props
                .actions
                .addPlanForSupport(query.dataId, query.clientId, this.props.metadata);
        }
        this.setState({
            isOpenPlanSupportConfirm: !this.state.isOpenPlanSupportConfirm
        });
    }

    clickAddPlanSupport(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({isOpenPlanSupportConfirm: true});
    }

    providerHasBeenAssigned(identity, isp) {
        const attachedProviderIds = [];
        forEach(isp.SharedPlannings, (plan) => {
            forEach(plan.AttachedProviderIds, (providerId) => {
                if (attachedProviderIds.indexOf(providerId) < 0) {
                    attachedProviderIds.push(providerId);
                }
            });
        });

        const attachedOuIds = [];
        forEach(isp.AssignedProviders, (assignedProvider) => {
            if (attachedProviderIds.indexOf(assignedProvider.Id) >= 0) {
                attachedOuIds.push(assignedProvider.OwnerOrganizationUnitId);
            }
        });

        return attachedOuIds.indexOf(identity.OrganizationUnitId) >= 0;
    }

    providerHasNotCompletedIsp(identity, planForSupportList) {
        if (planForSupportList.length === 0) {
            return true;
        }
        let hasNotCompletedIsp = true;
        if (identity.AssignedUserRoles && identity.AssignedUserRoles.indexOf('roles/providerispapprover') >= 0) {
            hasNotCompletedIsp = !every(planForSupportList, (plan) => {
                return (plan.WorkflowStatus.Name === 'AllPartVsCompletedForTheProvider' 
                || plan.WorkflowStatus.Name === 'Discarded') && plan.WorkflowStatusLastModifiedTimestamp;
            });
        }
        return hasNotCompletedIsp;
    }
    render() {
        const {
            data,
            securityContext,
            metadata,
            section,
            componentsState,
            linkName,
            onSwitchExpandStatus
        } = this.props;

        if (!section || !section.Name) {
            return null;
        }
        const entityData = data && data[metadata && metadata.Name];
        if (entityData == null) {
            return null
        }
        return (
            <NewCollapsiblePanel
                title={section.DisplayName}
                name={section.Name}
                onStatusChange={this.props.onStatusChange}
                headers={[aclHelper.canManage(securityContext, 'PlanForSupport.AddPlanForSupport') 
                && this.providerHasBeenAssigned(securityContext.CurrentIdentity, data) 
                && this.providerHasNotCompletedIsp(securityContext.CurrentIdentity, planForSupportList) && (
                    <a key="1" href="javascript:void(0)" onClick={this.clickAddPlanSupport}>Add</a>
                )]}
                statusIcon={(<SectionStatus
                fieldNamePrefix=""
                data={data.PlanForSupportList || []}
                section={'PlanForSupport'}/>)}
                isExpand={this.props.isExpand}>
                <IspPart5List
                    plans={data.PlanForSupportList}
                    parentDataId={entityData.Id}
                    clientId={entityData.ClientId}
                    metadata={metadata}/>
                <ModalConfirm
                    isOpen={this.state.isOpenPlanSupportConfirm}
                    title="Add Plan for Support"
                    message="Are you sure you want to add a plan for support?"
                    onYes={() => {
                    this.onAddPlanSupport(true);
                }}
                    onNo={() => {
                    this.onAddPlanSupport(false);
                }}
                    onClose={() => {
                    this.onAddPlanSupport(false);
                }}/>
            </NewCollapsiblePanel>
        );
    }
}

Part5Section.propTypes = {
    isExpand: PropTypes.bool.isRequired,
    onStatusChange: PropTypes.func,
    section: PropTypes.object,
    data: PropTypes.object.isRequired,
    securityContext: PropTypes.object.isRequired,
    metadata: PropTypes.object,
    componentsState: PropTypes.object.isRequired
};

export default Part5Section;