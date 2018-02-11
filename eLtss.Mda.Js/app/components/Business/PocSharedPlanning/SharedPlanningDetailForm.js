import React, {PropTypes} from 'react';
import moment from 'moment';
import {formatJsonDate} from 'utils/dateHelper';
import {selectListItemsForDropdown, selectListItemsForMultiSelect} from 'utils/dropdownTransformer';
import DropdownList from 'components/Common/DropdownList';
import GroupDropdownList from 'components/Common/GroupDropdownList';
import DatePicker from 'components/Common/DatePicker';
import RadioButtonList from 'components/Common/RadioButtonList';
import Multiselect from 'components/Common/Multiselect';
import TextInput from 'components/Common/TextInput';
import TextBox from 'components/Common/TextBox';
import {ISP_WORKFLOW_STATUS} from 'utils/constants';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import * as aclHelper from 'utils/aclHelper';
import SharedPlanningDetailProblem from 'components/Business/PocSharedPlanning/SharedPlanningDetailProblem';
import YesNoRadioButtonsViewer from 'components/MetadataDriven/Wrapper/editor/YesNoRadioButtons';

class SharedPlanningDetailForm extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

  render() {
    const {
      sharedPlanning,
      sharedPlannings,
      onClickEdit,
      problemOtherId,
      goals,
      goalOtherId,
      interventions,
      interventionOtherId,
      owners,
      haveDateCloseds,
      haveDateClosedTbdId,
      securityContext,
    } = this.props;

    return (
      <div>
        <fieldset className="fieldset-container-one">
          <legend className="legend-header-one">CAP Information</legend>
          <div className="row">
            <label className='complete-required' htmlFor="LifeArea">CAP:
            </label>
            <TextBox
              name="Cap"
              value={sharedPlanning.Cap && sharedPlanning.Cap.Name}
              readonly={true}/>
          </div>
          <div className="row">
            <label className='complete-required' htmlFor="Priority">Priority:
            </label>
            <TextBox
              name="Priority"
              value={sharedPlanning.Priority && sharedPlanning.Priority.Name}
              readonly={true}
              />
          </div>

          {sharedPlanning.ProblemDatas && sharedPlanning
            .ProblemDatas
            .map((problem, index) => {
              return <SharedPlanningDetailProblem
                sharedPlanning={sharedPlanning}
                problemData={problem}
                problemIndex={index}
                key={index}
                problemOtherId={problemOtherId}
                goals={goals}
                goalOtherId={goalOtherId}
                interventions={interventions}
                interventionOtherId={interventionOtherId}
                owners={owners}
                securityContext={securityContext}/>
            })}

        </fieldset>
        <fieldset className="fieldset-container-one">
          <legend className="legend-header-one">Dates</legend>
          <div className="row">
            <label className="" htmlFor='DateInitiated'>Date Initiated:</label>
            <DatePicker
              className="required"
              id='DateInitiated'
              value={sharedPlanning.DateInitiated}
              readonly={true}
              name="DateInitiated"/>
          </div>

          <div className="row">
            <label className="complete-required" htmlFor="DateNextReview">Date Next Review:
              </label>
            <DatePicker
              
              className="required"
              id="DateNextReview"
              value={sharedPlanning.DateNextReview}
              readonly={true}
              name="DateNextReview"/>
          </div>

          <div className="row">
            <label className="complete-required" htmlFor='DateClosed'>Date Closed:</label>
            <RadioButtonList
              name="HaveDateClosed"
              options={selectListItemsForDropdown(haveDateCloseds || [], 'Id', "Name")}
              value={sharedPlanning.HaveDateClosed}
              readonly={true}
              extraProps={{
              "style": {
                "display": "inline"
              }
            }}></RadioButtonList>

            <DatePicker
              className="required"
              id="DateClosed"
              readonly={!sharedPlanning.HaveDateClosed || sharedPlanning.HaveDateClosed == haveDateClosedTbdId}
              value={sharedPlanning.DateClosed}
              readonly={true}
              name="DateClosed"/>

          </div>
        </fieldset>
                <div className="add-to-table">
                    <table className="generalTable">
                        <caption className="caption-header">
                            <span>Part III Shared Planning</span>
                        </caption>
                        <thead>
                            <tr>
                                <th>CAP</th>
                                <th>Priority</th>
                                <th>Date Initiated</th>
                                <th>Date Next Review</th>
                                <th>Date Closed</th>
                                <th className="actions">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sharedPlannings && sharedPlannings.map((sharedPlanning, index) => (
                                <tr key={index}>
                                    <td>{sharedPlanning.Cap && sharedPlanning.Cap.Name}</td>
                                    <td>{sharedPlanning.Priority && sharedPlanning.Priority.Name}</td>
                                    <td>{formatJsonDate(sharedPlanning.DateInitiated)}</td> 
                                    <td>{formatJsonDate(sharedPlanning.DateNextReview)}</td>
                                    <td>{sharedPlanning.HaveDateClosed===this.props.haveDateClosedTbdId?'TBD':formatJsonDate(sharedPlanning.DateClosed)}</td>
                                    <td>
                                      <span>
                                           <a
                                              onClick={(e) => {
                                              onClickEdit(e, sharedPlanning,index);
                                          }}
                                              title="View this item">View</a>
                                      </span>
                                        
                                    </td> 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>           
            </div>
        );
    }
}

SharedPlanningDetailForm.propTypes = {
  onClickEdit: PropTypes.func,
  sharedPlanning: PropTypes.object.isRequired,
  sharedPlannings: PropTypes.array.isRequired,
  securityContext: PropTypes.object.isRequired,
  problemOtherId: PropTypes.string.isRequired,
  goals: PropTypes.array.isRequired,
  goalOtherId: PropTypes.string.isRequired,
  interventions: PropTypes.array.isRequired,
  interventionOtherId: PropTypes.string.isRequired,
  owners: PropTypes.array.isRequired,
  haveDateCloseds: PropTypes.array.isRequired,
  haveDateClosedTbdId: PropTypes.string.isRequired
};

export default SharedPlanningDetailForm;