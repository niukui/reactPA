import React, { PropTypes } from 'react';
import { formatJsonDate } from 'utils/dateHelper';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import DropdownList from 'components/Common/DropdownList';

const IspOverviewDetails = ({ entityData, metadata, workflowStatus}) => (
  <div>
    <fieldset className="fieldset-container-one">
      <legend className="legend-header-one">Details</legend>
      <div className="row">
        <div className="column-left">
          <div className="row summary">
            <span className="label">Setting:</span>
        
          </div>
          <div className="row summary">
            <span className="label">Create Date:</span>
            <span className="data-element">
              <span className="display-date data-element">{formatJsonDate(entityData.Stamp.CreatedTimeStamp)}</span>
            </span>
          </div>
        </div>
        
        <div className="column-right">
          <div className="row summary">
            <span className="label">Status:</span>
            <span className="data-element">{workflowStatus.DisplayName}</span>
          </div>
        </div>  
        
      </div>
    </fieldset>

    <fieldset className="fieldset-container-one">
      <legend className="legend-header-one">Overview</legend>
      <div className="row">
        <label className="complete-required" htmlFor="entityData.IndividualSupportPlanType.Name">Plan of Care:
          <RequiredIndicator />
        </label>
        <input
          name="entityData.IndividualSupportPlanType.Name"
          id="entityData.IndividualSupportPlanType.Name"
          className="readonly textbox-medium"
          readOnly="readOnly"
          type="text"
          value={entityData.IndividualSupportPlanType && entityData.IndividualSupportPlanType.Name}
        />
      </div>
      <div className="row">
        <label className="complete-required" htmlFor="EffectiveDateRange.StartDate">Effective Date:
        </label>
        <input
          id="EffectiveDateRange.StartDate"
          className="date dateUS readonly"
          readOnly="readOnly"
          type="text"
          value={formatJsonDate(entityData.EffectiveDateRange.StartDate)}
        />
      </div>
      <div className="row">
        <label className="complete-required" htmlFor="EffectiveDateRange.EndDate">End Date:
        </label>
        <input
          className="date dateUS readonly"
          readOnly="readOnly"
          type="text"
          id="EffectiveDateRange.EndDate"
          name="EffectiveDateRange.EndDate"
          value={formatJsonDate(entityData.EffectiveDateRange.EndDate)}
        />
      </div>
      <div className="row">
        <label htmlFor="Comments_overview">Comments:</label>
        <textarea
          className="comments-textarea readonly"
          cols="20"
          readOnly="readOnly"
          rows="2"
          value={entityData.Comments || ""}
          name="Comments"
          id="Comments_overview"
          maxLength="2000">
        </textarea>
      </div>
    </fieldset>
    </div>
);

IspOverviewDetails.propTypes = {
  entityData: PropTypes.object.isRequired,
  metadata: PropTypes.object,
  workflowStatus : PropTypes.object.isRequired
};

export default IspOverviewDetails;
