import React, { PropTypes } from 'react';
import moment from 'moment';
import { selectListItemsForDropdown, selectListItemsForMultiSelect } from 'utils/dropdownTransformer';
import DropdownList from 'components/Common/DropdownList';
import DatePicker from 'components/Common/DatePicker';
import Multiselect from 'components/Common/Multiselect';
import TextInput from 'components/Common/TextInput';
import { ISP_WORKFLOW_STATUS } from 'utils/constants';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import * as aclHelper from 'utils/aclHelper';

const SharedPlanningForm = ({
    sharedPlanning,
    lifeAreas,
    supportTypes,
    assignedProviders,
    onChangeForm,
    errors,
    securityContext
}) => {
    const saveRequired = true;
    const canManage = aclHelper.canManage(securityContext, 'SharedPlannings');
    if (canManage === false) {
       return null;
    }
    return (
        <div>
            <fieldset className="fieldset-container-one">
                <legend className="legend-header-one">Edit Shared Planning</legend>
                <div className="row">
                    <label
                        className={saveRequired
                            ? 'complete-required'
                            : ''}
                        htmlFor="LifeArea">Life Area:{saveRequired
                            ? <RequiredIndicator />
                            : null}
                    </label>
                    <DropdownList
                        name="LifeArea"
                        defaultOption="Select Type"
                        onChange={onChangeForm}
                        value={sharedPlanning.LifeArea}
                        options={selectListItemsForDropdown(lifeAreas || [])}
                        saveRequired /> {errors.LifeArea && <div className="error alert alert-danger">{errors.LifeArea}</div>}
                </div>

                <TextInput
                    name="DesiredOutcome"
                    label="Desired Outcome:"
                    onChange={onChangeForm}
                    value={sharedPlanning.DesiredOutcome || ""}
                    error={errors.DesiredOutcome}
                    saveRequired />

                <TextInput
                    name="WhenNoLongerNeedSupport"
                    label="I no longer want/need support when:"
                    onChange={onChangeForm}
                    value={sharedPlanning.WhenNoLongerNeedSupport || ""}
                    error={errors.WhenNoLongerNeedSupport}
                    saveRequired />
                <div className="row">
                    <label
                        className={saveRequired
                            ? <RequiredIndicator />
                            : null}
                        htmlFor="SupportType">Types of Support:{saveRequired
                            ? <RequiredIndicator />
                            : null
                        }</label>
                    <DropdownList
                        name="SupportType"
                        defaultOption="Select Type"
                        onChange={onChangeForm}
                        value={sharedPlanning.SupportType}
                        error={errors.SupportType}
                        options={selectListItemsForDropdown(supportTypes || [])}
                        saveRequired /> {errors.SupportType && <div className="error alert alert-danger">{errors.SupportType}</div>}
                </div>
                {sharedPlanning.IsEligibilityBased
                    ? [<div className="row" key='0'>
                        <label className="" htmlFor="AttachedProviderIds">Support Providers:</label>
                        <Multiselect
                            value={sharedPlanning.AttachedProviderIds}
                            options={selectListItemsForMultiSelect(assignedProviders || [], 'Id', 'Name')}
                            onChange={onChangeForm}
                            name='AttachedProviderIds'
                            id='AttachedProviderIds' />
                    </div>,
                    <div className="row" key='1'>
                        <label className="" htmlFor="NaturalSupport">Natural Support:</label>
                        <input
                            id="NaturalSupport"
                            type="text"
                            name="NaturalSupport"
                            onChange={onChangeForm}
                            value={sharedPlanning.NaturalSupport || ""}
                            maxLength="2000" />
                    </div>]
                    : <div className="row">
                        <label className="" htmlFor="SupportProviderName">Goal Owner:</label>
                        <input
                            id="SupportProviderName"
                            type="text"
                            name="SupportProviderName"
                            onChange={onChangeForm}
                            value={sharedPlanning.SupportProviderName || ""}
                            maxLength="2000" />
                    </div>}

                <div className="row">
                    <label className="" htmlFor='StartDate'>Start Date:{saveRequired
                        ? <RequiredIndicator />
                        : null
                    }</label>
                    <DatePicker
                        saveRequired
                        className="required"
                        id='StartDate'
                        value={sharedPlanning.StartDate}
                        onChange={onChangeForm}
                        error={errors.StartDate}
                        name="StartDate" />{errors.StartDate && <div className="error alert alert-danger">{errors.StartDate}</div>}
                </div>

                <div className="row">
                    <label className="" htmlFor="EndDate">End Date:{saveRequired
                        ? <RequiredIndicator />
                        : null
                    }</label>
                    <DatePicker
                        saveRequired
                        className="required"
                        id="EndDate"
                        value={sharedPlanning.EndDate}
                        onChange={onChangeForm}
                        error={errors.EndDate}
                        name="EndDate" />{errors.EndDate && <div className="error alert alert-danger">{errors.EndDate}</div>}
                </div>
            </fieldset>
        </div>
    );
};

SharedPlanningForm.propTypes = {
    sharedPlanning: PropTypes.object.isRequired,
    securityContext: PropTypes.object.isRequired,
    lifeAreas: PropTypes.array,
    supportTypes: PropTypes.array,
    assignedProviders: PropTypes.array,
    onChangeForm: PropTypes.func,
    errors: PropTypes.object

};

export default SharedPlanningForm;