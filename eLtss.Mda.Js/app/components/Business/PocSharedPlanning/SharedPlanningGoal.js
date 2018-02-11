import React, {PropTypes} from 'react';
import moment from 'moment';
import {selectListItemsForDropdown, selectListItemsForMultiSelect} from 'utils/dropdownTransformer';
import DropdownList from 'components/Common/DropdownList';
import DatePicker from 'components/Common/DatePicker';
import Textarea from 'components/Common/Textarea';
import Multiselect from 'components/Common/Multiselect';
import TextInput from 'components/Common/TextInput';
import {ISP_WORKFLOW_STATUS} from 'utils/constants';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import SharedPlanningIntervention from 'components/Business/PocSharedPlanning/SharedPlanningIntervention';
import * as aclHelper from 'utils/aclHelper';

const saveRequired = true;

class SharedPlanningGoal extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      bodyVisible: true,
      filterInterventions: props.interventions,
      goalLookupLength: 32
    };
    this.prepareChanges = this
      .prepareChanges
      .bind(this);
  }

  componentWillReceiveProps(nextProps){

    if(nextProps.goalData.Goal.Id){
      this.setState({
        filterInterventions: this
          .props
          .interventions
          .filter(item => item.RuleAttributes.find(x => x.Guid === nextProps.goalData.Goal.Id.substring(this.state.goalLookupLength).toLowerCase()))
      });
    }else{
      this.setState({filterInterventions: this.props.interventions});
    }    
  }

  addIntervention() {
    this
      .props
      .goalData
      .InterventionDatas
      .push({Intervention: {}, Other: "", Owners: []});
    this
      .props
      .onChangeForm({
        target: {
          name: "ProblemDatas[" + this.props.problemIndex + "].GoalDatas[" + this.props.goalIndex + "]",
          value: this.props.goalData
        }
      });
  }
  deleteGoal()
  {
    this
      .props
      .problemData
      .GoalDatas
      .splice(this.props.goalIndex, 1);

    this
      .props
      .onChangeForm({
        target: {
          name: "ProblemDatas[" + this.props.problemIndex + "].GoalDatas",
          value: this.props.problemData.GoalDatas
        }
      });
  }

  toggleBodyVisible() {
    this.setState({
      bodyVisible: !this.state.bodyVisible
    });
  }

  prepareChanges(event) {
    // if (event.target.name == "Goal") {
    //   if (event.target.value.Id) {
    //     this.setState({
    //       filterInterventions: this
    //         .props
    //         .interventions
    //         .filter(item => item.RuleAttributes.find(x => x.Guid === event.target.value.Id.substring(this.state.goalLookupLength).toLowerCase()))
    //     });
    //   } else {
    //     this.setState({filterInterventions: this.props.interventions});
    //   }
    // }

    this
      .props
      .onChangeForm({
        target: {
          name: "ProblemDatas[" + this.props.problemIndex + "].GoalDatas[" + this.props.goalIndex + "]." + event.target.name,
          value: event.target.value
        }
      });
  }
  render() {
    const {
      problemData,
      goalData,
      onChangeForm,
      errors,
      securityContext,
      goalIndex,
      problemIndex,
      goals,
      goalOtherId,
      interventions,
      interventionOtherId,
      owners,
      //deleteGoal
    } = this.props
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
              this.toggleBodyVisible()
            }}></div>
            Goal #{goalIndex + 1}
          </legend>
          <div className="header-link">
          {problemData && problemData.GoalDatas.length > 1 ? 
            <a
              href="#"
              onClick={() => {
              this.deleteGoal(goalIndex)
            }}>Remove</a>
            : ''
            }  
            <a
                href="#"
                role="button"
                onClick={() => {
                this.addIntervention()
              }}>Add Interventions</a>
          </div>
        <fieldset className="fieldset-container-three">
          <legend className="legend-header-three">Goal</legend>
          <div
            className={bodyVisible
            ? "bodyVisible"
            : "bodyHidden"}>
            <div className="row">
              <label className='complete-required' htmlFor="Goal">Goal:<RequiredIndicator/>
              </label>
              <DropdownList
                name="Goal"
                onChange={(event) => {
                this.prepareChanges(event);
              }}
                value={goalData.Goal}
                options={selectListItemsForDropdown(goals || [], 'Id', "Name")}
                saveRequired={true}/> 
                {errors["ProblemDatas[" + this.props.problemIndex + "].GoalDatas["+this.props.goalIndex+"].Goal"] && <div className="error alert alert-danger">{errors["ProblemDatas[" + this.props.problemIndex + "].GoalDatas["+this.props.goalIndex+"].Goal"] }</div>}
              
            </div>

            {goalData.Goal&&goalData.Goal.Id == this.props.goalOtherId
              ? <div className="row">
                  <label className="complete-required" htmlFor="Other">
                    Other:
                    <RequiredIndicator/>
                  </label>
                  <Textarea
                    name="Other"
                    onChange={(event) => {
                    this.prepareChanges(event);
                  }}
                    isRequired = {true}
                    value={goalData.Other}
                    saveRequired={true}/> 
                    {errors["ProblemDatas[" + this.props.problemIndex + "].GoalDatas["+this.props.goalIndex+"].Other"] && <div className="error alert alert-danger">{errors["ProblemDatas[" + this.props.problemIndex + "].GoalDatas["+this.props.goalIndex+"].Other"] }</div>}
                </div>
              : ""
}
              <div className="row">
              <label className='complete-required' htmlFor="TargetDate">Target Date:<RequiredIndicator/>
              </label>
              <DatePicker
                saveRequired
                className="required"
                id="TargetDate"
                value={goalData.TargetDate}
                onChange={(event) => {
                this.prepareChanges(event);
              }}
                error={errors.TargetDate}
                name="TargetDate"/> 
                {errors["ProblemDatas[" + this.props.problemIndex + "].GoalDatas["+this.props.goalIndex+"].TargetDate"] && <div className="error alert alert-danger">{errors["ProblemDatas[" + this.props.problemIndex + "].GoalDatas["+this.props.goalIndex+"].TargetDate"] }</div>}
            </div>

            <div className="row">
              <label className="auto-width" htmlFor="Note">
                Note:
              </label>
              <Textarea
                name="Note"
                onChange={(event) => {
                this.prepareChanges(event);
              }}
                value={goalData.Note}
                saveRequired/> 
            </div>
            {goalData && goalData
              .InterventionDatas
              .map((intervention, interventionIndex) => {
                return <SharedPlanningIntervention
                  goalData={goalData}
                  interventionData={intervention}
                  onChangeForm={onChangeForm}
                  errors={errors}
                  problemIndex={problemIndex}
                  goalIndex={goalIndex}
                  interventionIndex={interventionIndex}
                  key={interventionIndex}
                  interventions={this.state.filterInterventions}
                  interventionOtherId={interventionOtherId}
                  owners={owners}
                  securityContext={securityContext}/>
              })}
          </div>
          </fieldset>
        </fieldset>
      </div>
    )
  }
}

SharedPlanningGoal.propTypes = {
  problemData: PropTypes.object.isRequired,
  goalData: PropTypes.object.isRequired,
  goalIndex: PropTypes.number,
  problemIndex: PropTypes.number,
  goals: PropTypes.array.isRequired,
  goalOtherId: PropTypes.string.isRequired,
  interventions: PropTypes.array.isRequired,
  interventionOtherId: PropTypes.string.isRequired
};

export default SharedPlanningGoal;