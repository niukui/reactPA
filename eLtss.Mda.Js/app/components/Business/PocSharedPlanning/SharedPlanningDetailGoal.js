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
import SharedPlanningDetailIntervention from 'components/Business/PocSharedPlanning/SharedPlanningDetailIntervention';
import TextBox from 'components/Common/TextBox';
import * as aclHelper from 'utils/aclHelper';

const saveRequired = true;

class SharedPlanningDetailGoal extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      bodyVisible: true,
      filterInterventions: props.interventions,
      goalLookupLength: 32
    };
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


  toggleBodyVisible() {
    this.setState({
      bodyVisible: !this.state.bodyVisible
    });
  }


  render() {
    const {
      goalData,
      goalIndex,
      problemIndex,
      goalOtherId,
      interventions,
      interventionOtherId,
      owners,
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
        <fieldset className="fieldset-container-three">
          <legend className="legend-header-three">Goal</legend>
          <div
            className={bodyVisible
            ? "bodyVisible"
            : "bodyHidden"}>
            <div className="row">
              <label className='complete-required' htmlFor="Goal">Goal:
              </label>
              <TextBox
                name="Goal"
                value={goalData.Goal.Name}
                readonly={true}/> 

            </div>

            {goalData.Goal&&goalData.Goal.Id == this.props.goalOtherId
              ? <div className="row">
                  <label className="complete-required" htmlFor="Other">
                    Other:
                  </label>
                  <Textarea
                    name="Other"
                    value={goalData.Other}
                    readonly={true}/> 
                </div>
              : ""
}
              <div className="row">
              <label className='complete-required' htmlFor="TargetDate">Target Date:
              </label>
              <DatePicker
                id="TargetDate"
                value={goalData.TargetDate}
                name="TargetDate"
                readonly={true}/> 
            </div>

            <div className="row">
              <label className="auto-width" htmlFor="Note">
                Note:
              </label>
              <Textarea
                name="Note"
                value={goalData.Note}
                readonly={true}/> 
            </div>
            {goalData && goalData
              .InterventionDatas
              .map((intervention, interventionIndex) => {
                return <SharedPlanningDetailIntervention
                  goalData={goalData}
                  interventionData={intervention}
                  problemIndex={problemIndex}
                  goalIndex={goalIndex}
                  interventionIndex={interventionIndex}
                  key={interventionIndex}
                  interventions={this.state.filterInterventions}
                  interventionOtherId={interventionOtherId}
                  owners={owners}/>
              })}
          </div>
          </fieldset>
        </fieldset>
      </div>
    )
  }
}

SharedPlanningDetailGoal.propTypes = {
  goalData: PropTypes.object.isRequired,
  goalIndex: PropTypes.number,
  problemIndex: PropTypes.number,
  goalOtherId: PropTypes.string.isRequired,
  interventions: PropTypes.array.isRequired,
  interventionOtherId: PropTypes.string.isRequired
};

export default SharedPlanningDetailGoal;