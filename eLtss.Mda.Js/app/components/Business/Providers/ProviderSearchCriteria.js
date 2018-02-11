import React, {PropTypes} from 'react';
import moment from 'moment';
import {selectListItemsForDropdown, selectListItemsForMultiSelect} from 'utils/dropdownTransformer';
import DropdownList from 'components/Common/DropdownList';
import DatePicker from 'components/Common/DatePicker';
import Multiselect from 'components/Common/Multiselect';
import TextInput from 'components/Common/TextInput';

const ProviderSearchCriteria = ({
  providerTypes,
  providerSourceInfos,
  providerSpecialtyCodes,
  lxServices,
  searchCriteria,
  onChangeForm
}) => {
  return (

    <fieldset className="fieldset-container-one">
      <legend className="legend-header-one">Search Details</legend>
      <TextInput
        name="ProviderName"
        label="Provider Name:"
        stackedInput
        onChange={onChangeForm}
        value={searchCriteria.ProviderName || ""}
        saveRequired={false}/>

      <TextInput
        name="NpiApi"
        label="NPI/API:"
        stackedInput
        onChange={onChangeForm}
        value={searchCriteria.NpiApi || ""}
        saveRequired={false}/>

      <TextInput
        name="TaxIdentifier"
        label="Tax Identifier:"
        stackedInput
        onChange={onChangeForm}
        value={searchCriteria.TaxIdentifier || ""}
        saveRequired={false}/>

      <TextInput
        name="ProviderNumber"
        stackedInput
        label="VAMMIS Provider Number:"
        onChange={onChangeForm}
        value={searchCriteria.ProviderNumber || ""}
        saveRequired={false}/>

      <div className="row stacked">
        <label className={''} htmlFor="SourceInfo">Source Info:</label>
        <DropdownList
          name="SourceInfo"
          onChange={onChangeForm}
          value={searchCriteria.SourceInfo}
          options={selectListItemsForDropdown(providerSourceInfos || [])}
          saveRequired={false}/>
      </div>

      <div className="row stacked">
        <label className={''} htmlFor="ProviderType">Provider Type:</label>
        <DropdownList
          name="ProviderType"
          onChange={onChangeForm}
          value={searchCriteria.ProviderType}
          options={selectListItemsForDropdown(providerTypes || [])}
          saveRequired={false}/>
      </div>

      <div className="row stacked">
        <label className={''} htmlFor="ProviderSpecialtyCode">Provider Specialty Code:</label>
        <DropdownList
          name="ProviderSpecialtyCode"
          onChange={onChangeForm}
          value={searchCriteria.ProviderSpecialtyCode}
          options={selectListItemsForDropdown(providerSpecialtyCodes || [])}
          saveRequired={false}/>
      </div>

      <div className="row stacked">
        <label className={''} htmlFor="ServiceOffered">Service Offered:</label>
        <DropdownList
          name="ServiceOffered"
          onChange={onChangeForm}
          value={searchCriteria.ServiceOffered}
          options={selectListItemsForDropdown(lxServices || [])}
          saveRequired={false}/>
      </div>

    </fieldset>

  );
};

ProviderSearchCriteria.propTypes = {
  providerTypes: PropTypes.array,
  providerSourceInfos: PropTypes.array,
  providerSpecialtyCodes: PropTypes.array,
  lxServices: PropTypes.array,
  searchCriteria: PropTypes.object.isRequired,
  onChangeForm: PropTypes.func.isRequired
};

export default ProviderSearchCriteria;