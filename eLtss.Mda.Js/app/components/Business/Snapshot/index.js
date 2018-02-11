import React, {PropTypes} from 'react';
import NewCollapsiblePanel from 'components/Common/NewCollapsiblePanel';
import SnapshotDetails from './SnapshotDetails';

class Snapshot extends React.Component {
  constructor(props, context) {
    super(props, context);

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
        headers={[]}>
        <SnapshotDetails
          Snapshots={entityData.Snapshots}
          dataId={entityData.Id}
          clientId={entityData.ClientId}
          securityContext={securityContext}
          downloadSnapshotUrl={metadata.Options.DownloadAttachmentUrl}/>
      </NewCollapsiblePanel>

    );
  }
}

Snapshot.propTypes = {
  isExpand: PropTypes.bool.isRequired,
  onStatusChange: PropTypes.func,
  data: PropTypes.object.isRequired,
  securityContext: PropTypes.object.isRequired,
  metadata: PropTypes.object,
  section: PropTypes.object,
  moduleName: PropTypes.string,
  componentsState: PropTypes.object.isRequired
};

export default Snapshot;