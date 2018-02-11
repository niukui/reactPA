import React, {PropTypes} from 'react';
import moment from 'moment';
import CollapsiblePanel from 'components/Common/CollapsiblePanel';
import NewCollapsiblePanel from 'components/Common/NewCollapsiblePanel';
import SubCollapsiblePanel from 'components/Common/SubCollapsiblePanel';
import SectionViewer from 'components/MetadataDriven/SectionViewer';
import ProviderSearchPanel from './ProviderSearchPanel';
import ProvidersDetails from './ProvidersDetails';
import ModalConfirm from "components/Common/ModalConfirm";
import * as aclHelper from 'utils/aclHelper';
import {get} from 'lodash';

class ProvidersSection extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            deleteProviderId: '',
            isOpenDeleteProviderConfirm: false,
            isOpenProviderCompleteConfirm: false
        };
        this.onProviderSearch = this
            .onProviderSearch
            .bind(this);
        this.onSelectProvider = this
            .onSelectProvider
            .bind(this);
        this.onDeleteProvider = this
            .onDeleteProvider
            .bind(this);
        this.clickDeleteProvider = this
            .clickDeleteProvider
            .bind(this);
    }

    onProviderSearch(searchCriteria) {
        this
            .props
            .actions
            .searchProviders(searchCriteria);
    }

    onSelectProvider(providerId, ownerOrganizationUnitId, entityData) {
        this
            .props
            .actions
            .selectProvider(providerId, ownerOrganizationUnitId, entityData.Id, entityData.ClientId, this.props.data, this.props.metadata);
    }

    clickDeleteProvider(providerId) {
        this.setState((prevState, props) => ({deleteProviderId: providerId, isOpenDeleteProviderConfirm: true}));
    }

    onDeleteProvider(yes, id, clientId) {
        if (yes) {
            this
                .props
                .actions
                .deleteProvider(id, this.state.deleteProviderId, clientId, this.props.data, this.props.metadata);
        }
        this.setState((prevState, props) => ({
            deleteProviderId: '',
            isOpenDeleteProviderConfirm: !this.state.isOpenDeleteProviderConfirm
        }));
    }

    render() {
        const {
            data,
            securityContext,
            metadata,
            section,
            componentsState
        } = this.props;

        if (!section || !section.Name) {
            return null;
        }

        const entityData = data[metadata.Name] && data[metadata.Name];
        if(!entityData)
        {
            return null;
        }

        let canAddProvider = aclHelper.canManage(securityContext, 'Providers.AddProvider');
        let canRemoveProvider = aclHelper.canManage(securityContext, 'Providers.RemoveProvider');

        return (
            <NewCollapsiblePanel
                title={section.DisplayName}
                name={section.Name}
                isExpand={this.props.isExpand}
                onStatusChange={this.props.onStatusChange}
                headers={[canAddProvider && (<ProviderSearchPanel
                key="1"
                title="Add"
                onFinish=
                {() => {}}
                onSelectProvider={this.onSelectProvider}
                onSearch={this.onProviderSearch}
                entityData={entityData}
                providerSearchResults={data && data.ProviderSearchResults}
                providerSearchCriteriaData={data && data.ProviderSearchCriteriaData}/>)]}>
                <ProvidersDetails
                    canEdit = {canRemoveProvider}
                    entityData = {entityData}
                    onDelete = {this.clickDeleteProvider}/>
                <ModalConfirm
                    isOpen={this.state.isOpenDeleteProviderConfirm}
                    title="Delete Assigned Provider"
                    message="Are you sure you want to delete this assigned provider?"
                    onYes={() => {
                    this.onDeleteProvider(true, entityData.Id, entityData.ClientId);
                }}
                    onNo={() => {
                    this.onDeleteProvider(false);
                }}
                    onClose={() => {
                    this.onDeleteProvider(false);
                }}/>
            </NewCollapsiblePanel>
        );
    }
}

ProvidersSection.propTypes = {
    isExpand: PropTypes.bool.isRequired,
    onStatusChange: PropTypes.func,
    data: PropTypes.object.isRequired,
    securityContext: PropTypes.object.isRequired,
    metadata: PropTypes.object,
    section: PropTypes.object,
    componentsState: PropTypes.object.isRequired,
    actions:PropTypes.any
};

export default ProvidersSection;