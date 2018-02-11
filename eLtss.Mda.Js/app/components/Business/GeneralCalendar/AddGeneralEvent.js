import React, {PropTypes} from 'react';
import ReactModal from "react-modal";
import GeneralEvent from "./GeneralEvent";
import * as aclHelper from 'utils/aclHelper';

class AddGeneralEvent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpen: false,
            generalEvent: {}
        };
        this.handleSave = this
            .handleSave
            .bind(this);
        this.handleCancel = this
            .handleCancel
            .bind(this);
        this.openDialog = this
            .openDialog
            .bind(this);
        this.updateGeneralEvent = this
            .updateGeneralEvent
            .bind(this);
    }

    handleSave(e) {
        e.preventDefault();
        e.stopPropagation();
        const {generalEvent} = this.state;
        if (this.props.onSave(generalEvent)) {
            this.setState({isOpen: false});
        }
    }

    handleCancel(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({isOpen: false});
    }

    openDialog(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({isOpen: true, generalEvent: {}});
    }

    updateGeneralEvent(generalEvent) {
        this.setState({generalEvent: generalEvent});
    }

    render() {
        const {securityContext, supportsPackageServices, lxServices} = this.props;
     
        if (!aclHelper.canManage(securityContext, "GeneralEvents")) {
            return false;
        }
        const {isOpen, generalEvent} = this.state;
        return (
            <div>
                <a href="javascript:void(0);" onClick={this.openDialog}>Add</a>
                <ReactModal
                    overlayClassName="overlay"
                    className="addGeneralEvent"
                    isOpen={isOpen}
                    contentLabel="">
                    <GeneralEvent
                        generalEvent={generalEvent}
                        title="Add Event"
                        updateGeneralEvent={this.updateGeneralEvent}
                        handleCancel={this.handleCancel}
                        handleSave={this.handleSave}
                        supportsPackageServices={supportsPackageServices}
                        lxServices={lxServices}/>
                </ReactModal>
            </div>
        );
    }
}

AddGeneralEvent.propTypes = {
    onSave: PropTypes.func.isRequired,
    securityContext: PropTypes.object.isRequired,
    supportsPackageServices: PropTypes.array,
    lxServices: PropTypes.array
};

export default AddGeneralEvent;