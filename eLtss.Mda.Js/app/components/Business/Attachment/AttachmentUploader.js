import React, {PropTypes} from 'react';
import ReactModal from "react-modal";
import DropdownList from 'components/Common/DropdownList';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import {selectListItemsForDropdown} from 'utils/dropdownTransformer';
import * as aclHelper from 'utils/aclHelper';
import Dropzone from 'react-dropzone';

class AttachmentUploader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpen: false,
            category: null,
            comment: "",
            files: [],
            attachmentError: "",
            attachmentCategoryError: ""
        };
        this.handleClose = this
            .handleClose
            .bind(this);
        this.handleUpload = this
            .handleUpload
            .bind(this);
        this.handleCancel = this
            .handleCancel
            .bind(this);
        this.openDialog = this
            .openDialog
            .bind(this);
        this.onCategoryChange = this
            .onCategoryChange
            .bind(this);
        this.onCommentChange = this
            .onCommentChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
        this.onDrop = this
            .onDrop
            .bind(this);
    }

    onDrop(files) {
        this.setState((prevState, props) => ({files: files, attachmentError: ""}));
    }

    handleClose(e) {
        this.closeDialog(e);
        this.setState({
            isOpen: false,
            category: null,
            comment: "",
            files: [],
            attachmentError: "",
            attachmentCategoryError: ""
        });
    }

    handleUpload(e) {
        e.preventDefault();
        e.stopPropagation();
        this.handleClose(e);
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

    onCategoryChange(e) {
        this.setState({category: e.target.value});
        this.setState({attachmentCategoryError: ""});
    }

    closeDialog(e) {
        this.setState({isOpen: false});
    }

    onCommentChange(e) {
        this.setState({comment: e.target.value});
    }

    handleSubmit(e) {
        let isValid = true;

        if (!this.state.files.length) {
            this.setState({attachmentError: "The file is required to save"});
            isValid = false;
        }

        if (!this.state.category || !this.state.category.Id) {
            this.setState({attachmentCategoryError: "The category type is required to save"});
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
            return;
        }

        this
            .props
            .onUploadAttachment(this.props.clientId, this.props.dataId, this.state.files, this.state.category, this.state.comment);
        this.handleClose(e);
    }

    render() {
        if (!aclHelper.canManage(this.props.securityContext, "Attachments.UploadAttachment")) {
            return null;
        }

        let dropzoneRef;

        return (
            <div>
                <a href="javascript:void(0);" onClick={this.openDialog}>Upload Attachments</a>
                <ReactModal
                    className="attachFileModal"
                    overlayClassName="overlay"
                    isOpen={this.state.isOpen}
                    onRequestClose={() => {}}
                    contentLabel="">
                    <div className="confirm-title">New Document
                        <span>
                            <button onClick={this.handleClose}>X</button>
                        </span>
                    </div>
                    <div className="confirm-message">
                        <fieldset className="fieldset-container-one">
                            <legend className="legend-header-one">New Document Upload</legend>
                            <div className="row">
                                <label className="auto-width" htmlFor="attachment">File Name:<RequiredIndicator/> {this.state.files.length > 0 && `${this
                                        .state
                                        .files[0]
                                        .name} - ${this
                                        .state
                                        .files[0]
                                        .size
                                        .toLocaleString()} bytes`}</label>
                                <Dropzone
                                    className="button"
                                    ref={(node) => {
                                    dropzoneRef = node;
                                }}
                                    onDrop={this.onDrop}
                                    multiple={false}></Dropzone>
                                <button
                                    type="button"
                                    onClick={() => {
                                    dropzoneRef.open()
                                }}>
                                    Attach File
                                </button>
                                {this.state.attachmentError && <div className="error alert alert-danger">{this.state.attachmentError}</div>}
                            </div>
                            <div className="row">
                                <label className="complete-required" htmlFor="AttachmentTypeId">Category:</label>
                                <DropdownList
                                    id="AttachmentTypeId"
                                    name="AttachmentTypeId"
                                    onChange={this.onCategoryChange}
                                    value={this.state.category}
                                    options={selectListItemsForDropdown(this.props.categoryTypes || [])}
                                    saveRequired={true}/> {this.state.attachmentCategoryError && <div className="error alert alert-danger">{this.state.attachmentCategoryError}</div>}
                            </div>
                            <div className="row">
                                <label htmlFor="Comments">Comments:</label>
                                <textarea
                                    value={this.state.comment}
                                    onChange={this.onCommentChange}
                                    className="comments-textarea"
                                    name="Comments"
                                    id="Comments"
                                    maxLength="2000"></textarea>
                            </div>
                            <div className="searchspace-footer-bar">
                                <div className="float-right">
                                    <button className="confirm-button-no" onClick={this.handleCancel}>Cancel</button>
                                    <button className="confirm-button-yes" onClick={this.handleSubmit}>Upload</button>
                                </div>
                            </div>
                            <input
                                id="AttachedDocumentId"
                                name="AttachedDocumentId"
                                type="hidden"
                                value={this.props.dataId}/>
                            <input id="ClientId" name="ClientId" type="hidden" value={this.props.clientId}/>
                        </fieldset>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

AttachmentUploader.propTypes = {
    securityContext: PropTypes.object.isRequired,
    dataId: PropTypes.string.isRequired,
    clientId: PropTypes.string.isRequired,
    categoryTypes: PropTypes.array,
    onUploadAttachment: PropTypes.func.isRequired
};

export default AttachmentUploader;