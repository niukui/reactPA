import React, {PropTypes} from 'react';
import {selectListItemsForDropdown} from 'utils/dropdownTransformer';
import DatePicker from 'components/Common/DatePicker';
import moment from 'moment';
import DropdownList from 'components/Common/DropdownList';
import AuthorizedLink from 'components/Common/links/AuthorizedLink';
import RequiredIndicator from 'components/Common/RequiredIndicator';

const IspOverviewEdit = ({entityData, onChangeForm, metadata, ispTypes, saveOverview}) => 
(
  <div role="presentation" className="workspace p-client-layout">
    <div className="selection-summaryinfo">
      <div role="presentation">
        <button
          className="leftNav-dropDownButton hide-for-print"
          title="left navigation menu trigger for small screens"
          aria-hidden="true">
          <span className="icon-reorder " id="menuIcon"></span>
        </button>
        <h3>Individual Support Plan - Edit</h3>
        <div aria-label="Edit" className="new-form">
          <span>Edit</span>
        </div>
        <div className="workspace-header-bar">
          <div className="float-left">
            <AuthorizedLink
              prefix={metadata && metadata.Options && metadata.Options.Prefix}
              to={{
              pathname: 'summary',
              query: {
                ispId: entityData.Id,
                clientId: entityData.ClientId,
                moduleName: metadata.Name
              }
            }}
              text="Back to Summary"/>
          </div>
          <div className="float-right">
            <button
              onClick={(evt) => {
              saveOverview(entityData,metadata);
            }}
              type="submit"
              title="Save Changes">Save</button>
          </div>
        </div>
      </div>
    </div>

    <div className="workspace-content-container reactWorkspace">
      <form>
        <div className="genericform-style">
          <h4>Service Detail Information</h4>
          <fieldset className="fieldset-container-one">
            <legend className="legend-header-one">Overview</legend>
            <div className="row">
            <label className='complete-required' htmlFor={`${metadata.Name}.IndividualSupportPlanType`}>ISP Type:
              <RequiredIndicator />
            </label>
             <DropdownList
              name={`${metadata.Name}.IndividualSupportPlanType`}
              defaultOption="Select Type"
              onChange={onChangeForm}
              value={entityData.IndividualSupportPlanType}
              options={selectListItemsForDropdown(ispTypes || [])}
              saveRequired />
            </div>
            <div className="row">
              <label className="">Effective Date:</label>    
              <DatePicker
                  value={entityData.EffectiveDateRange.StartDate}
                  onChange={onChangeForm}
                  name={`${metadata.Name}.EffectiveDateRange.StartDate`}/>
            </div>

            <div className="row">
              <label className="">End Date:</label>              
              <DatePicker
                  value={entityData.EffectiveDateRange.EndDate}
                  onChange={onChangeForm}
                  name={`${metadata.Name}.EffectiveDateRange.EndDate`}/>
            </div>

            <div className="row">
              <label className="">Comments:</label>
              <textarea
                className="comments-textarea"
                cols="20"
                name={`${metadata.Name}.Comments`}
                rows="2"
                onChange={onChangeForm} maxLength="2000">{entityData.Comments}</textarea>
            </div>
          </fieldset>
         
        </div>
      </form>
    </div>
  </div>
);

IspOverviewEdit.propTypes = {
  entityData: PropTypes.object.isRequired,
  ispTypes : PropTypes.array,
  onChangeForm: PropTypes.func.isRequired,
  saveOverview: PropTypes.func.isRequired,
  metadata: PropTypes.object,
};

export default IspOverviewEdit;
