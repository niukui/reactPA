import React, {PropTypes} from 'react';

const ProvidersDetails = ({entityData, onDelete, canEdit}) => (
  <table className="table">
    <thead>
      <tr>
        <th>Provider Name</th>
        <th>Provider NPI</th>
        <th>Provider Address</th>
        <th>Phone</th>
        <th className="actions">Actions</th>
      </tr>
    </thead>
    <tbody>
      {entityData
        .AssignedProviders
        .map((provider) => <tr key={provider.Id}>
          <td>{provider.Name}</td>
          <td>{provider.Npi}</td>
          <td>{provider.Address && provider.Address.FullAddress}</td>
          <td>{provider.ContactPhone && provider.ContactPhone.Number}</td>
          <td>
            {canEdit && <a
              onClick={(e) => {
              e.preventDefault();
              onDelete(provider.Id, entityData);
            }}
              title="Delete">Delete</a>}
          </td>
        </tr>)}
    </tbody>
  </table>
);

ProvidersDetails.propTypes = {
  entityData: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  canEdit: PropTypes.bool
};

export default ProvidersDetails;
