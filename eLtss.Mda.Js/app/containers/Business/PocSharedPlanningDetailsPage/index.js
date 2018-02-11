import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PageHeader from 'components/Common/PageHeader';
import SharedPlanningDetailForm from 'components/Business/PocSharedPlanning/SharedPlanningDetailForm';
import * as pocPart3Actions from './actions';
import AuthorizedLink from 'components/Common/links/AuthorizedLink';
import * as aclHelper from 'utils/aclHelper';
import {getAccessControlFromCache} from 'services/accessControlServices';
import toastr from "utils/toastr";
import {browserHistory} from 'react-router';
import path from 'path';
import moment from 'moment';
import lodash from 'lodash';
import { formatJsonDateTime ,formatJsonDate} from 'utils/dateHelper';

class PocPart3Page extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      accessModel: {}
    };    
    this.onClickEdit = this
      .onClickEdit
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
      .loadPocPart3(query.dataId, query.clientId, query.prefix);
  }

  onClickEdit(e, sharedPlanning,index) {
    this
      .props
      .actions
      .editPlayGroundSharedPlanning(sharedPlanning,index);    
  }

  render() {
    const {
      dataId,
      pocPart3,
      planId,
      playGroundSharedPlanning,
      goalOtherId,
      problemOtherId,
      goals,
      interventions,
      interventionOtherId,
      owners,
      haveDateCloseds,
      haveDateClosedTbdId,
      securityContext
    } = this.props;

    var sharedPlanning=null;
    if(pocPart3.length>0){
      if(lodash.isEmpty(playGroundSharedPlanning.Cap)){
        sharedPlanning=pocPart3[0];
      }
    }
    const {accessModel} = this.state;
    if (lodash.keys(accessModel).length === 0) {
      return <div>Loading</div>;
    }
    if (pocPart3.size === 0) {
      return <div>Loading</div>;
    }

    lodash.set(securityContext, "AccessModel", accessModel);

    const canManage = aclHelper.canAccess(securityContext, 'SharedPlannings');
    if (canManage === false) {
      toastr.error("Access denied. You are not authorized to access this page.");
      return <div>You are not authorized to access this page.</div>;
    }

    return (
      <div role="presentation" className="workspace p-client-layout">
        <PageHeader
          title="Part III. Shared Planning Details"
          manageMode="WorkspaceIndicator_Manage"
          links={[(<AuthorizedLink
          key="1"
          prefix={this
          .props
          .dataId
          .startsWith('poc')
          ? "/PlanOfCare/PlanOfCare"
          : "/PlanOfCares/PlanOfCare"}
          to={{
          pathname: 'summary',
          query: {
            dataId: this.props.dataId,
            clientId: this.props.clientId,
            moduleName: this
              .props
              .dataId
              .startsWith('poc')
              ? 'PlanOfCare'
              : 'PlanOfCare'
          }
        }}
          text="Back to Summary"/>)]}/>

        <div className="reactWorkspace workspace-content-container">
          <form>
            <div className="genericform-style">
              <h4>Part III Shared Planning</h4>
              <SharedPlanningDetailForm
                sharedPlannings={pocPart3}
                sharedPlanning={sharedPlanning||playGroundSharedPlanning}
                onClickEdit={this.onClickEdit}
                problemOtherId={problemOtherId}
                goals={goals}
                goalOtherId={goalOtherId}             
                interventions={interventions}
                interventionOtherId={interventionOtherId}
                haveDateCloseds={haveDateCloseds}
                haveDateClosedTbdId={haveDateClosedTbdId}
                owners={owners}
                securityContext={securityContext}/>
            </div>               
          </form>
        </div>
      </div>
    );

  }
}

PocPart3Page.contextTypes = {
  router: PropTypes.object
};

function readPlainJsonObjectFromState(stateObj) {
  return stateObj && stateObj.toJS
    ? stateObj.toJS()
    : stateObj;
}

function findEmptySharedPlanning() {
  return {
    Cap: {},
    Priority: {},
    ProblemDatas: [
      {
        Problem: {},
        Other: "",
        GoalDatas: [
          {
            Goal: {},
            Other: "",
            TargetDate: null,
            Note: "",
            InterventionDatas: [
              {
                Intervention: {},
                Other: "",
                Owners: []
              }
            ]
          }
        ]
      }
    ],
    DateInitiated: null,
    DateNextReview: null,
    HaveDateClosed: null,
    DateClosed: null
  };
}

PocPart3Page.propTypes = {
  actions: PropTypes.object.isRequired,
  pocPart3: PropTypes.any,
  dataId: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  goals: PropTypes.array.isRequired,
  goalOtherId: PropTypes.string.isRequired,
  interventions: PropTypes.array.isRequired,
  interventionOtherId: PropTypes.string.isRequired,
  problemOtherId: PropTypes.string.isRequired,
  owners: PropTypes.array.isRequired,
  haveDateCloseds: PropTypes.array.isRequired,
  haveDateClosedTbdId: PropTypes.string.isRequired,
  securityContext: PropTypes.object.isRequired,
  playGroundSharedPlanning: PropTypes.object,
  preDeleteSharedPlanning: PropTypes.object,
  planId: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    pocPart3: state
      .get('pocPart3Details')
      .get('pocPart3') || [],
    dataId: state
      .get('pocPart3Details')
      .get('dataId') || "",
    clientId: state
      .get('pocPart3Details')
      .get('clientId') || "",
    playGroundSharedPlanning: readPlainJsonObjectFromState(state.get('pocPart3Details').get('playGroundSharedPlanning')) || findEmptySharedPlanning(),
    preDeleteSharedPlanning: readPlainJsonObjectFromState(state.get('pocPart3Details').get('preDeleteSharedPlanning')) || findEmptySharedPlanning(),
    goals: state
      .get('pocPart3Details')
      .get('goals') || [],
    interventions: state
      .get('pocPart3Details')
      .get('interventions') || [],   
    haveDateClosedTbdId: state
      .get('pocPart3Details')
      .get('haveDateClosedTbdId') || "",
    owners: state
      .get('pocPart3Details')
      .get('owners') || [],
    haveDateCloseds: state
      .get('pocPart3Details')
      .get('haveDateCloseds') || [],
    securityContext: state
      .get("pocPart3Details")
      .get("securityContext") || {},
    problemOtherId: state
      .get('pocPart3Details')
      .get('problemOtherId') || '',  
    goalOtherId: state
      .get('pocPart3Details')
      .get('goalOtherId') || '', 
    interventionOtherId: state
      .get('pocPart3Details')
      .get('interventionOtherId') || "", 
  };
}

function mapDispatchToProps(dpocatch) {
  return {
    actions: bindActionCreators(pocPart3Actions, dpocatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PocPart3Page);