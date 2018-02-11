import React, {PropTypes} from 'react';
import {findNamesByAttributes} from 'services/lookupServices';
import Dropdown from 'components/MetadataDriven/Wrapper/editor/Dropdown';
import extractDataOptions from 'utils/dataSourceHelper';
import {toString, filter} from 'lodash';

class AttributeFilterDropdown extends Dropdown {

  componentWillMount() {

    const {item, dropdownDataSource} = this.props;

    const dataSourceOptions = extractDataOptions(item.DataSource, dropdownDataSource, item.Name, item.RuleAttributes || this.props.ruleAttributes);

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

  componentWillReceiveProps(nextProps) {
        const dataSource = this.props.item.DataSource;
        let lookupCategory = dataSource && dataSource.LookupCategory;
        if (lookupCategory) {
          lookupCategory = lookupCategory.toLowerCase();
        } else if (dataSource.LookupPrefix) {
          lookupCategory = `${dataSource
            .LookupPrefix}${this
            .props
            .item
            .Name}s`
            .toLowerCase();
        };
        findNamesByAttributes(lookupCategory, nextProps.ruleAttributes).then((options) => {
          this.setState({
            options: Object.assign([], options)
          });
        });
      }
    }

AttributeFilterDropdown.propTypes = {
  ruleAttributes: PropTypes.array
};

export default AttributeFilterDropdown;
