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
import TextBox from 'components/Common/TextBox';

class SharedPlanningDetailIntervention extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            bodyVisible: true,
        };
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
            interventionIndex,
            interventionOtherId,
            owners
        } = this.props
        const {bodyVisible} = this.state;


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
                    <div
                        className={bodyVisible
                        ? "bodyVisible"
                        : "bodyHidden"}
                        style={{ 
                            backgroundColor: "#f8f8f8"
                        }}>
                        <div className="row">
                            <label className='complete-required' htmlFor="Intervention">Interventions:
                            </label>
                            <TextBox
                                name="Intervention"
                                value={interventionData.Intervention.Name}
                                readonly={true}/>
                        </div>

                        {interventionData.Intervention&&interventionData.Intervention.Id===this.props.interventionOtherId
                            ? <div className="row">
                                    <label className="complete-required" htmlFor="Other">
                                        Other:
                                    </label>
                                    <Textarea
                                        name="Other"
                                        value={interventionData.Other}
                                        readonly={true}/> 
                                </div>
                            : ""
                        }

                        <div className="row">

                            <label className='complete-required' htmlFor="Owners">Owner:
                            </label>
                            <Multiselect
                                name="Owners"
                                defaultOption="Owners"
                                className="required"
                                value={interventionData.Owners}
                                options={selectListItemsForMultiSelect(owners || [], 'Id', 'Name')}
                                readonly={true}/>
                        </div>
                    </div>

                </fieldset>
            </div>
        )
    }
}

SharedPlanningDetailIntervention.propTypes = {
    goalData: PropTypes.object.isRequired,
    interventionData: PropTypes.object.isRequired,
    interventionIndex: PropTypes.number,
    index: PropTypes.number,
    interventionOtherId: PropTypes.string.isRequired
};

export default SharedPlanningDetailIntervention;