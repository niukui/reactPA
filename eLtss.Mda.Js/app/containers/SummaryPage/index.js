import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import lodash from 'lodash';
import moment from 'moment';
import * as actions from './actions';
import * as aclHelper from 'utils/aclHelper';
import NewCollapsiblePanelGroup from 'components/Common/NewCollapsiblePanel/Group';
import PageHeader from 'components/Common/PageHeader';
import {HOST, DEFAULT_MODULE, getRoutePrefix} from "config";
import ModalConfirm from "components/Common/ModalConfirm";
import {getAccessControlFromCache} from 'services/accessControlServices';
import AuthorizedSection from 'components/MetadataDriven/AuthorizedSection';
import {ISP_WORKFLOW_STATUS, PART_V_WORKFLOW_STATUS} from 'utils/constants';
import getMetadataFromCache from '../../services/metadataServices';
import * as businessComponents from 'components/Business'
import {getLinkObject} from 'utils/metadataHelper';
import WorkflowSection from 'components/MetadataDriven/Workflow'

class SummaryPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      accessModel: {},
      expandAll: false
    };
    this.onAllPanelsStatusChanged = this
      .onAllPanelsStatusChanged
      .bind(this);
    this.onToggle = this
      .onToggle
      .bind(this);
  }

  componentWillMount() {
    const _this = this;
    const query = this
      .context
      .router
      .getCurrentLocation()
      .query;
    let moduleName = query.moduleName || DEFAULT_MODULE;
    getAccessControlFromCache(moduleName).then((accessModel) => {
      _this.setState({accessModel});
      _this
      .props
      .actions
      .loadSummary(query.dataId, query.clientId, query.moduleName);
    });
  }

  onAllPanelsStatusChanged(expandAll) {
    this.setState({expandAll});
  }

  onToggle(){
    this.setState({'expandAll': !this.state.expandAll})
  }

  render() {
    const {data, workflowStatus, metadata, componentsState } = this.props;

    const {accessModel} = this.state;
    if (lodash.keys(accessModel).length === 0) {
      return <div>Loading</div>;
    }
    if (!data || !metadata || !metadata.Name) {
      return <div>Loading</div>;
    }

    const moduleData = data[metadata.Name]
    if (data && data.PlanOfCare) {
        moduleData.PlanOfCareType = data && data.PlanOfCare && data.PlanOfCare.PlanOfCareType;
      }

    const {CurrentIdentity} = data;
    const query = this
      .context
      .router
      .getCurrentLocation()
      .query;
    if (moduleData && !moduleData.Id && query.dataId) {
      moduleData.Id = query.dataId;
    }
    if (query.currentSection) {
      metadata.CurrentSection = query.currentSection.trim().split('.');
    }
    const securityContext = {
      AccessModel: accessModel,
      CurrentIdentity,
      WorkflowStatus: workflowStatus,
      EffectiveDateRange: moduleData && moduleData.EffectiveDateRange,
      ModuleData:moduleData,
      Data:data
    };
    const leftActions = query.noLeftAction === 'true' ? [] : metadata && metadata.LeftActions && metadata
      .LeftActions
      .map((button, index) => getLinkObject(button, {
        moduleName:  metadata.ModuleName || metadata.Name,
        clientId:moduleData.ClientId
      }, data, index, metadata));

    const sidenav = document.getElementById('sidenav');
    if (sidenav) {
      sidenav.style.display = 'block';
    }
   return (
      <div role="presentation" className="workspace p-client-layout">
        <PageHeader
          title={metadata.Title}
          manageMode="WorkspaceIndicator_Summary"
          links={leftActions}
          description={`Status: ${workflowStatus && workflowStatus.DisplayName}`}
          buttons={[<WorkflowSection securityContext={securityContext}
            data={moduleData}
            key="WorkflowSection"
            metadata={metadata}
            actions={this.props.actions}
            moduleName={ metadata.ModuleName || metadata.Name}
            workflowConfirmations={this.props.workflowActionConfirmations} 
            onToggle = {this.onToggle}
            componentsState={lodash.get(componentsState, metadata.Sections.Name) || componentsState}
            expandAll = {this.state.expandAll}
            dropdownDataSource={data}
            />
          ]} />
        <div className="above-container-to-avoid-ie-issue"></div>
        <div className="reactWorkspace workspace-content-container">
          <NewCollapsiblePanelGroup
            onAllPanelsStatusChanged={this.onAllPanelsStatusChanged}>
            {metadata.Sections && metadata
              .Sections
              .map((section, index) => {
                let BusinessComponent = AuthorizedSection;
                if (section.BusinessComponent && businessComponents.default[section.BusinessComponent]) {
                  BusinessComponent = businessComponents.default[section.BusinessComponent];
                }
                if (metadata.AdditionalPrintSection
                &&metadata.AdditionalPrintSection.Name==section.Name
                 && this.props.printData && this.props.printComponentsState&&this.props.printMetadata) { 
                  let NewBusinessComponent=businessComponents.default[metadata.AdditionalPrintSection.BusinessComponent];
                  
                  return  (
                  [<BusinessComponent
                    isExpand={this.state.expandAll || lodash.indexOf(metadata.CurrentSection, section.Name) > -1}
                    data={data}
                    section={section}
                    metadata={metadata}
                    moduleName={metadata.ModuleName || metadata.Name}
                    securityContext={securityContext}
                    componentsState={lodash.get(componentsState, section.Name) || componentsState}
                    actions={this.props.actions}
                    resourceName={section.Name}
                    hideForPrint={true}/>,
                    
                        <NewBusinessComponent 
                          data={data}
                          printComponentsState={this.props.printComponentsState}
                          printMetadata={this.props.printMetadata}
                          printData={this.props.printData}
                          printAccessModel={this.props.printAccessModel}
                          componentsState={lodash.get(this.props.componentsState, section.Name) || this.props.componentsState}
                          actions={this.props.actions}
                          resourceName={section.Name}
                          businessComponent={BusinessComponent}
                          onAllPanelsStatusChanged={this.onAllPanelsStatusChanged}
                          section={section}
                          isExpand={this.state.expandAll || lodash.indexOf(metadata.CurrentSection, section.Name) > -1}
                          securityContext={securityContext}
                          metadata={metadata}
                          moduleName={metadata.ModuleName || metadata.Name}
                          />]
                  )
                } 
                else 
                {
                  return (<BusinessComponent
                    key={index}
                    isExpand={this.state.expandAll || lodash.indexOf(metadata.CurrentSection, section.Name) > -1}
                    data={data}
                    section={section}
                    metadata={metadata}
                    moduleName={metadata.ModuleName || metadata.Name}
                    securityContext={securityContext}
                    componentsState={lodash.get(componentsState, section.Name) || componentsState}
                    actions={this.props.actions}
                    resourceName={section.Name}
                    context={this.context}/>)
                }
              })}
          </NewCollapsiblePanelGroup>
        </div>
      </div>
    );
  }
}

SummaryPage.propTypes = {
  data: PropTypes.object.isRequired,
  metadata: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  componentsState: PropTypes.object.isRequired
};

SummaryPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    data: state
      .get('summary')
      .get('data') || {},
    metadata: state
      .get('summary')
      .get('metadata'),
    workflowStatus: state
      .get('summary')
      .get('workflowStatus') || {},
    componentsState: state
      .get('summary')
      .get('componentsState') || {},
    workflowActionConfirmations: state
      .get('summary')
      .get('workflowActionConfirmations') || {},
    printData: state
      .get('summary')
      .get('printData'),
    printComponentsState: state
      .get('summary')
      .get('printComponentsState') ,
    printMetadata: state
      .get('summary')
      .get('printMetadata'),
    printAccessModel: state
      .get('summary')
      .get('printAccessModel'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);
