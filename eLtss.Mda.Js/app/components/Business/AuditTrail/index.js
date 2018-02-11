import React, {PropTypes} from 'react';
import moment from 'moment';
import NewCollapsiblePanel from 'components/Common/NewCollapsiblePanel';
import ModalConfirm from "components/Common/ModalConfirm";
import ChangesHistory from 'components/Business/AuditTrail/ChangesHistory';
import * as aclHelper from 'utils/aclHelper';
import {get} from 'lodash';

class AuditTrail extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isOpenDeleteAttachmentConfirm: false,
      deleteAttachmentId: ''
    }
    this.onDeleteAttachment = this
      .onDeleteAttachment
      .bind(this);
    this.clickDeleteAttachment = this
      .clickDeleteAttachment
      .bind(this);
  }

  clickDeleteAttachment(attachmentId) {
    this.setState((prevState, props) => ({deleteAttachmentId: attachmentId, isOpenDeleteAttachmentConfirm: true}));
  }

  onDeleteAttachment(yes, dataId, clientId) {
    if (yes) {
      this
        .props
        .actions
        .deleteAttachment(dataId, this.state.deleteAttachmentId, clientId);
    }
    this.setState((prevState, props) => ({
      deleteAttachmentId: '',
      isOpenDeleteAttachmentConfirm: !this.state.isOpenDeleteAttachmentConfirm
    }));

  }

  render() {
    const {
      data,
      securityContext,
      metadata,
      section,
      componentsState,
      onSwitchExpandStatus
    } = this.props;
    
    if (!section || !section.Name) {
      return null;
    }
    return (
      <NewCollapsiblePanel
      title={section.DisplayName}
      hideForPrint={true}
      name={section.Name}
      isExpand={this.props.isExpand}
      onStatusChange={this.props.onStatusChange}>
      <ChangesHistory histories={data.AuditTrails || []}/>
    </NewCollapsiblePanel> );
  }
}

AuditTrail.propTypes = {
  isExpand: PropTypes.bool.isRequired,
  onStatusChange: PropTypes.func,
  data: PropTypes.object.isRequired,
  securityContext: PropTypes.object.isRequired,
  metadata: PropTypes.object,
  section: PropTypes.object,
  componentsState: PropTypes.object.isRequired,
};

export default AuditTrail;