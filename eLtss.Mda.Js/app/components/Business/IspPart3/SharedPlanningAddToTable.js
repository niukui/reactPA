import React, {PropTypes} from 'react';
import IspPart3List from './IspPart3List';
import {ISP_WORKFLOW_STATUS} from 'utils/constants';
import * as aclHelper from 'utils/aclHelper';

const SharedPlanningAddToTable = ({
    sharedPlannings,
    sharedPlanning,
    onClickCreate,
    onClickUpdate,
    onClickCancel,
    onClickEdit,
    onClickDelete,
    underEditing,
    assignedProviders,
    securityContext
}) => {
    const renderActions = (sharedPlanning, underEditing,securityContext) => {
      if(underEditing)
      {
        return (<div>
                  <span className="addTo-button">
                      <a onClick={(e) => {onClickUpdate(e, sharedPlanning);}}
                          role="button">Save Changes</a>
                      </span>
                      <span className="CancelEdit-link">
                          <a onClick={(e) => {onClickCancel(e, sharedPlanning);}}
                              role="button">Cancel</a>
                      </span>
                  </div>
            );
        }
        else{
          const canAdd=aclHelper.canAdd(securityContext,"SharedPlannings");
          if(canAdd===false)
          {
            return null;
          }
          return (<span className="addTo-button"><a onClick={(e) => {onClickCreate(e, sharedPlanning);}}
                      role="button">Add Planning</a></span>);
        }
    };

    return (
        <div className="add-to-table">
            <div className="center">
                {renderActions(sharedPlanning, underEditing,securityContext)}
            </div>
            <IspPart3List
                sharedPlannings={sharedPlannings || []}
                onClickEdit={onClickEdit}
                onClickDelete={onClickDelete}
                editingItemId={sharedPlanning.Id}
                assignedProviders={assignedProviders}
                securityContext={securityContext}/>
        </div>
    );
};

SharedPlanningAddToTable.propTypes = {
    sharedPlanning: PropTypes.object.isRequired,
    securityContext: PropTypes.object.isRequired,
    sharedPlannings: PropTypes.array,
    onClickCreate: PropTypes.func,
    onClickUpdate: PropTypes.func,
    onClickCancel: PropTypes.func,
    onClickEdit: PropTypes.func,
    onClickDelete: PropTypes.func,
    underEditing: PropTypes.bool,
    assignedProviders: PropTypes.array
};

export default SharedPlanningAddToTable;