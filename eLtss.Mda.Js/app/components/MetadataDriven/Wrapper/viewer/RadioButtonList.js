import React, {PropTypes} from 'react';
import CommonRadioButtonList from 'components/Common/RadioButtonList';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import lodash from 'lodash';
import extractDataOptions from 'utils/dataSourceHelper';

class RadioButtonList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      options: [],
      dataSource: []
    };
  }

  componentWillMount() {
    const {item, dropdownDataSource} = this.props;

    const dataSourceOptions = extractDataOptions(item.DataSource, dropdownDataSource, item.Name);
    const {options, dataSource} = dataSourceOptions;
    if (typeof(options).then === 'function') {
      options.then((names) => {
        this.setState({options: names});
      });
    } else {
      this.setState({options});
    }

    if (typeof(dataSource).then === 'function') {
      dataSource.then((lookups) => {
        this.setState({dataSource: lookups});
      });
    } else {
      this.setState({dataSource});
    }
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

    //console.log(value?value.Id:null);
    const prepareChanges = (event) => {};

     let wrapperClass = item.ClassName || 'row';
    if (error) {
      wrapperClass += " has-error";
    }

    if (item.Style === 'Vertical') {
      return (
        <div className={wrapperClass}>
          <label htmlFor={name}>{label}{required && <RequiredIndicator/>}</label>

          <CommonRadioButtonList
            key={name}
            id={name}
            name={name}
            options={this.state.options}
            value={value
            ? value.Id
            : value}
            onChange={prepareChanges}
            disabled={true}
            orientation={"Vertical"}
            extraProps={{
            "style": {
              "display": "inline"
            }
          }}/> {error && <div className="error alert alert-danger">{error}</div>}
        </div>
      );
    } else {
      return (
        <div className={wrapperClass} style={item.Styles}>
          <label htmlFor={name}>{label}{required && <RequiredIndicator/>}</label>
          <CommonRadioButtonList
            key={name}
            id={name}
            name={name}
            options={this.state.options}
            value={value
            ? value.Id
            : value}
            onChange={prepareChanges}
            disabled={true}
            extraProps={{
            "style": {
              "display": "inline"
            }
          }}/> {error && <div className="error alert alert-danger">{error}</div>}
        </div>
      );
    }
  }
};

RadioButtonList.propTypes = {
  item: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.string,
  readonly: PropTypes.bool,
  required: PropTypes.bool.isRequired,
  dropdownDataSource: PropTypes.object
};

export default RadioButtonList;
