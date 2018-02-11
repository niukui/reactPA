import React, {PropTypes} from 'react';
import DropdownList from 'components/Common/DropdownList';
import {formatJsonDate} from 'utils/dateHelper';
import lodash from 'lodash';
import ActivitiesEditor from './ActivitiesEditor';
import OutcomeForm from './OutcomeForm';
import ModalConfirm from "components/Common/ModalConfirm";

class OutcomeEditor extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.addActivity = this
            .addActivity
            .bind(this);
        this.saveActivity = this
            .saveActivity
            .bind(this);
        this.deleteActivity = this
            .deleteActivity
            .bind(this);
        this.onItemRemove = this
            .onItemRemove
            .bind(this);        
        this.prepareActivities = this
            .prepareActivities
            .bind(this);
        this.outcomeFormChange = this
            .outcomeFormChange
            .bind(this);

        this.state = {
            supportActivities: this.prepareActivities((props.outcome || {}).SupportActivities || []),
            isOpenItemRemoveConfirm: false,
            removedActivity: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.outcome && nextProps.outcome.SupportActivities) !== (this.props.outcome && this.props.outcome.SupportActivities)) {
            this.setState({
                supportActivities: this.prepareActivities(Object.assign([], nextProps.outcome.SupportActivities))
            });
        }
    }

    prepareActivities(activities) {
        lodash.forEach(activities, (activity) => {
            activity.Id = Math.random();
        });
        return activities;
    }

    addActivity(activity) {
        let activities = Object.assign([], this.state.supportActivities);
        activities.push(activity);
        let outcome = Object.assign({}, this.props.outcome, {SupportActivities: activities});
        this
            .props
            .outcomeChange(this.props.outcome.Id, outcome);
    }

    saveActivity(activity) {
        let activityIndex = lodash.findIndex(this.state.supportActivities, (item) => item.Id === activity.Id);
        let activities = Object.assign([], this.state.supportActivities);
        if (activityIndex >= 0) {
            let outcome = Object.assign({}, this.props.outcome);
            lodash.set(activities, `[${activityIndex}]`, activity);
            lodash.set(outcome, 'SupportActivities', activities);

            this
                .props
                .outcomeChange(this.props.outcome.Id, outcome);
        }
    }
    onItemRemove(yes)
    {
        if (yes) {
        const activity = this.state.removedActivity;
        if ( activity ) {
            let activities = Object.assign([], this.state.supportActivities);
            let newActivities = lodash.remove(activities, (item) => item.Id === activity.Id);

            let outcome = Object.assign({}, this.props.outcome);
            lodash.set(outcome, 'SupportActivities', activities);
            this
                .props
                .outcomeChange(this.props.outcome.Id, outcome);
            }
        }
        this.setState((prevState, props) => ({isOpenItemRemoveConfirm: false, removedActivity: null}));
    };

    deleteActivity(activity) {
        this.setState((prevState, props) => ({isOpenItemRemoveConfirm: true, removedActivity: activity}));
    };

    outcomeFormChange(outcome) {
        this
            .props
            .outcomeChange(this.props.outcome.Id, outcome);
    }

    render() {
        const {
            allowCustomized,
            outcome,
            sharedPlannings,
            error,
            index,
            deleteAction,
            lifeAreas
        } = this.props;
        const {supportActivities} = this.state;

        const sharedPlanningOptions = lodash.map(sharedPlannings, (sharedPlanning) => {
            return {text: sharedPlanning.DesiredOutcome, value: sharedPlanning.Id};
        });

        return (
            <div>
                <fieldset className="fieldset-container-four">
                    <legend className="legend-header-four">Service and Outcome # {index + 1}</legend>
                    <div className="header-link">
                        {allowCustomized
                        ?null
                        :<a
                            href="javascript:void(0);"
                            onClick={() => {
                            deleteAction(outcome.Id);
                        }}>Delete</a>}
                        
                    </div>
                    <OutcomeForm 
                        sharedPlanningOptions={sharedPlanningOptions}
                        outcome={outcome}
                        outcomeChange={this.outcomeFormChange}
                        error={error}
                        sharedPlannings={sharedPlannings}
                        lifeAreas={lifeAreas}
                        index={index+1}
                        allowCustomized={allowCustomized}

                        />
                    <ActivitiesEditor
                        addActivity={this.addActivity}
                        saveActivity={this.saveActivity}
                        deleteActivity={this.deleteActivity}
                        supportActivities={supportActivities}
                        index={index + 1}/>
                </fieldset>
                <ModalConfirm
                    isOpen={this.state.isOpenItemRemoveConfirm}
                    title="Confirmation"
                    message="Are you sure you want to delete this activity from the list? Please note that after the item has been deleted from the list, you have to click Save to preserve the changes."
                    onYes={() => {
                    this.onItemRemove(true);
                    }}
                    onNo={() => {
                    this.onItemRemove(false);
                    }}
                    onClose={() => {
                    this.onItemRemove(false);
                    }}/>
            </div>
        );
    }
}
OutcomeEditor.propTypes = {
    sharedPlannings: PropTypes.array,
    outcome: PropTypes.object,
    outcomeChange: PropTypes.func,
    error: PropTypes.object,
    index: PropTypes.number,
    deleteAction: PropTypes.func.isRequired,
    allowCustomized: PropTypes.bool,
    lifeAreas: PropTypes.array
};

export default OutcomeEditor;
