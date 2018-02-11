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
import lodash from 'lodash';
import {IPC_EVENT_TYPE_IDS} from 'utils/constants';

const extendedWidth = {
    width: 160, // fix for 'total authorized hours' label text wrapping
};

class GeneralEvent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            generalEvent: {},
            error: {},
            eventTypeOptions: [],
            eventTypeLookupItems: [],
            serviceOptions: [],
            frequencyTypeOptions: [],
            frequencyTypeLookupItems: [],
            frequencyWeekdayOptions: [],
            frequencyWeekdayLookupItems: [],
            isDailySupport: false,
            showServiceDropdown: false,
            isOpenDeleteConfirm: false
        };
        this.onSave = this
            .onSave
            .bind(this);
        this.onServicesChange = this
            .onServicesChange
            .bind(this);
        this.onChangeEventType = this
            .onChangeEventType
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
        this.delete = this
            .delete
            .bind(this);
        this.onDelete = this
            .onDelete
            .bind(this);
        this.onChangeDailySupport = this
            .onChangeDailySupport
            .bind(this);
        this.onChangeForm = this
            .onChangeForm
            .bind(this);
    }

    updateStateOnEventTypeChange(eventTypeId)
    {
        const _this = this;
        if (eventTypeId === "lookupitems/ipceventtypes/d7845b80-df0a-45fb-a1ac-b290ac195273") {/* SupportPackage */
            _this.setState((prevState, props) => ({showServiceDropdown: true, serviceOptions: _this.props.supportsPackageServices}));
        } else if (eventTypeId === "lookupitems/ipceventtypes/83bbfb1f-9394-45cc-b24b-a3f5c28558ae") {/* additional supports service */
            _this.setState((prevState, props) => ({showServiceDropdown: true, serviceOptions: _this.props.lxServices}));
        } else {
            _this.setState({showServiceDropdown: false});
        }
    }

    componentWillMount() {
        const _this = this;

        findLookupItemsByCategory(`ipceventtypes`).then((lookups) => {
            _this.setState({
                eventTypeLookupItems: Object.assign([], lookups),
                eventTypeOptions: selectListItemsForDropdown(lookups || [], "Id", "Name")
            });
        });

        findLookupItemsByCategory(`ipcfrequencytypes`).then((lookups) => {
            _this.setState({
                frequencyTypeLookupItems: Object.assign([], lookups),
                frequencyTypeOptions: selectListItemsForDropdown(lookups || [], "Id", "Name")
            });
        });

        findLookupItemsByCategory(`ipcfrequencyweekdays`).then((lookups) => {
            _this.setState({
                frequencyWeekdayLookupItems: Object.assign([], lookups),
                frequencyWeekdayOptions: selectListItemsForMultiSelect(lookups || [], "Id", "Name")
            });
        });

        const generalEvent = Object.assign({}, this.props.generalEvent);
        this.setState({generalEvent: generalEvent});
        if (!lodash.isEmpty(generalEvent)) {
            this.updateStateOnEventTypeChange(generalEvent.EventType.Id);
        }
    }

    componentWillReceiveProps(nextProps)
    {
        const generalEvent = Object.assign({}, nextProps.generalEvent);
        this.setState({generalEvent: generalEvent});
        if (!lodash.isEmpty(generalEvent)) {
            this.updateStateOnEventTypeChange(generalEvent.EventType.Id);
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
        const {generalEvent} = this.state;
        let validated = true;
        if (!generalEvent.EventType) {
            this.updateError("EventType", "Event Type is required!");
            validated = false;
        }
        if (!generalEvent.DailySupport) {
            if (!generalEvent.StartTime) {
                this.updateError("StartTime", "Start Time is required!");
                validated = false;
            }
            if (!generalEvent.EndTime) {
                this.updateError("EndTime", "End Time is required!");
                validated = false;
            }
        }
        if (!generalEvent.Services || generalEvent.Services.length === 0 && !generalEvent.Services[0]) {
            //this.updateError("Services", "Services is required!"); validated = false;
        }
        if (!generalEvent.FrequencyWeekDays || generalEvent.FrequencyWeekDays.length === 0 && !generalEvent.FrequencyWeekDays[0]) {
            this.updateError("FrequencyWeekDays", "Frequency is required!");
            validated = false;
        }
        if (this.checkTimeSpan() && validated) {
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

    checkTimeSpan(field)
    {
        const {generalEvent} = this.state;
        if (!generalEvent.EndTime || !generalEvent.StartTime) {
            return true;
        }
        const hourSpan = generalEvent.EndTime.Hours - generalEvent.StartTime.Hours;
        const timeSpan = generalEvent.EndTime.Minutes - generalEvent.StartTime.Minutes;
        const span = hourSpan + timeSpan / 60;
        if (span > 0) {
            this.updateError("StartTime", null);
            this.updateError("EndTime", null);
            return true;
        }
        this.updateError(field, "Start Time shouldn't exceed End Time!");
        return false;
    }

    onChangeEventType(event)
    {
        const item = this
            .state
            .eventTypeLookupItems
            .find(x => x.Id === event.target.value.Id);

        this.updateGeneralEvent(event.target.name, {
            Id: item.Id,
            UniqueAttribute: item.UniqueAttribute
        });

        const {generalEvent} = this.state;
        if(generalEvent.EventType&&generalEvent.EventType.Id==IPC_EVENT_TYPE_IDS.additionalSupportsService)
        {
             this.updateGeneralEvent("SpServiceId",null);
        }

        else if(generalEvent.EventType&&generalEvent.EventType.Id!=IPC_EVENT_TYPE_IDS.standardsSupportsPackageService)
        {
             this.updateGeneralEvent("SpServiceId",null);
             this.updateGeneralEvent("ServiceDefinitionId", null);
        }

        if (event.target.value) {
            this.updateError(event.target.name, null);
        } else {
            this.updateError(event.target.name, "Event Type is required!");
        }
    }

    onServicesChange(event)
    {
        const {serviceOptions, generalEvent} = this.state;
        const service = lodash.find(serviceOptions, {Value: event.target.value.Id});

        if (service) {
            if(generalEvent.EventType&&generalEvent.EventType.Id==IPC_EVENT_TYPE_IDS.additionalSupportsService)
            {
                this.updateGeneralEvent("ServiceDefinitionId", service.Value);
                this.updateError("Service", null);
            }
            else if(generalEvent.EventType&&generalEvent.EventType.Id==IPC_EVENT_TYPE_IDS.standardsSupportsPackageService)
            {
                this.updateGeneralEvent("SpServiceId", service.Value);
                let spService = this.props.supportsPackageServices.find(x=>x.Value===service.Value);
                this.updateGeneralEvent("ServiceDefinitionId", spService.ServiceDefinitionId);
                this.updateError("Service", null);
            }
        } else {
            this.updateError("Service", "Service is required!");
        }
    }

    onChangeEndTime(moment)
    {
        this.updateError("EndTime", null);
        this.onMomentChange("EndTime", moment);
        this.checkTimeSpan("EndTime");
    }

    onChangeStartTime(moment)
    {
        this.updateError("StartTime", null);
        this.onMomentChange("StartTime", moment);
        this.checkTimeSpan("StartTime");
    }

    onChangeDailySupport(e) {
        if (e.target.checked) {
            this.updateGeneralEvent("StartTime", null);
            this.updateError("StartTime", null);
            this.updateGeneralEvent("EndTime", null);
            this.updateError("EndTime", null);
            this.updateGeneralEvent("TotalAuthorizedHours", null);
            this.updateError("TotalAuthorizedHours", null);
        }
        this.updateGeneralEvent(e.target.name, e.target.checked);
        this.setState({isDailySupport: e.target.checked});
    }

    onMomentChange(fieldName, moment)
    {
        const {generalEvent} = this.state;
        if (moment._isAMomentObject) {
            const Hours = moment.hours();
            const Minutes = moment.minutes();
            const Seconds = moment.seconds();
            this.updateGeneralEvent(fieldName, {Hours, Minutes, Seconds});
            this.updateError(fieldName, null);
        } else {
            const fieldValue = lodash.get(generalEvent, fieldName);
            this.updateGeneralEvent(fieldName, fieldValue);
            this.updateError(fieldName, "Invalid time format!");
        }
    }

    onChangeForm(event)
    {
        this.updateGeneralEvent(event.target.name, event.target.value);
    }

    updateError(fieldName, errorMessage)
    {
        let {error} = this.state;
        lodash.set(error, fieldName, errorMessage);
        this.setState({error});
    }

    updateGeneralEvent(fieldName, fieldValue)
    {
        let {generalEvent} = this.state;
        lodash.set(generalEvent, fieldName, fieldValue);
        this
            .props
            .updateGeneralEvent(generalEvent);
    }

    getLookupItemValues(selectedValue, lookupItems)
    {
        const selectedValues = [];
        lodash.forEach(lookupItems, (item) => {
            if (selectedValue.indexOf(item.Id) >= 0) {
                selectedValues.push({Id: item.Id, Abbreviation: item.Abbreviation, UniqueAttribute: item.UniqueAttribute});
            }
        });
        return selectedValues;
    }

    onFrequencyTypeChange(event) {
        this.updateGeneralEvent(event.target.name, event.target.value);
        const item = this
            .state
            .frequencyTypeLookupItems
            .find(x => x.Id === event.target.value);
        this.updateGeneralEvent("FrequencyType", {
            Id: item.Id,
            UniqueAttribute: item.UniqueAttribute
        });
        findLookupItemsByAttribute(`ipcfrequencyweekdays`, item.UniqueAttribute.Guid).then((lookups) => {
            const relatedValues = lookups.map((item) => {
                return {Id: item.Id, Abbreviation: item.Abbreviation, UniqueAttribute: item.UniqueAttribute};
            });
            this.updateGeneralEvent("FrequencyWeekDays", relatedValues);
            this.updateError("FrequencyWeekDays", null);
        });
    }

    onFrequencyWeekDayChange(selectedValue) {
        const selectedValues = this.getLookupItemValues(selectedValue, this.state.frequencyWeekdayLookupItems);
        this.updateGeneralEvent("FrequencyWeekDays", selectedValues);
        if (selectedValues.length > 0 && selectedValues[0]) {
            this.updateError("FrequencyWeekDays", null);
        } else {
            this.updateError("FrequencyWeekDays", "Frequency is required!");
        }
    }

    transferValue(value) {
        return (value || []).map((item) => {
            return item.Id;
        });
    }

    render() {

        const {
            error,
            serviceOptions,
            eventTypeOptions,
            eventTypeLookupItems,
            frequencyTypeOptions,
            frequencyTypeLookupItems,
            frequencyWeekdayOptions,
            frequencyWeekdayLookupItems,
            isDailySupport,
            showServiceDropdown
        } = this.state;

        const {generalEvent} = this.state;
        let serviceSourceId = null;
        if(generalEvent.EventType&&generalEvent.EventType.Id==IPC_EVENT_TYPE_IDS.additionalSupportsService)
            {
                serviceSourceId = generalEvent.ServiceDefinitionId;
            }
        else if(generalEvent.EventType&&generalEvent.EventType.Id==IPC_EVENT_TYPE_IDS.standardsSupportsPackageService)
            {
                serviceSourceId = generalEvent.SpServiceId;
            }

        return (
            <div className="confirm-message">
                <fieldset className="fieldset-container-one">
                    <legend className="legend-header-one">{this.props.title}</legend>
                    <div className="row">
                        <label htmlFor="EventType">Event Type:<RequiredIndicator/></label>
                        <DropdownList
                            name="EventType"
                            key="EventType"
                            isRequired
                            saveRequired
                            value={generalEvent.EventType}
                            options={eventTypeOptions}
                            onChange={this.onChangeEventType}/> {error.EventType && <span className="error alert alert-danger">{error.EventType}</span>}
                    </div>
                    {showServiceDropdown && <div className="row">
                        <label htmlFor="Service">Service:<RequiredIndicator/></label>
                        <DropdownList
                            value={{
                            Id: serviceSourceId
                        }}
                            isRequired
                            saveRequired
                            className="required"
                            options={selectListItemsForDropdown(serviceOptions || [])}
                            onChange={this.onServicesChange}
                            name="Service"
                            key="Service"/> {error.Service && <span className="error alert alert-danger">{error.Service}</span>}
                    </div>
}
                    {!showServiceDropdown && <div className="row">
                        <label htmlFor="EventDescription">Event:</label>
                        <TextBoxInput
                            name="EventDescription"
                            key="EventDescription"
                            value={generalEvent.EventDescription}
                            onChange={this.onChangeForm}/>
                    </div>
}
                    <fieldset className="fieldset-container-two">
                        <legend className="legend-header-two">Frequency<RequiredIndicator/></legend>
                        <div className="row">
                            <OneLineRadioButtons
                                name="FrequencyType"
                                key="FrequencyType"
                                options={frequencyTypeOptions}
                                value={generalEvent && generalEvent.FrequencyType && generalEvent.FrequencyType.Id}
                                onChange={this.onFrequencyTypeChange}/>
                        </div>
                        <div className="row">
                            <CheckboxList
                                name="FrequencyWeekDays"
                                key="FrequencyWeekDays"
                                isRequired
                                onChange={this.onFrequencyWeekDayChange}
                                value={this.transferValue(generalEvent.FrequencyWeekDays)}
                                options={frequencyWeekdayOptions}/> {error.FrequencyWeekDays && <div className="error alert alert-danger">{error.FrequencyWeekDays}</div>}
                        </div>
                        {/*<div className="row">
                            <input
                                id="DailySupport"
                                name="DailySupport"
                                key="DailySupport"
                                type="checkbox"
                                checked={generalEvent.DailySupport || false}
                                value={generalEvent.DailySupport || false}
                                onChange={this.onChangeDailySupport}/>
                            <label htmlFor="DailySupport" className="auto-width">Daily Support</label>
                        </div>*/}
                        <div className="column-left">
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
                                value={generalEvent.StartTime}
                                dateFormat={false}
                                readonly={isDailySupport}
                                viewMode='time'/> {error.StartTime && <div className="error alert alert-danger">{error.StartTime}</div>}
                        </div>
                        <div className="column-right">
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
                                value={generalEvent.EndTime}
                                readonly={isDailySupport}
                                dateFormat={false}/> {error.EndTime && <div className="error alert alert-danger">{error.EndTime}</div>}
                        </div>

                    </fieldset>
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
                    title="Delete General Event"
                    message="Are you sure you want to delete this General Event?"
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

GeneralEvent.propTypes = {
    handleCancel: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    handleDelete: PropTypes.func,
    updateGeneralEvent: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    generalEvent: PropTypes.object.isRequired,
    supportsPackageServices: PropTypes.array,
    lxServices: PropTypes.array
};

export default GeneralEvent;