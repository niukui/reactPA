import React, {PropTypes} from 'react';
import {formatJsonDate} from 'utils/dateHelper';
import * as aclHelper from 'utils/aclHelper';

class IspFormNotesDetails extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onClickDelete = this
      .onClickDelete
      .bind(this);
  }
  onClickDelete(dataId, formNoteId) {
    this
      .props
      .onDeleteFormNote(dataId, formNoteId);
  }

  render() {
    const {
      data,
      securityContext
    } = this.props;
    const canDelete= ((securityContext) => {
             return aclHelper.canDelete(securityContext, "FormNotes.DeleteFormNote");
           })(securityContext);

    return (
      <table className="table generalTable">
        <thead>
          <tr>
            <th>Content</th>
            <th>Created By</th>
            <th>Create Date</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(data && data.FormNotes && data.FormNotes.length > 0 ) 
           ? data
            .FormNotes
            .map((note) => <tr key={note.Id}>
              <td>{note.Content}</td>
              <td>{note.CreatedBy && note.CreatedBy.FullName}</td>
              <td>{formatJsonDate(note.CreateDate)}</td>
              <td>
              {(canDelete && ((data.CurrentIdentity && data.CurrentIdentity.OnBehalfOfPersonId === note.CreatedBy.UserId) || (data.CurrentIdentity && data.CurrentIdentity.Attributes.includes(aclHelper.RULE_ATTRIBUTES.superUser))))
                  ? <span>
                      <a
                        onClick={(e) => {
                        e.preventDefault();
                        this.onClickDelete(data.Id, note.Id);
                      }}
                        title="Permanently delete this item">Delete</a>
                    </span>
                  : null}
              </td>
            </tr>)
            : (
               <tr>
                     <td colSpan="4" className="dataTables_empty">No data available</td>
               </tr>
              )
}
        </tbody>
      </table>
    )
  }

}

IspFormNotesDetails.propTypes = {
  data: PropTypes.object.isRequired,
  securityContext: PropTypes.object.isRequired
};

export default IspFormNotesDetails;
