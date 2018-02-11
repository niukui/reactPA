import React, {PropTypes} from 'react';
import moment from 'moment';
import NewCollapsiblePanel from 'components/Common/NewCollapsiblePanel';
import FormNoteEditor from 'components/Business/FormNotes/FormNoteEditor';
import FormNotesDetails from 'components/Business/FormNotes/FormNotesDetails';

class FormNotes extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onAddFormNote = this
      .onAddFormNote
      .bind(this);
    this.onDeleteFormNote = this
      .onDeleteFormNote
      .bind(this);
  }

  onAddFormNote(content, accessOuId) {
    const entityData = this.props.data[this.props.metadata.Name] && this.props.data[this.props.metadata.Name];
    if (!entityData) {
      return null;
    }
    this
      .props
      .actions
      .addFormNote(content, accessOuId, this.props.data.IsCsb, entityData.Id, this.props.data.ClientId, this.props.metadata.Name);
  }
  onDeleteFormNote(dataId, formNoteId) {
    this
      .props
      .actions
      .deleteFormNote(dataId, formNoteId);
  }
  render() {
    const {data, securityContext, metadata, section, componentsState} = this.props;

    const {FormNoteAccessOuId, OuSelectList, IsCsb} = this.props.data;

    if (!section || !section.Name) {
      return null;
    }

    const entityData = data[metadata.Name] && data[metadata.Name];
    entityData.CurrentIdentity = data.CurrentIdentity;
    if (!entityData) {
      return null;
    }

    return (
      <NewCollapsiblePanel
        title={section.DisplayName}
        name={section.Name}
        isExpand={this.props.isExpand}
        onStatusChange={this.props.onStatusChange}
        headers={[< FormNoteEditor securityContext = {
          securityContext
        }
        onAddFormNote = {
          this.onAddFormNote
        }
        key = "1" dataId = {
          entityData.Id
        }
        clientId = {
          entityData.ClientId
        }
        formNoteAccessableOuId = {
          FormNoteAccessOuId
        }
        ouSelectList = {
          OuSelectList
        }
        isCsb = {
          IsCsb
        }
        data = {
          entityData
        } />]}>
        <FormNotesDetails data={entityData} onDeleteFormNote={this.onDeleteFormNote} securityContext = {securityContext} />
      </NewCollapsiblePanel>
    );
  }
}

FormNotes.propTypes = {
  isExpand: PropTypes.bool.isRequired,
  onStatusChange: PropTypes.func,
  data: PropTypes.object.isRequired,
  securityContext: PropTypes.object.isRequired,
  metadata: PropTypes.object.isRequired,
  section: PropTypes.object,
  componentsState: PropTypes.object.isRequired,
  FormNoteAccessOuId: PropTypes.string,
  OuSelectList: PropTypes.array,
  IsCsb: PropTypes.bool

};

export default FormNotes;