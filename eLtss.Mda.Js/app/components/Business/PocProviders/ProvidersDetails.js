import React, {PropTypes} from 'react';

const ProvidersDetails = ({providerSearchResults,onSelectProvider}) => (
  <div className="providerSearchTableWrapper">
    <table className="generalTable">
      <thead>
        <tr>
          <th className="actions">Action</th>
          <th>MCO Provider Number</th>
          <th>Network ID</th>
          <th>Provider NPI/API</th>
          <th>Wheelchair Accessible</th>
          <th>Provider Name</th>
          <th>Provider Types</th>
          <th>Specialty Codes</th>
          <th>Location ID</th>
          <th>Service Address</th>
          <th>PAR</th>
        </tr>
      </thead>
      <tbody>
        {providerSearchResults && providerSearchResults.length === 0
            ? <tr>
                    <td colSpan="11" className="dataTables_empty">No data available</td>
                </tr>
            : providerSearchResults && providerSearchResults.map((provider, index) => (
                <tr key={index}>
                    <td>
                        <span>
                            <a
                                onClick={(e) => {
                                e.preventDefault();
                                onSelectProvider(provider);
                            }}
                                title="Select">Select</a>
                        </span>
                    </td>
                    <td>{provider.ProviderNumber}</td>
                    <td>{provider.NetworkId}</td>
                    <td>{provider.Npi}</td>
                    <td>{provider.WheelchairAccessible==null?'':provider.WheelchairAccessible?'Yes':'No'}</td>
                    <td>{provider.ProviderName?provider.ProviderName:(provider.ProviderFirstName
                        ? provider.ProviderFirstName + " " + provider.ProviderLastNameOrBusinessName
                        :provider.ProviderLastNameOrBusinessName )}
                    </td>
                    <td>{provider.ProvierTypeCodes}</td>
                    <td>{provider.PrimarySpecialtyCode}</td>
                    <td>{provider.LegacyLocationId}</td>
                    <td>{provider.ServiceAddress.FullAddress}</td>
                    <td>{provider.Par==null?'':provider.Par?'Yes':'No'}</td>
                </tr>
            ))}
    </tbody>
    </table>
  </div>
);

ProvidersDetails.propTypes = {
    onSelectProvider: PropTypes.func,
    providerSearchResults: PropTypes.array
};

export default ProvidersDetails;
