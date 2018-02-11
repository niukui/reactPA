import React, {PropTypes} from 'react';
import {selectListItemsForDropdown, selectListItemsForMultiSelect} from 'utils/dropdownTransformer';
import DropdownList from 'components/Common/DropdownList';
import DatePicker from 'components/Common/DatePicker';
import TextInput from 'components/Common/TextInput';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import TextBox from 'components/Common/TextBox';
import moment from 'moment';

class ServicesInpatientSection extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.onAdmissionDateChange = this
      .onAdmissionDateChange
      .bind(this);
    this.onTotalLengthOfStayChange = this
      .onTotalLengthOfStayChange
      .bind(this);
  }

  componentWillReceiveProps(nextProps) {}

  onAdmissionDateChange = (event) => {
    this
      .props
      .onFormChange({target: event.target});
    let expectedDischargeDate = moment(event.target.value);
    expectedDischargeDate.add(this.props.playGroundServices.TotalLengthOfStay, "days");
    this
      .props
      .onFormChange({
        target: {
          name: "ExpectedDischargeDate",
          value: expectedDischargeDate
        }
      });
  };
  onTotalLengthOfStayChange = (event) => {
      this
    .props
    .onFormChange({target: event.target});
      let expectedDischargeDate = moment(this.props.playGroundServices.AdmissionDate);
      expectedDischargeDate.add(event.target.value, "days");
      this
        .props
        .onFormChange({
            target: {
                name: "ExpectedDischargeDate",
                value: expectedDischargeDate
            }
        });
  }
  render() {
    const {errors, onFormChange, playGroundServices} = this.props

    return (
      <div>
        <fieldset className="fieldset-container-two">
          <fieldset className="fieldset-container-three">
            <div className="row">
              <label htmlFor="AdmissionDate" className="complete-required">Admission Date:<RequiredIndicator/>
              </label>
              <DatePicker
                saveRequired={true}
                className="required"
                id="AdmissionDate"
                onChange={this.onAdmissionDateChange}
                value={playGroundServices.AdmissionDate}
                error={errors.AdmissionDate}
                name="AdmissionDate"/>{errors.AdmissionDate && <div className="error alert alert-danger">{errors.AdmissionDate}</div>}
            </div>
            <div className="row">
              <label htmlFor="TotalLengthOfStay" className="complete-required">Total Length Of Stay :<RequiredIndicator/>
              </label>
              <TextBox
                id="TotalLengthOfStay"
                onChange={this.onTotalLengthOfStayChange}
                value={playGroundServices.TotalLengthOfStay}
                error={errors.TotalLengthOfStay}
                name="TotalLengthOfStay" extraProps={{min:1, max:100,type:'number'}}
                isRequired={true}/>
                {errors.TotalLengthOfStay && <div className="error alert alert-danger">{errors.TotalLengthOfStay}</div>}
            </div>
            <div className="row">
              <label htmlFor="ExpectedDischargeDate">Expected Discharge Date:
              </label>
              <DatePicker
                value={playGroundServices.ExpectedDischargeDate}
                id="ExpectedDischargeDate"
                onChange={onFormChange}
                name="ExpectedDischargeDate"
                readonly/>
            </div>
            <div className="row">
              <label htmlFor="ActualDischargeDate">Actual Discharge Date:
              </label>
              <DatePicker
                value={playGroundServices.ActualDischargeDate}
                onChange={onFormChange}
                name="ActualDischargeDate"
                id="ActualDischargeDate"/>
                {errors.ActualDischargeDate && <div className="error alert alert-danger">{errors.ActualDischargeDate}</div>}
            </div>
          </fieldset>

        </fieldset>
      </div>
    )
  }
}

ServicesInpatientSection.propTypes = {};

export default ServicesInpatientSection;