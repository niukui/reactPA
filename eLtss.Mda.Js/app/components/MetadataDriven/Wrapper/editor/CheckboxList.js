import React, {PropTypes} from 'react';
import CommonCheckboxList from 'components/Common/CheckboxList';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import lodash from 'lodash';
import extractDataOptions from 'utils/dataSourceHelper';

class CheckboxList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      options: [],
      dataSource: []
    };
  }

  componentDidMount() {
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
      required
    } = this.props;

    const prepareChanges = (selectedValue) => {
      const selectedValues = [];
      lodash.forEach(this.state.dataSource, (item) => {
        if (selectedValue.indexOf(item.Id) >= 0) {
          selectedValues.push({Id: item.Id, UniqueAttribute: item.UniqueAttribute});
        }
      });
      let changes = [];
      changes.push({name: name, value: selectedValues});
      onChange(changes);
    };

    let wrapperClass = item.ClassName || 'row';
    if (error && error.length > 0) {
      wrapperClass += " has-error";
    }
    let orientation = item.Orientation;

    const transferValue = (value || []).map((item) => {
      return item.Id;
    });

    if (item.Style === 'Vertical') {
      return (
        <fieldset className="fieldset-container-two">
          <legend className="legend-header-two">{label}{required && <RequiredIndicator/>}</legend>
          <div className="row">
            <span className="label">{item.Description}</span>
          </div>
          <CommonCheckboxList
            disabled={readonly}
            value={transferValue}
            onChange={prepareChanges}
            name={name}
            options={this.state.options}
            orientation={"Vertical"} />
          {error && <div className="error alert alert-danger">{error}</div>}</fieldset>
      );
    } else {
      return (
        <div className={wrapperClass}>
          <span htmlFor={name} className="label auto-width">{label}{required && <RequiredIndicator/>}</span>
          <CommonCheckboxList
            disabled={readonly}
            value={transferValue}
            onChange={prepareChanges}
            name={name}
            options={this.state.options}
            orientation={orientation}/>
          {error && <div className="error alert alert-danger">{error}</div>}
        </div>
      );
    }
  }
}

CheckboxList.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.string,
  readonly: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
};

export default CheckboxList;
