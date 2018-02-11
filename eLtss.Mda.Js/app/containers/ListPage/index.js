import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DataTable from 'components/MetadataDriven/DataTable';
import SearchPanel from 'components/MetadataDriven/SearchPanel';
import * as actions from './actions';
import {HOST, DEFAULT_MODULE} from "config";
import PageHeader from 'components/Common/PageHeader';
import {getLinkObject} from 'utils/metadataHelper';
import * as aclHelper from 'utils/aclHelper';
import {getAccessControlFromCache} from 'services/accessControlServices';
import lodash from 'lodash';
import {convertValueToDisplayValue} from 'utils/displayConverter';
import {Link} from 'react-router';
import TextBoxInput from 'components/Common/TextBox';
import ModalConfirm from "components/Common/ModalConfirm";


class ListPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      accessModel: {},
      searchCriteria: {},
      openConfirmModal:false
    };
    this.onSearch = this
      .onSearch
      .bind(this);
    this.onClear = this
      .onClear
      .bind(this);
    this.updateSearchCriteria = this
      .updateSearchCriteria
      .bind(this);
    this.onClickCreate = this
      .onClickCreate
      .bind(this);
    this.addToOutreachQueue = this
      .addToOutreachQueue
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
    this
      .props
      .actions
      .loadListPage(moduleName, query.clientId || "");
      getAccessControlFromCache(moduleName).then((accessModel) => {
        _this.setState({accessModel});
      });
  }

  updateSearchCriteria(changes) {
    let {searchCriteria} = this.state;
    if (changes && changes.length > 0) {
      for (let change of changes) {
        lodash.set(searchCriteria, change.name, change.value);
      }
    }
    this.setState({searchCriteria});
  }

  onClear() {
    this.setState({searchCriteria: {}});
  }

  onClickCreate(navigateTo)
  { 
    if(navigateTo.IsModalConfirmButton===true){
      this.setState({openConfirmModal:true})
    } else{
      const query = this
      .context
      .router
      .getCurrentLocation()
      .query;
    const moduleName = query.moduleName || DEFAULT_MODULE;
    const clientId = query.clientId;
    
    this
      .props
      .actions
      .preCreate(moduleName, clientId, navigateTo);
    }  
    
  }

  onSearch() {
    let {searchCriteria} = this.state;
    const query = this
      .context
      .router
      .getCurrentLocation()
      .query;
    let moduleName = query.moduleName || DEFAULT_MODULE;
    this
      .props
      .actions
      .OnSearch(moduleName, searchCriteria);
  }

  addToOutreachQueue(yes,clientId){
    if(yes){
      this.props.actions.addToOutreachQueue(clientId)
    }
    this.setState({'openConfirmModal':false})
  }

  render() {    
    const {clientId, data, listModel, metadata} = this.props;
    const {accessModel} = this.state;
    if (lodash.keys(accessModel).length === 0) {
      return <div>Loading</div>;
    }
    if (!data || !metadata) {
      return <div>Loading</div>;
    }
    const query = this
      .context
      .router
      .getCurrentLocation()
      .query;

    let moduleName = query.moduleName || metadata.Name;

    const context = {
      clientId: clientId,
      moduleName: moduleName
    };

    const {CurrentIdentity} = data;
    const {views, options} = metadata;
    const listView = views && views["list"];
    if (!listView) {
      return <div>Loading</div>;
    }
    
    let currentIdentity = (listModel.DataObject && listModel.DataObject.CurrentIdentity) ? listModel.DataObject.CurrentIdentity : listModel.CurrentIdentity;

     const securityContext = {
       CurrentIdentity:currentIdentity ,
       AccessModel: accessModel,
       ModuleData:data
     };
    
    let activePoc = lodash.find(data, item => {
        return item.Status&&item.Status !== "Discarded";
    });
    //Check to see if the user has create permissions then show/hide the 'Create' button for POC and VisitCheckList  and Outreach
    let canCreate;    
    if (metadata.Name === 'PlanOfCare'){
      canCreate = (activePoc? activePoc.length < 1 : true)  && (aclHelper.canManage(securityContext, "PlanOfCare.Create") || aclHelper.canManage(securityContext, "VisitChecklist.Create"));      
    }else{
      canCreate = aclHelper.canManage(securityContext, "PlanOfCare.Create") || aclHelper.canManage(securityContext, "VisitChecklist.Create")|| aclHelper.canManage(securityContext, "Outreach.Create");      
    }

    const buttons = canCreate ? (listView && listView.Buttons && listView
      .Buttons
      .map((button, index) => getLinkObject(button, context, data, index, metadata, this.onClickCreate))) : "";

    const className = listView && listView.ClassName;
    if (className === 'react-full-workspace') {
      const sidenav = document.getElementById('sidenav');
      if (sidenav) {
        sidenav.style.display = 'none';
      }
    }

    return (
      <div role="presentation" className={className}>
        <ModalConfirm
            isOpen={this.state.openConfirmModal}
            title="Add to Outreach Queue"
            message="Are you sure you want to add this participant to outreach queue?"
            onYes={() => {
            this.addToOutreachQueue(true, clientId);
        }}
            onNo={() => {
            this.addToOutreachQueue(false);
        }}
            onClose={() => {
            this.addToOutreachQueue(false);
        }}/>
        {listView.Title && <PageHeader
          title={listView.Title}
          manageMode={"WorkspaceIndicator_List"}
          links={[]}
          description={""}
          buttons={buttons}/>}

        <SearchPanel
          listView={listView}
          context={context}
          buttons={buttons}
          onSearch={this.onSearch}
          updateSearchCriteria={this.updateSearchCriteria}
          listModel={listModel}
          onClear={this.onClear}
          searchCriteria={this.state.searchCriteria}/>

        <DataTable
          data={data}
          metadata={metadata}
          listView={listView}
          context={context}
          searchCriteria={this.state.searchCriteria}/>
      </div>
    );
  }
}

ListPage.contextTypes = {
  router: PropTypes.object
};

ListPage.propTypes = {
  clientId: PropTypes.string,
  data: PropTypes.any,
  securityContext: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    clientId: state
      .get('listPage')
      .get('clientId') || "",
    data: state
      .get('listPage')
      .get('data') || [],
    securityContext: state
      .get("listPage")
      .get("securityContext") || {},
    listModel: state
      .get('listPage')
      .get('listModel') || {},
    metadata: state
      .get('listPage')
      .get('metadata') || {}
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
