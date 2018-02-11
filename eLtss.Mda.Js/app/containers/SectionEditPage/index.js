import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import {DEFAULT_MODULE} from "config";
import SectionEditor from 'components/MetadataDriven/SectionEditor';
import {set, get, isEmpty} from 'lodash';
import PageHeader from 'components/Common/PageHeader';
import AuthorizedLink from 'components/Common/links/AuthorizedLink';
import * as metadataHelper from 'utils/metadataHelper';
import * as aclHelper from 'utils/aclHelper';
import {getAccessControlFromCache} from 'services/accessControlServices';
import toastr from "utils/toastr";
import path from 'path';
import {compareValue} from 'services/validationServices';
//import PocProvider from './../../components/Business/PocProviders/index';
//import TextInput from 'components/Common/TextInput';
import ModalConfirm from "components/Common/ModalConfirm";
import lodash from 'lodash';


class SectionEditPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      accessModel: {},
      formValidated: false,
      selectedProvider:'',
      saPatient:'',
      providerServiceIds:[],
      isOpenIncompleteNotice: false,
      temporaryPopup: ""
    };
    this.updateSectionState = this
      .updateSectionState
      .bind(this);
    this.onUiUpdate = this
      .onUiUpdate
      .bind(this);
    this.saveSection = this
      .saveSection
      .bind(this);
    this.selectProvider=this
      .selectProvider
      .bind(this);
    this.onCancelNotice = this
      .onCancelNotice
      .bind(this);
    this.onContinueButton = this
      .onContinueButton
      .bind(this);  
  }

  componentWillMount()
  {
    const _this = this;
    const query = this
      .context
      .router
      .getCurrentLocation()
      .query;
    let moduleName = query.moduleName || DEFAULT_MODULE; 
    getAccessControlFromCache(moduleName).then((accessModel) => {
      _this.setState({accessModel});
    });
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.section.Popup){
      let isComplete =lodash.get(nextProps.data, nextProps.section.Popup.IndicatorPath);
      if( isComplete && (this.state.temporaryPopup != nextProps.section.Popup.IndicatorPath)){
          this.setState({isOpenIncompleteNotice: true,
            temporaryPopup: nextProps.section.Popup.IndicatorPath
          })     
      }
      if(!isComplete && this.state.temporaryPopup == nextProps.section.Popup.IndicatorPath){
        this.setState({isOpenIncompleteNotice: false});
      }
    }
  }

  componentDidMount() {
    const query = this
      .context
      .router
      .getCurrentLocation()
      .query;
    let moduleName = query.moduleName || DEFAULT_MODULE;
    this
      .props
      .actions
      .wipeOffStateData();
      this
      .props
      .actions
      .loadSection(query.dataId, query.clientId, query.path, moduleName);
    this
      .props
      .actions
      .clearValidationList();        
  }

  updateSectionState(changes) {
    if (changes && changes.length > 0) {
      this
        .props
        .actions
        .updateForm(changes, this.context.router.getCurrentLocation().query.path);
    }
  }

  onUiUpdate(name, validate, compare)
  {
    this
      .props
      .actions
      .updateValidationList(name, validate, compare);
  }

  saveSection(event) {
    event.preventDefault();
    this.setState({formValidated: true});
    let validationResult = true;
    for (let validation of this.props.validationList) {      
       if (validation.compare) {
        validationResult = validation.validate(compareValue(validation, this.props.data[this.props.metadata.Name] ));
      } else if (!validation.validate()) {
        validationResult = false;
      }
    }

    if (validationResult) {
      const moduleData = Object.assign({}, this.props.data, this.props.data[this.props.metadata.Name]);
      let redirectTo = null;
      let query = Object.assign({}, this.context.router.getCurrentLocation().query);
      if (query.redirectTo) {

        delete query['postToUrl'];
        delete query['redirectTo'];
        delete query['path'];
        redirectTo = {
          pathname: this
            .context
            .router
            .getCurrentLocation()
            .query
            .redirectTo,
          query
        };
      }
      this
        .props
        .actions
        .saveSection(query.parentDataId, query.dataId, query.clientId, moduleData, this.props.path, redirectTo, this.props.metadata);
      this.setState({formValidated: false});
    }
  }
  selectProvider(provider){
    this.setState({'selectedProvider':provider})
  }

  onCancelNotice(){
    this.setState({isOpenIncompleteNotice : false})
  }

  onContinueButton(){
    const moduleData = Object.assign({}, this.props.data, this.props.data[this.props.metadata.Name]);
    let query = Object.assign({}, this.context.router.getCurrentLocation().query);
    this.props.actions.continueButton(query.parentDataId, query.dataId, query.clientId, moduleData, this.props.path, this.props.metadata,this.props.section.Incomplete)
  }

  render() {
    const {
      section,
      data,
      componentsState,
      path,
      currentIdentity,
      workflowStatus,
      metadata,
      providerSearchResults
    } = this.props;

    if (!data && !data.Id) {
      return null;
    }
    const {accessModel} = this.state;
    const i = path.indexOf(".");
    let parentSection = i > 0
      ? path.substring(0, i)
      : path;

    const entityData = data && data[metadata.Name];
    if (!entityData) {
      return <div>Loading...</div>;
    }

    const securityContext = {
      AccessModel: accessModel,
      CurrentIdentity: currentIdentity,
      WorkflowStatus: workflowStatus,
      EffectiveDateRange: entityData.EffectiveDateRange
    };

    if (isEmpty(securityContext.AccessModel) || isEmpty(securityContext.CurrentIdentity) || isEmpty(securityContext.WorkflowStatus)) {
      return <div>Loading...</div>;
    }

    const canEdit = aclHelper.canEdit(securityContext, path);
    if (canEdit === false) {
      toastr.error("Access denied. You are not authorized to access this page.");
      return <div>You are not authorized to access this page.</div>;
    }
    let signatureCompletionDate;
    if(section.Name === "AgreementSignatures")
    {
      signatureCompletionDate = "Completed Date - " + (data.PlanOfCare.SignaturesCompleteDateFormatted ? data.PlanOfCare.SignaturesCompleteDateFormatted : "N/A");
    }

    const query = this
      .context
      .router
      .getCurrentLocation()
      .query;

    return (
      <div role="presentation" className="workspace p-client-layout">
         <ModalConfirm
          isOpen={this.state.isOpenIncompleteNotice}
          title="Incomplete Section Notice"
          message="Part I. Essential Information and Part III. Shared Planning sections must be completed before you are able to save a signature ."
          onYes={() => {
          this.onContinueButton();
        }}
          onNo={() => {
          this.onCancelNotice();
        }}
          onClose={() => {
          this.onCancelNotice();
        }}/>

        <PageHeader
          title={metadata.Title + " - " + metadataHelper.getDisplayName(section.DisplayName, entityData)}
          manageMode="WorkspaceIndicator_Manage"
          links={[< AuthorizedLink key = "1"
          prefix = {
            metadata && metadata.Options.Prefix
          }
          to = {
            { pathname: query.redirectTo || 'summary', 
              query: { 
                dataId: entityData.Id, 
                clientId:entityData.ClientId, 
                moduleName: query.moduleName
              } 
            }
          }text = "Back to Summary" />]}
          buttons={[(
            <button key="1" type="button" onClick={this.saveSection}>Save</button>
          )]}/>
        <div
          className="workspace-content-container reactWorkspace"
          id="workspace-maincontent">
          {/*<div className="above-container-to-avoid-ie-issue">
              <PocProvider  title={"AddProvider"} onLoad={()=>{
                this.props.actions.loadProviderSearchCriteriaData();
                }}
                searchProviders={(searchCriteria)=>{this.props.actions.searchProviders(searchCriteria);}}
                providerSearchCriteriaData={this.props.providerSearchCriteriaData}
                providerSearchResults={providerSearchResults}
                selectProvider={this.selectProvider}
                providerSelected={()=>{this.props.actions.providerSelected()}}
                saPatient={this.state.saPatient}
                providerServiceIds={this.state.providerServiceIds}
                />
            < TextInput name = "ProviderName" label = "Provider Name:" stackedInput onChange = {
              () => {}
            }
            value = {
              this.state.selectedProvider && this.state.selectedProvider.ProviderName
            }
            saveRequired = {
              false
            } />
          </div>*/} 
          <form>
            <div className="genericform-style">
              <h4>{metadataHelper.getDisplayName(section.DisplayName, entityData)} {(section.Name === "AgreementSignatures" ? "(" + signatureCompletionDate + ")": "")  } </h4> 
              <SectionEditor
                fieldNamePrefix={this
                .props
                .path
                .substring(0, this.props.path.length - this.props.section.Name.length - 1)}
                section={this.props.section}
                data={entityData}
                formValidated={this.state.formValidated}
                onChange={this.updateSectionState}
                onUiUpdate={this.onUiUpdate}
                currentIdentity={currentIdentity}
                arraySectionChanged={this.props.actions.refreshComponentsRefState}
                componentState={get(componentsState, path)}
                dropdownDataSource={data.DropdownDataSource}/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SectionEditPage.propTypes = {
  data: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  validationList: PropTypes.any,
  componentsState: PropTypes.any,
  currentIdentity: PropTypes.object,
  workflowStatus: PropTypes.object,
  metadata: PropTypes.object,
  providerSearchCriteriaData:PropTypes.object,
  providerSearchResults: PropTypes.array
};

SectionEditPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {

  const path = ownProps.location.query.path;

  let section = metadataHelper.getSectionByName(state.get("SectionEdit").get("metadata"), path);

  return {
    data: state
      .get("SectionEdit")
      .get("data") || {},
    section: section || {
      Name: ""
    },
    path: path || "",
    componentsState: state
      .get("SectionEdit")
      .get("componentsState") || {},
    validationList: state
      .get("SectionEdit")
      .get("validationList") || [],
    currentIdentity: state
      .get("SectionEdit")
      .get("currentIdentity") || {},
    metadata: state
      .get("SectionEdit")
      .get("metadata") || {},
    workflowStatus: state
      .get('SectionEdit')
      .get('workflowStatus') || {},
    providerSearchCriteriaData:state
      .get('SectionEdit')
      .get('providerSearchCriteriaData') ||{},
    providerSearchResults : state
      .get('SectionEdit')
      .get('providerSearchResults') && state
      .get('SectionEdit')
      .get('providerSearchResults')
      .toJS
      ? state
        .get('SectionEdit')
        .get('providerSearchResults')
        .toJS()
      : state
        .get('SectionEdit')
        .get('providerSearchResults') || []
    };
}

function mapDispatchToProps(dispatch) {

  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionEditPage);
