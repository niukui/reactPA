import React, {PropTypes} from 'react';
import moment from 'moment';
import CollapsiblePanel from 'components/Common/CollapsiblePanel';
import NewCollapsiblePanel from 'components/Common/NewCollapsiblePanel';
import SubCollapsiblePanel from 'components/Common/SubCollapsiblePanel';
import SectionViewer from 'components/MetadataDriven/SectionViewer';
import ModalConfirm from "components/Common/ModalConfirm";
import * as aclHelper from 'utils/aclHelper';
import {get} from 'lodash';
import ReactModal from "react-modal";
import requestApi from 'utils/requestApi';
import TextBox from 'components/Common/TextBox';
import Textarea from 'components/Common/Textarea';
import {formatJsonDate} from 'utils/dateHelper';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import lodash from 'lodash';
import DropdownList from 'components/Common/DropdownList';
import {selectListItemsForDropdown, selectListItemsForMultiSelect} from 'utils/dropdownTransformer';

class TemporaryProviderPopup extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this
            .handleClose
            .bind(this);      
    }
        
    handleClose(e) {
        this.closeDialog(e);
    }


    closeDialog(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.initializePopupState();
    }

    render() {
        const {
            isOpen,
            temporaryProvider,
            errors,
            onChangeForm,
            addTemporaryProvider,
            stateProvinceSelectList
        } = this.props;
        return (
          <ReactModal
            isOpen={isOpen}
            className="providerSearchModal"
            overlayClassName="overlay"
            onRequestClose={() => {}}
            contentLabel="">    
            <div className="confirm-title">Add a Temporary Provider
                <span>
                    <button onClick={this.handleClose}>X</button>
                </span>
            </div>
            <fieldset className="fieldset-container-one" style={{marginLeft:"20px",marginRight:"20px",marginTop:"10px"}}>
                <legend className="legend-header-one">Temporary Provider</legend>
                <div className="row  ">
                  <label  htmlFor="ProviderName" className="complete-required">Provider Name:<RequiredIndicator/></label>
                  < TextBox value = {temporaryProvider.ProviderName|| ""}
                    name = "ProviderName" error = {errors.ProviderName}
                    onChange={onChangeForm}
                    isRequired={true}/>
                  {errors.ProviderName && <div className="error alert alert-danger">{errors.ProviderName}</div>}
                </div>
            
                <div className="row ">
                  <label  htmlFor="Tin">TIN:<RequiredIndicator/></label>
                  <TextBox value={temporaryProvider.Tin ||""}
                    name="Tin" error={errors.Tin}
                    onChange={onChangeForm} 
                    isRequired={true}/>
                  {errors.Tin && <div className="error alert alert-danger">{errors.Tin}</div>}   
                </div>
            
                <div className="row ">
                  <label  htmlFor="Npi">NPI:</label>
                  <TextBox value={temporaryProvider.Npi ||""}
                    onChange={onChangeForm}
                    name="Npi" error={errors.Npi} />
                  {errors.Npi && <div className="error alert alert-danger">{errors.Npi}</div>}   
                </div>
                <div className="row">
                  <fieldset className="fieldset-container-three">
                    <div className="row">
                      <h4>Provider Address</h4>
                    </div>
                    <div className="row ">  
                      <label  htmlFor="ProviderAddress.AddressLine1">Street Address 1:<RequiredIndicator/></label>
                      <TextBox value={temporaryProvider.ProviderAddress && temporaryProvider.ProviderAddress.AddressLine1 ||""}
                        name="ProviderAddress.AddressLine1" error={errors.AddressLine1}
                        onChange={onChangeForm} 
                        isRequired={true}/>
                      {errors.ProviderAddress && errors.ProviderAddress.AddressLine1 && <div className="error alert alert-danger">{errors.ProviderAddress.AddressLine1}</div>}
                    </div>

                    <div className="row ">  
                      <label  htmlFor="ProviderAddress.AddressLine2">Street Address 2:</label>
                      <TextBox value={temporaryProvider.ProviderAddress && temporaryProvider.ProviderAddress.AddressLine2 ||""}
                        name="ProviderAddress.AddressLine2"
                        onChange={onChangeForm} />
                    </div>

                    <div className="row ">  
                      <label  htmlFor="ProviderAddress.City">City:<RequiredIndicator/></label>
                      <TextBox value={temporaryProvider.ProviderAddress && temporaryProvider.ProviderAddress.City ||""}
                        name="ProviderAddress.City"
                        onChange={onChangeForm} 
                        isRequired={true}/>
                      {errors.ProviderAddress&& errors.ProviderAddress.City && <div className="error alert alert-danger">{errors.ProviderAddress.City}</div>}
                    </div>

                    <div className="row">
                      <label  htmlFor="ProviderAddress.StateProvince" className="complete-required">State:<RequiredIndicator/></label>
                      <DropdownList
                        saveRequired={true}
                        className="required"
                        name="ProviderAddress.StateProvince"
                        id="ProviderAddress.StateProvince"
                        onChange={onChangeForm}
                        value={temporaryProvider.ProviderAddress && temporaryProvider.ProviderAddress.StateProvince ||""}
                        options={selectListItemsForDropdown( stateProvinceSelectList||[], 'Value', "Text")}/>
                        {errors.ProviderAddress && errors.ProviderAddress.StateProvince &&<div className="error alert alert-danger">{errors.ProviderAddress.StateProvince}</div>}
                    </div>

                    <div className="row ">  
                      <label  htmlFor="ProviderAddress.PostalCode">Zip Code:<RequiredIndicator/></label>
                      <TextBox value={temporaryProvider.ProviderAddress && temporaryProvider.ProviderAddress.PostalCode ||""}
                        name="ProviderAddress.PostalCode" 
                        onChange={onChangeForm} 
                        isRequired={true}/>
                      {errors.ProviderAddress && errors.ProviderAddress.PostalCode && <div className="error alert alert-danger">{errors.ProviderAddress.PostalCode}</div>}
                    </div>
                  </fieldset>  
                </div>

                <div className="row ">     
                  <label  htmlFor="ProviderPhoneNumber.Number">Provider Phone Number(999-999-9999):<RequiredIndicator/></label>
                  <TextBox value={temporaryProvider.ProviderPhoneNumber && temporaryProvider.ProviderPhoneNumber.Number ||""}
                    name="ProviderPhoneNumber.Number" error={errors.ProviderPhoneNumber}
                    onChange={onChangeForm} 
                    isRequired={true}/>
                  <label  htmlFor="ProviderPhoneNumber.ExtensionNumber" className={"frequency-label auto-width"} style={{marginLeft:"1em"}}>Ext:</label>
                  <TextBox value={temporaryProvider.ProviderPhoneNumber && temporaryProvider.ProviderPhoneNumber.ExtensionNumber ||""}
                    name="ProviderPhoneNumber.ExtensionNumber"
                    onChange={onChangeForm}
                    extraProps={{style:{'width':"3em"}}}
                    />
                  {errors.ProviderPhoneNumber && <div className="error alert alert-danger">{errors.ProviderPhoneNumber}</div>}
                </div>

                <div className="row ">  
                  <label  htmlFor="PrimarySpecialtyCode">Provider Specialty:</label>
                  <TextBox value={temporaryProvider.PrimarySpecialtyCode ||""}
                    onChange={onChangeForm}
                    name="PrimarySpecialtyCode" error={errors.Specialty} />
                  {errors.Specialty && <div className="error alert alert-danger">{errors.Specialty}</div>}       
                </div>         
            </fieldset>
            <div className="footer">
                <button className="confirm-button-yes" onClick={()=>{addTemporaryProvider()}}>Continue</button>
                <button className="confirm-button-no" onClick={this.handleClose}>Cancel</button>
            </div>
          </ReactModal>    
        );
    }
}

TemporaryProviderPopup.propTypes = {
    temporaryProvider:PropTypes.object,
    isOpen:PropTypes.bool
};

export default TemporaryProviderPopup;