import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PageHeader from 'components/Common/PageHeader';
import SharedPlanningForm from 'components/Business/PocSharedPlanning/SharedPlanningForm';
import * as pocPart3Actions from './actions';
import ModalConfirm from "components/Common/ModalConfirm";
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
      accessModel: {},
      currentSharedPlanning: {},
      isOpenSharedPlanningUpdateConfirm: false,
      sharePlaningProblem: []
    };
    this.onClickSave= this
      .onClickSave
      .bind(this);
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
      .loadPocPart3(query.dataId, query.clientId, query.prefix);
    this
      .props
      .actions
      .formValidated({});
  }

  fieldValidation(sharedPlanning, field) {
    let errors = this.props.errors;

    if (!field.value || field.value.Id==='') {
      errors[field.name] = "Field is required.";
    } else {
      errors[field.name] = null;
    }

    this
      .props
      .actions
      .formValidated(errors);
  }

  formValidation(sharedPlanning) {
    let formIsValid = true;
    let errors = {};
    
    if (!sharedPlanning.Cap || !sharedPlanning.Cap.Id) {
      errors.Cap = "CAP is required.";
      formIsValid = false;
    }
    if (!sharedPlanning.Priority || !sharedPlanning.Priority.Id) {
      errors.Priority = "Priority List is required.";
      formIsValid = false;
    }
    if (!sharedPlanning.DateInitiated) {
      errors.DateInitiated = "Date Initiated is required.";
      formIsValid = false;
    }
    if (!sharedPlanning.DateNextReview) {
      errors.DateNextReview = "Date Next Review is required.";
      formIsValid = false;
    }
    if (!sharedPlanning.HaveDateClosed || (sharedPlanning.HaveDateClosed != this.props.haveDateClosedTbdId && !sharedPlanning.DateClosed)) {
      errors.DateClosed = "Date Closed is required.";
      formIsValid = false;
    }
    for (var i = 0; i < sharedPlanning.ProblemDatas.length; i++) {
         var count1 = 0;
      for (var x = 0; x < sharedPlanning.ProblemDatas.length; x++) {
          if (sharedPlanning.ProblemDatas[x].Problem.Id == sharedPlanning.ProblemDatas[i].Problem.Id) {
            count1++;
          }
          if (count1 >= 2) {
          errors["ProblemDatas[" + i + "].Problem"] = "One CAP shouldn`t contain same Problem more than one.";
          formIsValid = false;
          break;
          }
        }
        if (!sharedPlanning.ProblemDatas[i].Problem || !sharedPlanning.ProblemDatas[i].Problem.Id) {
          errors["ProblemDatas[" + i + "].Problem"] = "Problem is required.";
          formIsValid = false;
        }
        if ( sharedPlanning.ProblemDatas[i].Problem.Id ===　this.props.problemOtherId　&& 　!sharedPlanning.ProblemDatas[i].Other) {
          errors["ProblemDatas[" + i + "].Other"] = "Other is required.";
          formIsValid = false;
        }
        for (var j = i; j < sharedPlanning.ProblemDatas[i].GoalDatas.length; j++) {
       
            var count2 = 0;
            for (var y =0; y < sharedPlanning.ProblemDatas[i].GoalDatas.length; y++) {
            if (sharedPlanning.ProblemDatas[i].GoalDatas[y].Goal.Id == sharedPlanning.ProblemDatas[i].GoalDatas[j].Goal.Id) {
              count2++;
            }
            if (count2 >= 2) {
              errors["ProblemDatas[" + i + "].GoalDatas[" + j + "].Goal"] = "One Problem shouldn`t contain same Goal more than one.";
              formIsValid = false;
              break;
            }
          }
          if (!sharedPlanning.ProblemDatas[i].GoalDatas[j].Goal || !sharedPlanning.ProblemDatas[i].GoalDatas[j].Goal.Id) {
            errors["ProblemDatas[" + i + "].GoalDatas[" + j + "].Goal"] = "Goal is required.";
            formIsValid = false;
          }
          if (!sharedPlanning.ProblemDatas[i].GoalDatas[j].TargetDate) {
            errors["ProblemDatas[" + i + "].GoalDatas[" + j + "].TargetDate"] = "Target Date is required.";
            formIsValid = false;
          }

          let targetDate = sharedPlanning.ProblemDatas[i].GoalDatas[j].TargetDate ;
          let dateNextReview = sharedPlanning.DateNextReview;
          if( Object.prototype.toString.call(targetDate) == "[object String]")
          {
            targetDate = 
              new Date(parseInt(targetDate.replace("/Date(", "").replace(")/", ""), 10));
          }
          if( Object.prototype.toString.call(dateNextReview) == "[object String]")
          {
            dateNextReview = 
              new Date(parseInt(dateNextReview.replace("/Date(", "").replace(")/", ""), 10));
          }
          if(targetDate > dateNextReview){
            errors["ProblemDatas[" + i + "].GoalDatas[" + j + "].TargetDate"] = "Target Date  can not be greater than Date Next Review.";
            formIsValid = false;
          }
          if (sharedPlanning.ProblemDatas[i].GoalDatas[j].Goal.Id ===　this.props.goalOtherId && !sharedPlanning.ProblemDatas[i].GoalDatas[j].Other) {
            errors["ProblemDatas[" + i + "].GoalDatas[" + j + "].Other"] = "Other is required.";
            formIsValid = false;
          }
        

        for (var k = j; k < sharedPlanning.ProblemDatas[i].GoalDatas[j].InterventionDatas.length; k++) {      

    var count3 = 0;
          for (var z = 0; z < sharedPlanning.ProblemDatas[i].GoalDatas[j].InterventionDatas.length; z++) {
            if (sharedPlanning.ProblemDatas[i].GoalDatas[j].InterventionDatas[z].Intervention.Id == sharedPlanning.ProblemDatas[i].GoalDatas[j].InterventionDatas[k].Intervention.Id) {
              count3++;
            }
            if (count3 >= 2) {
              errors["ProblemDatas[" + i + "].GoalDatas[" + j + "].InterventionDatas[" + k + "].Intervention"] = "One Goal shouldn`t contain same Intervention more than one.";
              formIsValid = false;
              break;
            }
          }
          if (!sharedPlanning.ProblemDatas[i].GoalDatas[j].InterventionDatas[k].Intervention || !sharedPlanning.ProblemDatas[i].GoalDatas[j].InterventionDatas[k].Intervention.Id) {
            errors["ProblemDatas[" + i + "].GoalDatas[" + j + "].InterventionDatas[" + k + "].Intervention"] = "Interventions is required.";
            formIsValid = false;
          }
          if (!sharedPlanning.ProblemDatas[i].GoalDatas[j].InterventionDatas[k].Owners ||
           sharedPlanning.ProblemDatas[i].GoalDatas[j].InterventionDatas[k].Owners.length===0||
           sharedPlanning.ProblemDatas[i].GoalDatas[j].InterventionDatas[k].Owners[0]==='') {
            errors["ProblemDatas[" + i + "].GoalDatas[" + j + "].InterventionDatas[" + k + "].Owners"] = "Owner is required.";
            formIsValid = false;
          }
          if (sharedPlanning.ProblemDatas[i].GoalDatas[j].InterventionDatas[k].Intervention.Id == this.props.interventionOtherId  && !sharedPlanning.ProblemDatas[i].GoalDatas[j].InterventionDatas[k].Other ) {
            errors["ProblemDatas[" + i + "].GoalDatas[" + j + "].InterventionDatas[" + k + "].Other"] = "Other is required.";
            formIsValid = false;
          }
        
      }
    }
    }
   
    this
      .props
      .actions
      .formValidated(errors);
    return formIsValid;
  }


  onClickSave(e) {
      e.preventDefault();

      let query = Object.assign({}, this.context.router.getCurrentLocation().query);
      
      this
        .props
        .actions
        .saveSharedPlannings(this.props.dataId, query.clientId, this.props.pocPart3,null,query.prefix);
  }

  onClickCreate(e, sharedPlanning) {
    e.preventDefault();
      if (this.formValidation(sharedPlanning)) {
      this
        .props
        .actions
        .addSharedPlanningForm(e.target.name, e.target.value);
     };
  }

  onClickUpdate(e, sharedPlanning) {
    e.preventDefault();
     if (this.formValidation(sharedPlanning)) {
        this
        .props
        .actions
        .saveSharedPlanningForm();     
     }
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

  onClickEdit(e, sharedPlanning,index) {
    this
      .props
      .actions
      .editPlayGroundSharedPlanning(sharedPlanning,index);    
  }

  onClickDelete(e, sharedPlanning,index) {
    e.preventDefault();
    this
      .props
      .actions
      .startSharedPlanningDeleting(sharedPlanning,index);
      this.setState({isOpenSharedPlanningUpdateConfirm : true})
  }

  onDeleteConfirmed(confirmDelete) {
    if (confirmDelete) {      
      this
        .props
        .actions
        .deletePocPart3Item(this.props.preDeleteSharedPlanning,this.props.pocPart3);
    }
      this.setState({isOpenSharedPlanningUpdateConfirm : false})
  }

  sharedPlanningClick() {
    let share = [];
    this
      .state
      .sharePlaningProblem
      .push({});
    share = this.state.sharePlaningProblem;
    this.setState({sharePlaningProblem: share})
  }

  onClickCancel(e) {
    this
      .props
      .actions
      .startSharedPlanningCreating();
  }

  render() {
    const {
      dataId,
      pocPart3,
      planId,
      playGroundSharedPlanning,
      underEditing,
      underDeleting,
      capCategorys,
      caps,
      prioritys,
      problems,
      problemIndex,
      problemOtherId,
      goals,
      goalOtherId,
      interventions,
      interventionOtherId,
      owners,
      haveDateCloseds,
      haveDateClosedTbdId,
      errors,
      securityContext
    } = this.props;

    const {accessModel} = this.state;
    if (lodash.keys(accessModel).length === 0) {
      return <div>Loading</div>;
    }
    if (pocPart3.size === 0) {
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
        { <ModalConfirm
          isOpen={this.state.isOpenSharedPlanningUpdateConfirm}
          title="Delete Shared Planning"
          style={"margin: 0 auto !important;"}
          message="Are you sure you want to delete this item from the list? Please note that after the item has been removed from the list, you have to click Save to preserve the changes."
          onYes={() => {
          this.onDeleteConfirmed(true);
        }}
          onNo={() => {
          this.onDeleteConfirmed(false);
        }}
          onClose={() => {
          this.onDeleteConfirmed(false);
        }}/> }
        <PageHeader
          title="Part III. Shared Planning"
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
          text="Back to Summary"/>)]}
          buttons={[(
            <button key="1" type="button" onClick={this.onClickSave}>Save</button>
          )]}/>

        <div className="reactWorkspace workspace-content-container">
          <form>
            <div className="genericform-style">
              <h4>Part III Shared Planning</h4>
              <SharedPlanningForm
                sharedPlannings={pocPart3}
                sharedPlanning={playGroundSharedPlanning}
                onClickCreate={this.onClickCreate}
                onClickUpdate={this.onClickUpdate}
                onClickCancel={this.onClickCancel}
                onClickEdit={this.onClickEdit}
                onClickDelete={this.onClickDelete}
                underEditing={underEditing}
                sharePlanningIndex={this.props.sharePlanningIndex}
                capCategorys={capCategorys}
                caps={caps}
                prioritys={prioritys}
                problems={problems}
                problemOtherId={problemOtherId}
                goals={goals}
                goalOtherId={goalOtherId}
                interventions={interventions}
                interventionOtherId={interventionOtherId}
                haveDateCloseds={haveDateCloseds}
                haveDateClosedTbdId={haveDateClosedTbdId}
                owners={owners}
                errors={errors}
                onFormChange={this.onFormChange}
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
  capCategorys: PropTypes.array.isRequired,
  caps: PropTypes.array.isRequired,
  prioritys: PropTypes.array.isRequired,
  problems: PropTypes.array.isRequired,
  problemOtherId: PropTypes.string.isRequired,
  goals: PropTypes.array.isRequired,
  goalOtherId: PropTypes.string.isRequired,
  interventions: PropTypes.array.isRequired,
  interventionOtherId: PropTypes.string.isRequired,
  owners: PropTypes.array.isRequired,
  haveDateCloseds: PropTypes.array.isRequired,
  haveDateClosedTbdId: PropTypes.string.isRequired,
  errors: PropTypes.any,
  securityContext: PropTypes.object.isRequired,
  playGroundSharedPlanning: PropTypes.object,
  preDeleteSharedPlanning: PropTypes.object,
  planId: PropTypes.string,
  underEditing: PropTypes.bool,
  underDeleting: PropTypes.bool,
  sharePlanningIndex: PropTypes.any,
};

function mapStateToProps(state) {
  return {
    pocPart3: state
      .get('pocPart3Manage')
      .get('pocPart3') || [],
    dataId: state
      .get('pocPart3Manage')
      .get('dataId') || "",
    clientId: state
      .get('pocPart3Manage')
      .get('clientId') || "",
    playGroundSharedPlanning: readPlainJsonObjectFromState(state.get('pocPart3Manage').get('playGroundSharedPlanning')) || findEmptySharedPlanning(),
    preDeleteSharedPlanning: readPlainJsonObjectFromState(state.get('pocPart3Manage').get('preDeleteSharedPlanning')) || findEmptySharedPlanning(),
    underEditing: state
      .get('pocPart3Manage')
      .get('underEditing') || false,
    underDeleting: state
      .get('pocPart3Manage')
      .get('underDeleting') || false,
    caps: state
      .get('pocPart3Manage')
      .get('caps') || [],
    capCategorys: state
      .get('pocPart3Manage')
      .get('capCategorys') || [],
    prioritys: state
      .get('pocPart3Manage')
      .get('prioritys') || [],
    problems: state
      .get('pocPart3Manage')
      .get('problems') || [],
    problemOtherId: state
      .get('pocPart3Manage')
      .get('problemOtherId') || '',
    goals: state
      .get('pocPart3Manage')
      .get('goals') || [],
    goalOtherId: state
      .get('pocPart3Manage')
      .get('goalOtherId') || '',
    interventions: state
      .get('pocPart3Manage')
      .get('interventions') || [],
    interventionOtherId: state
      .get('pocPart3Manage')
      .get('interventionOtherId') || "",
    haveDateClosedTbdId: state
      .get('pocPart3Manage')
      .get('haveDateClosedTbdId') || "",
    owners: state
      .get('pocPart3Manage')
      .get('owners') || [],
    haveDateCloseds: state
      .get('pocPart3Manage')
      .get('haveDateCloseds') || [],
    errors: state
      .get('pocPart3Manage')
      .get('errors') || [],
    securityContext: state
      .get("pocPart3Manage")
      .get("securityContext") || {},
    sharePlanningIndex: state
      .get('pocPart3Manage')
      .get('sharePlanningIndex') || 0,
  };
}

function mapDispatchToProps(dpocatch) {
  return {
    actions: bindActionCreators(pocPart3Actions, dpocatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PocPart3Page);