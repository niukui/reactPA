import React, {PropTypes} from 'react';
import {get} from 'lodash';
import String from 'components/Common/String';
import * as metadataHelper from 'utils/metadataHelper';
import {formatJsonDate} from 'utils/dateHelper';
import {convertValueToDisplayValue} from 'utils/displayConverter';
import {buildDefaultStateByItem} from 'services/componentsServices';

const ArraySectionViewer = ({fieldNamePrefix, section, data, componentState}) => {

  if (!(componentState || buildDefaultStateByItem(section))._display) {
    return null;
  }
  const currentFieldNamePrefix = fieldNamePrefix
    ? fieldNamePrefix + "." + section.Name
    : section.Name;
  const list = get(data, currentFieldNamePrefix);
  const sortedList = metadataHelper.getSortedListData(list, section.Items);
  //todo need business rule to avoid "MultiEntry" section has inner sections
  return (
    <table className="generalTable">
      <caption className="caption-header">
        <span>{metadataHelper.getDisplayName(section.DisplayName, data)}</span>
      </caption>
      <thead>
        <tr>
          {section
            .Items
            .map(item => {
              if (item.HideColumn !== true) {
                return (
                  <th key={item.Name}>
                    {metadataHelper.getDisplayName(item.DisplayName, data).replace(/\:+$/g,'')}
                  </th>
                );
              }
            })}
        </tr>
      </thead>
      <tbody>
        {sortedList && sortedList.length > 0 && section.Items && section.Items.length > 0
          ? sortedList.map((value, index) => {
            return (
              <tr key={index}>{section
                  .Items
                  .map(item => {
                    if (item.HideColumn !== true) {
                      return (item.IsSignature && item.IsSignature === true && !!get(value, item.Name)
                        ? <td key={item.Name + index}><img
                            className="autoResizeImage"
                            alt={item.DisplayName + ' image'}
                            src={get(value, item.Name)}/></td>
                        : <td key={item.Name + index}><String
                          value={convertValueToDisplayValue(get(value, item.DataPath || item.Name), item, index)}/></td>);
                    }
                  })}</tr>
            );
          })
          : <tr>
            <td colSpan={section.Items.length} className="dataTables_empty">No data available</td>
          </tr>}
      </tbody>
    </table>
  );
};

ArraySectionViewer.propTypes = {
  fieldNamePrefix: PropTypes.string.isRequired,
  section: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  componentState: PropTypes.object
};

export default ArraySectionViewer;
