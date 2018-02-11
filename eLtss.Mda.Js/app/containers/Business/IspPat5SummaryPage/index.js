import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NewCollapsiblePanel from 'components/Common/NewCollapsiblePanel';
import NewCollapsiblePanelGroup from 'components/Common/NewCollapsiblePanel/Group';
import * as actions from './actions';
import PageHeader from 'components/Common/PageHeader';
import AuthorizedLink from 'components/Common/links/AuthorizedLink';
import ServiceAndOutcomesViewer from 'components/Business/IspPart5/ServiceAndOutcomesViewer';
import GeneralScheduleSupportsViewer from 'components/Business/IspPart5/GeneralScheduleSupportsViewer';
import SafetyRestrictionViewer from 'components/Business/IspPart5/SafetyRestrictionViewer';
import SignaturesViewer from 'components/Business/IspPart5/SignaturesViewer';
import {HOST, DEFAULT_MODULE} from "config";
import getMetadataFromCache, {getMetadataSectionByName} from 'services/metadataServices';
import SectionViewer from 'components/MetadataDriven/SectionViewer';
import lodash from 'lodash';
import Icons from 'components/Common/Icons';
import AddGeneralScheduleSupport from 'components/Business/IspPart5/AddGeneralScheduleSupport';
import {getAccessControlFromCache} from 'services/accessControlServices';
import * as aclHelper from 'utils/aclHelper';
import SectionStatus from 'components/MetadataDriven/SectionStatus';
import ModalConfirm from "components/Common/ModalConfirm";
import InstructionsViewer from 'components/Business/IspPart5/InstructionsViewer';
import toastr from 'toastr';

class IspPat5SummaryPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      expandAll: false,
      isOpenPopup: false,
      workflowEvent: false
    };

    this.onAllPanelsStatusChanged = this
      .onAllPanelsStatusChanged
      .bind(this);
    this.addGeneralScheduleSupport = this
      .addGeneralScheduleSupport
      .bind(this);
    this.editGeneralScheduleSupport = this
      .editGeneralScheduleSupport
      .bind(this);
    this.deleteGeneralScheduleSupport = this
      .deleteGeneralScheduleSupport
      .bind(this);
    this.saveGeneralScheduleSupportComment = this
      .saveGeneralScheduleSupportComment
      .bind(this);
    this.overlapCheck = this
      .overlapCheck
      .bind(this);
    this.findAuthorizedLinks = this
      .findAuthorizedLinks
      .bind(this);
    this.triggerWorkflowPlanForSupport = this
      .triggerWorkflowPlanForSupport
      .bind(this);
    this.onWorkflowActionTriggered = this
      .onWorkflowActionTriggered
      .bind(this);
    this.workflowButtons = this
      .workflowButtons
      .bind(this);
    this.canCompletePlanForSupport = this
      .canCompletePlanForSupport
      .bind(this);
    this.canSubmitPlanForSupport = this
      .canSubmitPlanForSupport
      .bind(this);
    this.canScSubmitPlanForSupport = this
      .canScSubmitPlanForSupport
      .bind(this);
    this.canScApprovePlanForSupport = this
      .canScApprovePlanForSupport
      .bind(this);
    this.canScRejectPlanForSupport = this
      .canScRejectPlanForSupport
      .bind(this);
    this.canProviderApprovePlanForSupport = this
      .canProviderApprovePlanForSupport
      .bind(this);
    this.canProviderRejectPlanForSupport = this
      .canProviderRejectPlanForSupport
      .bind(this);
    this.canDiscardPlanForSupport = this
      .canDiscardPlanForSupport
      .bind(this);
    this.canRevisePlanForSupport = this
      .canRevisePlanForSupport
      .bind(this);
    this.identityHasScRole = this
      .identityHasScRole
      .bind(this);
    this.identityCsbScProviderAdminRole = this
      .identityCsbScProviderAdminRole
      .bind(this);
    this.identityHasCmProviderRole = this
      .identityHasCmProviderRole
      .bind(this);
    this.identityHasProviderRole = this
      .identityHasProviderRole
      .bind(this);
    this.onPopupConfirm = this
      .onPopupConfirm
      .bind(this);

    this.getConfirmMessage = this
      .getConfirmMessage
      .bind(this);
    this.showCommentConfirm = this
      .showCommentConfirm
      .bind(this);
  }

  componentDidMount() {
    const _this = this;
    const query=this.context.router.getCurrentLocation().query;
    let moduleName = query.moduleName || DEFAULT_MODULE;
    getAccessControlFromCache(moduleName).then((accessModel) => {
      _this.setState({accessModel});
    });

    getMetadataFromCache(moduleName).then((metadata) => {
      _this.setState({metadata});
      
      _this
        .props
        .actions
        .loadIspPart5Summary(query.parentDataId, query.dataId, query.clientId, metadata);
    });
  }

  onAllPanelsStatusChanged(expandAll) {
    this.setState({expandAll});
  }

  greaterThan(left, right)
  {
    const leftValue = left.Hours + left.Minutes / 60;
    const rightValue = right.Hours + right.Minutes / 60;
    return leftValue > rightValue;
  }

  equal(left, right)
  {
    const leftValue = left.Hours + left.Minutes / 60;
    const rightValue = right.Hours + right.Minutes / 60;
    return leftValue === rightValue;
  }

  overlapCheck(activity)
  {
    const start = activity.StartTime;
    if (!start) {
      return null;
    }
    const end = activity.EndTime;
    if (!end) {
      return null;
    }
    if (!activity || !activity.FrequencyWeekDays) {
      return null;
    }
    const frequency = activity
      .FrequencyWeekDays
      .map(x => x.Id)
      .join();
    if (!frequency) {
      return null;
    }
    const {GeneralScheduleSupports} = this.props.ispPart5Summary.PlanForSupport;
    const supports = lodash.filter(GeneralScheduleSupports, (item) => {
      return item.DailySupport != true;
    });
    const overlap = supports.find(x => x.Id != activity.Id && x.FrequencyWeekDays.find(y => frequency.indexOf(y.Id) >= 0) && (((this.greaterThan(x.StartTime, start) && this.greaterThan(end, x.StartTime)) || (this.greaterThan(x.EndTime, start) && this.greaterThan(end, x.EndTime)) || (this.greaterThan(start, x.StartTime) && this.greaterThan(x.EndTime, start)) || (this.greaterThan(end, x.StartTime) && this.greaterThan(x.EndTime, end)) || (this.equal(start, x.StartTime) && this.equal(x.EndTime, end)))));
    return overlap;
  }

  addGeneralScheduleSupport(activity)
  {
    const location = this
      .context
      .router
      .getCurrentLocation()
      .query;
    const {metadata} = this.state;
    this
      .props
      .actions
      .addGeneralScheduleSupport(location.dataId, activity, metadata);
    return true;
  }

  editGeneralScheduleSupport(activity)
  {
    const location = this
      .context
      .router
      .getCurrentLocation()
      .query;
    const {metadata} = this.state;
    this
      .props
      .actions
      .editGeneralScheduleSupport(location.dataId, activity, metadata);
    return true;
  }

  deleteGeneralScheduleSupport(activity) {
    const location = this
      .context
      .router
      .getCurrentLocation()
      .query;
    const {metadata} = this.state;
    this
      .props
      .actions
      .deleteGeneralScheduleSupport(location.dataId, activity.Id, this.props.ispPart5Summary.PlanForSupport.length, metadata);
  }

  saveGeneralScheduleSupportComment(comment) {
    const location = this
      .context
      .router
      .getCurrentLocation()
      .query;
    const {metadata} = this.state;
    this
      .props
      .actions
      .editGeneralScheduleSupportComment(location.dataId, comment, metadata);
    return true;
  }

  findAuthorizedLinks(ispPart5Summary, securityContext, sectionName) {

    if ('ServiceAndOutcomes' === sectionName) {
      return [(<AuthorizedLink
        key={sectionName}
        text="Edit"
        resourceName = {sectionName}
        securityContext = {securityContext}
        prefix="/IndividualSupportPlans/IndividualSupportPlan"
        to={{
        pathname: 'editServiceOutcomes',
        query: {
          parentDataId: ispPart5Summary.PlanForSupport.IndividualSupportPlanId,
          clientId: ispPart5Summary.ClientId,
          dataId: ispPart5Summary.PlanForSupport.Id,
          moduleName: 'PlanForSupport',
        }
      }}
        activeClassName="active"/>)];
    }

    return [(<AuthorizedLink
      key={sectionName}
      text="Edit"
      resourceName = {sectionName}
      securityContext = {securityContext}
      prefix="/IndividualSupportPlans/IndividualSupportPlan"
      to={{
      pathname: 'SectionEdit',
      query: {
        parentDataId: ispPart5Summary.PlanForSupport.IndividualSupportPlanId,
        clientId: ispPart5Summary.ClientId,
        dataId: ispPart5Summary.PlanForSupport.Id,
        redirectTo: 'ispPart5Summary',
        moduleName: 'PlanForSupport',
        path: sectionName
      }
    }}
      activeClassName="active"/>)];
  }

  workflowButtons(ispPart5Summary, securityContext) {
    let buttons = [];
    const submitButton = <button
      key="submitButton"
      onClick={(e) => {
      this.triggerWorkflowPlanForSupport(e, 'submit');
    }}>Submit</button>;
    const scSubmitButton = <button
      key="scSubmitButton"
      onClick={(e) => {
      this.triggerWorkflowPlanForSupport(e, 'scSubmit');
    }}>Submit</button>;
    const completeButton = <button
      key="completeButton"
      onClick={(e) => {
      this.triggerWorkflowPlanForSupport(e, 'complete');
    }}>Complete</button>;
    const scApproveButton = <button
      key="scApproveButton"
      onClick={(e) => {
      this.triggerWorkflowPlanForSupport(e, 'scApprove');
    }}>Approve</button>;
    const scRejectButton = <button
      key="scRejectButton"
      onClick={(e) => {
      this.triggerWorkflowPlanForSupport(e, 'scReject');
    }}>Reject</button>;
    const providerApproveButton = <button
      key="providerApproveButton"
      onClick={(e) => {
      this.triggerWorkflowPlanForSupport(e, 'providerApprove');
    }}>Approve</button>;
    const providerRejectButton = <button
      key="providerRejectButton"
      onClick={(e) => {
      this.triggerWorkflowPlanForSupport(e, 'providerReject');
    }}>Reject</button>;
    const discardButton = <button
      key="discardButton"
      onClick={(e) => {
      this.triggerWorkflowPlanForSupport(e, 'discard');
    }}>Discard</button>;
    const reviseButton = <button
      key="reviseButton"
      onClick={(e) => {
      this.triggerWorkflowPlanForSupport(e, 'revise');
    }}>Revise</button>;

    if (this.canScSubmitPlanForSupport(ispPart5Summary, securityContext)) {
      buttons.push(scSubmitButton);
    }
    
    if (this.canScApprovePlanForSupport(securityContext)) {
      buttons.push(scApproveButton);
    }

    if (this.canScRejectPlanForSupport(securityContext)) {
      buttons.push(scRejectButton);
    }

    const hasOutcomeChanged = (planForSupport) => {
      return lodash.some(planForSupport.ServiceOutcomes, (item) => {
        return !item.SharedPlanningId;
      });
    };

    if (ispPart5Summary.PlanForSupport.ParentPlanForSupportId && hasOutcomeChanged(ispPart5Summary.PlanForSupport)) {
      if (this.canSubmitPlanForSupport(ispPart5Summary, securityContext)) {
        buttons.push(submitButton);
      }
    }
    else{
      if (this.canCompletePlanForSupport(ispPart5Summary, securityContext)) {
        buttons.push(completeButton);
      }
    }

    if (this.canProviderApprovePlanForSupport(securityContext)) {
      buttons.push(providerApproveButton);
    }
    if (this.canProviderRejectPlanForSupport(securityContext)) {
      buttons.push(providerRejectButton);
    }
   
    if (this.canDiscardPlanForSupport(securityContext)) {
      buttons.push(discardButton);
    }

    if (this.canRevisePlanForSupport(ispPart5Summary, securityContext)) {
      buttons.push(reviseButton);
    }

    return buttons;
  }

  identityCsbScProviderAdminRole(identity) {
    return (identity.AssignedUserRoles && identity.AssignedUserRoles.indexOf('roles/csbscadmin') >= 0);
  }

  identityHasCmProviderRole(identity) {
    return (identity.AssignedUserRoles && identity.AssignedUserRoles.indexOf('roles/cmprovider') >= 0);
  }

  identityHasScRole(identity) {
    return (identity.AssignedUserRoles && identity.AssignedUserRoles.indexOf('roles/csbscenrollmentapprover') >= 0);
  }

  identityHasProviderRole(identity) {
    return (identity.AssignedUserRoles && identity.AssignedUserRoles.indexOf('roles/providerispapprover') >= 0);
  }

  canScSubmitPlanForSupport(ispPart5Summary, securityContext) {
    if (ispPart5Summary.PlanForSupport && ispPart5Summary.PlanForSupport.CompletionStatus && ispPart5Summary.PlanForSupport.CompletionStatus.ServiceAndOutcomes !== 'complete') {
      return false;
    }
    if (ispPart5Summary.PlanForSupport && ispPart5Summary.PlanForSupport.CompletionStatus && ispPart5Summary.PlanForSupport.CompletionStatus.GeneralScheduleSupports !== 'complete') {
      return false;
    }
    if (ispPart5Summary.PlanForSupport && ispPart5Summary.PlanForSupport.CompletionStatus && ispPart5Summary.PlanForSupport.CompletionStatus.Signatures !== 'complete') {
      return false;
    }
    if (aclHelper.canManage(securityContext, "scSubmitButton")) {
      return true;
    }
    return false;
  }

  canSubmitPlanForSupport(ispPart5Summary, securityContext) {
    if (ispPart5Summary.PlanForSupport && ispPart5Summary.PlanForSupport.CompletionStatus && ispPart5Summary.PlanForSupport.CompletionStatus.ServiceAndOutcomes !== 'complete') {
      return false;
    }
    if (ispPart5Summary.PlanForSupport && ispPart5Summary.PlanForSupport.CompletionStatus && ispPart5Summary.PlanForSupport.CompletionStatus.GeneralScheduleSupports !== 'complete') {
      return false;
    }
    if (ispPart5Summary.PlanForSupport && ispPart5Summary.PlanForSupport.CompletionStatus && ispPart5Summary.PlanForSupport.CompletionStatus.Signatures !== 'complete') {
      return false;
    }
    if (aclHelper.canManage(securityContext, "submitButton")) {
      return true;
    }
    return false;
  }

  canCompletePlanForSupport(ispPart5Summary, securityContext)
  {
    if (ispPart5Summary.PlanForSupport && ispPart5Summary.PlanForSupport.CompletionStatus && ispPart5Summary.PlanForSupport.CompletionStatus.ServiceAndOutcomes !== 'complete') {
      return false;
    }
    if (ispPart5Summary.PlanForSupport && ispPart5Summary.PlanForSupport.CompletionStatus && ispPart5Summary.PlanForSupport.CompletionStatus.GeneralScheduleSupports !== 'complete') {
      return false;
    }
    if (ispPart5Summary.PlanForSupport && ispPart5Summary.PlanForSupport.CompletionStatus && ispPart5Summary.PlanForSupport.CompletionStatus.Signatures !== 'complete') {
      return false;
    }
    if (aclHelper.canManage(securityContext, "completeButton")) {
      return true;
    }
    return false;
  }
  canScApprovePlanForSupport(securityContext)
  {
    if (aclHelper.canManage(securityContext, "scApproveButton")) {
      return true;
    }
    return false;
  }
  canScRejectPlanForSupport(securityContext)
  {
    if (aclHelper.canManage(securityContext, "scRejectButton")) {
      return true;
    }
    return false;
  }
  canProviderApprovePlanForSupport(securityContext)
  {
    if (aclHelper.canManage(securityContext, "providerApproveButton")) {
      return true;
    }
    return false;
  }
  canProviderRejectPlanForSupport(securityContext)
  {
    if (aclHelper.canManage(securityContext, "providerRejectButton")) {
      return true;
    }
    return false;
  }
  canDiscardPlanForSupport(securityContext)
  {
    if (aclHelper.canManage(securityContext, "discardButton")) {
      return true;
    }
    return false;
  }

  canRevisePlanForSupport(ispPart5Summary, securityContext) {
    if (ispPart5Summary.PlanForSupport.Active === 'Active' && aclHelper.canManage(securityContext, "PlanForSupport.reviseButton")) {
      return true;
    }
    return false;
  }

  getConfirmMessage() {
    const workflowMessageMap = {
      'submit': 'Are you sure you want to submit plan for support?',
      'scSubmit': 'Are you sure you want to submit plan for support?',
      'complete': 'Are you sure you want to complete plan for support?',
      'scApprove': 'Are you sure you want to approve plan for support?',
      'scReject': 'Are you sure you want to reject plan for support?',
      'providerApprove': 'Are you sure you want to approve plan for support?',
      'providerReject': 'Are you sure you want to reject plan for support?',
      'discard': 'Are you sure you want to discard plan for support?',
      'revise': 'Are you sure you want to revise plan for support?'
    };
    return workflowMessageMap[this.state.workflowEvent];
  }

  showCommentConfirm() {
    const workflowThatNeedComment = ['scReject', 'providerReject', 'discard'];
    return workflowThatNeedComment.indexOf(this.state.workflowEvent) >= 0;
  }

  triggerWorkflowPlanForSupport(e, workflowEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({isOpenPopup: true, workflowEvent: workflowEvent});
  }
  onPopupConfirm(result, ispPart5Summary, comment) {
    if (result) {
      this.onWorkflowActionTriggered(this.state.workflowEvent, ispPart5Summary, comment);
    }
    this.setState({isOpenPopup: false});
  }
  onWorkflowActionTriggered(workflowEvent, ispPart5Summary, comment) {
    const {metadata} = this.state;
    if (workflowEvent === 'revise') {
      const {query} = this
        .context
        .router
        .getCurrentLocation();
      
      this
        .props
        .actions
        .revisePlanForSupport(ispPart5Summary.PlanForSupport.Id, query.clientId, query.parentDataId, metadata);
    } else {
      const {query} = this
        .context
        .router
        .getCurrentLocation();
      this
        .props
        .actions
        .triggerWorkflowEventPlanForSupport(workflowEvent, ispPart5Summary.PlanForSupport.Id, query.parentDataId, query.clientId, comment, metadata);
    }
  }

  render() {
    const {ispPart5Summary, componentsState, generalEvents, generalScheduleSupport} = this.props;

    const {PlanForSupport, CurrentIdentity} = ispPart5Summary;

    const {metadata, accessModel} = this.state;

    const workflowStatus = PlanForSupport && PlanForSupport.WorkflowStatus;

    if (!ispPart5Summary || !PlanForSupport || !metadata || !CurrentIdentity) {
      return <div>Loading</div>;
    }
    
    const securityContext = {
      AccessModel: accessModel,
      CurrentIdentity,
      WorkflowStatus: workflowStatus,
      EffectiveDateRange: ispPart5Summary.IspEffectiveDateRange
    };

    // if (!aclHelper.canAccess(securityContext, "PlanForSupport")) {
    //   toastr.error("Access denied. You are not authorized to access this page.");
    //   return <div>You are not authorized to access this page.</div>;
    // }

    // if (this.identityHasProviderRole(CurrentIdentity) && !this.identityHasScRole(CurrentIdentity) && !this.identityHasCmProviderRole(CurrentIdentity) && !this.identityCsbScProviderAdminRole(CurrentIdentity)) {
    //   if (PlanForSupport.OrganizationUnitId !== CurrentIdentity.OrganizationUnitId) {
    //     toastr.error("Access denied. You are not authorized to access this page.");
    //     return <div>You are not authorized to access this page.</div>;
    //   }
    // }
    const isSectionComplete = ((planForSupport, currentIdentity) => {
      if (currentIdentity && currentIdentity.Attributes && !currentIdentity.Attributes.includes(aclHelper.RULE_ATTRIBUTES.provider)) {
        return false;
      }
      if (planForSupport && planForSupport.CompletionStatus && planForSupport.CompletionStatus.ServiceAndOutcomes !== 'complete') {
        return false;
      }
      if (planForSupport && planForSupport.CompletionStatus && planForSupport.CompletionStatus.GeneralScheduleSupports !== 'complete') {
        return false;
      }
      if (planForSupport && planForSupport.CompletionStatus && planForSupport.CompletionStatus.Signatures !== 'complete') {
        return false;
      }
      if (planForSupport.WorkflowStatus.Name === "InProgress") {
        return true;
      }
      return false;
    })(PlanForSupport, CurrentIdentity);

    return (
      <div role="presentation" className="workspace p-client-layout">
        <PageHeader
          title="Part V: Plan for Supports - Summary"
          description={`Status: ${workflowStatus && workflowStatus.DisplayName}`}
          manageMode="WorkspaceIndicator_Summary"
          links={[(<AuthorizedLink
          key="1"
          prefix={metadata && metadata.Options.Prefix}
          to={{
          pathname: 'summary',
          query: {
            dataId: ispPart5Summary.PlanForSupport.IndividualSupportPlanId,
            clientId: ispPart5Summary.ClientId,
            moduleName: 'IndividualSupportPlan'
          }
        }}
          text="Back to Summary"/>)]}
          buttons={[
          ...(this.workflowButtons(ispPart5Summary, securityContext)),
          (
            <button
              key="1"
              onClick={() => {
              this.setState({
                'expandAll': !this.state.expandAll
              });
            }}
              className="isCollapsed initialized">
              {this.state.expandAll
                ? "Collapse All"
                : "Expand All"}
            </button>
          )
        ]}/>

        <div className="above-container-to-avoid-ie-issue"></div>
        <div className="workspace-content-container reactWorkspace">

          <NewCollapsiblePanelGroup
            onAllPanelsStatusChanged={this.onAllPanelsStatusChanged}>

            <NewCollapsiblePanel
              name="Instructions"
              isExpand={this.state.expandAll}
              title="Instructions">
              <InstructionsViewer workflowStatus={workflowStatus}/>
            </NewCollapsiblePanel>
            <NewCollapsiblePanel
              statusIcon={< SectionStatus section = 'ServiceAndOutcomes' data = {
              ispPart5Summary.PlanForSupport
            } />}
              name="ServiceAndOutcomes"
              isExpand={this.state.expandAll}
              title="Service and Outcomes"
              headers={[this.findAuthorizedLinks(ispPart5Summary, securityContext, "ServiceAndOutcomes")]}>
              <ServiceAndOutcomesViewer data={ispPart5Summary}/>
            </NewCollapsiblePanel>
            <NewCollapsiblePanel
              statusIcon={< SectionStatus section = {
              'GeneralScheduleSupports'
            }
            data = {
              ispPart5Summary.PlanForSupport
            } />}
              name="GeneralScheduleSupports"
              isExpand={this.state.expandAll}
              title="General Schedule of Supports"
              headers={[< AddGeneralScheduleSupport securityContext = {
                securityContext
              }
              onSave = {
                this.addGeneralScheduleSupport
              }
              overlapCheck = {
                this.overlapCheck
              }
              serviceOutcomes = {
                ispPart5Summary.PlanForSupport.ServiceOutcomes
              }
              key = '0' />]}>
              <GeneralScheduleSupportsViewer
                onEdit={this.editGeneralScheduleSupport}
                onDelete={this.deleteGeneralScheduleSupport}
                onSaveComment={this.saveGeneralScheduleSupportComment}
                generalScheduleSupport={generalScheduleSupport}
                workflowStatus={workflowStatus}
                overlapCheck={this.overlapCheck}
                securityContext={securityContext}
                generalEvents={generalEvents}
                serviceOutcomes={ispPart5Summary.PlanForSupport.ServiceOutcomes}/>
            </NewCollapsiblePanel>
            <NewCollapsiblePanel
              statusIcon={< SectionStatus section = {
              'Signatures'
            }
            data = {
              ispPart5Summary.PlanForSupport
            } />}
              name="Signatures"
              isExpand={this.state.expandAll}
              title="Signatures"
              headers={this.findAuthorizedLinks(ispPart5Summary, securityContext, "Signatures")}>
              <SignaturesViewer
                componentsState={lodash.get(componentsState, 'Signatures')}
                data={ispPart5Summary}
                metadata={metadata}/>
            </NewCollapsiblePanel>
            <NewCollapsiblePanel
              name="SafetyRestriction"
              isExpand={this.state.expandAll}
              title="Safety Restrictions"
              headers={this.findAuthorizedLinks(ispPart5Summary, securityContext, "SafetyRestriction")}>
              <SafetyRestrictionViewer
                componentsState={lodash.get(componentsState, 'SafetyRestriction')}
                data={ispPart5Summary}
                metadata={metadata}/>
            </NewCollapsiblePanel>
          </NewCollapsiblePanelGroup>
        </div>
        <ModalConfirm
          showComment={this.showCommentConfirm()}
          isOpen={this.state.isOpenPopup}
          title="Confirmation"
          message={this.getConfirmMessage()}
          onYes={(comment) => {
          this.onPopupConfirm(true, ispPart5Summary, comment);
        }}
          onNo={() => {
          this.onPopupConfirm(false, ispPart5Summary);
        }}
          onClose={() => {
          this.onPopupConfirm(false, ispPart5Summary);
        }}/>
      </div>
    );
  }
}

IspPat5SummaryPage.propTypes = {
  actions: PropTypes.object.isRequired,
  generalEvents: PropTypes.array.isRequired,
  componentsState: PropTypes.object.isRequired,
  generalScheduleSupport: PropTypes.object.isRequired,
  ispPart5Summary: PropTypes.object.isRequired
};

IspPat5SummaryPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    ispPart5Summary: state
      .get('ispPart5')
      .get('ispPart5Summary') || {},
    generalEvents: state
      .get('ispPart5')
      .get('generalEvents') || [],
    componentsState: state
      .get('ispPart5')
      .get('componentsState') || {},
    generalScheduleSupport: state
      .get('ispPart5')
      .get('generalScheduleSupport') || {}
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IspPat5SummaryPage);
