import React, {PropTypes} from "react";
import moment from "moment";
import {selectListItemsForDropdown, selectListItemsForMultiSelect} from "utils/dropdownTransformer";
import DropdownList from "components/Common/DropdownList";
import DatePicker from "components/Common/DatePicker";
import Multiselect from "components/Common/Multiselect";
import TextInput from "components/Common/TextInput";
import {ISP_WORKFLOW_STATUS} from "utils/constants";
import RequiredIndicator from "components/Common/RequiredIndicator";
import * as aclHelper from "utils/aclHelper";
import NewCollapsiblePanel from "components/Common/NewCollapsiblePanel";
import SharedPlanningGoal from "components/Business/PocSharedPlanning/SharedPlanningGoal";
import Textarea from "components/Common/Textarea";
import {forIn} from 'lodash';

const saveRequired = true;
class SharedPlanningProblem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      bodyVisible: true,
      filterGoals: props.goals,
      problemLookupLength: 35
    };
    this.addGoal = this
      .addGoal
      .bind(this);
    this.deleteProblem = this
      .deleteProblem
      .bind(this);
    this.prepareChanges = this
      .prepareChanges
      .bind(this);
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.problemData.Problem.Id){
      this.setState({
        filterGoals: this
          .props
          .goals
          .filter(item => item.RuleAttributes.find(x => x.Guid === nextProps.problemData.Problem.Id.substring(this.state.problemLookupLength).toLowerCase()))
      });
    }else{
      this.setState({filterGoals: this.props.goals});
    }    
  }

  addGoal() {
    this
      .props
      .problemData
      .GoalDatas
      .push({
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
      });

    this
      .props
      .onChangeForm({
        target: {
          name: "ProblemDatas[" + this.props.problemIndex + "].GoalDatas",
          value: this.props.problemData.GoalDatas
        }
      });
  }

  deleteProblem() {
    this
      .props
      .sharedPlanning
      .ProblemDatas
      .splice(this.props.problemIndex, 1);
    this
      .props
      .onChangeForm({
        target: {
          name: "ProblemDatas",
          value: this.props.sharedPlanning.ProblemDatas
        }
      });
  }

  toggleBodyVisible() {
    this.setState({
      bodyVisible: !this.state.bodyVisible
    });
  }

  prepareChanges(event) {
    // if (event.target.name == "Problem") {
    //   if (event.target.value.Id) {
    //     this.setState({
    //       filterGoals: this
    //         .props
    //         .goals
    //         .filter(item => item.RuleAttributes.find(x => x.Guid === event.target.value.Id.substring(this.state.problemLookupLength).toLowerCase()))
    //     });
    //   } else {
    //     this.setState({filterGoals: this.props.goals});
    //   }
    // }

    this
      .props
      .onChangeForm({
        target: {
          name: "ProblemDatas[" + this.props.problemIndex + "]." + event.target.name,
          value: event.target.value
        }
      });
  };

  render() {
    const {
      sharedPlanning,
      problemData,
      onChangeForm,
      errors,
      securityContext,
      problemIndex,
      goals,
      interventions,
      problems,
      owners,
      interventionOtherId,
      goalOtherId,
      problemOtherId
    } = this.props;
    const {bodyVisible} = this.state;
    return (
      <div>
        <fieldset className="fieldset-container-two">
          <legend className="legend-header-two">
            <div
              className={bodyVisible
              ? "icon-minus expand"
              : "icon-plus collapse"}
              onClick={() => {
              this.toggleBodyVisible();
            }}></div>
            Problem #{problemIndex + 1}
          </legend>
          <div className="header-link">
          {sharedPlanning && sharedPlanning.ProblemDatas.length > 1 ? 
            <a
              href="#"
              role="button"
              onClick={() => {
              this.deleteProblem();
            }}>
              Remove
            </a>
           : ''
          }
          <a
                href="#"
                role="button"
                onClick={() => {
                this.addGoal();
              }}>
                Add Goal
            </a>
          </div> 
          <fieldset className="fieldset-container-three">            
            <legend className="legend-header-three">Problem</legend>
            <div
            className={bodyVisible
            ? "bodyVisible"
            : "bodyHidden"}>
            <div className="row">
              <label className="complete-required" htmlFor="Problem">
                Problem:
                <RequiredIndicator/>
              </label>
              <DropdownList
                name="Problem"
                onChange={(event) => {
                this.prepareChanges(event);
              }}
                value={problemData.Problem}
                options={selectListItemsForDropdown(problems || [], "Id", "Name")}
                saveRequired={true}/> 
                {errors["ProblemDatas["+this.props.problemIndex+"].Problem"] && <div className="error alert alert-danger">{errors["ProblemDatas["+this.props.problemIndex+"].Problem" ] }</div>}
            </div>

            {problemData.Problem&&problemData.Problem.Id == this.props.problemOtherId
              ? <div className="row">
                  <label className="complete-required" htmlFor="Other">
                    Other:
                    <RequiredIndicator/>
                  </label>
                  <Textarea
                    name="Other"
                    isRequired = {true}
                    onChange={(event) => {
                    this.prepareChanges(event);
                  }}
                    value={problemData.Other}
                    saveRequired={true}
                    />
                    {errors["ProblemDatas["+this.props.problemIndex+"].Other"] && <div className="error alert alert-danger">{errors["ProblemDatas["+this.props.problemIndex+"].Other" ] }</div>}
                </div>
              : ""
}

            {problemData && problemData
              .GoalDatas
              .map((goal, goalIndex) => {
                return (<SharedPlanningGoal
                  problemData={problemData}
                  goalData={goal}
                  onChangeForm={onChangeForm}
                  errors={errors}
                  goalIndex={goalIndex}
                  problemIndex={problemIndex}
                  key={goalIndex}
                  goals={this.state.filterGoals}
                  interventions={interventions}
                  goalOtherId={goalOtherId}
                  interventionOtherId={interventionOtherId}
                  owners={owners}
                  securityContext={securityContext}/>);
              })}
          
          </div>
          </fieldset>
        </fieldset>
      </div>
    );
  }
}

SharedPlanningProblem.propTypes = {
  problemData: PropTypes.object.isRequired,
  problems: PropTypes.array.isRequired,
  problemOtherId: PropTypes.string.isRequired,
  goals: PropTypes.array.isRequired,
  goalOtherId: PropTypes.string.isRequired,
  interventions: PropTypes.array.isRequired,
  interventionOtherId: PropTypes.string.isRequired,
  onChangeForm: PropTypes.func,
  errors: PropTypes.object,
  problemIndex: PropTypes.number

};

export default SharedPlanningProblem;
