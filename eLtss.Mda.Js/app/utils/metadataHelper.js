import React, {PropTypes} from "react";
import lodash from "lodash";
import {convertValueToDisplayValue} from "utils/displayConverter";
import {AUDIT_TRAIL} from "utils/constants";
import {Link} from "react-router";
import {getRoutePrefix, HOST, DEFAULT_MODULE, combineUrlByQuery} from "config";
import path from "path";
import {browserHistory} from "react-router";
import toastr from "utils/toastr";

export const getDisplayName = (label, data) => {
  let displayName = label;
  const referredFieldName = getReferredFieldName(displayName);
  if (referredFieldName) {
    displayName = getFormattedFieldDisplayName(displayName, referredFieldName, data);
  }
  return displayName;
};

export const getReferredFieldName = displayName => {
  if (displayName) {
    const indexStart = displayName.indexOf("{{");
    if (indexStart >= 0) {
      const indexEnd = displayName.indexOf("}}");
      if (indexEnd > 0) {
        return displayName.substring(indexStart + 2, indexEnd);
      }
    }
  }
  return null;
};

export const getFormattedFieldDisplayName = (currentDisplayName, currentReferredFieldName, data) => {
  if (currentDisplayName && currentReferredFieldName && data) {
    const currentReferredFieldValue = lodash.get(data, currentReferredFieldName);
    const displayName = currentDisplayName.replace(`{{${currentReferredFieldName}}}`, currentReferredFieldValue);
    const referredFieldName = getReferredFieldName(displayName);
    if (referredFieldName) {
      return getFormattedFieldDisplayName(displayName, referredFieldName, data);
    } else {
      return displayName;
    }
  }
  return currentDisplayName;
};

export const getSectionItemByPath = (metadata, path) => {
  if (metadata) {
    const i = path.indexOf(".");
    let firstPath = i > 0
      ? path.substring(0, i)
      : path;

    if (metadata.Sections && metadata.Sections.length > 0) {
      for (let section of metadata.Sections) {
        if (section.Name === firstPath) {
          if (i > 0) {
            return getSectionItemByPath(section, path.substring(i + 1, path.length));
          } else {
            return section;
          }
        }
      }
    }

    if (metadata.Items && metadata.Items.length > 0) {
      for (let item of metadata.Items) {
        if (item.Name === firstPath) {
          return item;
        }
      }
    }
  }
  return null;
};

export const getSectionByName = (metadata, path) => {
  if (metadata) {
    if (metadata.Sections) {
      let i = path.indexOf(".");
      let firstPath = i > 0
        ? path.substring(0, i)
        : path;
      for (let section of metadata.Sections) {
        if (section.Name === firstPath) {
          if (i > 0) {
            return getSectionByName(section, path.substring(i + 1, path.length));
          } else {
            return section;
          }
        }
      }
    }
  }
  return null;
};

export const captureChangesHistory = (ispSections, change, metadata) => {
  const fullPath = change.name;
  const sectionItem = getSectionItemByPath(metadata, change.name);
  if (!sectionItem) {
    return;
  }
  const changeValue = getDisplayValue(change.value, sectionItem, ispSections);
  const index = fullPath.indexOf(".");
  let sectionIndex = fullPath.indexOf(".", index + 1);
  if (sectionIndex <= 0) {
    sectionIndex = fullPath.length;
  }
  const changeName = fullPath.substring(index + 1);
  const sectionPath = fullPath.substring(0, sectionIndex);
  const section = getSectionByName(metadata, sectionPath);
  if (!section) {
    return;
  }
  const sectionDisplayName = getDisplayName(section && section.DisplayName, ispSections[metadata.Name]);
  const sectionItemDisplayName = getDisplayName(sectionItem && sectionItem.DisplayName, ispSections);

  const uniqueChangeName = changeName.replace(/\./g, "_");
  let changesHistory = lodash.get(ispSections, AUDIT_TRAIL.CHANGES_HISTORY) || {};
  let existingChanges = lodash.get(changesHistory, uniqueChangeName);
  if (!existingChanges) {
    existingChanges = {};
    const fromValue = lodash.get(ispSections[metadata.Name], change.name);
    const fromDisplayValue = getDisplayValue(fromValue, sectionItem, ispSections);
    lodash.set(existingChanges, AUDIT_TRAIL.FromValue, fromDisplayValue);
    lodash.set(existingChanges, AUDIT_TRAIL.DisplayField, sectionItemDisplayName);
  }

  lodash.set(existingChanges, AUDIT_TRAIL.ToValue, changeValue);
  lodash.set(changesHistory, uniqueChangeName, existingChanges);
  lodash.set(changesHistory, AUDIT_TRAIL.SectionDisplayName, sectionDisplayName);
  lodash.set(ispSections, AUDIT_TRAIL.CHANGES_HISTORY, changesHistory);
};

export const getDisplayValue = (value, item, data) => {
  if (value && value.length > 0 && item && item.MultiEntry) {
  
    value = getSortedListData(value, item.Items);
    return value.map((valueItem, index) => {
      let displayValue = {};
      item.Items && item
        .Items
        .map(subItem => {
          const itemValue = lodash.get(valueItem, subItem.Name);
          const displayValueItem = convertValueToDisplayValue(itemValue, subItem, index);
          const subItemDisplayName = getDisplayName(subItem.DisplayName, data);
          lodash.set(displayValue, subItemDisplayName, displayValueItem);
        });
      return displayValue;
    });
  }
  return convertValueToDisplayValue(value, item);
};

export const getLinkObject = (link, context, dataItem, index, metadata, onClickCreate) => {

  let to = {};
  if (link && link.Path) {
    const routePrefix = getRoutePrefix(metadata.Options.Prefix, link.Path);    
    const toPathName = path.resolve(routePrefix, link.Path);
    lodash.set(to, "pathname", toPathName);
  }
  let caption = link && link.Caption;
  if (link && link.Caption && dataItem) {
    const captionValue = lodash.get(dataItem, link.Caption);
    if (captionValue) {
      caption = captionValue;
    }
  }

  link && link.Parameters && link
    .Parameters
    .map(parameter => {
      let value = parameter.Value;
      if (parameter.Type === "context") {
        value = lodash.get(context, parameter.Value);
      }
      if (parameter.Type === "dataItem") {
        value = lodash.get(dataItem, parameter.Value);
      }
      lodash.set(to, "query." + parameter.Name, value);
    });

  const {views, Options} = metadata;
  
  const createButton = lodash.find(views.list.Buttons, {Path: "Create"});
  if(link && link.IsModalConfirmButton===true){
    to.IsModalConfirmButton=true;
    return (
      <button key={index} onClick={() => {
        onClickCreate(to)
      }}>
        {caption}
      </button>
    )
  }else if (link && link.Path === "Create" && createButton && Options.PreCreate) {
    return (
      <button key={index} onClick={() => {
        onClickCreate(to)
      }}>
        {caption}
      </button>
    );
  } else if(link.Type==="razor" || link.Type==="react"){
      const queryString = Object
        .keys(to.query)
        .map(k => k + '=' + to.query[k])
        .join('&');
      return (
      <a href={to.pathname+"?"+queryString}>
        {caption}
      </a>
    );
  } else {
    return (
      <Link key={index} to={to}>
        {caption}
      </Link>
    );
  }
};

export const getSortedListData = (listData, items) => {
  const sortItems = lodash.filter(items, (i) => {
    return i.SortPriority !== undefined && i.SortPriority != null;
  });
  const sortItemNames = lodash.map(lodash.orderBy(sortItems, 'SortPriority'), 'Name');
  const sortItemOrders = lodash.map(lodash.orderBy(sortItems, 'SortPriority'), 'SortOrder');
  return (lodash.isEmpty(listData) || listData == null)
    ? []
    : lodash.orderBy(listData, sortItemNames, sortItemOrders);
};
