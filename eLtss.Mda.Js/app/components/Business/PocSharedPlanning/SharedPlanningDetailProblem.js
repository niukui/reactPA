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
import SharedPlanningDetailGoal from "components/Business/PocSharedPlanning/SharedPlanningDetailGoal";
import Textarea from "components/Common/Textarea";
import TextBox from 'components/Common/TextBox';
import {forIn} from 'lodash';

const saveRequired = true;
class SharedPlanningDetailProblem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      bodyVisible: true,
      filterGoals: props.goals,
      problemLookupLength: 35
    };
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

  toggleBodyVisible() {
    this.setState({
      bodyVisible: !this.state.bodyVisible
    });
  }

  render() {
    const {
      sharedPlanning,
      problemData,
      problemIndex,
      goals,
      interventions,
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
        
          <fieldset className="fieldset-container-three">            
            <legend className="legend-header-three">Problem</legend>
            <div
            className={bodyVisible
            ? "bodyVisible"
            : "bodyHidden"}>
            <div className="row">
              <label className="complete-required" htmlFor="Problem">
                Problem:                
              </label>
              <TextBox
                name="Problem"
                value={problemData.Problem.Name}
                readonly={true}/> 
            </div>

            {problemData.Problem&&problemData.Problem.Id == this.props.problemOtherId
              ? <div className="row">
                  <label className="complete-required" htmlFor="Other">
                    Other:
                    
                  </label>
                  <Textarea
                    name="Other"
                    value={problemData.Other}
                    readonly={true}
                    />
                </div>
              : ""
}

            {problemData && problemData
              .GoalDatas
              .map((goal, goalIndex) => {
                return (<SharedPlanningDetailGoal
                  problemData={problemData}
                  goalData={goal}
                  goalIndex={goalIndex}
                  problemIndex={problemIndex}
                  key={goalIndex}
                  goals={this.state.filterGoals}
                  interventions={interventions}
                  goalOtherId={goalOtherId}
                  interventionOtherId={interventionOtherId}
                  owners={owners}/>);
              })}
          
          </div>
          </fieldset>
        </fieldset>
      </div>
    );
  }
}

SharedPlanningDetailProblem.propTypes = {
  problemData: PropTypes.object.isRequired,
  problemOtherId: PropTypes.string.isRequired,
  goals: PropTypes.array.isRequired,
  goalOtherId: PropTypes.string.isRequired,
  interventions: PropTypes.array.isRequired,
  interventionOtherId: PropTypes.string.isRequired,
  problemIndex: PropTypes.number

};

export default SharedPlanningDetailProblem;
