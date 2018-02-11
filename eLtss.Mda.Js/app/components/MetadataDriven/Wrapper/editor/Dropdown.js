import React, {PropTypes} from 'react';
import DropdownList from 'components/Common/DropdownList';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import lodash from 'lodash';
import extractDataOptions from 'utils/dataSourceHelper';

class Dropdown extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      options: [],
      dataSource: []
    };
  }

  /*  "DataSource": { // in the order of the following
      "Options": "SupportsPackageAreaSelectList",
      "LookupCategory": "supportspackageareas",
      "LookupPrefix": "ipc"
    }
  */

  componentWillMount() {
    this._mounting = true;
    const {item, dropdownDataSource} = this.props;
    const dataSourceOptions = extractDataOptions(item.DataSource, dropdownDataSource, item.Name);
    const {options, dataSource} = dataSourceOptions;
    if (typeof(options).then === 'function') {
      options.then((names) => {
        this._mounting && this.setState({options: names});
      });
    } else {
      this._mounting && this.setState({options});
    }

    if (typeof(dataSource).then === 'function') {
      dataSource.then((lookups) => {
        this._mounting && this.setState({dataSource: lookups});
      });
    } else {
      this._mounting && this.setState({dataSource});
    }
  }

  componentWillUnmount() {
    this._mounting = false;
  }

  render() {
    const {
      item,
      name,
      label,
      onChange,
      placeholder,
      value,
      error,
      readonly,
      required,
      dropdownDataSource
    } = this.props;

    const prepareChanges = (event) => {

      let changes = [];
      if (item.DataSource && item.DataSource.Options) {
        const dataSource = this.state.dataSource;
        let selectedItem = lodash.find(dataSource, function (option) {
          if (option.Id) {
            return option.Id === event.target.value.Id;
          } else {
            return option.Value === event.target.value.Id;
          }
        });
        const id = event.target.value.Id;
        changes.push({
          name: event.target.name,
          value: id
            ? selectedItem
            : null
        });
        onChange(changes);
      } else if (item.DataSource) {
        let selectedItems = lodash.filter(this.state.dataSource, function (option) {
          return option.Id === event.target.value.Id;
        });
        let selectedItem = (selectedItems && selectedItems.length > 0)
          ? selectedItems[0]
          : null;
        changes.push({name: event.target.name, value: selectedItem});
        onChange(changes);
      } else {
        let lookupItem = lodash.filter(this.state.dataSource, function (option) {
          return option.Id === event.target.value.Id;
        });
        let UniqueAttribute = (lookupItem && lookupItem.length > 0)
          ? lookupItem[0].UniqueAttribute
          : null;
        changes.push({
          name: event.target.name,
          value: event.target.value.Id
            ? {
              Id: event.target.value.Id,
              UniqueAttribute
            }
            : null
        });
        onChange(changes);
      }
    };

    let wrapperClass = item.ClassName || 'row';
    if (error) {
      wrapperClass += " has-error";
    }

    return (
      <div className={wrapperClass}>
        <label htmlFor={name}>{label}{required && <RequiredIndicator/>}</label>
        <DropdownList
          readonly={readonly}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={prepareChanges}
          options={this.state.options}
          saveRequired={required}/> {error && <div className="error alert alert-danger">{error}</div>}
      </div>
    );
  }
};

Dropdown.propTypes = {
  item: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.string,
  readonly: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  dropdownDataSource: PropTypes.object
};

export default Dropdown;
