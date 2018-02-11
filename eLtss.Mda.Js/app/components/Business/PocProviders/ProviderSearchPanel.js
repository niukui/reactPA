import React, {PropTypes} from 'react';
import ReactModal from "react-modal";
import DropdownList from 'components/Common/DropdownList';
import {selectListItemsForDropdown} from 'utils/dropdownTransformer';
import ProviderSearchCriteria from './ProviderSearchCriteria';
import ProviderSearchDetail from "./../../Business/PocProviders/ProvidersDetails";

class ProviderSearchPanel extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isOpen: false,
            searchCriteria: {
                'ProviderName': '',
                'NationalProviderIdentification': '',
                'AtypicalProvider': {},
                'ProviderNumber': '',
                'EffectiveDateInNetwork': '',
                'NoLongerInNetwork': '',
                'ServiceProviderTypeId': {},
                'ProviderSpecialtyCodeId': {},
                'CountiesServedIds': [this.props.clientDefaultCounty],
                'Par': {},
                'NetworkId':''
            }
        };



        this.handleSearch = this
            .handleSearch
            .bind(this);

        this.onChangeForm = this
            .onChangeForm
            .bind(this);

        this.onSelectProvider = this
            .onSelectProvider
            .bind(this);
    this.fieldValidation = this
      .fieldValidation
      .bind(this);
    }



    handleSearch(e) {
        e.preventDefault();
        e.stopPropagation();
        this
            .props
            .onSearch(this.state.searchCriteria);

    }


  fieldValidation(searchCriteria, field) {
      searchCriteria.errors=searchCriteria.errors||[];
    let errors = searchCriteria.errors;

    if (field.name==="CountiesServedIds" && (!field.value || field.value.length===0||field.value[0]==="")) {
      errors[field.name] = "Field is required.";
    } else {
      errors[field.name] = null;
    }

  }
   formValidation(searchCriteria) {
   }

    onChangeForm(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        let searchCriteria = this.state.searchCriteria;
        searchCriteria[e.target.name] = e.target.value;
        this.fieldValidation(searchCriteria, e.target);
        this.setState({searchCriteria});


    }

    onSelectProvider(provider) {
        this
            .props
            .onSelectProvider(provider);
        this.setState({isOpen: false});
    }

    render() {

        const {providerSearchCriteriaData, providerSearchResults} = this.props;
        return (
            <div>
                <ProviderSearchCriteria
                    clientDefaultCounty={this.props.clientDefaultCounty}
                    onChangeForm={this.onChangeForm}
                    providerSearchCriteriaData={providerSearchCriteriaData}
                    searchCriteria={this.state.searchCriteria}/>
                <div className="searchspace-footer-bar">
                    <div className="float-left">
                        <button className="confirm-button-yes" onClick={this.handleSearch}>Search</button>
                    </div>
                </div>
                < ProviderSearchDetail providerSearchResults={providerSearchResults} onSelectProvider={this.onSelectProvider}/>
            </div>
        );
    }
};

ProviderSearchPanel.propTypes = {
    onSearch: PropTypes.func.isRequired,
    providerSearchCriteriaData: PropTypes.object,
    providerSearchResults: PropTypes.array,
    onFinish: PropTypes.func,
    title: PropTypes.string
};

export default ProviderSearchPanel;