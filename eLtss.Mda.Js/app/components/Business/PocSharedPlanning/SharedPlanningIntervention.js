import React, {PropTypes} from 'react';
import moment from 'moment';
import {selectListItemsForDropdown, selectListItemsForMultiSelect} from 'utils/dropdownTransformer';
import DropdownList from 'components/Common/DropdownList';
import DatePicker from 'components/Common/DatePicker';
import Multiselect from 'components/Common/Multiselect';
import TextInput from 'components/Common/TextInput';
import {ISP_WORKFLOW_STATUS} from 'utils/constants';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import * as aclHelper from 'utils/aclHelper';
import Textarea from "components/Common/Textarea";

class SharedPlanningIntervention extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            bodyVisible: true,
        };
    }

    deleteIntervention() {
        this
            .props
            .goalData
            .InterventionDatas
            .splice(this.props.interventionIndex, 1);
        this
            .props
            .onChangeForm({
                target: {
                    name: "ProblemDatas[" + this.props.problemIndex + "].GoalDatas[" + this.props.goalIndex + "]",
                    value: this.props.goalData
                }
            });

    }

    toggleBodyVisible() {
        this.setState({
            bodyVisible: !this.state.bodyVisible
        });
    }

    render() {
        const {
            goalData,
            interventionData,
            onChangeForm,
            errors,
            securityContext,
            problemIndex,
            goalIndex,
            interventionIndex,
            interventions,
            interventionOtherId,
            owners
        } = this.props
        const {bodyVisible} = this.state;

        const prepareChanges = (event) => {
            if (event.target.name == "Intervention") {
            }
            this
                .props
                .onChangeForm({
                    target: {
                        name: "ProblemDatas[" + this.props.problemIndex + "].GoalDatas[" + this.props.goalIndex + "].InterventionDatas[" + this.props.interventionIndex + "]." + event.target.name,
                        value: event.target.value
                    }
                });
        };

        return (
            <div style={{
                marginLeft: '10px'
            }}>        
                <fieldset className="fieldset-container-two">
                    <legend className="legend-header-two">
                        <div
                            className={bodyVisible
                            ? "icon-minus expand"
                            : "icon-plus collapse"}
                            onClick={() => {
                            this.toggleBodyVisible()
                        }}></div>
                        Intervention #{interventionIndex + 1}
                    </legend>
                    {goalData && goalData.InterventionDatas.length > 1 ? 
                    <div className="header-link">
                        <a
                            href="#"
                            onClick={() => {
                            this.deleteIntervention()
                        }}>Remove</a>
                     </div>: ''
                    }   
                    <div
                        className={bodyVisible
                        ? "bodyVisible"
                        : "bodyHidden"}
                        style={{ 
                            backgroundColor: "#f8f8f8"
                        }}>
                        <div className="row">
                            <label className='complete-required' htmlFor="Intervention">Interventions:<RequiredIndicator/>
                            </label>
                            <DropdownList
                                name="Intervention"
                                onChange={prepareChanges}
                                value={interventionData.Intervention}
                                options={selectListItemsForDropdown(interventions || [], "Id", "Name")}
                                saveRequired={true}/> 
                                {errors["ProblemDatas[" + this.props.problemIndex + "].GoalDatas[" + this.props.goalIndex + "].InterventionDatas[" + this.props.interventionIndex + "].Intervention"] && <div className="error alert alert-danger">{errors["ProblemDatas[" + this.props.problemIndex + "].GoalDatas[" + this.props.goalIndex + "].InterventionDatas[" + this.props.interventionIndex + "].Intervention"]}</div>}
                        </div>

                        {interventionData.Intervention&&interventionData.Intervention.Id===this.props.interventionOtherId
                            ? <div className="row">
                                    <label className="complete-required" htmlFor="Other">
                                        Other:
                                        <RequiredIndicator/>
                                    </label>
                                    <Textarea
                                        name="Other"
                                        onChange={prepareChanges}
                                        isRequired = {true}
                                        value={interventionData.Other}
                                        saveRequired={true}/> 
                                        {errors["ProblemDatas[" + this.props.problemIndex + "].GoalDatas[" + this.props.goalIndex + "].InterventionDatas[" + this.props.interventionIndex + "].Other"] && <div className="error alert alert-danger">{errors["ProblemDatas[" + this.props.problemIndex + "].GoalDatas[" + this.props.goalIndex + "].InterventionDatas[" + this.props.interventionIndex + "].Other"]}</div>}
                                </div>
                            : ""
}

                        <div className="row">

                            <label className='complete-required' htmlFor="Owners">Owner:<RequiredIndicator/>
                            </label>
                            <Multiselect
                                name="Owners"
                                defaultOption="Owners"
                                onChange={prepareChanges}
                                className="required"
                                value={interventionData.Owners}
                                options={selectListItemsForMultiSelect(owners || [], 'Id', 'Name')}
                                saveRequired={true}/> 
                                {errors["ProblemDatas[" + this.props.problemIndex + "].GoalDatas[" + this.props.goalIndex + "].InterventionDatas[" + this.props.interventionIndex + "].Owners"] && <div className="error alert alert-danger">{errors["ProblemDatas[" + this.props.problemIndex + "].GoalDatas[" + this.props.goalIndex + "].InterventionDatas[" + this.props.interventionIndex + "].Owners"]}</div>}
                        </div>
                    </div>

                </fieldset>
            </div>
        )
    }
}

SharedPlanningIntervention.propTypes = {
    goalData: PropTypes.object.isRequired,
    interventionData: PropTypes.object.isRequired,
    problemIndex: PropTypes.number,
    goalIndex: PropTypes.number,
    interventionIndex: PropTypes.number,
    index: PropTypes.number,
    interventions: PropTypes.array.isRequired,
    interventionOtherId: PropTypes.string.isRequired
};

export default SharedPlanningIntervention;