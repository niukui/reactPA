import React, {PropTypes} from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import {getLinkObject} from 'utils/metadataHelper';
import lodash from 'lodash';
import {convertValueToDisplayValue} from 'utils/displayConverter';
import SortHeaderCell, {SortTypes} from '../DataTable/SortHeaderCell';

const WrapperCell = ({rowIndex, data, item, metadata, context}) => {
  const dataIndex = Math.floor(Math.random() * (4));
  const dataItem = data[rowIndex];
  let dataValue = lodash.get(dataItem, item.DataPath);
  if (item.Actions && item.Actions.length > 0) {
    let buttons = item
      .Actions
      .map((action, index) => getLinkObject(action, context, dataItem, index, metadata));;
    return <Cell>{buttons}</Cell>;
  } else {
    return (
      <Cell>
        {convertValueToDisplayValue(dataValue, item)}
      </Cell>
    )
  }
};

class DataTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      tableWidth: 1000,
      sortedDataList: [],
      colSortDirs: {},
      tableHeight: 500,
      columnWidths: {}
    };

    this.onColumnResizeEndCallback = this
      .onColumnResizeEndCallback
      .bind(this);
    this.update = this
      .update
      .bind(this);
    this.onResize = this
      .onResize
      .bind(this);
    this.onSortChange = this
      .onSortChange
      .bind(this);
  }

  componentWillMount() {
    this.setState({
      sortedDataList: Object.assign([], this.props.data),
      colSortDirs: {}
    });
    const listView = this.props.listView;
    const columnWidths = {}
    listView
      .Items
      .map(item => {
        lodash.set(columnWidths, item.Name, item.Width);
      });
    this.setState({columnWidths});

  }

  componentDidMount() {
    this.update();
    var win = window;
    if (win.attachEvent) {
      win.attachEvent('onresize', this.onResize);
    } else {
      win.onresize = this.onResize;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        sortedDataList: Object.assign([], nextProps.data),
        colSortDirs: {}
      });
    }
  }

  onSortChange(columnKey, sortDir) {
    const listView = this.props.listView;
    const item = lodash.find(listView.Items,{Name:columnKey});
    const itemPath = item && item.DataPath || columnKey;
    let sortedData = lodash.orderBy(Object.assign([], this.props.data), itm => {
      return lodash.get(itm, itemPath)
    }, [(sortDir || SortTypes.DESC).toLowerCase()]);

    this.setState({
      sortedDataList: sortedData,
      colSortDirs: {
        [columnKey]: sortDir
      }
    });
  }

  onColumnResizeEndCallback(newColumnWidth, columnKey) {
    let {columnWidths} = this.state;
    lodash.set(columnWidths, columnKey, newColumnWidth);
    this.setState({columnWidths});
  }

  update() {
    var win = window;
    const leftMargin = this.props.listView && this.props.listView.ClassName === "workspace"
      ? 301
      : 0;
    const widthOffset = win.innerWidth <= 960
      ? 0
      : leftMargin;

    const tableWrapper = document.getElementById('tableWrapper');
    const searchPanel = document.getElementById('ReactSearchPanel');
    const heightOffset = tableWrapper && tableWrapper.offsetTop || searchPanel && searchPanel.offsetHeight || 62;
    const mainHeaderMenuBar = document.getElementById('mainHeader-MenuBar');
    let mainHeaderMenuHeight = 0;
    if (mainHeaderMenuBar) {
      mainHeaderMenuHeight = mainHeaderMenuBar.offsetHeight;
    }
    const mainTabbedNav = document.getElementById('mainTabbedNav');
    let mainTabbedNavHeight = 0;
    if (mainTabbedNav) {
      mainTabbedNavHeight = mainTabbedNav.offsetHeight;
    }

    this.setState({
      tableWidth: win.innerWidth - widthOffset,
      tableHeight: win.innerHeight - heightOffset - mainTabbedNavHeight - mainHeaderMenuHeight
    });

  }

  onResize() {
    clearTimeout(this.updateTimer);
    this.updateTimer = setTimeout(this.update, 16);
  }

  render() {
    const {data, metadata, listView, context} = this.props;

    const {sortedDataList, colSortDirs, tableWidth, tableHeight, columnWidths} = this.state;

    return <div id={'tableWrapper'}>
      <Table
        rowHeight={32.89}
        headerHeight={listView.HeaderHeight || 33.89}
        rowsCount={sortedDataList.length}
        width={tableWidth}
        isColumnResizing={false}
        onColumnResizeEndCallback={this.onColumnResizeEndCallback}
        maxHeight={tableHeight}>
        {listView && listView.Items && listView
          .Items
          .map((item, index) => {
            return (<Column
              key={index}
              columnKey={item.Name}
              fixed={item.Fixed}
              flexGrow={item.FlexGrow}
              isResizable={true}
              header={< SortHeaderCell onSortChange = {
              this.onSortChange
            }
            sortDir = {
              colSortDirs[item.Name]
            }
            columnKey = {
              item.Name
            } > {
              item.DisplayName
            } </SortHeaderCell>}
              cell={< WrapperCell key = {
              index
            }
            data = {
              sortedDataList
            }
            item = {
              item
            }
            metadata = {
              metadata
            }
            context = {
              context
            } > </WrapperCell>}
              minWidth={80}
              width={columnWidths[item.Name] || item.Width}/>);
          })
}
      </Table>
    </div>;
  }
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  metadata: PropTypes.object.isRequired,
  listView: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  onColumnResizeEndCallback: PropTypes.func
};

export default DataTable;
