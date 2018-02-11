import React, {PropTypes} from 'react';
import ReactModal from "react-modal";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Textarea from 'components/Common/Textarea';
import * as aclHelper from 'utils/aclHelper';
import {EVENT_TYPE_COLORS} from 'utils/constants'
import GeneralEvent from "./GeneralEvent";
import GeneralCalendarCalculator from "./GeneralCalendarCalculator";

class GeneralCalendarViewer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpen: false,
            generalEvent: {},
            editingComment: "",
            isEditComment: false
        };
        this.handleSave = this
            .handleSave
            .bind(this);
        this.handleDelete = this
            .handleDelete
            .bind(this);
        this.handleCancel = this
            .handleCancel
            .bind(this);
        this.formatEventTime = this
            .formatEventTime
            .bind(this);
        this.onSelectEvent = this
            .onSelectEvent
            .bind(this);
        this.updateGeneralEvent = this
            .updateGeneralEvent
            .bind(this);
    }


    handleSave(e) {
        e.preventDefault();
        e.stopPropagation();
        const {generalEvent} = this.state;
        if (this.props.onEdit(generalEvent)) {
            this.setState({isOpen: false});
        }
    }

    handleDelete() {
        const {generalEvent} = this.state;
        this
            .props
            .onDelete(generalEvent);
        this.setState({isOpen: false});
    }

    handleCancel(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({isOpen: false});
    }

    onSelectEvent(event, e) {
        this.setState({isOpen: true, generalEvent: {}});
        this.setState({generalEvent: event.tag});
    }

    updateGeneralEvent(generalEvent) {
        this.setState({generalEvent});
    }

    formatEventTime({
        start,
        end
    }, culture, localizer) {
        if (end - start < 7200000) {
            return "";
        }
        return (`${localizer.format(start, "LT")} - ${localizer.format(end, "LT")}`);
    }

    render() {

        BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

        const {
            securityContext,
            supportsPackageServices,
            lxServices,
            workflowStatus
        } = this.props;

        const styleObj = {
            width: 220
        };

        const canEdit = ((securityContext) => {
            return  aclHelper.canManage(securityContext, "GeneralEvents");
        })(securityContext);

        return (
            <div>
                <fieldset className="fieldset-container-one">
                    <legend className="legend-header-one">Instructions</legend>
                    <span className="label-info">The Individual Planning Calendar is a general
                        blueprint of services and supports, based on the person's preferences and
                        routine.</span>
                </fieldset>
                <div className="bigCalContainer">
                    <BigCalendar
                        events={this.props.generalEvents}
                        onSelectEvent={this.onSelectEvent}
                        defaultView="week"
                        views={['week']}
                        toolbar={false}
                        titleAccessor={function (e) {
                        return e.title;
                    }}
                        formats={{
                        dayFormat: 'dddd',
                        timeGutterFormat: 'h:mm A',
                        eventTimeRangeFormat: this.formatEventTime
                    }}
                        eventPropGetter ={ e=>({
                           style: {background:EVENT_TYPE_COLORS[e.tag.EventType.Id],color:'black'}
                        })}
                        messages={{
                        allDay: 'all day',
                        today: null
                    }}
                        defaultDate={new Date(2000, 1, 1)}/>
                </div>
                <GeneralCalendarCalculator
                        title='Calculator'
                        clientPreferredName={this.props.clientPreferredName}
                        events={this.props.generalEvents}
                        supportsPackageServices={supportsPackageServices}
                        totalDollarAmount={this.props.totalDollarAmount}>
                </GeneralCalendarCalculator>
                <ReactModal
                    className="content"
                    overlayClassName="overlay"
                    isOpen={this.state.isEditComment}
                    onRequestClose={() => {}}
                    contentLabel="">
                    <div className="confirm-message">
                        <fieldset className="fieldset-container-one">
                            <legend className="legend-header-one">Edit Comments</legend>
                            <label htmlFor="EditComment">Comments:</label>
                            <Textarea
                                name='EditComment'
                                id='EditComment'
                                onChange={this.onChangeComment}
                                value={this.state.editingComment}
                                extraProps={{
                                'maxLength': 2000
                            }}></Textarea>
                            <div className="searchspace-footer-bar">
                                <div className="float-right">
                                    <button className="confirm-button-no" onClick={this.onCancelEditComment}>Cancel</button>
                                    <button className="confirm-button-yes" onClick={this.onSaveComment}>Save</button>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </ReactModal>
                <ReactModal
                    className="addGeneralEvent"
                    overlayClassName="overlay"
                    isOpen={this.state.isOpen }
                    onRequestClose={() => {}}
                    contentLabel="">
                    <GeneralEvent
                        title='Edit Event'
                        generalEvent={this.state.generalEvent}
                        updateGeneralEvent={this.updateGeneralEvent}
                        handleCancel={this.handleCancel}
                        handleSave={this.handleSave}
                        supportsPackageServices={supportsPackageServices}
                        lxServices={lxServices}
                        handleDelete={this.handleDelete}/>
                </ReactModal>
            </div>
        );
    }
};

GeneralCalendarViewer.propTypes = {
    generalEvents: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    clientPreferredName: PropTypes.string.isRequired,
    securityContext: PropTypes.object.isRequired,
    totalDollarAmount: PropTypes.number,
    supportsPackageServices: PropTypes.array,
    lxServices: PropTypes.array
};

export default GeneralCalendarViewer;
