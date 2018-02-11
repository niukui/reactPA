import React, {PropTypes} from 'react';
import lodash from 'lodash';
import ItemEditor from './ItemEditor';
import ArrayItemEditor from './ArrayItemEditor';
import String from 'components/Common/String';
import * as metadataHelper from 'utils/metadataHelper';
import {formatJsonDate, formatJsonDateString} from 'utils/dateHelper';
import {buildDefaultStateByItem} from 'services/componentsServices';
import {convertValueToDisplayValue} from 'utils/displayConverter';
import ModalConfirm from "components/Common/ModalConfirm";
import {compareValue} from 'services/validationServices';
import moment from 'moment';
import {POC_REVIEW_TYPE_IDS} from 'utils/constants';
import {calculateService} from 'services/customCalculateService';

class ArraySectionEditor extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onFormChange = this
      .onFormChange
      .bind(this);
    this.onAdd = this
      .onAdd
      .bind(this);
    this.onSave = this
      .onSave
      .bind(this);
    this.onCancel = this
      .onCancel
      .bind(this);
    this.onClickRemove = this
      .onClickRemove
      .bind(this);
    this.onClickEdit = this
      .onClickEdit
      .bind(this);
    this.onUiUpdate = this
      .onUiUpdate
      .bind(this);
    this.refreshComponentState = this
      .refreshComponentState
      .bind(this);
    this.onItemRemove = this
      .onItemRemove
      .bind(this);

    this.state = {
      currentItem: [],
      currentFieldNamePrefix: '',
      listData: [],
      underEditingIndex: null,
      validationList: [],
      formValidated: false,
      isOpenItemRemoveConfirm: false,
      itemRemoveIndex: null,
      eventType: null
    };
  }

  componentWillMount() {
    this.setState((prevState, props) => ({
      listData: this.getListData(),
      currentItem: this.getInitialFormData()
    }));
  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => ({
      currentFieldNamePrefix: this.getCurrentFieldNamePrefix(),
      listData: this.getListData(nextProps)
    }));

    if (lodash.get(this.props.data, this.getCurrentFieldNamePrefix()) !== lodash.get(nextProps.data, this.getCurrentFieldNamePrefix())) {
      this.setState({
        currentItem: this.getInitialFormData()
      });
    }
  }

  getCurrentFieldNamePrefix() {
    return this.props.fieldNamePrefix
      ? this.props.fieldNamePrefix + "." + this.props.section.Name
      : this.props.section.Name;
  }

  getListData(props) {

    const prefix = this.getCurrentFieldNamePrefix();
    const listData = lodash.get((props || this.props).data, prefix);
    const sortedList = metadataHelper.getSortedListData(listData, (props || this.props).section.Items);

    return sortedList;
  }

  getInitialFormData() {
    let initialFormData = [];
    this
      .props
      .section
      .Items
      .map(item => initialFormData.push((item.Value)
        ? ({definition: item, value: item.Value})
        : ({definition: item, value: null})));
    return initialFormData;
  }

  refreshComponentState(currentItem) {
    if (this.props.arraySectionChanged) {
      let changes = [];
      lodash.forEach(currentItem, (i) => {
        changes.push({
          name: this.getCurrentFieldNamePrefix() + '.' + i.definition.Name,
          value: i.value
        });
      });
      this
        .props
        .arraySectionChanged(Object.assign([], changes), this.getCurrentFieldNamePrefix());
    }
  }

  clearCurrentItemData(listData) {
    this.setState((prevState, props) => ({
      listData: this.getListData(props),
      currentItem: this.getInitialFormData(),
      underEditingIndex: null,
      itemRemoveIndex: null
    }));
  }

  hasNoData(currentItem) {
    return currentItem.every((i) => {
      return !(i.value);
    });
  }

  onFormChange(e) {

    if (e.preventDefault) {
      e.preventDefault();
    }
    let currentItem = Object.assign([], this.state.currentItem);
    let index = lodash.indexOf(currentItem, lodash.find(currentItem, {
      definition: {
        Name: e[0].name
      }
    }));

    currentItem.splice(index, 1, {
      definition: currentItem[index].definition,
      value: e[0].value
    });

    // execute any custom calculations if any defined in the section/subsection level metadata
    if (this.props.section.CustomCalculateFunctions) {
      calculateService(this.props.section.CustomCalculateFunctions, e, currentItem, this.props.data);
    }

    this.setState({currentItem: currentItem, eventType: "onFormSave"});
    this.refreshComponentState(currentItem);
  }

  onUiUpdate(name, validate, compare) {
    let validationList = this.state.validationList; //todo use it for now, enhance it later, see comments below
    let index = lodash.indexOf(validationList, lodash.find(validationList, {name: name}));
    if (index < 0) {
      validationList.push({name, validate, compare});
      // this.setState({validationList});//todo use it for now, because setState()
      // will update all sub components
    } else {
      validationList.splice(index, 1, {name, validate, compare});
      // this.setState({validationList});//todo use it for now, because setState()
      // will update all sub components
    }
  }

  onAdd() {

    let listData = Object.assign([], this.state.listData);
    let currentItem = Object.assign([], this.state.currentItem);
    let newItem = {};

    currentItem.map((i) => {
      if (i.definition.ValueType === "DateTimeOffset?" && (i.value || i.definition.value) != null && i.value.constructor != null && i.value.constructor.name === 'Moment') {
        newItem[i.definition.Name] = formatJsonDateString(i.value || i.definition.value);
      } else if (i.definition.ValueType === "DateTimeOffset?" && i.definition.ReadOnly && i.definition.value) {
        let utcDate = (moment(i.value).isUtc()
          ? moment(i.value).utc().format('MM/DD/YYYY')
          : moment(i.value).utcOffset(moment().utcOffset()).format('MM/DD/YYYY'));
        newItem[i.definition.Name] = formatJsonDateString(utcDate);
      } else {
        newItem[i.definition.Name] = i.value;
      }
      //for Signature section only
      if (i.definition.Name === "OnBehalfOfOuId") {
        newItem[i.definition.Name] = this.props.currentIdentity.OrganizationUnitId;
      } else if (i.definition.Name === "OnBehalfOfOuName") {
        newItem[i.definition.Name] = this.props.currentIdentity.OrganizationUnitName;
      } else if (i.definition.Name === "SignDate") {
        newItem[i.definition.Name] = new Date();
      } else if (i.definition.Name === "StaffName") {
        newItem[i.definition.Name] = this.props.currentIdentity.OnBehalfOfPersonName;
      }
    });
    //validation
    this.setState({formValidated: true, eventType: "onAdd"});
    let validationResult = true;
    for (let validation of this.state.validationList) {
      if (validation.compare) {
        validationResult = validation.validate(compareValue(validation, newItem));
      } else if (!validation.validate()) {
        validationResult = false;
      }
    }
    if (validationResult) {
      if (this.hasNoData(currentItem)) {
        return;
      }

      listData.push(newItem);

      this.clearCurrentItemData(listData);
      let changes = [];
      changes.push({name: this.state.currentFieldNamePrefix, value: listData});
      this
        .props
        .onChange(changes);
      this.setState({formValidated: false});
    }
  }

  onSave() {
    let listData = Object.assign([], this.state.listData);
    let currentItem = Object.assign([], this.state.currentItem);
    let newItem = {};

    currentItem.map((i) => {
      if (i.definition.ValueType === "DateTimeOffset?" && i.value != null && i.value.constructor != null && i.value.constructor.name === 'Moment') {
        newItem[i.definition.Name] = formatJsonDateString(i.value);
      } else {
        newItem[i.definition.Name] = i.value;
      }
      //for Signature section only
      if (i.definition.Name === "OnBehalfOfOuId") {
        newItem[i.definition.Name] = this.props.currentIdentity.OrganizationUnitId;
      } else if (i.definition.Name === "OnBehalfOfOuName") {
        newItem[i.definition.Name] = this.props.currentIdentity.OrganizationUnitName;
      }
    });
    //validation
    this.setState({formValidated: true, eventType: "onSave"});
    let validationResult = true;
    for (let validation of this.state.validationList) {
      if (validation.compare) {
        validationResult = validation.validate(compareValue(validation, newItem));
      } else if (!validation.validate()) {
        validationResult = false;
      }
    }
    if (validationResult) {

      if (this.hasNoData(currentItem)) {
        return;
      }
      newItem.IsTouched = true;
      const underEditingIndex = this.state.underEditingIndex;
      listData.splice(underEditingIndex, 1, newItem);
      this.clearCurrentItemData(listData);
      let changes = [];
      changes.push({name: this.state.currentFieldNamePrefix, value: listData});
      this
        .props
        .onChange(changes);

      this.setState({formValidated: false});
    }
  }

  onItemRemove(yes)
  {
    if (yes) {
      const index = this.state.itemRemoveIndex;
      if (index >= 0) {
        let listData = Object.assign([], this.state.listData);
        listData.splice(index, 1);
        this.setState({listData: listData});
        let changes = [];
        changes.push({name: this.state.currentFieldNamePrefix, value: listData});
        this
          .props
          .onChange(changes);
      }
    }
    this.setState((prevState, props) => ({isOpenItemRemoveConfirm: false, itemRemoveIndex: null, eventType: "onItemRemove"}));
  }

  onClickRemove(index) {
    this.setState((prevState, props) => ({isOpenItemRemoveConfirm: true, itemRemoveIndex: index, eventType: "onClickRemove"}));
  }

  onClickEdit(index, value) {
    let currentItem = Object.assign([], this.state.currentItem);
    currentItem.map((i) => {
      i.value = value[i.definition.Name];
    });
    this.setState((prevState, props) => ({currentItem: currentItem, underEditingIndex: index, eventType: "onClickEdit"}));
    this.refreshComponentState(currentItem);
  }

  onCancel() {
    this.setState((prevState, props) => ({
      currentItem: this.getInitialFormData(),
      underEditingIndex: null,
      eventType: "onCancel"
    }));
    this.refreshComponentState(this.getInitialFormData());
  }

  render() {
    const {componentState, currentIdentity} = this.props;
    if (!(componentState || buildDefaultStateByItem(this.props.section))._display) {
      return null;
    }

    const renderProperButtons = (section) => {
      if (this.state.underEditingIndex === undefined || this.state.underEditingIndex === null) {
        if (!section.MaxOccurs || section.MaxOccurs > (this.state.listData
          ? this.state.listData.length
          : 0)) 

          return (
            <span className="addTo-button">
              <a
                onClick={(e) => {
                e.preventDefault();
                this.onAdd();
              }}
                role="button">Add New</a>
            </span>
          );
        }
      else {
        return ([< span key = '1' className = "CancelEdit-link" > <a
          key='cancel'
          onClick={(e) => {
          e.preventDefault();
          this.onCancel();
        }}
          role="button">Cancel</a > < /span>,
  <span key = '0' className = "addTo-button" > <a
    key='save'
    onClick={(e) => {
        e.preventDefault();
        this.onSave();
    }}
    role="button">Save Changes</a > </span>]);
      }
    };

    const {DisplayName, Items} = this.props.section;
    const displayName = metadataHelper.getDisplayName(DisplayName, this.props.data);

    const level = this.props.section.EditLevel || this.props.section.Level;
    const tdCount = (lodash.filter(Items, (item) => item.HideColumn !== true) || []).length;

    const renderActionColumn = (index, value) => {
      return (this.state.underEditingIndex === index
        ? <span>
            <span className="icon-pencil"></span>
            <b>Editing...</b>
          </span>
        : <span>
          <a
            onClick={(e) => {
            e.preventDefault();
            this.onClickEdit(index, value);
          }}
            title="Edit this item">Edit</a>
          <a
            onClick={(e) => {
            e.preventDefault();
            this.onClickRemove(index);
          }}
            title="Remove this item from the list">Remove</a>
        </span>);
    };

    return (
      <fieldset
        className={level === 1
        ? "fieldset-container-one"
        : level === 2
          ? "fieldset-container-two"
          : 'fieldset-container-three'}>
        <legend
          className={level === 1
          ? "legend-header-one"
          : level === 2
            ? 'legend-header-two'
            : 'legend-header-three'}>{`Manage ${displayName} List`}</legend>
        {this.props.section.Description
          ? <div className="row">
              <span className="label-info">{this.props.section.Description}</span>
            </div>
          : null}

        {this.state.currentItem && this
          .state
          .currentItem
          .map(item => <ArrayItemEditor
            key={item.definition.Name}
            item={item.definition}
            componentState={lodash.get(componentState, item.definition.Name)}
            value={item.value}
            data={this.props.data}
            formValidated={this.state.formValidated}
            onChange={this.onFormChange}
            eventType={this.state.eventType}
            currentIdentity={currentIdentity}
            onUiUpdate={this.onUiUpdate}
            dropdownDataSource={this.props.dropdownDataSource}/>)}
        <div className="add-to-table">
          <div className="center">
            {renderProperButtons(this.props.section, this.state.currentItem)}
          </div>
          <table className="generalTable noInit">
            <caption className="caption-header">
              <span>{displayName}</span>
            </caption>
            <thead>
              <tr>
                {Items.map(item => {
                  if (item.HideColumn !== true) {
                    return (
                      <th key={item.Name}>
                        {metadataHelper
                          .getDisplayName(item.DisplayName, this.props.data)
                          .replace(/\:+$/g, '')}
                      </th>
                    );
                  }
                })}
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.listData && this.state.listData.length > 0 && Items && Items.length > 0
                ? this
                  .state
                  .listData
                  .map((value, index) => {
                    return (
                      <tr key={index}>
                        {Items.map(item => {
                          if (item.HideColumn !== true) {
                            return (item.IsSignature && lodash.get(value, item.Name)
                              ? <td key={item.Name + index}><img
                                  className="autoResizeImage"
                                  alt={item.DisplayName + ' image'}
                                  src={lodash.get(value, item.Name)}/></td>
                              : <td key={item.Name + index}><String
                                value={convertValueToDisplayValue(lodash.get(value, item.DataPath || item.Name), item, index, this.props.section)}/></td>);
                          }
                        })}
                        {lodash.get(value, 'IsReadonly')
                          ? <td></td>
                          : lodash.get(value, 'SignatureType')
                            ? this.props.currentIdentity.OrganizationUnitId == lodash.get(value, 'OnBehalfOfOuId')
                              ? <td>
                                  {renderActionColumn(index, value)}
                                </td>
                              : <td></td>
                            : <td>
                              {renderActionColumn(index, value)}
                            </td>}
                      </tr>
                    );
                  })
                : <tr>
                  <td colSpan={tdCount + 1} className="dataTables_empty">No data available</td>
                </tr>}

            </tbody>
          </table>
        </div>

        <ModalConfirm
          isOpen={this.state.isOpenItemRemoveConfirm}
          title="Remove Item"
          message="Are you sure you want to remove this item from the list? Please note that after the item has been removed from the list, you have to click Save to preserve the changes."
          onYes={() => {
          this.onItemRemove(true);
        }}
          onNo={() => {
          this.onItemRemove(false);
        }}
          onClose={() => {
          this.onItemRemove(false);
        }}/>

      </fieldset>
    );
  };
}

ArraySectionEditor.propTypes = {
  fieldNamePrefix: PropTypes.string.isRequired,
  section: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  componentState: PropTypes.object,
  currentIdentity: PropTypes.object,
  arraySectionChanged: PropTypes.func,
  dropdownDataSource: PropTypes.object
};

export default ArraySectionEditor;
