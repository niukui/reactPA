import React, {PropTypes} from 'react';
import SpServiceEdit from './SpServiceEdit';

const tableStyles = {
  fontSize: '100%'
};

const leftBorder = {
  borderLeft: '1px solid #e5e5e5'
};

const textCenter = {
  textAlign: 'center',
  padding: '10px 0'
};

const SpServiceList = ({
  spBudgets,
  spServices,
  serviceSelectList,
  onDelete,
  onSave,
  canEdit,
  canDelete,
  onSaveBudgets
}) => (
  <table className="table supportsPackageTable">
    <thead>
      <tr>
        <th rowSpan="2" style={textCenter}>Service</th>
        <th colSpan="2">Level One</th>
        <th colSpan="2">Level Two</th>
        <th colSpan="2">Level Three</th>
        <th colSpan="2">Level Four</th>
        <th colSpan="2">Level Five</th>
        <th colSpan="2">Level Six</th>
        <th colSpan="2">Level Seven</th>
        <th rowSpan="2" className="actions">Actions</th>
      </tr>
      <tr>
        <th title='Total Projected By Model Hours'>Ttl Hrs</th>
        <th>Rate</th>
        <th title='Total Projected By Model Hours'>Ttl Hrs</th>
        <th>Rate</th>
        <th title='Total Projected By Model Hours'>Ttl Hrs</th>
        <th>Rate</th>
        <th title='Total Projected By Model Hours'>Ttl Hrs</th>
        <th>Rate</th>
        <th title='Total Projected By Model Hours'>Ttl Hrs</th>
        <th>Rate</th>
        <th title='Total Projected By Model Hours'>Ttl Hrs</th>
        <th>Rate</th>
        <th title='Total Projected By Model Hours'>Ttl Hrs</th>
        <th>Rate</th>
      </tr>
    </thead>
    <tbody>
      {spServices.length <= 0
        ? <tr>
            <td colSpan="16" style={tableStyles} className="text-center">No data available in table.</td>
          </tr>
        : spServices.map((service) => <tr key={service.Id}>
          <td style={tableStyles}>{service.Name}</td>
          {service && service.ServiceDetails && service
            .ServiceDetails
            .map((detail) => {
              return ([< td style = {
                  Object.assign({}, tableStyles, leftBorder)
                }
                key = {
                  detail.Level + '.Hr'
                } > {
                  detail.TotalProjectedByModelHours
                } </td>,
                  <td style={tableStyles}>{detail.Rate}</td >])
            })}
          <td style={Object.assign({}, tableStyles, leftBorder)}>
            {canEdit && <SpServiceEdit
              title="Edit"
              onFinish=
              {() => {}}
              spService={service}
              onSave={onSave}
              canSelectService={canDelete}
              serviceSelectList={serviceSelectList}/>
}
            {canDelete && <a
              onClick={(e) => {
              e.preventDefault();
              onDelete(service.Id);
            }}
              title="Delete">Delete</a>}
          </td>
        </tr>)
}

      <tr>
        <td style={tableStyles} className="text-center">Total Dollar Amounts</td>
        {spBudgets.map((budget) => {
          return (
            <td colSpan="2" className="text-center">{budget.TotalDollarAmount}</td>
          )
        })
}
        <td style={Object.assign({}, tableStyles, leftBorder)}>
        </td>
      </tr>
    </tbody>
  </table>
);

SpServiceList.propTypes = {
  spServices: PropTypes.array.isRequired,
  serviceSelectList: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onSave: PropTypes.func,
  onSaveBudgets: PropTypes.func,
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool
};

export default SpServiceList;
