import React, {PropTypes} from 'react';
import moment from 'moment';
import {selectListItemsForDropdown, selectListItemsForMultiSelect} from 'utils/dropdownTransformer';
import DropdownList from 'components/Common/DropdownList';
import DatePicker from 'components/Common/DatePicker';
import Multiselect from 'components/Common/Multiselect';
import TextInput from 'components/Common/TextInput';

const ProviderSearchCriteria = ({
  searchCriteria,
  onChangeForm,
  providerSearchCriteriaData
}) => {
  return (
    <fieldset className="fieldset-container-one">
      <legend className="legend-header-one">Search Details</legend>
      <TextInput
        name="ProviderName"
        label="Provider Name:"
        stackedInput
        onChange={onChangeForm}
        value={searchCriteria.ProviderName||"" }
        saveRequired={false}/>

    <TextInput
        name="NetworkId"
        label="Network ID:"
        stackedInput
        onChange={onChangeForm}
        value={searchCriteria.NetworkId||""}
        saveRequired={false}/>

        <TextInput
        name="NationalProviderIdentification"
        label="NPI/API:"
        stackedInput
        onChange={onChangeForm}
        value={searchCriteria.NationalProviderIdentification||""}
        saveRequired={false}/>
        
      <div className="row stacked">
        <label className={''} htmlFor="AtypicalProvider">Atypical Provider:</label>
        <DropdownList
          name="AtypicalProvider"
          id="AtypicalProvider"
          onChange={onChangeForm}
          value={searchCriteria.AtypicalProvider}
          options={selectListItemsForDropdown(providerSearchCriteriaData.yesNoOptions || [])}
          saveRequired={false}/>
      </div>

      <TextInput
        name="ProviderNumber"
        label="MCO Provider Number:"
        stackedInput
        onChange={onChangeForm}
        value={searchCriteria.ProviderNumber||""}
        saveRequired={false}/>

      <div className="row stacked">
        <label className="" for="EffectiveDateInNetwork">Effective Date In Network:</label>    
        <DatePicker
            value={searchCriteria.EffectiveDateInNetwork}
            onChange={onChangeForm}
            name="EffectiveDateInNetwork"/>
      </div>

      <div className="row stacked">
        <label className="" htmlFor="NoLongerInNetwork">No Longer In Network:</label>    
        <DatePicker
            value={searchCriteria.NoLongerInNetwork}
            onChange={onChangeForm}
            name="NoLongerInNetwork"
            id="NoLongerInNetwork"/>
      </div>

      <div className="row stacked">
        <label className={''} htmlFor="ProviderType">Provider Type:</label>
        <DropdownList
          name="ServiceProviderTypeId"
          id="ProviderType"
          onChange={onChangeForm}
          value={searchCriteria.ServiceProviderTypeId}
          options={selectListItemsForDropdown(providerSearchCriteriaData.providerTypes || [])}
          saveRequired={false}/>
      </div>

      <div className="row stacked">
        <label className={''} htmlFor="ProviderSpecialtyCodeId">Provider Specialty Code:</label>
        <DropdownList
          name="ProviderSpecialtyCodeId"
          id="ProviderSpecialtyCodeId"
          onChange={onChangeForm}
          value={searchCriteria.ProviderSpecialtyCodeId}
          options={selectListItemsForDropdown(providerSearchCriteriaData.providerSpecialtyCodes || [])}
          saveRequired={false}/>
      </div>
      
      <div className="row stacked">
        <label className={''} htmlFor="CountiesServedIds">Counties Served:</label>
        <Multiselect
          name="CountiesServedIds"
          id="CountiesServedIDs"
          onChange={onChangeForm}
          value={searchCriteria.CountiesServedIds}
          options={selectListItemsForMultiSelect(providerSearchCriteriaData.countiesServed || [],'Value', 'Text')}
          saveRequired={true}/>
           {searchCriteria.errors&&searchCriteria.errors["CountiesServedIds"] && <div className="error alert alert-danger">{searchCriteria.errors["CountiesServedIds" ] }</div>}
      </div>
      
      <div className="row stacked">
        <label className={''} htmlFor="PAR">PAR:</label>
        <DropdownList
          name="Par"
          id="PAR"
          onChange={onChangeForm}
          value={searchCriteria.Par}
          options={selectListItemsForDropdown(providerSearchCriteriaData.yesNoOptions || [],'Value', 'Text')}
          saveRequired={false}/>
      </div>   
        
    </fieldset>
    
  );
};

ProviderSearchCriteria.propTypes = {
  searchCriteria: PropTypes.object.isRequired,
  onChangeForm: PropTypes.func.isRequired,
  providerSearchCriteriaData:PropTypes.object
};

export default ProviderSearchCriteria;