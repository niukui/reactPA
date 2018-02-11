import React, { PropTypes } from 'react';
import AuthorizedLink from 'components/Common/links/AuthorizedLink';
import { formatJsonDate } from 'utils/dateHelper';

const IspPart5List = ({ plans, parentDataId, clientId,metadata }) => {

    return (
        <table className="generalTable">
            <caption className="caption-header">
                <span>Plans</span>
            </caption>
            <thead>
                <tr>
                    <th>Provider</th>
                    <th>NPI</th>
                    <th>Create Date</th>
                    <th>Service</th>
                    <th>Outcomes</th>
                    <th>Status</th>
                    <th>Active</th>
                    <th className="actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                {(plans || []).map((plan, index) => (
                    <tr key={index}>
                        <td>{plan.ProviderName}</td>
                        <td>{plan.Npi}</td>
                        <td>{formatJsonDate(plan.Stamp.CreatedTimeStamp)}</td>
                        <td>{plan.ServiceName}</td>
                        <td>{plan.OutcomeLineNumbers}</td>
                        <td>{plan.WorkflowStatus.DisplayName}</td>
                        <td>{plan.Active}</td>
                        <td>
                            <AuthorizedLink
                                text="View"
                                prefix={metadata.Options.Prefix}
                                to={{
                                    pathname: 'ispPart5Summary',
                                    query: {
                                        parentDataId: parentDataId,
                                        clientId: clientId,
                                        dataId: plan.Id,
                                        moduleName: 'PlanForSupport'
                                    }
                                }}
                                activeClassName="active" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

IspPart5List.propTypes = {
    plans: PropTypes.array,
    parentDataId: PropTypes.string,
    clientId: PropTypes.string,
    metadata: PropTypes.object,
};

export default IspPart5List;
