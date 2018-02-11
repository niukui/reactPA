          
import React, {PropTypes} from 'react';
import moment from 'moment';
import {selectListItemsForDropdown, selectListItemsForMultiSelect} from 'utils/dropdownTransformer';
import DropdownList from 'components/Common/DropdownList';
import DatePicker from 'components/Common/DatePicker';
import Textarea from 'components/Common/Textarea';
import Multiselect from 'components/Common/Multiselect';
import TextInput from 'components/Common/TextInput';
import {ISP_WORKFLOW_STATUS} from 'utils/constants';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import * as aclHelper from 'utils/aclHelper';
import RadioButtonList from 'components/Common/RadioButtonList';
import TextBox from 'components/Common/TextBox';
import lodash from 'lodash';

const saveRequired = true;

class ServicesOutpatientSection extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            filterFrequencyItems:[],
        };
        this.onFrequencyTypeChange = this
          .onFrequencyTypeChange
          .bind(this);
        this.onServiceTypeChange = this
          .onServiceTypeChange
          .bind(this);
    }
    onFrequencyTypeChange = (event) => {
        let id =event;
        let selectedItem = lodash.find(this.state.filterFrequencyItems, function (option) {
            if (option.Id) {
                return option.Id === id;
            } else {
                return option.Value === id;
            }
        });
        this
          .props
          .onFormChange({target: {name:"FrequencyType",value:selectedItem}});
    }
onServiceTypeChange()
{  
    if((this.props.playGroundServices.ServiceType && this.props.playGroundServices.ServiceType.Id)!=this.props.playGroundServices.ServiceType&& 
    this.props.playGroundServices.ServiceType.Id){
        let rateUnitTypeGuid=lodash.result(lodash.find(this.props.serviceDefinitions, { 'Id': this.props.playGroundServices.ServiceType.Id }), 'RateUnitType.UniqueAttribute.Guid');
        this.setState({
            filterFrequencyItems : lodash.filter(this.props.frequencyItems, function (i, k) {
                return lodash.some(i.RuleAttributes, {"Guid": rateUnitTypeGuid})
            })
        }); 
    }  
};

componentWillMount(){
     if(this.props.playGroundServices.ServiceId){
        let rateUnitTypeGuid=lodash.result(lodash.find(this.props.serviceDefinitions, { 'Id': this.props.playGroundServices.ServiceId }), 'RateUnitType.UniqueAttribute.Guid');
        this.setState({
            filterFrequencyItems : lodash.filter(this.props.frequencyItems, function (i, k) {
                return lodash.some(i.RuleAttributes, {"Guid": rateUnitTypeGuid})
            })
        });
    }  
}
componentWillReceiveProps(nextProps){

    if(nextProps.playGroundServices.ServiceId){
        let rateUnitTypeGuid=lodash.result(lodash.find(this.props.serviceDefinitions, { 'Id': nextProps.playGroundServices.ServiceId }), 'RateUnitType.UniqueAttribute.Guid');
        this.setState({
            filterFrequencyItems : lodash.filter(nextProps.frequencyItems, function (i, k) {
                return lodash.some(i.RuleAttributes, {"Guid": rateUnitTypeGuid})
            })
        });
    }  
}

  render() {
    const {
      onFormChange,
      errors,
      securityContext,
      serviceDefinitionItems,
      serviceOutcomeItems,
      frequencyItems,
      playGroundServices,
      frequencyIds
    } = this.props
    const {bodyVisible} = this.state;
    return (
      <div>
        <fieldset className="fieldset-container-two">
          <fieldset className="fieldset-container-three">
            <div className="row">
              <label  htmlFor="Priority" className="complete-required">POC Service:<RequiredIndicator/></label>
              <DropdownList
                saveRequired={true}
                className="required"
                name="ServiceId"
                onChange={(e) => {
              onFormChange({target:{name:"ServiceId",value:e.target.value.Id}});
              onFormChange({target:{name:"ServiceName",value:e.target.value.Name}});
            }}
                value={playGroundServices.ServiceId}
                options={selectListItemsForDropdown( serviceDefinitionItems||[], 'Value', "Text")}
                />{errors.ServiceId && <div className="error alert alert-danger">{errors.ServiceId}</div>}
            </div>
            <div className="row">
              <label  htmlFor="Explain">Explain:</label>
              <Textarea 
                name="Explain" 
                onChange={onFormChange}
                value={playGroundServices.Explain} 
                saveRequired={false}/>
            </div>           
            <fieldset className="fieldset-container-two">
              <legend className="legend-header-two">Frequency Type</legend> 
              <fieldset className="fieldset-container-three">
              {!lodash.isEmpty(playGroundServices.ServiceId) &&
              <div className="row"> 
                <RadioButtonList name="FrequencyType"  
                  onChange={this.onFrequencyTypeChange}
                  value={playGroundServices.FrequencyType&&playGroundServices.FrequencyType.Id} 
                  options={selectListItemsForDropdown(this.state.filterFrequencyItems||[],'Id','Name')} 
                  disable='false' 
                  saveRequired/>{errors.FrequencyType && <div className="error alert alert-danger">{errors.FrequencyType}</div>}
              </div>}

            {playGroundServices.FrequencyType&&playGroundServices.FrequencyType.Id===frequencyIds.FrequencyDailyId && 
            <div className="row">
              <label  htmlFor="UnitsPerDay" className="complete-required">Units per Day:<RequiredIndicator/></label>
              <TextBox 
                name="FrequencyUnits" 
                onChange={onFormChange}
                value={playGroundServices.FrequencyUnits} 
                isRequired={true}
                extraProps={{type: "number", min: 1, max: 24}}/>               
                {errors.FrequencyUnits && <div className="error alert alert-danger">{errors.FrequencyUnits}</div>}
            </div>}

            {playGroundServices.FrequencyType&&playGroundServices.FrequencyType.Id===frequencyIds.FrequencyWeeklyId &&
            <div className="row">
              <label  htmlFor="UnitsPerWeek" className="complete-required"> Units Per Week:<RequiredIndicator/>
              </label>
              <TextBox 
                name="FrequencyUnits"
                onChange={onFormChange} 
                value={playGroundServices.FrequencyUnits} 
                isRequired={true}
                extraProps={{type: "number", min: 1, max: 7}}/>
                {errors.FrequencyUnits && <div className="error alert alert-danger">{errors.FrequencyUnits}</div>}
            </div>}
            
            {playGroundServices.FrequencyType&&playGroundServices.FrequencyType.Id===frequencyIds.FrequencyBiWeeklyId &&
            <div className="row">
              <label  htmlFor="UnitsPerBiWeek" className="complete-required" className="complete-required">Units Per Bi-Weekly: <RequiredIndicator/>
              </label>
              <TextBox 
                name="FrequencyUnits"
                onChange={onFormChange} 
                value={playGroundServices.FrequencyUnits} 
                isRequired={true}
                extraProps={{type: "number", min: 1, max: 14}}/>
                {errors.FrequencyUnits && <div className="error alert alert-danger">{errors.FrequencyUnits}</div>}
            </div>}

            {playGroundServices.FrequencyType&&playGroundServices.FrequencyType.Id===frequencyIds.FrequencyMonthlyId &&
            <div className="row">
                <label  htmlFor="Units Per Month" className="complete-required">Units Per Month:<RequiredIndicator/></label>
                <TextBox 
                  name="FrequencyUnits"
                  onChange={onFormChange} 
                  value={playGroundServices.FrequencyUnits} 
                  isRequired={true}
                  extraProps={{type: "number", min: 1, max: 31}}/>
                {errors.FrequencyUnits && <div className="error alert alert-danger">{errors.FrequencyUnits}</div>}
            </div>}
            
            {playGroundServices.FrequencyType&&playGroundServices.FrequencyType.Id===frequencyIds.FrequencyQuarterlyId &&
            <div className="row">
                <label  htmlFor="UnitsPerQuarter" className="complete-required">Units Per Quarter:<RequiredIndicator/></label>
                <TextBox 
                  name="FrequencyUnits"
                  onChange={onFormChange} 
                  value={playGroundServices.FrequencyUnits} 
                  isRequired={true}
                  extraProps={{type: "number", min: 1, max: 93}}/>
                {errors.FrequencyUnits && <div className="error alert alert-danger">{errors.FrequencyUnits}</div>}
            </div>}
    {playGroundServices.FrequencyType&&playGroundServices.FrequencyType.Id===frequencyIds.FrequencyAnnualId &&
            <div className="row">
                <label  htmlFor="UnitsPerQuarter" className="complete-required">Units Per Year:<RequiredIndicator/></label>
                <TextBox 
                  name="FrequencyUnits"
                  onChange={onFormChange} 
                  value={playGroundServices.FrequencyUnits} 
                  isRequired={true}
                  extraProps={{type: "number", min: 1, max: 366}}/>
                {errors.FrequencyUnits && <div className="error alert alert-danger">{errors.FrequencyUnits}</div>}
            </div>}  
            {playGroundServices.FrequencyType&&playGroundServices.FrequencyType.Id===frequencyIds.FrequencyDailyId &&
            <div className="row">
              <label  htmlFor="Duration" className="complete-required">Duration (how many days):<RequiredIndicator/></label>
              <TextBox 
                name="FrequencyDuration"
                onChange={onFormChange} 
                value={playGroundServices.FrequencyDuration}
                isRequired={true}
                extraProps={{type: "number", min: 1, max: 366}}/>
                {errors.FrequencyDuration && <div className="error alert alert-danger">{errors.FrequencyDuration}</div>}
            </div>}
            
            {playGroundServices.FrequencyType&&playGroundServices.FrequencyType.Id===frequencyIds.FrequencyWeeklyId &&
            <div className="row">
              <label  htmlFor="Duration" className="complete-required">Duration (how many weeks):<RequiredIndicator/></label>
              <TextBox 
                name="FrequencyDuration"
                onChange={onFormChange} 
                value={playGroundServices.FrequencyDuration} 
                isRequired={true}
                extraProps={{type: "number", min: 1, max: 52}}/>
                {errors.FrequencyDuration && <div className="error alert alert-danger">{errors.FrequencyDuration}</div>}
            </div>}
            
            {playGroundServices.FrequencyType&&playGroundServices.FrequencyType.Id===frequencyIds.FrequencyBiWeeklyId &&
            <div className="row">
              <label  htmlFor="Duration" className="complete-required"> Duration (how many Bi-weekly periods):<RequiredIndicator/></label>
              <TextBox 
                name="FrequencyDuration"
                onChange={onFormChange} 
                value={playGroundServices.FrequencyDuration} 
                isRequired={true}
                extraProps={{type: "number", min: 1, max: 26}}/>
                {errors.FrequencyDuration && <div className="error alert alert-danger">{errors.FrequencyDuration}</div>}
            </div>}

            {playGroundServices.FrequencyType&&playGroundServices.FrequencyType.Id===frequencyIds.FrequencyMonthlyId &&
            <div className="row">
              <label  htmlFor="Duration" className="complete-required">Duration (how many months):<RequiredIndicator/></label>
              <TextBox 
              name="FrequencyDuration"
              onChange={onFormChange} 
              value={playGroundServices.FrequencyDuration} 
              isRequired={true}
              extraProps={{type: "number", min: 1, max: 12}}/>
                {errors.FrequencyDuration && <div className="error alert alert-danger">{errors.FrequencyDuration}</div>}
            </div>}
            
            {playGroundServices.FrequencyType&&playGroundServices.FrequencyType.Id===frequencyIds.FrequencyQuarterlyId &&
            <div className="row">
              <label  htmlFor="Duration" className="complete-required">Duration (how many quarters):<RequiredIndicator/></label>
              <TextBox 
              name="FrequencyDuration"
              onChange={onFormChange} 
              value={playGroundServices.FrequencyDuration} 
              isRequired={true}
              extraProps={{type: "number", min: 1, max: 4}}/>
                {errors.FrequencyDuration && <div className="error alert alert-danger">{errors.FrequencyDuration}</div>}
            </div>}

            {playGroundServices.FrequencyType&&playGroundServices.FrequencyType.Id==frequencyIds.FrequencyAnnualId &&
            <div className="row">
              <label  htmlFor="Duration" className="complete-required">Duration (how many years):<RequiredIndicator/></label>
              <TextBox 
                name="FrequencyDuration"
                onChange={onFormChange} 
                value={playGroundServices.FrequencyDuration} 
                isRequired={true}
                extraProps={{type: "number"}}/>
                {errors.FrequencyDuration && <div className="error alert alert-danger">{errors.FrequencyDuration}</div>}
            </div>
            } 

          <div className="row">
            <label  htmlFor="TotalUnitsRequested">Total Units Requested:</label>
            <TextBox 
              readonly={true}
              name="TotalUnitsRequested"
              onChange={onFormChange}
              value={""||playGroundServices.TotalUnitsRequested} 
              isRequired={true}
              extraProps={{type: "number"}}/>
                {errors.TotalUnitsRequested && <div className="error alert alert-danger">{errors.TotalUnitsRequested}</div>}
          </div>

          <div className="row">
            <label  htmlFor="PreferredSchedule">Preferred Schedule:</label>
            <TextBox 
              name="PreferredSchedule"
              onChange={onFormChange}
              value={playGroundServices.PreferredSchedule} 
              />              
          </div>

          <div className="row">
            <label  htmlFor="ServiceStartDate" className="complete-required">Service Start Date:<RequiredIndicator/></label>
            <DatePicker
                saveRequired={true}
                className="required"
                value={playGroundServices.ServiceStartDate}
                id="ServiceStartDate"
                onChange={onFormChange}
                name="ServiceStartDate"/>  
                {errors.ServiceStartDate && <div className="error alert alert-danger">{errors.ServiceStartDate}</div>}
          </div>

          <div className="row">
            <label  htmlFor="ServiceEndDate" className="complete-required">Service End Date:<RequiredIndicator/></label>
            <DatePicker
                saveRequired={true}
                className="required"
                value={playGroundServices.ServiceEndDate}
                id="ServiceEndDate"
                onChange={onFormChange}
                name="ServiceEndDate"/>    
                {errors.ServiceEndDate && <div className="error alert alert-danger">{errors.ServiceEndDate}</div>}
          </div>

          <div className="row">
              <label  htmlFor="ServiceOutcome" className="complete-required">Service Outcome:<RequiredIndicator/></label>
              <DropdownList
                saveRequired={true}
                className="required"
                name="ServiceOutcome"
                onChange={this.props.onFormChange}
                value={playGroundServices.ServiceOutcome}
                options={selectListItemsForDropdown( serviceOutcomeItems||[], 'Value', "Text")}/>
                {errors.ServiceOutcome && <div className="error alert alert-danger">{errors.ServiceOutcome}</div>}
          </div>
          </fieldset>
          </fieldset> 
        </fieldset>  
        </fieldset>     
      </div>
    )
  }
}

ServicesOutpatientSection.propTypes = {
  
};

export default ServicesOutpatientSection;