import React, {PropTypes} from 'react';
import {formatJsonDate} from 'utils/dateHelper';
import RequiredIndicator from 'components/Common/RequiredIndicator';

const activityTableTd = {
    "wordWrap": "break-word",
    "overflowWrap": "break-word",
};
const activityTableTh = {
    "width": "28%",
};

const ServiceAndOutcomesViewer = ({data}) => {
    const planForSupport = (data && data.PlanForSupport) || {};
    const noBottomMargin = {
        marginBottom: 0
    };
    
    const renderOutcomes = (serviceAndOutcomes) => {
        return (serviceAndOutcomes || []).map((outcome, index) => (
            <fieldset key={outcome.Id} className="fieldset-container-four">
                <legend className="legend-header-four">Service and Outcome #{index + 1}</legend>
                <div className="row">
                    <label htmlFor={"outcome_desiredOutcome_" + index}>Desired Outcome<RequiredIndicator /></label>
                    <input
                        id={"outcome_desiredOutcome_" + index}
                        type="text"
                        value={outcome.DesiredOutcome}
                        readOnly="readonly"
                        className="readonly"/>
                </div>
                <div className="row">
                    <label htmlFor="outcome_lifeArea">Life Area<RequiredIndicator /></label>
                    <input
                        id={"outcome_lifeArea"}
                        type="text"
                        value={(outcome.LifeArea && outcome.LifeArea.UniqueAttribute && outcome.LifeArea.UniqueAttribute.Description) || ''}
                        readOnly="readonly"
                        className="readonly"/>
                </div>
                <div className="row">
                    <label htmlFor={'noLongerNeed_' + index}>I no longer want/needs supports when...<RequiredIndicator /></label>
                    <input
                        id={'noLongerNeed_' + index}
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
                    <label htmlFor={'endDate_' + index}>End Date</label>
                    <input
                        id={'endDate_' + index}
                        type="text"
                        value={formatJsonDate(outcome.EndDate)}
                        readOnly="readonly"
                        className="readonly"/>
                </div>

                <div className="row" style={noBottomMargin}>
                    <table 
                        style={{
                        "tableLayout": "fixed",
                        "display":"table"
                    }}
                    className="generalTable">
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
                            </tr>
                        </thead>
                        <tbody>
                            {(outcome.SupportActivities || []).map((activity,index) => (
                                <tr key={index}>
                                    <td style={activityTableTd}>{activity.SupportActivityName}</td>
                                    <td style={activityTableTd}>{activity.WhenNoLongerNeedSupport}</td>
                                    <td style={activityTableTd}>{activity.WhatToRecord}</td>
                                    <td>{activity.HowOften}</td>
                                    <td style={{"width":"80px"}}>{formatJsonDate(activity.ByWhen)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </fieldset>
        ));
    };

    return (
        <fieldset className="fieldset-container-one">
            <legend className="legend-header-one">Overview</legend>
            <div className="row">
                <label htmlFor="effectiveDate">Effective Date<RequiredIndicator /></label>
                <input
                    id="effectiveDate"
                    type="text"
                    value={formatJsonDate(planForSupport.EffectiveDate)}
                    readOnly="readonly"
                    className="readonly"/>
            </div>
            <div className="row">
                <label htmlFor="outcome_Provider">Provider</label>
                <input
                    id="outcome_Provider"
                    type="text"
                    value={planForSupport.ProviderName}
                    readOnly="readonly"
                    className="readonly"/>
            </div>
            <div className="row">
                <label htmlFor="outcome_ServiceName">Service<RequiredIndicator /></label>
                <input
                    id="outcome_ServiceName"
                    type="text"
                    value={planForSupport.ServiceName}
                    readOnly="readonly"
                    className="readonly"/>
            </div>
            <div className="row">
                <label htmlFor="outcome_Comment">Comment</label>
                <textarea
                    id="outcome_Comment"
                    value={planForSupport.ServiceAndOutcomesComment || ''}
                    className="comments-textarea readonly"
                    readOnly="readonly"/>
            </div>
            {renderOutcomes(planForSupport.ServiceOutcomes)}
        </fieldset>
    );
};
ServiceAndOutcomesViewer.propTypes = {
    data: PropTypes.object
};

export default ServiceAndOutcomesViewer;