import React, {PropTypes} from 'react';
import ReactModal from "react-modal";

class ModalInfo extends React.Component {
    constructor() {
        super();

        this.handleClose = this
            .handleClose
            .bind(this);
        this.handleOk = this
            .handleOk
            .bind(this);
    }

    handleClose() {
        if (this.props.onClose) {
            this
                .props
                .onClose();
        }
    }

    handleOk() {
        if (this.props.onOk) {
            this
                .props
                .onOk();
            this
                .props
                .onClose();
        }
    }

    render() {
        const {title, message, isOpen} = this.props;
        return (
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
                <div className="confirm-message">{message}
                </div>
                <div className="footer">
                    <button className="confirm-button-yes" onClick={this.handleOk}>Ok</button>
                </div>
            </ReactModal>
        );
    }
}

ModalInfo.propTypes ={
    onClose: PropTypes.func,
    onOk: PropTypes.func,
    title: PropTypes.string,
    message: PropTypes.string,
    isOpen: PropTypes.bool
}

export default ModalInfo;
