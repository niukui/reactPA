import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import {HOST} from "config";
import lodash from 'lodash';
import PageHeader from 'components/Common/PageHeader';
import AuthorizedLink from 'components/Common/links/AuthorizedLink';
import DropdownList from 'components/Common/DropdownList';
import ModalInfo from 'components/Common/ModalInfo';
import OutcomeEditor from 'components/Business/IspPart5/OutcomeEditor';
import DatePicker from 'components/Common/DatePicker';
import moment from 'moment';
import ModalConfirm from "components/Common/ModalConfirm";
import RequiredIndicator from 'components/Common/RequiredIndicator';

class IspPart5OutcomeEditPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      serviceError: null,
      effectiveDateError: null,
      outcomesErrors: {},
      openInfoWindow: false,
      isOpenItemRemoveConfirm: false,
      removeOutcomeId: null
    };

    this.saveServiceOutcome = this
      .saveServiceOutcome
      .bind(this);
    this.formUpdate = this
      .formUpdate
      .bind(this);
    this.outcomeChange = this
      .outcomeChange
      .bind(this);
    this.validate = this
      .validate
      .bind(this);
    this.validateOutcome = this
      .validateOutcome
      .bind(this);
    this.setOutcomeError = this
      .setOutcomeError
      .bind(this);
    this.addOutcome = this
      .addOutcome
      .bind(this);
    this.deleteOutcome = this
      .deleteOutcome
      .bind(this);
    this.onItemRemove = this
      .onItemRemove
      .bind(this);
    this.saveServiceOutcomeToServer = this
      .saveServiceOutcomeToServer
      .bind(this);
    this.hasOutcomeChanged = this
      .hasOutcomeChanged
      .bind(this);
    this.findSharedPlannings = this
      .findSharedPlannings
      .bind(this);
    this.clearValidateError = this
      .clearValidateError
      .bind(this);
  }

  componentWillMount() {
    const query = this.context.router.getCurrentLocation().query;
    this
      .props
      .actions
      .loadServiceAndOutcomes(query.parentDataId, query.dataId, query.clientId);
  }

  formUpdate(name, value) {
    this
      .props
      .actions
      .updateForm(name, value);
    this.clearValidateError();
  }

  outcomeChange(outcomeId, outcome) {
    this
      .props
      .actions
      .updateOutcome(outcomeId, outcome);
    let error = this.validateOutcome(outcome);
    this.setOutcomeError(outcomeId, error);
  }

  hasOutcomeChanged(outcomes) {
    return lodash.some(outcomes, (item) => {
      return item.Changed;
    });
  }

  saveServiceOutcome() {
    if (this.validate()) {
      if (this.props.serviceAndOutComes.ParentPlanForSupportId && this.props.serviceAndOutComes.WorkflowStatus.Name === 'InProgress' && this.hasOutcomeChanged(this.props.serviceAndOutComes.ServiceOutcomes)) {
        this.setState({openInfoWindow: true});
      } else {
        this.saveServiceOutcomeToServer();
      }
    }
  }

  saveServiceOutcomeToServer() {
    const outcomes = lodash.map(this.props.serviceAndOutComes.ServiceOutcomes, (item) => {
      let newItem = Object.assign({}, item);
      if (item.IsNew) {
        newItem['Id'] = null;
      }
      if (item.Changed) {
        newItem.SharedPlanningId = null;
      }
      return newItem;
    });
    const query = this.context.router.getCurrentLocation().query;
    const serviceAndOutComes = Object.assign({}, this.props.serviceAndOutComes, {'ServiceOutcomes': outcomes});

    this
      .props
      .actions
      .saveServiceOutcome(serviceAndOutComes, query.parentDataId, query.dataId, query.clientId);
  }
  clearValidateError() {
    let valid = true;
    if (this.props.serviceAndOutComes.LxServiceId) {
      this.setState({serviceError: null});
    }
    if (this.props.serviceAndOutComes.EffectiveDate) {
      this.setState({effectiveDateError: null});
    }
  }
  validate() {
    let valid = true;
    if (!this.props.serviceAndOutComes.LxServiceId) {
      this.setState({serviceError: 'Service is required'});
      valid = false;
    } else {
      this.setState({serviceError: null});
    }
    if (!this.props.serviceAndOutComes.EffectiveDate) {
      this.setState({effectiveDateError: 'Effective Date is required'});
      valid = false;
    } else {
      this.setState({effectiveDateError: null});
    }

    let errors = {};
    lodash.forEach(this.props.serviceAndOutComes.ServiceOutcomes, (outcome) => {
      const error = this.validateOutcome(outcome);
      if (error) {
        errors[outcome.Id] = error;
        valid = false;
      } else {
        errors[outcome.Id] = null;
      }
    });
    this.setState({outcomesErrors: errors});
    return valid;
  }

  validateOutcome(outcome) {
    let error = {};
    let valid = true;
    if (!outcome.SharedPlanningId) {
      error['SharedPlanningId'] = 'Desired outcome is required';
      valid = false;
    } 

    if (!outcome.DesiredOutcome) {
      error['DesiredOutcome'] = 'Desired outcome is required';
      valid = false;
    }
    if (!outcome.WhenNoLongerNeedSupport) {
      error['WhenNoLongerNeedSupport'] = 'I no longer want/needs supports when... is required';
      valid = false;
    }
    if (!outcome.LifeArea) {
      error['LifeArea'] = 'Life Area is required';
      valid = false;
    }
    if (outcome.StartDate && outcome.EndDate) {
      if (moment(outcome.StartDate) >= moment(outcome.EndDate)) {
        error.EndDate = "End Date should greater than Start Date.";
        valid = false;
      }
    }
    
    if (valid) {
      error = null;
    }
    return error;
  }

  setOutcomeError(outcomeId, error) {
    if (!error) {
      let currentErrors = Object.assign({}, this.state.outcomesErrors);
      delete currentErrors[outcomeId];
      this.setState({outcomesErrors: currentErrors});
    } else {
      let currentErrors = Object.assign({}, this.state.outcomesErrors);
      currentErrors[outcomeId] = error;
      this.setState({
        outcomesErrors: Object.assign({}, currentErrors)
      });
    }
  }

  addOutcome() {
    this
      .props
      .actions
      .addOutcome({
        'Id': Math.random(),
        'IsNew': true,
        'SharedPlanningId': '',
        'LifeArea': '',
        'DesiredOutcome': '',
        'WhenNoLongerNeedSupport': '',
        'StartDate': '',
        'EndDate': ''
      });
  }

  onItemRemove(yes)
  {
    if (yes) {
      const outcomeId = this.state.removeOutcomeId;
      if (outcomeId) {
        this
          .props
          .actions
          .deleteOutcome(outcomeId);
      }
    }
    this.setState((prevState, props) => ({isOpenItemRemoveConfirm: false, removeOutcomeId: null}));
  }

  deleteOutcome(outcomeId) {
    this.setState((prevState, props) => ({isOpenItemRemoveConfirm: true, removeOutcomeId: outcomeId}));
  }

  findSharedPlannings(outcome, serviceAndOutComes, sharedPlannings) {

    const usedPlanIds = [];
    lodash.forEach(serviceAndOutComes, (item) => {
      if (item.Id !== outcome.Id) {
        usedPlanIds.push(item.SharedPlanningId);
      }
    });
    const notUsedPlans = [];
    lodash.forEach(sharedPlannings, (item) => {
      if (usedPlanIds.indexOf(item.Id) < 0) {
        notUsedPlans.push(item);
      }
    });
    return notUsedPlans;
  }

  render() {
    const {serviceAndOutComes, serviceDefinitions, sharedPlannings} = this.props;
    const serviceDefinitionOptions = lodash.map(serviceDefinitions, (serviceDefinition) => {
      return {text: serviceDefinition.Name, value: serviceDefinition.Id};
    });
    const {serviceError, outcomesErrors, effectiveDateError} = this.state;

    if (!serviceAndOutComes || !serviceAndOutComes.ProviderId) {
      return <div>Loading</div>;
    }
    return (
      <div role="presentation" className="workspace p-client-layout">
        <PageHeader
          title={"Individual Support Plan - Service Outcome"}
          manageMode="WorkspaceIndicator_Manage"
          links={[ < AuthorizedLink 
          prefix={"/PlanOfCares/PlanOfCare"}
          key = "1" 
          to = {{ pathname: 'ispPart5Summary', 
          query: { 
            parentDataId: serviceAndOutComes.IndividualSupportPlanId, 
            clientId: serviceAndOutComes.ClientId, 
            dataId: serviceAndOutComes.Id,
            moduleName: 'PlanForSupport' }}}
        text = "Back to Part V Summary" />
      ]}
          buttons={[(
            <button key="1" type="button" onClick={this.saveServiceOutcome}>Save</button>
          )]}/>
        <div
          className="workspace-content-container reactWorkspace"
          id="workspace-maincontent">
          <form>
            <div className="genericform-style">
              <h4>Service and Outcomes</h4>

              <fieldset className="fieldset-container-one">
                <legend className="legend-header-one">Overview</legend>
                <div className="header-link">
                  {serviceAndOutComes.ParentPlanForSupportId
                    ? null
                    : <a href="javascript:void(0);" onClick={this.addOutcome}>Add Outcome</a>}

                </div>
                <div className="row">
                  <label htmlFor="effectiveDate">Effective Date<RequiredIndicator/></label>
                  <DatePicker
                    extraProps={{
                    minDate: moment(serviceAndOutComes.IspEffectiveDate)
                  }}
                    id="effectiveDate"
                    saveRequired
                    className="required"
                    onChange={(value) => {
                    this.formUpdate('EffectiveDate', value.target.value);
                  }}
                    value={serviceAndOutComes.EffectiveDate}/> {effectiveDateError && <div className="error alert alert-danger">{effectiveDateError}</div>}
                </div>

                <div className="row">
                  <label htmlFor="providerName">Provider</label>
                  <input
                    id="providerName"
                    value={serviceAndOutComes.ProviderName}
                    type="text"
                    readOnly="readonly"
                    className="readonly"/>
                </div>
                <div className="row">
                  <label htmlFor="serviceList">Service<RequiredIndicator/></label>
                  <DropdownList
                    id="serviceList"
                    name="LxServiceId"
                    value={{
                    Id: serviceAndOutComes.LxServiceId
                  }}
                    onChange={(value) => {
                    this.formUpdate(value.target.name, value.target.value && value.target.value.Id);
                  }}
                    options={serviceDefinitionOptions}
                    saveRequired/> {serviceError && <div className="error alert alert-danger">{serviceError}</div>}
                </div>

                <div className="row">
                  <label htmlFor="outcome_comment">Comment</label>
                  <textarea
                    id="outcome_comment"
                    onChange={(value) => {
                    this.formUpdate('ServiceAndOutcomesComment', value.target.value);
                  }}
                    value={serviceAndOutComes.ServiceAndOutcomesComment || ''}
                    className="comments-textarea"
                    maxLength="2000"/>
                </div>
              </fieldset>
              <fieldset className="fieldset-container-one">
                <legend className="legend-header-one">Manage Service and Outcomes List</legend>
                {(serviceAndOutComes.ServiceOutcomes || []).map((outcome, index) => <OutcomeEditor
                  outcomeChange={this.outcomeChange}
                  key={index}
                  index={index}
                  outcome={outcome}
                  error={outcomesErrors[outcome.Id]}
                  sharedPlannings={this.findSharedPlannings(outcome, serviceAndOutComes.ServiceOutcomes, sharedPlannings)}
                  deleteAction={this.deleteOutcome}
                  allowCustomized={!!serviceAndOutComes.ParentPlanForSupportId}
                  lifeAreas={serviceAndOutComes.LifeAreas}/>)
}
              </fieldset>
            </div>
          </form>
        </div>
        <ModalConfirm
          isOpen={this.state.isOpenItemRemoveConfirm}
          title="Confirmation"
          message="Are you sure you want to delete this Service and Outcome from the list? Please note that after the item has been deleted from the list, you have to click Save to preserve the changes."
          onYes={() => {
          this.onItemRemove(true);
        }}
          onNo={() => {
          this.onItemRemove(false);
        }}
          onClose={() => {
          this.onItemRemove(false);
        }}/>
        <ModalInfo
          isOpen={this.state.openInfoWindow}
          title="Confirmation"
          message="You have chosen to edit the person’s Desired Outcomes and/or add a new Desired Outcome.  After submission of the Part V, it will need to be reviewed by the Support Coordinator.  Please select Confirm to continue in this process."
          onClose={() => {
          this.setState({openInfoWindow: false});
        }}
          onOk={this.saveServiceOutcomeToServer}/>
      </div>
    );
  }
}

IspPart5OutcomeEditPage.propTypes = {
  actions: PropTypes.object.isRequired,
  sharedPlannings: PropTypes.array.isRequired,
  serviceAndOutComes: PropTypes.object.isRequired,
  serviceDefinitions: PropTypes.array.isRequired
};

IspPart5OutcomeEditPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    serviceAndOutComes: state
      .get('ispPart5Outcome')
      .get('serviceAndOutComes') || {},
    serviceDefinitions: state
      .get('ispPart5Outcome')
      .get('serviceDefinitions') || [],
    sharedPlannings: state
      .get('ispPart5Outcome')
      .get('sharedPlannings') || []
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IspPart5OutcomeEditPage);
