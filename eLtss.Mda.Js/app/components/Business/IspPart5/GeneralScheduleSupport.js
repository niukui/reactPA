import React, {PropTypes} from 'react';
import TimePicker from 'components/Common/TimePicker';
import ReactModal from "react-modal";
import moment from 'moment';
import {selectListItemsForDropdown, selectListItemsForMultiSelect} from 'utils/dropdownTransformer';
import {findLookupItemsByCategory, findLookupItemsByAttribute} from 'services/lookupServices';
import OneLineRadioButtons from 'components/Common/OneLineRadioButtons';
import CheckboxList from 'components/Common/CheckboxList';
import DropdownList from 'components/Common/DropdownList';
import Multiselect from 'components/Common/Multiselect';
import Textarea from 'components/Common/Textarea';
import TextBoxInput from 'components/Common/TextBox';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import ModalConfirm from "components/Common/ModalConfirm";
import {
    toString,
    filter,
    find,
    forEach,
    get,
    set
} from 'lodash';

const extendedWidth = {
    width: 160, // fix for 'total authorized hours' label text wrapping
};

class GeneralScheduleSupport extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            error: {},
            outcomeOptions: [],
            frequencyTypeOptions: [],
            frequencyTypeLookupItems: [],
            frequencyWeekdayOptions: [],
            frequencyWeekdayLookupItems: [],
            isDailySupport: false,
            isOpenDeleteConfirm: false
        };
        this.onSave = this
            .onSave
            .bind(this);
        this.onOutcomesChange = this
            .onOutcomesChange
            .bind(this);
        this.onChangeActivities = this
            .onChangeActivities
            .bind(this);
        this.onChangeSupportName = this
            .onChangeSupportName
            .bind(this);
        this.onChangeEndTime = this
            .onChangeEndTime
            .bind(this);
        this.onChangeStartTime = this
            .onChangeStartTime
            .bind(this);
        this.onFrequencyTypeChange = this
            .onFrequencyTypeChange
            .bind(this);
        this.onFrequencyWeekDayChange = this
            .onFrequencyWeekDayChange
            .bind(this);
        this.transferValue = this
            .transferValue
            .bind(this);
        this.onChangeTotalAuthorizedHours = this
            .onChangeTotalAuthorizedHours
            .bind(this);
        this.delete = this
            .delete
            .bind(this);
        this.onDelete = this
            .onDelete
            .bind(this);
        this.onChangeDailySupport = this
            .onChangeDailySupport
            .bind(this);

    }

    componentWillMount() {
        const _this = this;
        findLookupItemsByCategory(`ispfrequencyweekdays`).then((lookups) => {
            _this.setState({
                frequencyWeekdayLookupItems: Object.assign([], lookups),
                frequencyWeekdayOptions: selectListItemsForDropdown(lookups || [], "Id", "Name")
            });
        });
        findLookupItemsByCategory(`ispfrequencytypes`).then((lookups) => {
            _this.setState({
                frequencyTypeLookupItems: Object.assign([], lookups),
                frequencyTypeOptions: selectListItemsForDropdown(lookups || [], "Id", "Name")
            });
        });
        const outcomeOptions = this
            .props
            .serviceOutcomes
            .map((serviceOutcome) => {
                return {SharedPlanningId: serviceOutcome.SharedPlanningId, LineNumber: serviceOutcome.LineNumber, Outcome: serviceOutcome.DesiredOutcome, ServiceOutcomeId: serviceOutcome.Id};
            });
        this.setState({outcomeOptions});
        if (this.props.activity) {
            this.onChangeDailySupport({
                target: {
                    name: 'DailySupport',
                    checked: !!this.props.activity.DailySupport
                }
            });
        }
    }

    onDelete(yes)
    {
        if (yes) {
            this
                .props
                .handleDelete();
        }
        this.setState((prevState, props) => ({isOpenDeleteConfirm: false}));
    }

    delete() {
        this.setState((prevState, props) => ({isOpenDeleteConfirm: true}));
    }

    onSave(e)
    {
        const {activity} = this.props;
        let validated = true;
        if (!activity.SupportName) {
            this.updateError("SupportName", "Support Name is required!");
            validated = false;
        }
        if (!activity.DailySupport) {
            if (!activity.StartTime) {
                this.updateError("StartTime", "Start Time is required!");
                validated = false;
            }
            if (!activity.EndTime) {
                this.updateError("EndTime", "End Time is required!");
                validated = false;
            }
            if (!activity.TotalAuthorizedHours) {
                this.updateError("TotalAuthorizedHours", "Total Authorized Hours is required!");
                validated = false;
            }
        }
        if (!activity.DesiredOutcomes || activity.DesiredOutcomes.length === 0 && !activity.DesiredOutcomes[0]) {
            this.updateError("DesiredOutcomes", "Outcomes is required!");
            validated = false;
        }
        if (!activity.FrequencyWeekDays || activity.FrequencyWeekDays.length === 0 && !activity.FrequencyWeekDays[0]) {
            this.updateError("FrequencyWeekDays", "Frequency is required!");
            validated = false;
        }
        if (this.checkTotalAuthorizedHours() && this.checkTimeSpan() && this.overlapCheck() && validated) {
            this
                .props
                .handleSave(e);
        }
    }

    generateOptions(length, excludedOptions) {
        const arr = [];
        for (let value = 0; value < length; value++) {
            if (excludedOptions.indexOf(value) < 0) {
                arr.push(value);
            }
        }
        return arr;
    }

    onChangeActivities(event)
    {
        this.updateActivity(event.target.name, event.target.value);
        if (event.target.value) {
            this.updateError(event.target.name, null);
        }
    }

    checkTotalAuthorizedHours()
    {
        const {activity} = this.props;
        if (activity.DailySupport || !activity.EndTime || !activity.StartTime) {
            return true;
        }
        if (!activity.TotalAuthorizedHours) {
            this.updateError("TotalAuthorizedHours", "Total Authorized Hours is required!");
            return false;
        }
        const hourSpan = activity.EndTime.Hours - activity.StartTime.Hours;
        const timeSpan = activity.EndTime.Minutes - activity.StartTime.Minutes;
        const span = hourSpan + timeSpan / 60;
        if (activity.TotalAuthorizedHours <= span) {
            this.updateError("TotalAuthorizedHours", null);
            return true;
        }
        this.updateError("TotalAuthorizedHours", "Total authorized hours shouldn't exceed the total time between the Start Time an" +
                "d End Time!");
        return false;
    }

    checkTimeSpan(field)
    {
        const {activity} = this.props;
        if (!activity.EndTime || !activity.StartTime) {
            return true;
        }
        const hourSpan = activity.EndTime.Hours - activity.StartTime.Hours;
        const timeSpan = activity.EndTime.Minutes - activity.StartTime.Minutes;
        const span = hourSpan + timeSpan / 60;
        if (span > 0) {
            this.updateError("StartTime", null);
            this.updateError("EndTime", null);
            return true;
        }
        this.updateError(field, "Start Time shouldn't exceed End Time!");
        return false;
    }

    onChangeTotalAuthorizedHours(event)
    {
        if (!event.target.value) {
            this.updateError("TotalAuthorizedHours", "Total Authorized Hours is required!");
        }
        this.updateActivity(event.target.name, event.target.value);
        this.checkTotalAuthorizedHours();
    }

    overlapCheck()
    {
        const {activity} = this.props;
        const overlap = this
            .props
            .overlapCheck(activity);
        this.updateError("overlap", overlap);
        if (overlap) {
            return false;
        }
        return true;
    }

    onChangeSupportName(event)
    {
        this.updateActivity(event.target.name, event.target.value);
        if (event.target.value) {
            this.updateError(event.target.name, null);
        } else {
            this.updateError(event.target.name, "Support Name is required!");
        }
    }

    onOutcomesChange(event)
    {
        const {outcomeOptions} = this.state;
        const outComes = outcomeOptions.filter(x => event.target.value.includes(x.ServiceOutcomeId));
        this.updateActivity(event.target.name, outComes);
        if (outComes.length > 0 && outComes[0]) {
            this.updateError("DesiredOutcomes", null);
        } else {
            this.updateError("DesiredOutcomes", "Outcomes is required!");
        }
    }

    onChangeEndTime(moment)
    {
        this.updateError("EndTime", null);
        this.onMomentChange("EndTime", moment);
        this.checkTimeSpan("EndTime");
        this.overlapCheck();
    }

    onChangeStartTime(moment)
    {
        this.updateError("StartTime", null);
        this.onMomentChange("StartTime", moment);
        this.checkTimeSpan("StartTime");
        this.overlapCheck();
    }

    onChangeDailySupport(e) {
        if (e.target.checked) {
            this.updateActivity("StartTime", null);
            this.updateError("StartTime", null);
            this.updateActivity("EndTime", null);
            this.updateError("EndTime", null);
            this.updateActivity("TotalAuthorizedHours", null);
            this.updateError("TotalAuthorizedHours", null);
        }
        this.updateActivity(e.target.name, e.target.checked);
        this.setState({isDailySupport: e.target.checked});
    }

    onMomentChange(fieldName, moment)
    {
        const {activity} = this.props;
        if (moment._isAMomentObject) {
            const Hours = moment.hours();
            const Minutes = moment.minutes();
            const Seconds = moment.seconds();
            this.updateActivity(fieldName, {Hours, Minutes, Seconds});
            this.updateError(fieldName, null);
        } else {
            const fieldValue = get(activity, fieldName);
            this.updateActivity(fieldName, fieldValue);
            this.updateError(fieldName, "Invalid time format!");
        }
        if(activity.TotalAuthorizedHours){
            this.checkTotalAuthorizedHours();
        }      
    }

    updateError(fieldName, errorMessage)
    {
        let {error} = this.state;
        set(error, fieldName, errorMessage);
        this.setState({error});
    }

    updateActivity(fieldName, fieldValue)
    {
        let {activity} = this.props;
        set(activity, fieldName, fieldValue);
        this
            .props
            .updateActivity(activity);
    }

    getLookupItemValues(selectedValue, lookupItems)
    {
        const selectedValues = [];
        forEach(lookupItems, (item) => {
            if (selectedValue.indexOf(item.Id) >= 0) {
                selectedValues.push({Id: item.Id, Abbreviation: item.Abbreviation, UniqueAttribute: item.UniqueAttribute});
            }
        });
        return selectedValues;
    }

    onFrequencyTypeChange(event) {
        this.updateActivity(event.target.name, event.target.value);
        const item = this
            .state
            .frequencyTypeLookupItems
            .find(x => x.Id === event.target.value);
        this.updateActivity("FrequencyType", {
            Id: item.Id,
            UniqueAttribute: item.UniqueAttribute
        });
        findLookupItemsByAttribute(`ispfrequencyweekdays`, item.UniqueAttribute.Guid).then((lookups) => {
            const relatedValues = lookups.map((item) => {
                return {Id: item.Id, Abbreviation: item.Abbreviation, UniqueAttribute: item.UniqueAttribute};
            });
            this.updateActivity("FrequencyWeekDays", relatedValues);
            this.updateError("FrequencyWeekDays", null);
            this.overlapCheck();
        });
    }

    onFrequencyWeekDayChange(selectedValue) {
        const selectedValues = this.getLookupItemValues(selectedValue, this.state.frequencyWeekdayLookupItems);
        this.updateActivity("FrequencyWeekDays", selectedValues);
        if (selectedValues.length > 0 && selectedValues[0]) {
            this.updateError("FrequencyWeekDays", null);
        } else {
            this.updateError("FrequencyWeekDays", "Frequency is required!");
        }
        this.overlapCheck();
    }

    transferValue(value) {
        return (value || []).map((item) => {
            return item.Id;
        });
    }

    render() {

        const {
            error,
            outcomeOptions,
            frequencyTypeOptions,
            frequencyTypeLookupItems,
            frequencyWeekdayOptions,
            frequencyWeekdayLookupItems,
            isDailySupport
        } = this.state;

        const {activity} = this.props;

        return (
            <div className="confirm-message">
                <fieldset className="fieldset-container-one">
                    <legend className="legend-header-one">{this.props.title}</legend>
                    <div className="column-left">
                        <div className="row stacked">
                            <label htmlFor="SupportName">Support Name:<RequiredIndicator/></label>
                            <TextBoxInput
                                name="SupportName"
                                key="SupportName"
                                isRequired
                                value={activity.SupportName || ""}
                                onChange={this.onChangeSupportName}/>
                        </div>
                        {error.SupportName && <div className="row">
                            <span className="error alert alert-danger">{error.SupportName}</span>
                        </div>}
                    </div>
                    <div className="column-right">
                        <span className="label">Outcomes:<RequiredIndicator/></span>
                        <Multiselect
                            value={activity.DesiredOutcomes && activity
                            .DesiredOutcomes
                            .map((item) => item.ServiceOutcomeId)}
                            isRequired
                            className="required"
                            options={selectListItemsForMultiSelect(outcomeOptions, "ServiceOutcomeId", "Outcome")}
                            onChange={this.onOutcomesChange}
                            name="DesiredOutcomes"
                            key="DesiredOutcomes"/> {error.DesiredOutcomes && <span className="error alert alert-danger">{error.DesiredOutcomes}</span>}
                    </div>
                    <fieldset className="fieldset-container-two">
                        <legend className="legend-header-two">Frequency<RequiredIndicator/></legend>
                        <div className="row">
                            <OneLineRadioButtons
                                name="FrequencyType"
                                key="FrequencyType"
                                options={frequencyTypeOptions}
                                value={activity && activity.FrequencyType && activity.FrequencyType.Id}
                                onChange={this.onFrequencyTypeChange}/>
                        </div>
                        <div className="row">
                            <CheckboxList
                                name="FrequencyWeekDays"
                                key="FrequencyWeekDays"
                                isRequired
                                onChange={this.onFrequencyWeekDayChange}
                                value={this.transferValue(activity.FrequencyWeekDays)}
                                options={frequencyWeekdayOptions}/> {error.FrequencyWeekDays && <div className="error alert alert-danger">{error.FrequencyWeekDays}</div>}
                        </div>
                        <div className="row">
                            <input
                                id="DailySupport"
                                name="DailySupport"
                                key="DailySupport"
                                type="checkbox"
                                checked={activity.DailySupport || false}
                                value={activity.DailySupport || false}
                                onChange={this.onChangeDailySupport}/>
                            <label htmlFor="DailySupport" className="auto-width">Daily Support</label>
                        </div>
                        <div className="row stacked">
                            <label htmlFor="StartTime">Start Time:<RequiredIndicator/></label>
                            <TimePicker
                                id="StartTime"
                                name="StartTime"
                                key="StartTime"
                                className={isDailySupport
                                ? "readonly"
                                : "required"}
                                inputProps={isDailySupport
                                ? {
                                    "className": "readonly",
                                    "readOnly": true,
                                    "disabled": true
                                }
                                : {}}
                                isRequired
                                onChange={this.onChangeStartTime}
                                value={activity.StartTime}
                                dateFormat={false}
                                readonly={isDailySupport}
                                viewMode='time'/> {error.StartTime && <div className="error alert alert-danger">{error.StartTime}</div>}
                        </div>
                        <div className="row stacked">
                            <label htmlFor="EndTime">End Time:<RequiredIndicator/></label>
                            <TimePicker
                                viewMode='time'
                                id="EndTime"
                                className={isDailySupport
                                ? "readonly"
                                : "required"}
                                inputProps={isDailySupport
                                ? {
                                    "className": "readonly",
                                    "readOnly": true,
                                    "disabled": true
                                }
                                : {}}
                                name="EndTime"
                                key="EndTime"
                                isRequired
                                onChange={this.onChangeEndTime}
                                value={activity.EndTime}
                                readonly={isDailySupport}
                                dateFormat={false}/> {error.EndTime && <div className="error alert alert-danger">{error.EndTime}</div>}
                        </div>
                        <div className="row stacked">
                            <label htmlFor="TotalAuthorizedHours" style={extendedWidth}>Total Authorized Hours:</label>
                            <TextBoxInput
                                id="TotalAuthorizedHours"
                                name="TotalAuthorizedHours"
                                key="TotalAuthorizedHours"
                                type={isDailySupport
                                ? 'text'
                                : 'number'}
                                value={activity.TotalAuthorizedHours && activity
                                .TotalAuthorizedHours
                                .toString() || ""}
                                onChange={this.onChangeTotalAuthorizedHours}
                                readonly={isDailySupport}
                                isRequired={isDailySupport
                                ? false
                                : true}
                                extraProps={{
                                'min': 0,
                                'max': 99,
                                'style': isDailySupport
                                    ? {}
                                    : {
                                        "backgroundColor": "#FFFF99"
                                    }
                            }}/> {error.TotalAuthorizedHours && <div className="row">
                                <div className="error alert alert-danger">{error.TotalAuthorizedHours}</div>
                            </div>}
                        </div>
                    </fieldset>
                    <fieldset className="fieldset-container-two">
                        <legend className="legend-header-two">Activities</legend>
                        <label htmlFor="Activities" className="ui-hide sr-only">Activities:</label>
                        <Textarea
                            id="Activities"
                            name="Activities"
                            key="Activities"
                            value={activity.Activities}
                            onChange={this.onChangeActivities}
                            extraProps={{
                            'maxLength': 2000
                        }}></Textarea>
                    </fieldset>
                    {error.overlap && <div className="row">
                        <div className="error alert alert-danger">Overlap found: {error.overlap.SupportName}, Start Time: {error.overlap.StartTime.Hours}:{error.overlap.StartTime.Minutes === 0
                                ? "00"
                                : error.overlap.StartTime.Minutes}, End Time: {error.overlap.EndTime.Hours}:{error.overlap.EndTime.Minutes === 0
                                ? "00"
                                : error.overlap.EndTime.Minutes}, please check again!</div>
                    </div>}
                    <div className="searchspace-footer-bar">
                        <div className="float-right">
                            <button className="confirm-button-no" onClick={this.props.handleCancel}>Cancel</button>
                            <button className="confirm-button-yes" onClick={this.onSave}>Continue</button>
                            {this.props.handleDelete && <button className="confirm-button-yes" onClick={this.delete}>Delete</button>}
                        </div>
                    </div>
                </fieldset>
                <ModalConfirm
                    isOpen={this.state.isOpenDeleteConfirm}
                    title="Delete General Schedule of Support"
                    message="Are you sure you want to delete this General Schedule of Support?"
                    onYes={() => {
                    this.onDelete(true);
                }}
                    onNo={() => {
                    this.onDelete(false);
                }}
                    onClose={() => {
                    this.onDelete(false);
                }}/>
            </div>
        );
    }
}

GeneralScheduleSupport.propTypes = {
    handleCancel: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    handleDelete: PropTypes.func,
    updateActivity: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    activity: PropTypes.object.isRequired,
    overlapCheck: PropTypes.func.isRequired,
    serviceOutcomes: PropTypes.array.isRequired
};

export default GeneralScheduleSupport;