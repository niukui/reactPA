import React, {PropTypes} from 'react';
import moment from 'moment';
import CollapsiblePanel from 'components/Common/CollapsiblePanel';
import NewCollapsiblePanel from 'components/Common/NewCollapsiblePanel';
import SubCollapsiblePanel from 'components/Common/SubCollapsiblePanel';
import SectionViewer from 'components/MetadataDriven/SectionViewer';
import SpServiceList from './SpServiceList';
import ModalConfirm from "components/Common/ModalConfirm";
import * as aclHelper from 'utils/aclHelper';
import {get, isString} from 'lodash';
import SpServiceEdit from './SpServiceEdit';

class SpServicesSection extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            deleteServiceId: '',
            isOpenDeleteServiceConfirm: false
        };

        this.onSave = this
            .onSave
            .bind(this);
        this.onSaveBudgets = this
            .onSaveBudgets
            .bind(this);
        this.onDeleteService = this
            .onDeleteService
            .bind(this);
        this.clickDeleteService = this
            .clickDeleteService
            .bind(this);
    }

    clickDeleteService(serviceId) {
        this.setState((prevState, props) => ({deleteServiceId: serviceId, isOpenDeleteServiceConfirm: true}));
    }

    onDeleteService(yes, id) {
        if (yes) {
            this
                .props
                .actions
                .deleteService(id, this.state.deleteServiceId);
        }
        this.setState((prevState, props) => ({
            deleteServiceId: '',
            isOpenDeleteServiceConfirm: !this.state.isOpenDeleteServiceConfirm
        }));
    }

    onSave(spService) {
        this
            .props
            .actions
            .saveService(this.props.data.SupportsPackage.Id, spService);
    }

    onSaveBudgets(spBudgets){
        this.props.actions.saveBudgets(this.props.data.SupportsPackage.Id, spBudgets);
    }

    render() {
        const {data, securityContext, metadata, componentsState} = this.props;

        if (!data||!metadata || !metadata.Name) {
            return null;
        }


    const canAddService = ((securityContext)=>{
            return aclHelper.canManage(securityContext, "Services.delete");
        })(securityContext);
        
    const canRemoveService = ((securityContext)=>{
            return aclHelper.canManage(securityContext, "Services.delete");
        })(securityContext);
    
    const canEditService = ((securityContext)=>{
            return aclHelper.canManage(securityContext, "Services.edit");
        })(securityContext);

        return (
            <NewCollapsiblePanel
                title={metadata.DisplayName}
                name={metadata.Name}
                isExpand={this.props.isExpand}
                onStatusChange={this.props.onStatusChange}
                headers={[canAddService && (<SpServiceEdit
                key="1"
                title="Add"
                onFinish=
                {() => {}}
                spService={{}}
                onSave={this.onSave}
                canSelectService={canAddService}
                serviceSelectList={data && data.DropDownDataSource && data.DropDownDataSource.ServiceSelectList}/>)]}>

                {< SpServiceList
                canEdit = {
                    canEditService
                }
                canDelete = {
                    canRemoveService
                }
                spServices = {
                    data.SupportsPackage.Services.SpServices || []
                }
                spBudgets = {
                    data.SupportsPackage.Services.SpBudgets || []
                }
                serviceSelectList = {
                    data && data.DropDownDataSource && data.DropDownDataSource.ServiceSelectList
                }
                onDelete = {
                    this.clickDeleteService
                }
                onSave = {
                    this.onSave
                }
                onSaveBudgets ={
                    this.onSaveBudgets
                } />}

                <ModalConfirm
                    isOpen={this.state.isOpenDeleteServiceConfirm}
                    title="Delete Service"
                    message="Are you sure you want to delete this service?"
                    onYes={() => {
                    this.onDeleteService(true, data.SupportsPackage.Id);
                }}
                    onNo={() => {
                    this.onDeleteService(false);
                }}
                    onClose={() => {
                    this.onDeleteService(false);
                }}/>
            </NewCollapsiblePanel>
        );
    }
}

SpServicesSection.propTypes = {
    isExpand: PropTypes.bool.isRequired,
    onStatusChange: PropTypes.func,
    data: PropTypes.object.isRequired,
    securityContext: PropTypes.object.isRequired,
    metadata: PropTypes.object,
    componentsState: PropTypes.object.isRequired,
    actions: PropTypes.any
};

export default SpServicesSection;