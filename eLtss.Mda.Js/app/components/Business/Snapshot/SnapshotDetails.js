import React, {PropTypes} from 'react';
import {formatJsonDate} from 'utils/dateHelper';
import {ISP_WORKFLOW_STATUS} from 'utils/constants';
import {HOST} from "config";
import * as aclHelper from 'utils/aclHelper';

const SnapshotDetails = ({
  Snapshots,
  dataId,
  clientId,
  securityContext,
  downloadSnapshotUrl
}) => {

  const renderUrl = (snapshotName) => {
    return `${HOST}/planofcares/planofcare/DownloadSnapshot?snapshotName=${snapshotName}&clientId=${clientId}&id=${dataId}`;
  };

  return (

    <table className="table generalTable">
      <thead>
        <tr>
          <th>Create Date</th>
          <th>Document Name</th>
        </tr>
      </thead>
      <tbody>
         {Snapshots && Snapshots.map((Snapshot) => <tr key={Snapshot.FileName}>
          <td>{formatJsonDate(Snapshot.CreateDate)}</td>
          <td className="js-no-hide">
            <a href={renderUrl(Snapshot.FileName)}>{Snapshot.FileName}</a>
          </td>
        </tr>)} 
      </tbody>
    </table>
  );
};

SnapshotDetails.propTypes = {
  Snapshots: PropTypes.array.isRequired,
  dataId: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  securityContext: PropTypes.object.isRequired,
  downloadSnapshotUrl: PropTypes.string.isRequired
};

export default SnapshotDetails;
