
import React, { PropTypes } from 'react';
import ReactModal from "react-modal";
import TextareaInput from 'components/Common/Textarea';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import DropdownList from 'components/Common/DropdownList';
import { selectListItemsForDropdown } from 'utils/dropdownTransformer';
import * as aclHelper from 'utils/aclHelper';

class FormNoteEditor extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isOpen: false,
            selectedOu: {},
            formNoteContent: "",
            formNoteContentError: ""
        };

        this.handleClose = this
            .handleClose
            .bind(this);
        this.handleSave = this
            .handleSave
            .bind(this);
        this.handleCancel = this
            .handleCancel
            .bind(this);
        this.openDialog = this
            .openDialog
            .bind(this);
        this.onContentChange = this
            .onContentChange
            .bind(this);
        this.onAccessOuIdChange = this
            .onAccessOuIdChange
            .bind(this);
        this.formValidation = this
            .formValidation
            .bind(this);
    }

    handleClose(e) {
        this.closeDialog(e);
        this.setState({
            selectedOu: {},
            formNoteContent: "",
            formNoteContentError: "",
        });
    }

    handleSave(e) {
        if (this.formValidation()) {
            if (this.props.isCsb) {
                let selectedOuId = this.state.selectedOu.Id?this.state.selectedOu.Id:"";
                this.props
                    .onAddFormNote(this.state.formNoteContent, selectedOuId);
            }
            else {
                this.props
                    .onAddFormNote(this.state.formNoteContent, this.props.formNoteAccessableOuId);
            }
            this.handleClose(e);
        }
    }

    handleCancel(e) {
        e.preventDefault();
        e.stopPropagation();
        this.handleClose(e);
    }

    openDialog(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ isOpen: true });
    }
    closeDialog(e) {
        this.setState({ isOpen: false });
    }

    onContentChange(e) {
        this.setState({ formNoteContent: e.target.value });
        this.setState({ formNoteContentError: '' });
    }

    onAccessOuIdChange(e) {
        this.setState({ selectedOu: e.target.value });
    }

    formValidation() {
        let formIsValid = true;
        if (!this.state.formNoteContent) {
            this.setState({ "formNoteContentError": 'This field is required' });
            formIsValid = false;
        }
        return formIsValid;
    }

    render() {
        const {
            data,
            securityContext
        }=this.props;

        if (!aclHelper.canManage(securityContext, "FormNotes.AddFormNote")) {
            return null;
        }
        const canAdd = ((securityContext) => {
            return aclHelper.canManage(securityContext, "FormNotes.AddFormNote");
        })(securityContext);

        const accessableOrganizationUnitId = this.props.formNoteAccessableOuId;
        const ouSelectList = this.props.ouSelectList;
        const isCsb = this.props.isCsb;

        return (
            <div>
              
               {canAdd &&
                <a href="javascript:void(0);" 
                onClick={this.openDialog}>Add Approach</a>}
                <ReactModal
                    className="content"
                    overlayClassName="overlay"
                    isOpen={this.state.isOpen}
                    onRequestClose={() => { }}
                    contentLabel="">
                    <div className="confirm-title">New Approach
                        <span>
                            <button onClick={this.handleClose}>X</button>
                        </span>
                    </div>
                    <div className="confirm-message">
                        <label className="auto-width" htmlFor="formNoteContent">
                            Note Content<RequiredIndicator />
                        </label>
                        <TextareaInput
                            id="formNoteContent"               
                            name="formNoteContent"
                            onChange={this.onContentChange}
                            value={this.state.formNoteContent}
                            readonly={false}
                            isRequired={true}
                        />
                        {this.state.formNoteContentError && <div className="error alert alert-danger">{this.state.formNoteContentError}</div>}
                        {isCsb ? <div className="row" id="formNoteSendToRow">
                            
                        </div> :
                            <div>
                                <input id="IspFormNote_AccessableOrganizationUnitId" name="IspFormNote.AccessableOrganizationUnitId" type="hidden" value={accessableOrganizationUnitId} />
                            </div>}
                        <div className="searchspace-footer-bar">
                            <div className="float-right">
                                <button className="confirm-button-no" onClick={this.handleCancel}>Cancel</button>
                                <button className="confirm-button-yes" onClick={this.handleSave}>Save</button>
                            </div>
                        </div>
                   
                    </div>
                </ReactModal>
            </div>
        );
    }
}
FormNoteEditor.propTypes = {
    onAddFormNote: PropTypes.func.isRequired,
    securityContext: PropTypes.object.isRequired,
    dataId: PropTypes.string.isRequired,
    clientId: PropTypes.string.isRequired,
    isCsb: PropTypes.bool,
    formNoteAccessableOuId: PropTypes.string,
    ouSelectList: PropTypes.array

};
export default FormNoteEditor;
