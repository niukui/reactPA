import React, {PropTypes} from 'react';
import ReactModal from "react-modal";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Textarea from 'components/Common/Textarea';
import * as aclHelper from 'utils/aclHelper';
import GeneralScheduleSupport from "./GeneralScheduleSupport";

class GeneralScheduleSupportsViewer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpen: false,
            activity: {},
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
        this.updateActivity = this
            .updateActivity
            .bind(this);
        this.onEditComment = this
            .onEditComment
            .bind(this);
        this.onChangeComment = this
            .onChangeComment
            .bind(this);
        this.onSaveComment = this
            .onSaveComment
            .bind(this);
        this.onCancelEditComment = this
            .onCancelEditComment
            .bind(this);

    }

    onEditComment(e) {
        e.preventDefault();
        e.stopPropagation();
        const editingComment = this.props.generalScheduleSupport.Comment;
        this.setState({isEditComment: true, editingComment});
    }

    onChangeComment(e) {
        this.setState({editingComment: e.target.value});
    }

    onSaveComment(e) {
        e.preventDefault();
        e.stopPropagation();
        const {editingComment} = this.state;
        if (this.props.onSaveComment(editingComment)) {
            this.setState({isEditComment: false});
        }
    }

    onCancelEditComment(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({isEditComment: false});
    }

    handleSave(e) {
        e.preventDefault();
        e.stopPropagation();
        const {activity} = this.state;
        if (this.props.onEdit(activity)) {
            this.setState({isOpen: false});
        }
    }

    handleDelete() {
        const {activity} = this.state;
        this
            .props
            .onDelete(activity);
        this.setState({isOpen: false});
    }

    handleCancel(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({isOpen: false});
    }

    onSelectEvent(event, e) {
        this.setState({isOpen: true, activity: {}});
        this.setState({activity: event.tag});
    }

    updateActivity(activity) {
        this.setState({activity});
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
            generalScheduleSupport,
            accessModel,
            securityContext,
            overlapCheck,
            serviceOutcomes,
            workflowStatus
        } = this.props;

        const styleObj = {
            width: 220
        };

        const canEdit = ((securityContext) => {
            return aclHelper.canManage(securityContext, "GeneralScheduleSupports");
        })(securityContext);

        return (
            <div>
                <fieldset className="fieldset-container-one">
                    <legend className="legend-header-one">Instructions</legend>
                    <span className="label-info">The General Schedule of Supports is a general
                        blueprint of activities and supports, based on the person's preferences and
                        routine. The authorized support time allotted to each group of activities is
                        included in the authorized hours and totals sections. The General Schedule of
                        Supports can be developed in various ways, but must include: support activities
                        and outcome numbers, time frames for activities, as well as authorized totals.</span>
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
                        messages={{
                        allDay: 'all day',
                        today: null
                    }}
                        defaultDate={new Date(2000, 1, 1)}/>
                </div>
                <fieldset className="fieldset-container-one">
                    <legend className="legend-header-one">Summary</legend>
                    <div className="row">
                        <table className="generalTable">
                            <caption className="caption-header">Authorized Hours per Day</caption>
                            <thead>
                                <tr>
                                    <th>Sunday</th>
                                    <th>Monday</th>
                                    <th>Tuesday</th>
                                    <th>Wednesday</th>
                                    <th>Thursday</th>
                                    <th>Friday</th>
                                    <th>Saturday</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {generalScheduleSupport.AuthorizedHoursPerDay.Sunday == null
                                            ? 0
                                            : generalScheduleSupport.AuthorizedHoursPerDay.Sunday}
                                    </td>
                                    <td>
                                        {generalScheduleSupport.AuthorizedHoursPerDay.Monday == null
                                            ? 0
                                            : generalScheduleSupport.AuthorizedHoursPerDay.Monday}
                                    </td>
                                    <td>
                                        {generalScheduleSupport.AuthorizedHoursPerDay.Tuesday == null
                                            ? 0
                                            : generalScheduleSupport.AuthorizedHoursPerDay.Tuesday}
                                    </td>
                                    <td>
                                        {generalScheduleSupport.AuthorizedHoursPerDay.Wednesday == null
                                            ? 0
                                            : generalScheduleSupport.AuthorizedHoursPerDay.Wednesday}
                                    </td>
                                    <td>
                                        {generalScheduleSupport.AuthorizedHoursPerDay.Thursday == null
                                            ? 0
                                            : generalScheduleSupport.AuthorizedHoursPerDay.Thursday}
                                    </td>
                                    <td>
                                        {generalScheduleSupport.AuthorizedHoursPerDay.Friday == null
                                            ? 0
                                            : generalScheduleSupport.AuthorizedHoursPerDay.Friday}
                                    </td>
                                    <td>
                                        {generalScheduleSupport.AuthorizedHoursPerDay.Saturday == null
                                            ? 0
                                            : generalScheduleSupport.AuthorizedHoursPerDay.Saturday}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="column-left">
                        <div className="row">
                            <div className="row summary">
                                <span style={styleObj} className="label">Total Authorized Hours per Week:</span>
                                <span className="data-element">{generalScheduleSupport.AuthorizedHoursPerWeek}</span>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset className="fieldset-container-one">
                    <legend className="legend-header-one">Comments
                    </legend>
                    {canEdit && <div className="header-link right">
                        <a href="javascript:void(0);" onClick={this.onEditComment}>Edit</a>
                    </div>}
                    <div className="row">
                        <label htmlFor="readonlyComment" className="ui-hide">Comments:</label>
                        <Textarea
                            name='Comment'
                            id='readonlyComment'
                            readonly
                            value={generalScheduleSupport.Comment}></Textarea>
                    </div>
                </fieldset>
                <ReactModal
                    className="content"
                    overlayClassName="overlay"
                    isOpen={this.state.isEditComment && canEdit}
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
                    className="addSupportModal"
                    overlayClassName="overlay"
                    isOpen={this.state.isOpen && canEdit}
                    onRequestClose={() => {}}
                    contentLabel="">
                    <GeneralScheduleSupport
                        title='Edit Support'
                        activity={this.state.activity}
                        updateActivity={this.updateActivity}
                        handleCancel={this.handleCancel}
                        handleSave={this.handleSave}
                        overlapCheck={overlapCheck}
                        serviceOutcomes={serviceOutcomes}
                        handleDelete={this.handleDelete}/>
                </ReactModal>
            </div>
        );
    }
};

GeneralScheduleSupportsViewer.propTypes = {
    generalEvents: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSaveComment: PropTypes.func.isRequired,
    generalScheduleSupport: PropTypes.object.isRequired,
    securityContext: PropTypes.object.isRequired,
    overlapCheck: PropTypes.func.isRequired,
    serviceOutcomes: PropTypes.array.isRequired,
    workflowStatus: PropTypes.object.isRequired,
    accessModel: PropTypes.object
};

export default GeneralScheduleSupportsViewer;
