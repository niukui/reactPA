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

const IspPart3List = ({
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
      <caption className="caption-header">
        <span>Plannings</span>
      </caption>
      <thead>
        <tr>
          <th>No.</th>
          <th>Life Area</th>
          <th>Desired Outcome</th>
          <th>I no longer want/need support when...</th>
          <th>Types of Support</th>
          <th>Goal Owner</th>
          <th>Start date</th>
          <th>End Date</th>
          <th>Status</th>
          {noActions
            ? null
            : <th className="actions">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {sharedPlannings.map((sharedPlanning, index) => (
          <tr key={index}>
            <td>{sharedPlanning.LineNumber}</td>
            <td>{sharedPlanning.LifeArea.Name}</td>
            <td>{sharedPlanning.DesiredOutcome}</td>
            <td>{sharedPlanning.WhenNoLongerNeedSupport}</td>
            <td>{sharedPlanning.SupportType.Name}</td>
            <td>{getProviderNames(sharedPlanning, assignedProviders)}</td>
            <td>{formatJsonDate(sharedPlanning.StartDate)}</td>
            <td>{formatJsonDate(sharedPlanning.EndDate)}</td>
            <td>{sharedPlanning.Status}</td>
            {noActions
              ? null
              : <td>
                {editingItemId === sharedPlanning.Id
                  ? <span>
                      <span className="icon-pencil"></span>
                      <b>Editing...</b>
                    </span>
                  : sharedPlanning.Status === sharedPlanningStatus.Discarded
                    ? null
                    : (sharedPlanning.Status === sharedPlanningStatus.Completed
                      ? (sharedPlanning.AttachedProviderIds.length === 0 && canDelete
                        ? <span>
                            <a
                              onClick={(e) => {
                              onClickDelete(e, sharedPlanning);
                            }}
                              title="Permanently delete this item">Delete</a>
                          </span>
                        : <span>
                            {canEdit && <a
                            onClick={(e) => {
                            onClickEdit(e, sharedPlanning);
                            }}
                            title="Edit this item">Edit</a>} 
                          </span>)
                      : <span>
                        {canEdit && <a
                          onClick={(e) => {
                          onClickEdit(e, sharedPlanning);
                        }}
                          title="Edit this item">Edit</a>}
                        {canDelete && <a
                          onClick={(e) => {
                          onClickDelete(e, sharedPlanning);
                        }}
                          title="Permanently delete this item">Delete</a>}
                      </span>)
}
              </td>
}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

IspPart3List.propTypes = {
  sharedPlannings: PropTypes.array.isRequired,
  noActions: PropTypes.bool,
  securityContext: PropTypes.object.isRequired,
  onClickEdit:PropTypes.func,
  onClickDelete: PropTypes.func,
  editingItemId: PropTypes.string,
  assignedProviders: PropTypes.array
};

export default IspPart3List;
