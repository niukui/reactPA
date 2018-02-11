import React, {PropTypes} from 'react';
import {formatJsonDateTime, formatJsonDate} from 'utils/dateHelper';
import * as aclHelper from 'utils/aclHelper';
import  {SUPPORT_TYPE_IDS} from 'utils/constants'
import {sortBy} from 'lodash';

export const sharedPlanningStatus = {
    InProgress: "In Progress",
    Discarded: "Discarded",
    Completed: "Completed"
  };

  const SharnPlaningList = ({
    sharedPlannings,
    onClickEdit,
    onClickDelete,
    noActions,
    editingItemId,
    assignedProviders,
    securityContext
  }) => {
    const getProviderNames = (sharedPlanning, assignedProviders) => {
      if (sharedPlanning.SupportType.Id === SUPPORT_TYPE_IDS.eligibilityBased) {
        let providerNames = [];
        sharedPlanning
          .AttachedProviderIds && sharedPlanning
          .AttachedProviderIds
          .map((id) => {
            var provider = assignedProviders.find(x => x.Id === id);
            if (provider && provider.Name) {
              providerNames.push(provider.Name);
            }
          });
        return providerNames.join();
  
      } else {
        return sharedPlanning.SupportProviderName;
      }
      
    };
    sharedPlannings=sortBy(sharedPlannings,"LineNumber");
    const canDelete = ((securityContext) => {
      return aclHelper.canDelete(securityContext, "SharedPlannings");
     })(securityContext);
  
    const canEdit = ((securityContext) => {
      return aclHelper.canEdit(securityContext, "SharedPlannings");
     })(securityContext);
  
  
    return (
      <table className="generalTable">
        <thead>
          <tr>
            <th>CAP</th>
            <th>Priority</th>
            <th>Date Initiated</th>
            <th>Date Next Review</th>
            <th>Date Closed</th>            
            {noActions
              ? null
              : <th className="actions">Actions</th>}
          </tr>
        </thead>
        
        
      </table>
    );
  };
  
  SharnPlaningList.propTypes = {
    sharedPlannings: PropTypes.array.isRequired,
    noActions: PropTypes.bool,
    securityContext: PropTypes.object.isRequired,
    onClickEdit:PropTypes.func,
    onClickDelete: PropTypes.func,
    editingItemId: PropTypes.string,
    assignedProviders: PropTypes.array
  };
  
  export default SharnPlaningList;