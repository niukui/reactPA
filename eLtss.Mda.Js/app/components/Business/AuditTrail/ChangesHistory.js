import React, {PropTypes} from 'react';
import {formatJsonDate} from 'utils/dateHelper';
import ChangeHistoryItem from './ChangesHistoryItem';

class ChangesHistory extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {histories} = this.props;
    return (
      <div>
        {(histories || []).map((his, index) => (
          <ChangeHistoryItem key={index} history={his} />
        ))}
      </div>
    );
  }
}

ChangesHistory.propTypes = {
  histories: PropTypes.array.isRequired,
};

export default ChangesHistory;
