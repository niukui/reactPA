import React, {PropTypes} from 'react';
import SubCollapsiblePanel from 'components/Common/SubCollapsiblePanel';
import AuthorizedLink from 'components/Common/links/AuthorizedLink';
import ArraySectionViewer from './ArraySectionViewer';
import ItemViewer from './ItemViewer';
import SectionStatus from './SectionStatus';
import * as levels from './constants';
import * as metadataHelper from 'utils/metadataHelper';
import lodash from 'lodash';
import {buildDefaultStateByItem} from 'services/componentsServices';
import * as aclHelper from 'utils/aclHelper';
import {HOST} from "config";

const SectionViewer = ({
  fieldNamePrefix,
  section,
  data,
  metadata,
  sectionEditLink,
  componentState,
  accessLevel,
  moduleName,
  subCollapsed
}) => {

  if (!(componentState || buildDefaultStateByItem(section))._display) {
    return null;
  }

  const currentFieldNamePrefix = fieldNamePrefix
    ? fieldNamePrefix + "." + section.Name
    : section.Name;

  const sectionPath = fieldNamePrefix
    ? fieldNamePrefix + "." + section.Name
    : section.Name;

  const renderItems = (componentState) => {
    const leftItems = lodash.filter(section.Items, (item) => {
      return item.Column === "Left";
    })

    const rightItems = lodash.filter(section.Items, (item) => {
      return item.Column === "Right";
    })
    const otherItems = lodash.filter(section.Items, (item) => {
      return item.Column !== "Right" && item.Column !== "Left"
    })

    return (
      <div>
        <div className={"column-left" + (leftItems.length === 0 && 'ui-hide hide-for-print')}>
          {leftItems.map(item => <div key={item.Name}><ItemViewer
            componentState={lodash.get(componentState, item.Name)}
            fieldNamePrefix={currentFieldNamePrefix}
            item={item}
            data={data}
            metadata={metadata}/></div>)
}
        </div>
        <div className={"column-right" + (rightItems.length === 0 && 'ui-hide hide-for-print')}>
          {rightItems.map(item => <div key={item.Name}><ItemViewer
            componentState={lodash.get(componentState, item.Name)}
            fieldNamePrefix={currentFieldNamePrefix}
            item={item}
            data={data}
            metadata={metadata}/></div>)
}
        </div>
        {otherItems.map(item => <div key={item.Name}><ItemViewer
          componentState={lodash.get(componentState, item.Name)}
          fieldNamePrefix={currentFieldNamePrefix}
          item={item}
          data={data}
          metadata={metadata}/></div>)
}
      </div>
    );
  };

  const renderSections = (componentState) => {

    return (section.Sections
      ? section.Sections.map(innerSection => innerSection.MultiEntry
        ? <ArraySectionViewer
            componentState={lodash.get(componentState, innerSection.Name)}
            key={innerSection.Name}
            fieldNamePrefix={currentFieldNamePrefix}
            section={innerSection}
            data={data}/>
        : <SectionViewer
          componentState={lodash.get(componentState, innerSection.Name)}
          key={innerSection.Name}
          fieldNamePrefix={currentFieldNamePrefix}
          section={innerSection}
          data={data}
          metadata={metadata}
          sectionEditLink={sectionEditLink}/>)
      : '');
  };

  const getContent = (componentState, withFieldSet = true) => {

    if (section.MultiEntry == true) {
      return (<ArraySectionViewer
        componentState={lodash.get(componentState)}
        fieldNamePrefix={fieldNamePrefix}
        section={section}
        data={data}/>);
    } else {
      if (withFieldSet) {
        return (
          <fieldset className="fieldset-container-one">
            <legend className="legend-header-one">{metadataHelper.getDisplayName(section.DisplayName, data)}</legend>
            { section.innerSection == true && <p>section.DisplayName</p>}
            {section.Description && <div className="label-info">{section.Description}</div>}
            {renderItems(componentState)}
            {renderSections(componentState)}
          </fieldset>
        );
      } else {
        return (
          <div>
            {renderItems(componentState)}
            {renderSections(componentState)}
          </div>
        );
      }
    }
  };

  const render = (componentState) => {
    if (section.Level == levels.SUB_Panel_Level) {
      return (
        <SubCollapsiblePanel
          statusIcon={(<SectionStatus fieldNamePrefix={fieldNamePrefix} section={section} data={data}/>)}
          title={metadataHelper.getDisplayName(section.DisplayName, data)}
          collapsed = {subCollapsed}
          headers={section.Readonly !== true && aclHelper.checkEditLevel(accessLevel)
          ? [
            (section.EditLink && <AuthorizedLink
              key={currentFieldNamePrefix}
              text={section.LinkText || 'Edit'}
              prefix={metadata && metadata.Options.Prefix}
              to={{
              pathname: section.EditLink || sectionEditLink,
              query: {
                dataId: data.Id,
                clientId: data.ClientId,
                path: sectionPath,
                postToUrl: 'SaveSectionObject?',
                moduleName: moduleName
              }
            }}
              activeClassName="active"/>),
            (section.OuterLink && <a
              key={section.OuterLink}
              onClick={(e)=>e.stopPropagation()}
              href={`${HOST}${section.OuterLink.LinkPath}/?clientId=${data.ClientId}`}>{section.OuterLink.LinkText}</a>)
          ]
          : []}>
          {!section.Items || section.Items.length == 0
            ? getContent(componentState, false)
            : getContent(componentState)}
        </SubCollapsiblePanel>
      );
    } else {
      return getContent(componentState);
    }
  };
  return (render(componentState));
};

SectionViewer.propTypes = {
  fieldNamePrefix: PropTypes.string.isRequired,
  section: PropTypes.object.isRequired,
  metadata: PropTypes.object,
  data: PropTypes.object.isRequired,
  sectionEditLink: PropTypes.string.isRequired,
  componentState: PropTypes.object,
  accessLevel: PropTypes.any,
  moduleName: PropTypes.string,
  subCollapsed:PropTypes.bool
};

export default SectionViewer;
