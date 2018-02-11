import React, {PropTypes} from 'react';
import Select from 'react-select';

class Multiselect extends React.Component {
  constructor() {
    super();
  }

  render() {
    const {
      name,
      value,
      options,
      onChange,
      disabled,
      placeholder,
      readonly
    } = this.props;

    return (
      <div className="section">
        <Select
          disabled={readonly}
          value={value}
          options={options}
          onChange={(v) => {
          onChange({
            target: {
              name: name,
              value: v.split(',')
            }
          });
        }}
          multi
          placeholder={placeholder}
          simpleValue/>
      </div>
    );
  }
}

Multiselect.propTypes = {
 name: PropTypes.string.isRequired,
 value: PropTypes.array,
 options: PropTypes.array,
 onChange: PropTypes.func,
 disabled:PropTypes.bool,
 placeholder:PropTypes.string,
 readonly:PropTypes.bool
}

export default Multiselect;