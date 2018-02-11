import React, {PropTypes} from 'react';
import DropdownList from 'components/Common/DropdownList';
import {formatJsonDate} from 'utils/dateHelper';
import lodash from 'lodash';
import DatePicker from 'components/Common/DatePicker';
import TextBoxInput from 'components/Common/TextBox';
import RequiredIndicator from 'components/Common/RequiredIndicator';

const activityTableTd = {
    "wordWrap": "break-word",
    "overflowWrap": "break-word",
};
const activityTableTh = {
    "width": "25%",
};

class ActivitiesEditor extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.addActivity = this
            .addActivity
            .bind(this);
        this.saveActivity = this
            .saveActivity
            .bind(this);
        this.getEmptyActivity = this
            .getEmptyActivity
            .bind(this);
        this.formChange = this
            .formChange
            .bind(this);
        this.onClickEdit = this
            .onClickEdit
            .bind(this);
        this.onClickDelete = this
            .onClickDelete
            .bind(this);
        this.cancelEditing = this
            .cancelEditing
            .bind(this);

        this.state = {
            activity: this.getEmptyActivity(),
            editing: false,
            error: {}
        };
    }

    getEmptyActivity() {
        return {SupportActivityName: '', WhenNoLongerNeedSupport: '', WhatToRecord: '', HowOften: '', ByWhen: ''};
    }

    addActivity() {
        const {activity} = this.state;
        let validated = true;
        if (!activity.SupportActivityName) {
            this.updateError("SupportActivityName", "Support Activities is required!");
            validated = false;
        }
        if (!activity.WhenNoLongerNeedSupport) {
            this.updateError("WhenNoLongerNeedSupport", "I no longer want/need supports when is required!");
            validated = false;
        }
        if (!activity.WhatToRecord) {
            this.updateError("WhatToRecord", "What to record is required!");
            validated = false;
        }
        if (!activity.HowOften) {
            this.updateError("HowOften", "How often is required!");
            validated = false;
        }
        if (!activity.ByWhen) {
            this.updateError("ByWhen", "By when is required!");
            validated = false;
        }
        if ( validated) {
            this
                .props
                .addActivity(Object.assign({}, activity));
            this.setState({
                activity: this.getEmptyActivity(),
                editing: false
            });
        }
    }

    saveActivity() {
        const {activity} = this.state;
        if (activity.SupportActivityName || activity.WhenNoLongerNeedSupport || activity.WhatToRecord || activity.HowOften || activity.ByWhen) {
            this
                .props
                .saveActivity(activity);
            this.setState({
                activity: this.getEmptyActivity(),
                editing: false
            });
        }
    }

    cancelEditing() {
        this.setState({
            activity: this.getEmptyActivity(),
            editing: false
        });
    }

    formChange(event) {
        let activity = Object.assign({}, this.state.activity);
        lodash.set(activity, event.target.name, event.target.value);
        this.setState({activity});
        if (event.target.value) {
            this.updateError(event.target.name, null);
        }
    
    }

    updateError(fieldName, errorMessage)
    {
        let {error} = this.state;
        lodash.set(error, fieldName, errorMessage);
        this.setState({error});
    }

    onClickEdit(event, activity) {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        this.setState({activity});
        this.setState({editing: true});
    }

    onClickDelete(event, activity) {
        this
            .props
            .deleteActivity(activity);
    }

    render() {
        const {supportActivities, index} = this.props;
        const {error,activity, editing} = this.state;
        return (
            <fieldset className="fieldset-container-four">
                <legend className="legend-header-four">Activities</legend>
                <div className="row">
                    <label htmlFor={"activityName_" + index}>Supports Activities<RequiredIndicator/></label>
                    <TextBoxInput
                        id={"activityName_" + index}
                        onChange={this.formChange}
                        name="SupportActivityName"
                        value={(activity && activity.SupportActivityName) || ''}
                        type="text"
                        isRequired
                        maxLength="2000"/>
                    {error.SupportActivityName && <span className="error alert alert-danger">{error.SupportActivityName}</span>}
                </div>
                <div className="row">
                    <label htmlFor={'endSupportsWhen_' + index}>I no longer want/need supports when...<RequiredIndicator/></label>
                    <TextBoxInput
                        id={'endSupportsWhen_' + index}
                        onChange={this.formChange}
                        name="WhenNoLongerNeedSupport"
                        value={(activity && activity.WhenNoLongerNeedSupport) || ''}
                        type="text"
                        isRequired
                        maxLength="2000"/>
                    {error.WhenNoLongerNeedSupport && <span className="error alert alert-danger">{error.WhenNoLongerNeedSupport}</span>}                        
                </div>
                <div className="row">
                    <label htmlFor={'whatToRecord_' + index}>What to record<RequiredIndicator/></label>
                    <TextBoxInput
                        id={'whatToRecord_' + index}
                        onChange={this.formChange}
                        name="WhatToRecord"
                        value={(activity && activity.WhatToRecord) || ''}
                        type="text"
                        isRequired
                        maxLength="2000"/>
                    {error.WhatToRecord && <span className="error alert alert-danger">{error.WhatToRecord}</span>}                        
                </div>
                <div className="row">
                    <label htmlFor={'howOften_' + index}>How often<RequiredIndicator/></label>
                    <TextBoxInput
                        id={'howOften_' + index}
                        onChange={this.formChange}
                        name="HowOften"
                        value={(activity && activity.HowOften) || ''}
                        type="text"
                        isRequired
                        maxLength="2000"/>
                    {error.HowOften && <span className="error alert alert-danger">{error.HowOften}</span>}                        
                </div>
                <div className="row">
                    <label htmlFor={'byWhen_' + index}>By when<RequiredIndicator/></label>
                    <DatePicker
                        id={'byWhen_' + index}
                        onChange={this.formChange}
                        name="ByWhen"
                        saveRequired
                        value={(activity && activity.ByWhen) || ''}/>
                    {error.ByWhen && <span className="error alert alert-danger">{error.ByWhen}</span>}                        
                </div>

                <div className="add-to-table">
                    <div className="center">
                        <span className="addTo-button">
                            {editing
                                ? <span className="CancelEdit-link">
                                        <a role="button" onClick={this.cancelEditing}>Cancel</a>
                                    </span>
                                : null
}
                            {editing
                                ? <span>
                                        <a role="button" onClick={this.saveActivity}>Save Change</a>
                                    </span>
                                : <a role="button" onClick={this.addActivity}>Add New</a>
}
                        </span>
                    </div>
                    <table
                        style={{
                        "tableLayout": "fixed",
                        "display":"table"
                    }}
                        className="generalTable noInit">
                        <caption className="caption-header">
                            <span>Activities</span>
                        </caption>
                        <thead>
                            <tr>
                                <th style={activityTableTh}>Support Activities</th>
                                <th style={activityTableTh}>I no longer want/need supports when...</th>
                                <th style={activityTableTh}>What to record</th>
                                <th>How often</th>
                                <th style={{"width":"80px"}}>By when</th>
                                <th className="actions">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(supportActivities && supportActivities.length > 0)
                                ? supportActivities.map((item, index) => <tr key={index}>
                                    <td style={activityTableTd}>{item.SupportActivityName}</td>
                                    <td style={activityTableTd}>{item.WhenNoLongerNeedSupport}</td>
                                    <td style={activityTableTd}>{item.WhatToRecord}</td>
                                    <td>{item.HowOften}</td>
                                    <td style={{"width":"80px"}}>{formatJsonDate(item.ByWhen)}</td>
                                    <td>

                                        {item.Id === activity.Id
                                            ? <span>
                                                    <span className="icon-pencil"></span>
                                                    <b>Editing...</b>
                                                </span>
                                            : <span>
                                                <a
                                                    onClick={(e) => {
                                                    this.onClickEdit(e, item);
                                                }}
                                                    title="Edit this item">Edit</a>
                                                <a
                                                    onClick={(e) => {
                                                    this.onClickDelete(e, item);
                                                }}
                                                    title="Permanently delete this item">Delete</a>
                                            </span>
}

                                    </td>
                                </tr>)
                                : (
                                    <tr>
                                        <td colSpan="6" className="dataTables_empty">No data available</td>
                                    </tr>
                                )
}

                        </tbody>
                    </table>
                </div>
            </fieldset>
        );
    }
}

ActivitiesEditor.propTypes = {
    supportActivities: PropTypes.array,
    addActivity: PropTypes.func,
    saveActivity: PropTypes.func,
    deleteActivity: PropTypes.func,
    index: PropTypes.number
};

export default ActivitiesEditor;
