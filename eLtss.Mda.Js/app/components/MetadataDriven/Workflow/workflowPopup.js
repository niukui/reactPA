import React, {PropTypes} from 'react';
import ItemEditor from '../ItemEditor';
import ReactModal from "react-modal";
import { POC_TYPES } from '../../../utils/constants';
import lodash from 'lodash';

class WorkflowPopup extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this
      .handleClose
      .bind(this);
    this.handleYes = this
      .handleYes
      .bind(this);
    this.handleNo = this
      .handleNo
      .bind(this);
  }

  handleClose() {
    if (this.props.onClose) {
      this
        .props
        .onClose();
    }
  }

  handleYes() {
    if (this.props.onYes) {
      this
        .props
        .onYes();
    }
  }

  handleNo() {
    if (this.props.onNo) {
      this
        .props
        .onNo();
    }
  }

  render() {
    const {
      title,
      message,
      isOpen,
      display,
      items,
      data,
      fieldNamePrefix,
      dropdownDataSource
    } = this.props;
    
    let reopenWarning = lodash.find(items, { 'Name': "ReopenPlanOfCareWarning"});
    let showWarning = data.ReopenPlanOfCareType && reopenWarning && 
                      data.ReopenPlanOfCareType.Id !== POC_TYPES.review && 
                      data.ReopenPlanOfCareType.Id !== data.CurrentPlanOfCareType.Id;
    if(reopenWarning)
    {
      reopenWarning.Display = (showWarning) ? showWarning : false;
    }


    return (
      <div>
        <ReactModal
          className="content"
          isOpen={isOpen}
          contentLabel=""
          onRequestClose={() => {}}
          title={title}>
          <div className="confirm-title">{title}
            <span>
              <button onClick={this.handleClose}>X</button>
            </span>
          </div>
          <div className="confirm-message">{message} {items && items.map((item, index) => {
              return (
                <div className='row' key={index}>
                  <ItemEditor
                    fieldNamePrefix={fieldNamePrefix}
                    key={item.Name}
                    formValidated={this.props.formValidated}
                    item={item}
                    data={data}
                    onChange={this.props.onChange}
                    onUiUpdate={this.props.onUiUpdate}
                    dropdownDataSource={dropdownDataSource}/>
                </div>
              )
            })}
          </div>
          <div className="footer">
            <button className="confirm-button-yes" onClick={this.handleYes}>Continue</button>
            <button className="confirm-button-no" onClick={this.handleNo}>Cancel</button>
          </div>
        </ReactModal>
      </div>
    )
  }

}

WorkflowPopup.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  isOpen: PropTypes.bool,
  items: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onUiUpdate: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  formValidated: PropTypes.bool.isRequired
}

export default WorkflowPopup;