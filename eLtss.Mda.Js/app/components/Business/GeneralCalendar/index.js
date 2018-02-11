import React, {PropTypes} from 'react';
import {get} from 'lodash';
import ModalConfirm from "components/Common/ModalConfirm";
import * as aclHelper from 'utils/aclHelper';
import NewCollapsiblePanel from 'components/Common/NewCollapsiblePanel';
import IspOverviewDetails from 'components/Business/Isp/IspOverviewDetails';
import GeneralCalendarViewer from './GeneralCalendarViewer'
import AddGeneralEvent from './AddGeneralEvent'

const changeToEvents = (generalEvents) => {
    let events = [];
    generalEvents.map((generalEvent) => {
        const title = generalEvent.EventType && 
                      generalEvent.EventType.UniqueAttribute &&
                      generalEvent.EventType.UniqueAttribute.Description;
        generalEvent
            .FrequencyWeekDays
            .map((weekDay) => {
                let startDate = new Date(2000, 1, 1);
                let endDate = new Date(2000, 1, 1);
                if (weekDay.Abbreviation) {
                    startDate.setDate(weekDay.Abbreviation - 1);
                    endDate.setDate(weekDay.Abbreviation - 1);
                }

                if (generalEvent.DailySupport) {
                    events.push({title: title, start: startDate, end: endDate, tag: generalEvent, allDay: true});
                } else {
                    startDate.setHours(generalEvent.StartTime.Hours);
                    startDate.setMinutes(generalEvent.StartTime.Minutes);
                    endDate.setHours(generalEvent.EndTime.Hours);
                    endDate.setMinutes(generalEvent.EndTime.Minutes);
                    events.push({title: title, start: startDate, end: endDate, tag: generalEvent});
                }
            });
    });
    return events;
};

class GeneralCalendar extends React.Component {
    constructor(props, context) {
        super(props, context);
    this.addGeneralEvent = this
      .addGeneralEvent
      .bind(this);
    this.editGeneralEvent = this
      .editGeneralEvent
      .bind(this);
    this.deleteGeneralEvent = this
      .deleteGeneralEvent
      .bind(this);      
    }

    addGeneralEvent(activity)
    {
        const dataId=this.props.data 
            && this.props.moduleName
            && this.props.data[this.props.moduleName]
            && this.props.data[this.props.moduleName].Id;
        this
            .props
            .actions
            .addGeneralEvent(dataId, activity);
        return true;
    }

    editGeneralEvent(activity)
    {
        const dataId=this.props.data 
            && this.props.moduleName
            && this.props.data[this.props.moduleName]
            && this.props.data[this.props.moduleName].Id;
        this
            .props
            .actions
            .editGeneralEvent(dataId, activity);
        return true;
    }

    deleteGeneralEvent(activity) {
        const dataId=this.props.data 
            && this.props.moduleName
            && this.props.data[this.props.moduleName]
            && this.props.data[this.props.moduleName].Id;
        this
            .props
            .actions
            .deleteGeneralEvent(dataId, activity.Id);
    }

    render() {
        const {
            data,
            securityContext,
            metadata,
            componentsState,
            onSwitchExpandStatus,
            clientId
        } = this.props;

        if (!metadata || !metadata.Name) {
            return null;
        }
        return (
            <NewCollapsiblePanel
                title={metadata.DisplayName}
                name={metadata.Name}
                isExpand={this.props.isExpand}
                onStatusChange={this.props.onStatusChange}
                headers={[< AddGeneralEvent securityContext = {securityContext}
                onSave = {this.addGeneralEvent}
                supportsPackageServices = {this.props.data.DropdownDataSource.SupportsPackageServiceSelectList}
                lxServices = {this.props.data.DropdownDataSource.LxServiceSelectList}
                key = '0' />]}>
                <GeneralCalendarViewer
                    onEdit={this.editGeneralEvent}
                    onDelete={this.deleteGeneralEvent}
                    GeneralEvent={{AuthorizedHoursPerDay: {}}}
                    clientPreferredName={this.props.data.IndividualPlanningCalendar.OverviewInformation.ClientPreferredName}
                    securityContext={securityContext}
                    totalDollarAmount={this.props.data.IndividualPlanningCalendar.TotalDollarAmount}
                    generalEvents={changeToEvents(this.props.data.IndividualPlanningCalendar.GeneralEvents)}
                    supportsPackageServices={this.props.data.DropdownDataSource.SupportsPackageServiceSelectList}
                    lxServices={this.props.data.DropdownDataSource.LxServiceSelectList}/>
            </NewCollapsiblePanel>
        );
    }
}

GeneralCalendar.propTypes = {
    isExpand: PropTypes.bool.isRequired,
    onStatusChange: PropTypes.func,
    data: PropTypes.object.isRequired,
    metadata: PropTypes.object,
    securityContext: PropTypes.object.isRequired,
    componentsState: PropTypes.object.isRequired,
    moduleName: PropTypes.string.isRequired,
    actions: PropTypes.any
};

export default GeneralCalendar;