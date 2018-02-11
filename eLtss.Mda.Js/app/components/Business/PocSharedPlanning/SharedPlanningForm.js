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
import {ISP_WORKFLOW_STATUS} from 'utils/constants';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import * as aclHelper from 'utils/aclHelper';
import SharedPlanningProblem from 'components/Business/PocSharedPlanning/SharedPlanningProblem';

import YesNoRadioButtonsViewer from 'components/MetadataDriven/Wrapper/editor/YesNoRadioButtons';
class SharedPlanningForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.addProblem = this
            .addProblem
            .bind(this);
    }
  addProblem() {
    this
      .props
      .sharedPlanning
      .ProblemDatas
      .push({
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
      });

    this
      .props
      .onFormChange({
        target: {
          name: "ProblemDatas",
          value: this.props.sharedPlanning.ProblemDatas
        }
      });
  }

  formUpdate(name, value) {
    this
      .props
      .onFormChange({
        target: {
          name: name,
          value: value
        }
      });
  }

  render() {
    const {
      ispPart3,
      planId,
      sharedPlanning,
      sharedPlannings,
      underEditing,
      underDeleting,
      onClickCreate,
      onClickUpdate,
      onClickCancel,
      onClickEdit,
      onClickDelete,
      capCategorys,
      caps,
      prioritys,
      problems,
      problemOtherId,
      goals,
      goalOtherId,
      interventions,
      interventionOtherId,
      owners,
      haveDateCloseds,
      haveDateClosedTbdId,
      errors,
      securityContext,
      sharePlanningIndex,
      onFormChange,
      //auditTrails
    } = this.props;

    const renderActions = (sharedPlanning, underEditing, securityContext) => {
      if (underEditing) {
        return (
          <div>
            <span className="addTo-button">
              <a
                onClick={(e) => {
                  onClickUpdate(e, sharedPlanning);
              }}
                role="button">Save Changes</a>
            </span>
            <span className="CancelEdit-link">
              <a
                onClick={(e) => {
                onClickCancel(e, sharedPlanning);
              }}
                role="button">Cancel</a>
            </span>
          </div>
        );
      } else {
        const canAdd = aclHelper.canAdd(securityContext, "SharedPlannings");
        if (canAdd === false) {
          return null;
        }
        return (
          <span className="addTo-button">
            <a
              onClick={(e) => {
              onClickCreate(e, sharedPlanning);
            }}
              role="button">Add CAP</a>
          </span>
        );
      }
    };

    const canDelete = ((securityContext) => {
      return aclHelper.canDelete(securityContext, "SharedPlannings");
    })(securityContext);

    const canEdit = ((securityContext) => {
      return aclHelper.canEdit(securityContext, "SharedPlannings");
    })(securityContext);

    return (
      <div>
        <br />
        <div className="header-info">
          <span className="icon-info-sign" title="Additional Information"></span>
          A minimum of 3 Goals need to be entered for the section to be considered complete
        </div>
        <fieldset className="fieldset-container-one">
          <legend className="legend-header-one">CAP Information</legend>
          <div className="header-link">
            <a
              href="#"
              role="button"
              onClick={() => {
              this.addProblem()
            }}>Add Problem</a>
          </div>
          <div className="row">
            <label className='complete-required' htmlFor="LifeArea">CAP:
              <RequiredIndicator/>
            </label>
            <GroupDropdownList
              name="Cap"
              onChange={onFormChange}
              value={sharedPlanning.Cap}
              options={caps}
              groups={capCategorys}
              saveRequired={true}/> {errors.Cap && <div className="error alert alert-danger">{errors.Cap}</div>}
          </div>
          <div className="row">
            <label className='complete-required' htmlFor="Priority">Priority:
              <RequiredIndicator/>
            </label>
            <DropdownList
              name="Priority"
              onChange={onFormChange}
              value={sharedPlanning.Priority}
              options={selectListItemsForDropdown(prioritys || [], 'Id', "Name")}
              saveRequired={true}/> {errors.Priority && <div className="error alert alert-danger">{errors.Priority}</div>}
          </div>

          {sharedPlanning.ProblemDatas && sharedPlanning
            .ProblemDatas
            .map((problem, index) => {
              return <SharedPlanningProblem
                sharedPlanning={sharedPlanning}
                problemData={problem}
                onChangeForm={onFormChange}
                errors={errors}
                problemIndex={index}
                key={index}
                problems={problems}
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
            <label className="" htmlFor='DateInitiated'>Date Initiated:<RequiredIndicator/></label>
            <DatePicker
              saveRequired={true}
              className="required"
              id='DateInitiated'
              value={sharedPlanning.DateInitiated}
              onChange={onFormChange}
              error={errors.DateInitiated}
              name="DateInitiated"/>{errors.DateInitiated && <div className="error alert alert-danger">{errors.DateInitiated}</div>}
          </div>

          <div className="row">
            <label className="complete-required" htmlFor="DateNextReview">Date Next Review:
              <RequiredIndicator/></label>
            <DatePicker
              saveRequired={true}
              className="required"
              id="DateNextReview"
              value={sharedPlanning.DateNextReview}
              onChange={(value) => {
              this.formUpdate('DateNextReview', value.target.value);
            }}
              error={errors.DateNextReview}
              name="DateNextReview"/>{errors.DateNextReview && <div className="error alert alert-danger">{errors.DateNextReview}</div>}
          </div>

          <div className="row">
            <label className="complete-required" htmlFor='DateClosed'>Date Closed:<RequiredIndicator/></label>
            <RadioButtonList
              name="HaveDateClosed"
              options={selectListItemsForDropdown(haveDateCloseds || [], 'Id', "Name")}
              value={sharedPlanning.HaveDateClosed}
              onChange={(value) => {
              this.formUpdate('HaveDateClosed', value);
              this.formUpdate('DateClosed', null);
            }}
              required={true}
              readonly={sharedPlanning.DateNextReview}
              extraProps={{
              "style": {
                "display": "inline"
              }
            }}></RadioButtonList>

            <DatePicker
              saveRequired={true}
              className="required"
              id="DateClosed"
              readonly={!sharedPlanning.HaveDateClosed || sharedPlanning.HaveDateClosed == haveDateClosedTbdId}
              value={sharedPlanning.DateClosed}
              onChange={onFormChange}
              error={errors.DateClosed}
              name="DateClosed"/> {sharedPlanning.HaveDateClosed != haveDateClosedTbdId && errors.DateClosed && <div className="error alert alert-danger">{errors.DateClosed}</div>}

          </div>
        </fieldset>

                <div className="add-to-table">
                    <div className="center">
                        {renderActions(sharedPlanning, underEditing, securityContext)}
                    </div>
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
                                    { <td>
                                        {underEditing && sharePlanningIndex === index
                                            ? <span>
                                                    <span className="icon-pencil"></span>
                                                    <b>Editing...</b>
                                                </span>
                                            : <span>
                                                {canEdit && <a
                                                    onClick={(e) => {
                                                    onClickEdit(e, sharedPlanning,index);
                                                }}
                                                    title="Edit this item">Edit</a>}
                                                {canDelete  && !underEditing&& <a
                                                    onClick={(e) => {
                                                        onClickDelete(e, sharedPlanning,index);
                                                }}
                                                    title="Permanently delete this item">Delete</a>}
                                            </span>
}
                                    </td> }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>           
            </div>
        );
    }
}

SharedPlanningForm.propTypes = {
  onClickCreate: PropTypes.func,
  onClickUpdate: PropTypes.func,
  onClickCancel: PropTypes.func,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
  sharedPlanning: PropTypes.object.isRequired,
  sharedPlannings: PropTypes.array.isRequired,
  securityContext: PropTypes.object.isRequired,
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
  onFormChange: PropTypes.func,
  errors: PropTypes.object

};

export default SharedPlanningForm;