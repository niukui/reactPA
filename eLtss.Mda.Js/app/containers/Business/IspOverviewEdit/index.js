import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadIspOverview, onChangeForm, saveIspOverview} from './actions';
import IspOverviewEdit from 'components/Business/Isp/IspOverviewEdit';
import {HOST, DEFAULT_MODULE} from "config";
import getMetadataFromCache from 'services/metadataServices';
import {bindActionCreators} from 'redux';
import * as actions from './actions';

class IspOverviewEditPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      metadata: {}
    };
  }
  componentDidMount() {

    const _this = this;
    const query=this.context.router.getCurrentLocation().query;
    let moduleName = query.moduleName || DEFAULT_MODULE;

    getMetadataFromCache(moduleName).then((metadata) => {
      _this.setState({metadata});

      this
        .props
        .actions.loadOverview(this.context.router.getCurrentLocation().query.dataId, metadata);
    });

  }

  render() {
    const {data, onChangeForm, saveOverview} = this.props;
    const {metadata} = this.state;

    if (!data || !metadata ) {
      return <div>Loading</div>;
    }

    const entityData = data[metadata.Name] && data[metadata.Name];
    if(!entityData)
    {
         return <div>Loading</div>;
    }

    return (<IspOverviewEdit
      entityData = {entityData}
      ispTypes = {data.IspTypes || []}
      metadata = {metadata}
      onChangeForm = {this.props.actions.onChangeForm}
      saveOverview = {this.props.actions.saveOverview}/>);
  }
}

IspOverviewEditPage.contextTypes = {
  router: PropTypes.object
};

const changeForm = (evt, dispatch) => dispatch(onChangeForm(evt));

IspOverviewEditPage.propTypes = {
  data: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    data: state
      .get('ispOverview')
      .get('data') || {}
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(IspOverviewEditPage);
