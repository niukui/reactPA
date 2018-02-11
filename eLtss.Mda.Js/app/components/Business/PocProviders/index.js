import React, {PropTypes} from 'react';
import moment from 'moment';
import CollapsiblePanel from 'components/Common/CollapsiblePanel';
import NewCollapsiblePanel from 'components/Common/NewCollapsiblePanel';
import SubCollapsiblePanel from 'components/Common/SubCollapsiblePanel';
import SectionViewer from 'components/MetadataDriven/SectionViewer';
import ProviderSearchPanel from './ProviderSearchPanel';
import ProvidersDetails from './ProvidersDetails';
import ModalConfirm from "components/Common/ModalConfirm";
import * as aclHelper from 'utils/aclHelper';
import {get} from 'lodash';
import ReactModal from "react-modal";
import ProviderSearchCriteria from "./../../Business/PocProviders/ProviderSearchCriteria";
import ProviderSearchDetail from"./../../Business/PocProviders/ProvidersDetails";
import requestApi from 'utils/requestApi';

class PocProvidersSection extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            deleteProviderId: '',
            isOpenDeleteProviderConfirm: false,
            isOpenProviderCompleteConfirm: false,
            isOpen:false
        };
        this.onProviderSearch = this
            .onProviderSearch
            .bind(this);
        this.onSelectProvider = this
            .onSelectProvider
            .bind(this);
        this.handleClose = this
            .handleClose
            .bind(this);
        this.openDialog = this
            .openDialog
            .bind(this);
            
    }
        
    handleClose(e) {
        this.closeDialog(e);
        this.setState({searchCriteria: {}});
    }


    closeDialog(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({isOpen: false});
    }

    openDialog(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({isOpen: true});
        this.props.onLoad()
    }

    onProviderSearch(searchCriteria) {
        searchCriteria.errors= [];
        if(!searchCriteria.CountiesServedIds ||searchCriteria.CountiesServedIds.length===0||searchCriteria.CountiesServedIds[0]==="")
        {
            searchCriteria.errors["CountiesServedIds"]="At least one County must be selected";
            this.setState({searchCriteria:searchCriteria});
            return;
        }
        if(this.props.playGroundServices.TreatmentType.Id===this.props.inpatientId){
            searchCriteria.IsPracticeIndicator = true;
            searchCriteria.ProviderEntityIsFacility = true;
        }else if(this.props.playGroundServices.TreatmentType.Id===this.props.outpatientId){
            searchCriteria.IsPracticeIndicator = true;
            searchCriteria.ProviderServiceIds = [this.props.playGroundServices.ServiceId];
        }
        this
            .props
            .searchProviders(searchCriteria);
    }

    onSelectProvider(provider) {
        this.props.providerSelected(provider);    
        this.setState({isOpen: false});    
    }


    render() {
        const {
            providerSearchCriteriaData,
            providerSearchResults
        } = this.props;
        return (
            <div className="float-right">
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
                < ProviderSearchPanel onSearch = {
                    this.onProviderSearch
                }
                providerSearchResults = {
                    providerSearchResults
                }
                providerSearchCriteriaData = {
                    providerSearchCriteriaData
                }
                onSelectProvider={this.onSelectProvider}
                clientDefaultCounty={this.props.clientDefaultCounty}   
                />            

                </ReactModal>
        
            </div>
            
        );
    }
}

PocProvidersSection.propTypes = {
    providerSearchCriteriaData:PropTypes.object,
    providerSearchResults: PropTypes.array,
    providerServiceIds:PropTypes.array
};

export default PocProvidersSection;