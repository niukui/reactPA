import React, {PropTypes} from 'react';
import ReactModal from "react-modal";

class ModalConfirm extends React.Component {
    constructor() {
        super();

        this.handleClose = this
            .handleClose
            .bind(this);
        this.handleYes = this
            .handleYes
            .bind(this);
        this.handleNo = this
            .handleNo
            .bind(this);

        this.state = {
            comment: ''
        };
    }

    handleClose() {
        if (this.props.onClose) {
            this
                .props
                .onClose();
            this.setState({comment: '', isSure:false});
        }
    }

    handleYes() {
        if (this.props.onYes) {
            this
                .props
                .onYes(this.state.comment);
            this.setState({comment: ''});
        }
    }
    handleNo() {
        if (this.props.onNo) {
            this
                .props
                .onNo();
            this.setState({comment: '', isSure:false});
        }
    }

    render() {
        const {title, message, isOpen, showComment, showCheck} = this.props;
        return (
            <div>

                <ReactModal
                    className="content"
                    overlayClassName="overlay"
                    isOpen={isOpen}
                    onRequestClose={() => {}}
                    contentLabel="">
                    <div className="confirm-title">{title}
                        <span>
                            <button onClick={this.handleClose}>X</button>
                        </span>
                    </div>
                    <div className="confirm-message">
                        {message}
                        {showComment
                            ? <div className="row">
                                    <label htmlFor="modal_comment">Comment:</label>
                                    <textarea
                                        id="modal_comment"
                                        value={this.state.comment || ''}
                                        onChange={(e) => {
                                            this.setState({ comment: e.target.value });
                                        }}
                                        className="comments-textarea"
                                        maxLength="2000" />
                            </div>
                            : null
                        }
                        {showCheck
                            ? <div className="row">
                                <label>
                                    Are you sure?
                                    <input
                                        name="isSure"
                                        type="checkbox"
                                        onChange={(e) => {
                                            this.setState({ isSure: e.target.checked });
                                        }} />
                                </label>
                            </div>

                            : null}
                    </div>
                    <div className="footer">
                        <button className="confirm-button-yes" onClick={this.handleYes} disabled={showCheck && !this.state.isSure}>Continue</button>
                        <button className="confirm-button-no" onClick={this.handleNo}>Cancel</button>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

ModalConfirm.propTypes = {
    onClose: PropTypes.func.isRequired,
    onYes: PropTypes.func.isRequired,
    onNo: PropTypes.func.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    showComment: PropTypes.bool,
    showCheck: PropTypes.bool
}

export default ModalConfirm;
