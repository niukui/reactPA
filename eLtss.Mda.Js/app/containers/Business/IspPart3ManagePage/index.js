import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PageHeader from 'components/Common/PageHeader';
import SharedPlanningForm from 'components/Business/IspPart3/SharedPlanningForm';
import SharedPlanningAddToTable from 'components/Business/IspPart3/SharedPlanningAddToTable';
import AuditTrailDetails from 'components/Business/AuditTrail/AuditTrailDetails';
import * as ispPart3Actions from './actions';
import ModalConfirm from "components/Common/ModalConfirm";
import AuthorizedLink from 'components/Common/links/AuthorizedLink';
import * as aclHelper from 'utils/aclHelper';
import {getAccessControlFromCache} from 'services/accessControlServices';
import toastr from "utils/toastr";
import {browserHistory} from 'react-router';
import path from 'path';
import moment from 'moment';
import lodash from 'lodash';
import {ISP_WORKFLOW_STATUS} from 'utils/constants';

class IspPart3Page extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      accessModel: {},
      currentSharedPlanning: {},
      isOpenSharedPlanningUpdateConfirm: false
    };
    this.onClickCreate = this
      .onClickCreate
      .bind(this);
    this.onClickUpdate = this
      .onClickUpdate
      .bind(this);
    this.onFormChange = this
      .onFormChange
      .bind(this);
    this.onClickEdit = this
      .onClickEdit
      .bind(this);
    this.onClickDelete = this
      .onClickDelete
      .bind(this);
    this.onClickCancel = this
      .onClickCancel
      .bind(this);
    this.onUpdateConfirm = this
      .onUpdateConfirm
      .bind(this);
    this.onDeleteConfirmed = this
      .onDeleteConfirmed
      .bind(this);
    this.formValidation = this
      .formValidation
      .bind(this);
    this.fieldValidation = this
      .fieldValidation
      .bind(this);
  }

  componentWillMount() {
    const _this = this;
    const query = this
      .context
      .router
      .getCurrentLocation()
      .query;
    getAccessControlFromCache(query.moduleName).then((accessModel) => {
      _this.setState({accessModel});
    });
  }

  componentDidMount() {
    this
      .props
      .actions
      .refreshPlayGroundSharedPlanning(findEmptySharedPlanning());

    const query = this
      .context
      .router
      .getCurrentLocation()
      .query;
    this
      .props
      .actions
      .loadIspPart3(query.dataId, query.clientId, query.prefix);
    this
      .props
      .actions
      .formValidated({});
  }

  fieldValidation(sharedPlanning, field) {
    let errors = this.props.errors;
    if (field.value) {
      errors[field.name] = null;
    } else {
      errors[field.name] = "Field is required.";
    }
    this
      .props
      .actions
      .formValidated(errors);
  }

  formValidation(sharedPlanning) {
    let formIsValid = true;
    let errors = {};
    if (!sharedPlanning.LifeArea.Id) {
      errors.LifeArea = "Life area is required.";
      formIsValid = false;
    }
    if (!sharedPlanning.DesiredOutcome) {
      errors.DesiredOutcome = "Desired outcome is required.";
      formIsValid = false;
    }
    if (!sharedPlanning.WhenNoLongerNeedSupport) {
      errors.WhenNoLongerNeedSupport = "Field is required.";
      formIsValid = false;
    }
    if (!sharedPlanning.SupportType.Id) {
      errors.SupportType = "Field is required.";
      formIsValid = false;
    }
    if (!sharedPlanning.StartDate) {
      errors.StartDate = "Start Date is required.";
      formIsValid = false;
    }
    if (!sharedPlanning.EndDate) {
      errors.EndDate = "End Date is required.";
      formIsValid = false;
    }

    if (sharedPlanning.StartDate && sharedPlanning.EndDate) {
      if (moment(sharedPlanning.StartDate) >= moment(sharedPlanning.EndDate)) {
        errors.EndDate = "End Date should greater than Start Date.";
        formIsValid = false;
      }
    }

    this
      .props
      .actions
      .formValidated(errors);
    return formIsValid;
  }

  onClickCreate(e, sharedPlanning) {
    e.preventDefault();
    if (this.formValidation(sharedPlanning)) {
      const query = this
        .context
        .router
        .getCurrentLocation()
        .query;
      this
        .props
        .actions
        .createSharedPlanning(sharedPlanning, query.dataId, this.props.ispPart3, query.prefix);
    }
  }

  onClickUpdate(e, sharedPlanning) {
    e.preventDefault();
    if (this.formValidation(sharedPlanning)) {
      if (this.props.securityContext.WorkflowStatus.Name == ISP_WORKFLOW_STATUS.ispCompleted) {
        this.setState((prevState, props) => ({isOpenSharedPlanningUpdateConfirm: true, currentSharedPlanning: sharedPlanning}));
      } else {
        const query = this
          .context
          .router
          .getCurrentLocation()
          .query;
        this
          .props
          .actions
          .updateSharedPlanning(sharedPlanning, query.dataId, this.props.ispPart3, query.prefix);
      }
    }
  }

  onUpdateConfirm(yes) {
    if (yes) {
      const query = this
        .context
        .router
        .getCurrentLocation()
        .query;
      this
        .props
        .actions
        .updateSharedPlanning(this.state.currentSharedPlanning, query.dataId, this.props.ispPart3, query.prefix);
    }

    this.setState((prevState, props) => ({isOpenSharedPlanningUpdateConfirm: false, currentSharedPlanning: {}}))
  }

  onFormChange(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    this
      .props
      .actions
      .changeSharedPlanningForm(e.target.name, e.target.value);
    this.fieldValidation(this.props.playGroundSharedPlanning, e.target);
  }

  onClickEdit(e, sharedPlanning) {
    this
      .props
      .actions
      .refreshPlayGroundSharedPlanning(sharedPlanning);
    this
      .props
      .actions
      .startSharedPlanningEditing();
    this
      .props
      .actions
      .formValidated({});
  }

  onClickDelete(e, sharedPlanning) {
    e.preventDefault();
    this
      .props
      .actions
      .startSharedPlanningDeleting(sharedPlanning);
  }

  onDeleteConfirmed(confirmDelete) {
    if (confirmDelete) {
      const query = this
        .context
        .router
        .getCurrentLocation()
        .query;
      this
        .props
        .actions
        .deleteIspPart3Item(this.props.preDeleteSharedPlanning, query.dataId, this.props.ispPart3, query.prefix);
    }
    this
      .props
      .actions
      .sharedPlanningDeletingConfirmed();
  }

  onClickCancel(e) {
    this
      .props
      .actions
      .refreshPlayGroundSharedPlanning(findEmptySharedPlanning());
    this
      .props
      .actions
      .startSharedPlanningCreating();
    this
      .props
      .actions
      .formValidated({});
  }

  render() {
    const {
      ispPart3,
      planId,
      playGroundSharedPlanning,
      underEditing,
      underDeleting,
      lifeAreas,
      supportTypes,
      assignedProviders,
      errors,
      securityContext,
      auditTrails
    } = this.props;
    const {accessModel} = this.state;
    if (lodash.keys(accessModel).length === 0) {
      return <div>Loading</div>;
    }
    if (ispPart3.size === 0) {
      return <div>Loading</div>;
    }

    lodash.set(securityContext, "AccessModel", accessModel);

    const canManage = aclHelper.canManage(securityContext, 'SharedPlannings');
    if (canManage === false) {
      toastr.error("Access denied. You are not authorized to access this page.");
      return <div>You are not authorized to access this page.</div>;
    }

    return (
      <div role="presentation" className="workspace p-client-layout">
        <ModalConfirm
          isOpen={underDeleting}
          title="Delete Shared Planning"
          style={"margin: 0 auto !important;"}
          message="Are you sure you want to delete this shared planning?"
          onYes={() => {
          this.onDeleteConfirmed(true);
        }}
          onNo={() => {
          this.onDeleteConfirmed(false);
        }}
          onClose={() => {
          this.onDeleteConfirmed(false);
        }}/>
        <PageHeader
          title="Individual Support Plan - Part III. Shared Planning"
          manageMode="WorkspaceIndicator_Manage"
          links={[(<AuthorizedLink
          key="1"
          prefix={this.props.dataId.startsWith('individualsupportplan') ? "/IndividualSupportPlans/IndividualSupportPlan" : "/PlanOfCares/PlanOfCare"}
          to={{
          pathname: 'summary',
          query: {
            dataId: this.props.dataId,
            clientId: this.props.clientId,
            moduleName: this.props.dataId.startsWith('individualsupportplan') ? 'IndividualSupportPlan' : 'PlanOfCare'
          }
        }}
          text="Back to Summary"/>)]}/>
        <div className="reactWorkspace workspace-content-container">
          <form>
            <div className="genericform-style">
              <h4>Part III Shared Planning</h4>
              <SharedPlanningForm
                sharedPlanning={playGroundSharedPlanning}
                onChangeForm={this.onFormChange}
                supportTypes={supportTypes}
                lifeAreas={lifeAreas}
                assignedProviders={assignedProviders}
                errors={errors}
                securityContext={securityContext}/>
              <SharedPlanningAddToTable
                sharedPlannings={ispPart3}
                sharedPlanning={playGroundSharedPlanning}
                onClickCreate={this.onClickCreate}
                onClickUpdate={this.onClickUpdate}
                onClickCancel={this.onClickCancel}
                onClickEdit={this.onClickEdit}
                onClickDelete={this.onClickDelete}
                underEditing={underEditing}
                assignedProviders={assignedProviders}
                securityContext={securityContext}/>
              <fieldset className="fieldset-container-one">
                <legend className="legend-header-one">Change History</legend>
                <AuditTrailDetails auditTrails={auditTrails || []}/>
              </fieldset>
            </div>
            <ModalConfirm
              isOpen={this.state.isOpenSharedPlanningUpdateConfirm}
              title="Update Shared Planning"
              message="The system will roll back workflow status if you want to update shared planning under ISP completed status. Are you sure to continue?"
              onYes={() => {
              this.onUpdateConfirm(true);
            }}
              onNo={() => {
              this.onUpdateConfirm(false);
            }}
              onClose={() => {
              this.onUpdateConfirm(false);
            }}/>
          </form>
        </div>
      </div>
    );

  }
}

IspPart3Page.contextTypes = {
  router: PropTypes.object
};

function readPlainJsonObjectFromState(stateObj) {
  return stateObj && stateObj.toJS
    ? stateObj.toJS()
    : stateObj;
}

function findEmptySharedPlanning() {
  return {
    LifeArea: {},
    DesiredOutcome: "",
    WhenNoLongerNeedSupport: "",
    SupportType: {},
    SupportProviderName: "",
    AttachedProviderIds: [],
    StartDate: null,
    EndDate: null,
    IsEligibilityBased: false,
    NaturalSupport: ""
  };
}

IspPart3Page.propTypes = {
  actions: PropTypes.object.isRequired,
  ispPart3: PropTypes.any,
  dataId: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  lifeAreas: PropTypes.array.isRequired,
  supportTypes: PropTypes.array.isRequired,
  assignedProviders: PropTypes.array.isRequired,
  errors: PropTypes.any,
  securityContext: PropTypes.object.isRequired,
  auditTrails: PropTypes.array.isRequired,
  playGroundSharedPlanning: PropTypes.object,
  preDeleteSharedPlanning: PropTypes.object,
  planId: PropTypes.string,
  underEditing: PropTypes.bool,
  underDeleting: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    ispPart3: state
      .get('ispPart3Manage')
      .get('ispPart3') || [],
    dataId: state
      .get('ispPart3Manage')
      .get('dataId') || "",
    clientId: state
      .get('ispPart3Manage')
      .get('clientId') || "",
    playGroundSharedPlanning: readPlainJsonObjectFromState(state.get('ispPart3Manage').get('playGroundSharedPlanning')) || findEmptySharedPlanning(),
    preDeleteSharedPlanning: readPlainJsonObjectFromState(state.get('ispPart3Manage').get('preDeleteSharedPlanning')) || findEmptySharedPlanning(),
    underEditing: state
      .get('ispPart3Manage')
      .get('underEditing') || false,
    underDeleting: state
      .get('ispPart3Manage')
      .get('underDeleting') || false,
    lifeAreas: state
      .get('ispPart3Manage')
      .get('lifeAreas') || [],
    supportTypes: state
      .get('ispPart3Manage')
      .get('supportTypes') || [],
    assignedProviders: state
      .get('ispPart3Manage')
      .get('assignedProviders') || [],
    errors: state
      .get('ispPart3Manage')
      .get('errors') || [],
    securityContext: state
      .get("ispPart3Manage")
      .get("securityContext") || {},
    auditTrails: state
      .get("ispPart3Manage")
      .get("auditTrails") || []
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ispPart3Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IspPart3Page);