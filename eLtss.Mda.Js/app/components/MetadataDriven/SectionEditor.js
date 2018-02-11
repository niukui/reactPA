import React, {PropTypes} from 'react';
import ArraySectionEditor from './ArraySectionEditor';
import ItemEditor from './ItemEditor';
import * as metadataHelper from 'utils/metadataHelper';
import {get} from 'lodash';
import {buildDefaultStateByItem} from 'services/componentsServices';

class SectionEditor extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.getFieldName = this
      .getFieldName
      .bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.componentState && this.props.componentState && nextProps.componentState._display !== this.props.componentState._display && nextProps.componentState._display === false) {
      this
        .props
        .onChange([
          {
            name: this.getFieldName(),
            value: null
          }
        ]);
    }
  }

  getFieldName() {
    return this.props.fieldNamePrefix
      ? `${this.props.fieldNamePrefix}.${this.props.section.Name}`
      : this.props.section.Name;
  }
  render()
  {
    const {
      fieldNamePrefix,
      section,
      data,
      formValidated,
      onChange,
      onUiUpdate,
      componentState,
      currentIdentity,
      arraySectionChanged,
      dropdownDataSource
    } = this.props;

    if (section.MultiEntry) {
      return (<ArraySectionEditor
        fieldNamePrefix={fieldNamePrefix}
        componentState={componentState}
        section={section}
        data={data}
        currentIdentity={currentIdentity}
        onChange={onChange}
        arraySectionChanged={arraySectionChanged}
        dropdownDataSource={dropdownDataSource}/>);
    }

    const currentFieldNamePrefix = fieldNamePrefix
      ? fieldNamePrefix + "." + section.Name
      : section.Name;

    if (!(componentState || buildDefaultStateByItem(section))._display) {
      return null;
    }
    const renderDescription = () => {
      if (section.Description) {
        return (
          <span className="label-info">{section.Description}</span>
        );
      }
    };
    const level = section.EditLevel || section.Level;
    return (
      <fieldset
        className={level === 3
        ? "fieldset-container-three"
        : level === 2
          ? "fieldset-container-two"
          : "fieldset-container-one"}>
        <legend
          className={level === 3
          ? "legend-header-three"
          : level === 2
            ? "legend-header-two"
            : "legend-header-one"}>
          {metadataHelper.getDisplayName(section.DisplayName, data)}
        </legend>
        {renderDescription()}
        {section && section.Items && section.Items.length > 0
          ? section
            .Items
            .map(item => <ItemEditor
              key={item.Name}
              fieldNamePrefix={currentFieldNamePrefix}
              componentState={get(componentState, item.Name)}
              item={item}
              data={data}
              formValidated={formValidated}
              onChange={onChange}
              currentIdentity={currentIdentity}
              onUiUpdate={onUiUpdate}
              dropdownDataSource={dropdownDataSource}/>)
          : ""}
        {section && section.Sections && section.Sections.length > 0
          ? section
            .Sections
            .map(innerSection => <SectionEditor
              fieldNamePrefix={currentFieldNamePrefix}
              componentState={get(componentState, innerSection.Name)}
              key={innerSection.Name}
              section={innerSection}
              data={data}
              formValidated={formValidated}
              onChange={onChange}
              currentIdentity={currentIdentity}
              onUiUpdate={onUiUpdate}
              arraySectionChanged={arraySectionChanged}
              dropdownDataSource={dropdownDataSource}/>)
          : ""}
      </fieldset>
    );
  }
}

SectionEditor.propTypes = {
  fieldNamePrefix: PropTypes.string.isRequired,
  section: PropTypes.object.isRequired,
  data: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onUiUpdate: PropTypes.func.isRequired,
  componentState: PropTypes.object,
  currentIdentity: PropTypes.object,
  arraySectionChanged: PropTypes.func,
  formValidated: PropTypes.bool,
  dropdownDataSource: PropTypes.object
};

export default SectionEditor;
