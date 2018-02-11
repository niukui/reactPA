import React, {PropTypes} from 'react';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import {getLinkObject} from 'utils/metadataHelper';

const ActionLink = ({item,metadata,data}) => {
    if(metadata)
    {
        const LinkButton=getLinkObject(item, {moduleName:metadata&& metadata.Name}, data, name, metadata);
        return LinkButton;
    }
    else
    {
        return null;
    }
};

ActionLink.propTypes = {
  metadata: PropTypes.any,
  item: PropTypes.any,
  data: PropTypes.any

};

export default ActionLink;
