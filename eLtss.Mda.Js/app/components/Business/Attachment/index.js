import React, {PropTypes} from 'react';
import moment from 'moment';
import {get} from 'lodash';
import NewCollapsiblePanel from 'components/Common/NewCollapsiblePanel';
import ModalConfirm from "components/Common/ModalConfirm";
import * as aclHelper from 'utils/aclHelper';
import AttachmentsDetails from './AttachmentsDetails';
import AttachmentUploader from './AttachmentUploader';

class Attachment extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOpenDeleteAttachmentConfirm: false,
      deleteAttachmentId: ''
    }

    this.onUploadAttachment = this
      .onUploadAttachment
      .bind(this);
    this.onDeleteAttachment = this
      .onDeleteAttachment
      .bind(this);
    this.clickDeleteAttachment = this
      .clickDeleteAttachment
      .bind(this);
  }

  onUploadAttachment(clientId, dataId, files, category, comment) {
    this
      .props
      .actions
      .uploadAttachment(clientId, dataId, files, category, comment,this.props.moduleName);
  }

  clickDeleteAttachment(attachmentId) {
    this.setState((prevState, props) => ({deleteAttachmentId: attachmentId, isOpenDeleteAttachmentConfirm: true}));
  }

  onDeleteAttachment(yes, dataId, clientId) {
  
    if (yes) {
      this
        .props
        .actions
        .deleteAttachment(dataId, this.state.deleteAttachmentId, clientId, this.props.moduleName);
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
    const entityData = data && data[metadata.Name];
    if (!entityData) {
      return null;
    }

    return (
      <NewCollapsiblePanel
        title={section.DisplayName}
        name={section.Name}
        isExpand={this.props.isExpand}
        onStatusChange={this.props.onStatusChange}
        headers={[< AttachmentUploader categoryTypes = {
          data.IspAttachmentUploadModel && data.IspAttachmentUploadModel.AttachmentTypeSelectList
        }
        securityContext = {
          securityContext
        }
        key = "1" dataId = {
          entityData.Id
        }
        clientId = {
          data.ClientId
        }
        onUploadAttachment = {
          this.onUploadAttachment
        } />]}>
        <AttachmentsDetails
          attachments={data.Attachments}
          dataId={entityData.Id}
          clientId={entityData.ClientId}
          securityContext={securityContext}
          onDelete={this.clickDeleteAttachment}
          downloadAttachmentUrl={metadata.Options.DownloadAttachmentUrl}/>
        <ModalConfirm
          isOpen={this.state.isOpenDeleteAttachmentConfirm}
          title="Delete Attachment"
          message="Are you sure you want to delete this attachment?"
          onYes={() => {
          this.onDeleteAttachment(true, entityData.Id, entityData.ClientId);
        }}
          onNo={() => {
          this.onDeleteAttachment(false);
        }}
          onClose={() => {
          this.onDeleteAttachment(false);
        }}/>
      </NewCollapsiblePanel>

    );
  }
}

Attachment.propTypes = {
  isExpand: PropTypes.bool.isRequired,
  onStatusChange: PropTypes.func,
  data: PropTypes.object.isRequired,
  securityContext: PropTypes.object.isRequired,
  metadata: PropTypes.object,
  section: PropTypes.object,
  moduleName: PropTypes.string,
  componentsState: PropTypes.object.isRequired
};

export default Attachment;