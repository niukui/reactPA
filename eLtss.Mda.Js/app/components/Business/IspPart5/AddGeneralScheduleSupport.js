import React, {PropTypes} from 'react';
import ReactModal from "react-modal";
import GeneralScheduleSupport from "./GeneralScheduleSupport";
import * as aclHelper from 'utils/aclHelper';

class AddGeneralScheduleSupport extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpen: false,
            activity: {}
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
        this.updateActivity = this
            .updateActivity
            .bind(this);
    }

    handleSave(e) {
        e.preventDefault();
        e.stopPropagation();
        const {activity} = this.state;
        if (this.props.onSave(activity)) {
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
        this.setState({isOpen: true, activity: {}});
    }

    updateActivity(activity) {
        this.setState({activity: activity});
    }

    render() {
        const {securityContext, overlapCheck, serviceOutcomes} = this.props;

         if (!aclHelper.canManage(securityContext, "GeneralScheduleSupports")) {
             return null;
         }
        const {isOpen, activity} = this.state;
        return (
            <div>
                <a href="javascript:void(0);" onClick={this.openDialog}>Add New Support</a>
                <ReactModal
                    overlayClassName="overlay"
                    className="addSupportModal"
                    isOpen={isOpen}
                    contentLabel="">
                    <GeneralScheduleSupport
                        activity={activity}
                        title="Add Support"
                        updateActivity={this.updateActivity}
                        handleCancel={this.handleCancel}
                        handleSave={this.handleSave}
                        serviceOutcomes={serviceOutcomes}
                        overlapCheck={overlapCheck}/>
                </ReactModal>
            </div>
        );
    }
}

AddGeneralScheduleSupport.propTypes = {
    onSave: PropTypes.func.isRequired,
    overlapCheck: PropTypes.func.isRequired,
    securityContext: PropTypes.object.isRequired,
    serviceOutcomes: PropTypes.array.isRequired
};

export default AddGeneralScheduleSupport;