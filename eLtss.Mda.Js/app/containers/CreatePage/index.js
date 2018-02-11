import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import SectionEditor from 'components/MetadataDriven/SectionEditor';
import {set, get} from 'lodash';
import PageHeader from 'components/Common/PageHeader';
import {DEFAULT_MODULE} from "config";
import * as metadataHelper from 'utils/metadataHelper';
import {getAccessControlFromCache} from 'services/accessControlServices';
import {getLinkObject} from 'utils/metadataHelper';

class CreatePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      accessModel: {},
      formValidated: false
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
    this
      .props
      .actions
      .initCreateData(moduleName, query.clientId);
    getAccessControlFromCache(moduleName).then((accessModel) => {
      _this.setState({accessModel});
    });
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
      .preCreate(moduleName, query.clientId);
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

  onUiUpdate(name, validate)
  {
    this
      .props
      .actions
      .updateValidationList(name, validate);
  }

  saveSection(event) {
    event.preventDefault();
    this.setState({formValidated: true});
    let validationResult = true;
    for (let validation of this.props.validationList) {
      if (!validation.validate()) {
        validationResult = false;
      }
    }

    if (validationResult) {
      const moduleData = Object.assign({}, this.props.data && this.props.data[this.props.metadata.Name]);
      let redirectTo = Object.assign({}, this.props.metadata && this.props.metadata.redirectTo);
      let query = Object.assign({}, this.context.router.getCurrentLocation().query);

      this
        .props
        .actions
        .create(query.moduleName, moduleData, this.props.section.Name, query.clientId);
      this.setState({formValidated: false});
    }
  }

  render() {
    const {section, data, componentsState, currentIdentity, metadata, path} = this.props;
    if (!data || !metadata || !metadata.Options) {
      return null;
    }

    const query = this
      .context
      .router
      .getCurrentLocation()
      .query;

    const leftActions = metadata && metadata.LeftActions && metadata
      .LeftActions
      .map((button, index) => getLinkObject(button, {
        moduleName: metadata.Name,
        clientId: this.context.router.getCurrentLocation().query.clientId
      }, data, index, metadata));
    return (
      <div role="presentation" className="workspace p-client-layout">
        <PageHeader
          title={this.props.metadata.Title + " - " + metadataHelper.getDisplayName(section.DisplayName, data)}
          manageMode="WorkspaceIndicator_New"
          links={leftActions}
          buttons={[(
            <button key="2" type="button" onClick={this.saveSection}>Save</button>
          )]}/>
        <div
          className="workspace-content-container reactWorkspace"
          id="workspace-maincontent">
          <form>
            <div className="genericform-style">
              <h4>{metadataHelper.getDisplayName(section.DisplayName, data)}</h4>
              <SectionEditor
                fieldNamePrefix={this
                .props
                .path
                .substring(0, this.props.path.length - this.props.section.Name.length - 1)}
                section={this.props.section}
                data={data && data[this.props.metadata.Name]}
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

CreatePage.propTypes = {
  data: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  validationList: PropTypes.any,
  componentsState: PropTypes.any,
  currentIdentity: PropTypes.object,
  workflowStatus: PropTypes.object,
  metadata: PropTypes.object
};

CreatePage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {

  const path = ownProps.location.query.sectionName;
  let section = metadataHelper.getSectionByName(state.get("create").get("metadata"), path);

  return {
    data: state
      .get("create")
      .get("data") || {},
    section: section || {
      Name: ""
    },
    path: path || "",
    componentsState: state
      .get("create")
      .get("componentsState") || {},
    validationList: state
      .get("create")
      .get("validationList") || [],
    currentIdentity: state
      .get("create")
      .get("currentIdentity") || {},
    metadata: state
      .get("create")
      .get("metadata") || {},
    workflowStatus: state
      .get('create')
      .get('workflowStatus') || {}
  };
}

function mapDispatchToProps(dispatch) {

  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);
