import React, {PropTypes} from 'react';
import DropdownList from 'components/Common/DropdownList';
import {formatJsonDate} from 'utils/dateHelper';
import lodash from 'lodash';
import ActivitiesEditor from './ActivitiesEditor';
import DatePicker from 'components/Common/DatePicker';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import TextBoxInput from 'components/Common/TextBox';

class OutcomeForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.prepareForm = this
            .prepareForm
            .bind(this);
        this.customizedForm = this
            .customizedForm
            .bind(this);
        this.chooseForm = this
            .chooseForm
            .bind(this);
        this.formChange = this
            .formChange
            .bind(this);
        this.desiredOutcomeChanged = this
            .desiredOutcomeChanged
            .bind(this);

        this.state = {
            outcome: props.outcome || {
                'SharedPlanningId': '',
                'DesiredOutcome': '',
                'WhenNoLongerNeedSupport': '',
                'StartDate': '',
                'EndDate': '',
                'LifeArea': null,
                "LineNumber": ''
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({outcome: nextProps.outcome});
    }

    desiredOutcomeChanged(event) {
        let outcome = {};

        const sharedPlanning = lodash.find(this.props.sharedPlannings, {
            'Id': event.target.value && event.target.value.Id
        });
        if (event.target.value && event.target.value.Id && sharedPlanning) {
            outcome = Object.assign({}, this.state.outcome, {
                'SharedPlanningId': sharedPlanning.Id,
                'DesiredOutcome': sharedPlanning.DesiredOutcome,
                'WhenNoLongerNeedSupport': sharedPlanning.WhenNoLongerNeedSupport,
                'StartDate': sharedPlanning.StartDate,
                'EndDate': sharedPlanning.EndDate,
                "LineNumber": sharedPlanning.LineNumber,
                'LifeArea': sharedPlanning.LifeArea
            });
        } else {
            outcome = Object.assign({}, this.state.outcome, {
                'SharedPlanningId': '',
                'DesiredOutcome': '',
                'WhenNoLongerNeedSupport': '',
                'StartDate': '',
                'EndDate': '',
                "LineNumber": '',
                'LifeArea': null
            });
        }
        this
            .props
            .outcomeChange(outcome);
    }

    formChange(event) {
        if (event.target.name === 'SharedPlanningId') {
            this.desiredOutcomeChanged(event);
        } else if (event.target.name === 'LifeArea') {
            let outcome = Object.assign({}, this.state.outcome);
            if (event.target.value && event.target.value.Id) {
                const lookupItem = lodash.find(this.props.lifeAreas, {'Id': event.target.value.Id});
                if (lookupItem) {
                    lodash.set(outcome, event.target.name, {
                        'Id': lookupItem.Id,
                        'UniqueAttribute': lookupItem.UniqueAttribute
                    });
                } else {
                    lodash.set(outcome, event.target.name, null);
                }
            } else {
                lodash.set(outcome, event.target.name, null);
            }
            this
                .props
                .outcomeChange(Object.assign({}, outcome, {'Changed': true}));
        } else {
            let outcome = Object.assign({}, this.state.outcome);
            lodash.set(outcome, event.target.name, event.target.value);
            this
                .props
                .outcomeChange(Object.assign({}, outcome, {'Changed': true}));
        }
    }

    customizedForm() {
        const {sharedPlanningOptions, error, lifeAreas, index} = this.props;
        const {outcome} = this.state;

        const lifeAreasOptions = lodash.map(lifeAreas, (lifeArea) => {
            return {text: lifeArea.Description, value: lifeArea.Id};
        });

        return <div className="row">
            <div className="row">
                <label htmlFor={"specifyOutcome_" + index}>Desired outcome<RequiredIndicator/></label>
                <TextBoxInput
                    name="DesiredOutcome"
                    type="text"
                    isRequired
                    value={outcome.DesiredOutcome}
                    onChange={this.formChange}
                    maxLength="2000"/> {error && error.DesiredOutcome && <div className="error alert alert-danger">{error.DesiredOutcome}</div>}
            </div>
            <div className="row">
                <label htmlFor={"lifeArea_" + index}>Life Area<RequiredIndicator/></label>
                <DropdownList
                    id={"lifeArea_" + index}
                    name="LifeArea"
                    onChange={this.formChange}
                    options={lifeAreasOptions}
                    saveRequired
                    value={outcome.LifeArea}/> {error && error.LifeArea && <div className="error alert alert-danger">{error.LifeArea}</div>}
            </div>
            <div className="row">
                <label htmlFor={"noLongerNeed_" + index}>I no longer want/need supports when...<RequiredIndicator/></label>
                <TextBoxInput
                    id={"noLongerNeed_" + index}
                    name="WhenNoLongerNeedSupport"
                    type="text"
                    isRequired
                    value={outcome.WhenNoLongerNeedSupport}
                    onChange={this.formChange}
                    maxLength="2000"/> {error && error.WhenNoLongerNeedSupport && <div className="error alert alert-danger">{error.WhenNoLongerNeedSupport}</div>}
            </div>
            <div className="row">
                <label htmlFor={"starDate_" + index}>Start Date</label>
                <DatePicker
                    id={"starDate_" + index}
                    name="StartDate"
                    value={outcome.StartDate}
                    onChange={this.formChange}/>
            </div>
            <div className="row">
                <label htmlFor={"endDate_" + index}>End Date</label>
                <DatePicker
                    id={"endDate_" + index}
                    name="EndDate"
                    value={outcome.EndDate}
                    onChange={this.formChange}/>{error && error.EndDate && <div className="error alert alert-danger">{error.EndDate}</div>}
            </div>
        </div>;
    }

    chooseForm() {
        const {sharedPlanningOptions, error, index} = this.props;
        const {outcome} = this.state;

        return <div>
            <div className="row">
                <label htmlFor={"desiredOutcome_" + index}>Desired outcome</label>
                <DropdownList
                    id={"desiredOutcome_" + index}
                    name="SharedPlanningId"
                    onChange={this.formChange}
                    options={sharedPlanningOptions}
                    saveRequired
                    value={{
                    Id: outcome.SharedPlanningId
                }}/> {error && error.SharedPlanningId && <div className="error alert alert-danger">{error.SharedPlanningId}</div>}
            </div>
            <div className="row">
                <label htmlFor={"lifeArea_" + index}>Life Area</label>
                <input
                    id={"outcome_lifeArea"}
                    type="text"
                    value={outcome.LifeArea && outcome.LifeArea.UniqueAttribute && outcome.LifeArea.UniqueAttribute.Description}
                    readOnly="readonly"
                    className="readonly"/> {error && error.LifeArea && <div className="error alert alert-danger">{error.LifeArea}</div>}
            </div>
            <div className="row">
                <label htmlFor={"noLongerNeed_" + index}>I no longer want/need supports when...</label>
                <input
                    id={"noLongerNeed_" + index}
                    type="text"
                    value={outcome.WhenNoLongerNeedSupport}
                    readOnly="readonly"
                    className="readonly"/>
            </div>
            <div className="row">
                <label htmlFor={'startDate_' + index}>Start Date</label>
                <input
                    id={'startDate_' + index}
                    type="text"
                    value={formatJsonDate(outcome.StartDate)}
                    readOnly="readonly"
                    className="readonly"/>
            </div>
            <div className="row">
                <label htmlFor={"endDate_" + index}>End Date</label>
                <input
                    id={"endDate_" + index}
                    type="text"
                    value={formatJsonDate(outcome.EndDate)}
                    readOnly="readonly"
                    className="readonly"/>
            </div>
        </div>;
    }

    prepareForm(allowCustomized, outcome) {
        if (allowCustomized && !outcome.IsNew) {
            return this.customizedForm();
        } else {
            return this.chooseForm();
        }
    }

    render() {
        return this.prepareForm(this.props.allowCustomized, this.props.outcome);
    }
}

OutcomeForm.propTypes = {
    index: PropTypes.number,
    sharedPlannings: PropTypes.array,
    sharedPlanningOptions: PropTypes.array,
    outcome: PropTypes.object,
    outcomeChange: PropTypes.func,
    error: PropTypes.object,
    lifeAreas: PropTypes.array,
    allowCustomized: PropTypes.bool
};

export default OutcomeForm;
