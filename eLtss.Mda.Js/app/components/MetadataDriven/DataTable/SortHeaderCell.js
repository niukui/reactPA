import React, {PropTypes} from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import {getLinkObject} from 'utils/metadataHelper';
import lodash from 'lodash';

export const SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC'
};

const reverseSortDirection = sortDir => {
  return sortDir === SortTypes.DESC
    ? SortTypes.ASC
    : SortTypes.DESC;
};

class SortHeaderCell extends React.Component {
  constructor(props) {
    super(props);

    this._onSortChange = this
      ._onSortChange
      .bind(this);
  }

  render() {
    const {
      sortDir,
      children
    } = this.props;

    return (
      <Cell>
        <a className="SortHeaderCell" onClick={this._onSortChange}>
          {children}
          {sortDir
            ? (sortDir === SortTypes.DESC
              ? '↓'
              : '↑')
            : ''}
        </a>
      </Cell>
    );
  }

  _onSortChange(e) {
    e.preventDefault();

    if (this.props.onSortChange) {
      this
        .props
        .onSortChange(this.props.columnKey, this.props.sortDir
          ? reverseSortDirection(this.props.sortDir)
          : SortTypes.DESC);
    }
  }
}

SortHeaderCell.propTypes = {
  sortDir: PropTypes.string,
  children: PropTypes.array,
  columnKey: PropTypes.string,
  onSortChange: PropTypes.func
};

export default SortHeaderCell;
