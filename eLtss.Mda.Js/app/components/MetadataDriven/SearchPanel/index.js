import React, {PropTypes} from 'react';
import lodash from 'lodash';
import {convertValueToDisplayValue} from 'utils/displayConverter';
import ItemEditor from 'components/MetadataDriven/ItemEditor';
import DropdownList from 'components/Common/DropdownList';
import Multiselect from 'components/Common/Multiselect';
import Textarea from 'components/Common/Textarea';
import TextBoxInput from 'components/Common/TextBox';
class SearchPanel extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      error: {}
    };
  }

  onUiUpdate(){

  }

  render() {
    const {listView, context,searchCriteria,listModel} = this.props;
    if (!listView.SearchPanel) {
      return null;
    }

    return <fieldset className="fieldset-container-searcharea" id='ReactSearchPanel'>
        {listView.SearchPanel.FieldRows && listView
          .SearchPanel
          .FieldRows
          .map((fieldRow, rowIndex) => <div className="p-column" key={rowIndex}>
            {fieldRow
              .Items
              .map((item) => <ItemEditor
                item={item}
                name={item.Name}
                key={item.Name}
                label={item.DisplayName}
                fieldNamePrefix={''}
                data={searchCriteria}
                onChange={this.props.updateSearchCriteria}
                readonly={false}
                customAttribute={null}
                registerValidate={null}
                onUiUpdate={this.onUiUpdate}
                required={item.IsRequired}
                dropdownDataSource={listModel}/>)
}
          </div>)}
        <div className="searchspace-footer-bar">
          <div className="float-left">
            <button type="submit" id="btnSearchList"  onClick={this.props.onSearch}>Search</button>
            <input type="button" id="btnClear" onClick={this.props.onClear} name="clear" value="Clear"></input>
          </div>
          <div className="float-right">
            {this.props.buttons}
          </div>
        </div>
      </fieldset>;
  }
}

SearchPanel.propTypes = {
  listView: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  buttons: PropTypes.array.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  updateSearchCriteria: PropTypes.func.isRequired,
  searchCriteria: PropTypes.object.isRequired,
  listModel: PropTypes.object,
};

export default SearchPanel;