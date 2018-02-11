import React, {PropTypes} from 'react';
import ReactModal from "react-modal";
import DropdownList from 'components/Common/DropdownList';
import {selectListItemsForDropdown} from 'utils/dropdownTransformer';
import ProviderSearchCriteria from './ProviderSearchCriteria';

class ProviderSearchPanel extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isOpen: false,
            searchCriteria: {
                'ProviderName': '',
                'NpiApi': '',
                'TaxIdentifier': '',
                'ProviderNumber': '',
                'SourceInfo': {},
                'ProviderType': {},
                'ProviderSpecialtyCode': {},
                'ServiceOffered': {}
            },
            selectedProvider: ""
        };

        this.handleClose = this
            .handleClose
            .bind(this);

        this.handleCancel = this
            .handleCancel
            .bind(this);

        this.openDialog = this
            .openDialog
            .bind(this);

        this.handleSearch = this
            .handleSearch
            .bind(this);

        this.onChangeForm = this
            .onChangeForm
            .bind(this);

        this.onSelectProvider = this
            .onSelectProvider
            .bind(this);
    }

    handleClose(e) {
        this.closeDialog(e);
        if (this.props.onFinish) {
            this
                .props
                .onFinish(false);
        }
        this.setState({searchCriteria: {}, selectedProvider: ""});
    }

    handleSearch(e) {
        e.preventDefault();
        e.stopPropagation();
        this
            .props
            .onSearch(this.state.searchCriteria);

    }

    handleCancel(e) {
        e.preventDefault();
        e.stopPropagation();
        this.handleClose(e);
    }

    openDialog(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({isOpen: true});
    }

    closeDialog(e) {
        this.setState({isOpen: false});
    }

    onChangeForm(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        let searchCriteria = this.state.searchCriteria;
        searchCriteria[e.target.name] = e.target.value;
        this.setState({searchCriteria});
    }

    onSelectProvider(providerId, ownerOrganizationUnitId) {
        this
            .props
            .onSelectProvider(providerId, ownerOrganizationUnitId,this.props.entityData);
        this.setState({isOpen: false});
    }

    render() {

        const {providerSearchCriteriaData, providerSearchResults} = this.props;
        return (
            <div>
                <a href="javascript:void(0);" onClick={this.openDialog}>{this.props.title}</a>

                <ReactModal
                    className="providerSearchModal"
                    overlayClassName="overlay"
                    isOpen={this.state.isOpen}
                    onRequestClose={() => {}}
                    contentLabel="">
                    <div className="confirm-title">Provider Search
                        <span>
                            <button onClick={this.handleClose}>X</button>
                        </span>
                    </div>

                    <div className="confirm-message">
                        <ProviderSearchCriteria
                            providerTypes={providerSearchCriteriaData && providerSearchCriteriaData.providerTypes}
                            providerSourceInfos={providerSearchCriteriaData && providerSearchCriteriaData.providerSourceInfos}
                            providerSpecialtyCodes={providerSearchCriteriaData && providerSearchCriteriaData.providerSpecialtyCodes}
                            lxServices={providerSearchCriteriaData && providerSearchCriteriaData.lxServices}
                            onChangeForm={this.onChangeForm}
                            searchCriteria={this.state.searchCriteria}/>

                        <div className="searchspace-footer-bar">
                            <div className="float-right">
                                <button className="confirm-button-no" onClick={this.handleCancel}>Cancel</button>
                                <button className="confirm-button-yes" onClick={this.handleSearch}>Search</button>
                            </div>
                        </div>
                        <div className="providerSearchTableWrapper">
                            <table className="generalTable">
                                <caption className="caption-header"></caption>
                                <thead>
                                    <tr>
                                        <th>Provider NAP/API</th>
                                        <th>Site Number</th>
                                        <th>Provider Name</th>
                                        <th>Provider Types</th>
                                        <th>Specialty Codes</th>
                                        <th>Service Address</th>
                                        <th className="actions">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {providerSearchResults && providerSearchResults.length === 0
                                        ? <tr>
                                                <td colSpan="7" className="dataTables_empty">No data available</td>
                                            </tr>
                                        : providerSearchResults && providerSearchResults.map((provider, index) => (
                                            <tr key={index}>

                                                <td>{provider.Npi}</td>
                                                <td>{provider.SiteNumber}</td>
                                                <td>{provider.ProviderName}</td>
                                                <td>{(provider.ProviderTypeCodes || []).join()}</td>
                                                <td>{(provider.SpecialtyCodes || []).join()}</td>
                                                <td>{provider.ServiceAddress}</td>
                                                <td>
                                                    <span>
                                                        <a
                                                            onClick={(e) => {
                                                            e.preventDefault();
                                                            this.onSelectProvider(provider.Id, provider.OwnerOrganizationUnitId);
                                                        }}
                                                            title="Select">Select</a>
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        {providerSearchResults && providerSearchResults.length > 0 && 
                        <div className="dataTableInfoPanel">
                            <div className="dataTables_info" role="status" aria-live="polite">
                                Showing {providerSearchResults.length} 
                                search results
                            </div>
                        </div>
                        }
                    </div>
                </ReactModal>
            </div>
        );
    }
};

ProviderSearchPanel.propTypes = {
    onSelectProvider: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    providerSearchCriteriaData: PropTypes.object,
    providerSearchResults: PropTypes.array,
    onFinish: PropTypes.func,
    title: PropTypes.string,
    entityData: PropTypes.object
};

export default ProviderSearchPanel;