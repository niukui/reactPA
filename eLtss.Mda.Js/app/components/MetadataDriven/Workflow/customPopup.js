import React, {PropTypes} from 'react';
import ItemEditor from '../ItemEditor';
import ReactModal from "react-modal";
import {OR_TYPE_IDS} from './../constants';

class CustomPopup extends React.Component {
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
    this.changeReason = this
      .changeReason
      .bind(this);
    this.state = {
      otherRequired:false  
    }
  }

  handleClose() {
    if (this.props.onClose) {
      this
        .props
        .onClose();
    }
    this.setState({otherRequired:false})
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
    this.setState({otherRequired:false})
  }
  changeReason(changes){
    if(changes && changes.length>0){
      if(this.props.onChange){
        if(changes[0].value.Value === OR_TYPE_IDS.other ){
          this.setState({otherRequired:true})
        }else{
          this.setState({otherRequired:false})
        }
        this.props.onChange(changes);
      }
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
    {items[1].IsRequired = this.state.otherRequired;}
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
          <div className="confirm-message">{message} 
            <div className='row'>
              <ItemEditor
                    fieldNamePrefix={fieldNamePrefix}
                    key={items[0].Name}
                    formValidated={this.props.formValidated}
                    item={items[0]}
                    data={data}
                    onChange={this.changeReason}
                    onUiUpdate={this.props.onUiUpdate}
                    dropdownDataSource={dropdownDataSource}/>
            </div>
            <div className='row'>
              <ItemEditor
                    fieldNamePrefix={fieldNamePrefix}
                    key={items[1].Name}
                    formValidated={this.props.formValidated}
                    item={items[1]}
                    data={data}
                    IsRequired={this.state.otherRequired}
                    onChange={this.props.onChange}
                    onUiUpdate={this.props.onUiUpdate}
                    dropdownDataSource={dropdownDataSource}/>              
            </div>
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

CustomPopup.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  isOpen: PropTypes.bool,
  items: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onUiUpdate: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  formValidated: PropTypes.bool.isRequired
}

export default CustomPopup;