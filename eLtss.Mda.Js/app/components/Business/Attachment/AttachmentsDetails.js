import React, {PropTypes} from 'react';
import {formatJsonDate} from 'utils/dateHelper';
import {ISP_WORKFLOW_STATUS} from 'utils/constants';
import {HOST} from "config";
import * as aclHelper from 'utils/aclHelper';

const AttachmentsDetails = ({
  onDelete,
  attachments,
  dataId,
  clientId,
  securityContext,
  downloadAttachmentUrl
}) => {

  const renderUrl = (attachmentId) => {
    return `${HOST}${downloadAttachmentUrl}${dataId}'?clientAttachmentId=${attachmentId}&clientId=${clientId}`;
  };

  const canDelete = (organizationUnitId) => {
    if (securityContext.CurrentIdentity.OrganizationUnitId !== organizationUnitId) 
      return false;
    if (!aclHelper.canAccess(securityContext, "Attachments.DeleteAttachment")) {
      return false;
    }
    return true;
  };

  return (

    <table className="table generalTable">
      <thead>
        <tr>
          <th>Create Date</th>
          <th>Document Name</th>
          <th>Category</th>
          <th>Description</th>
          <th>Uploaded By</th>
          <th className="action">Action</th>
        </tr>
      </thead>
      <tbody>
        {attachments && attachments.map((attachment) => <tr key={attachment.Id}>
          <td>{formatJsonDate(attachment.CreatedDate)}</td>
          <td className="js-no-hide">
            <a href={renderUrl(attachment.Id)}>{attachment.FileName}</a>
          </td>
          <td>{attachment.AttachmentType.Name}</td>  
          <td>{attachment.Comments}</td>
          <td>{`${attachment.UploadUserName}(${attachment.UploadUserOrganizationUnitName})`}</td>
          <td>{canDelete(attachment.UploadUserOrganizationUnitId) && <a
              onClick={(e) => {
              e.preventDefault();
              onDelete(attachment.Id);
            }}
              title="Delete">Delete</a>}
          </td>
        </tr>)}
      </tbody>
    </table>
  );
};

AttachmentsDetails.propTypes = {
  attachments: PropTypes.array.isRequired,
  dataId: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  securityContext: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  downloadAttachmentUrl: PropTypes.string.isRequired
};

export default AttachmentsDetails;
