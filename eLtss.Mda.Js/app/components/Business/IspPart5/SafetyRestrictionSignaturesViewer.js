import React, {PropTypes} from 'react';
import lodash from 'lodash';
import SectionViewer from 'components/MetadataDriven/SectionViewer';

const SafetyRestrictionSignaturesViewer = ({data, metadata, componentsState}) => {
    if (!metadata) {
        return null;
    }
    const section = lodash.find(metadata.Sections, {'Name': 'SafetyRestrictionSignatures'});

    if (!section) {
        return null;
    }

    return (<SectionViewer
        componentState={lodash.get(componentsState, section.Name)}
        key={section.Name}
        fieldNamePrefix="PlanForSupport"
        section={section}
        data={data}
        sectionEditLink="SectionEdit"/>);
};

SafetyRestrictionSignaturesViewer.propTypes = {
    data: PropTypes.object,
    metadata: PropTypes.object.isRequired,
    componentsState: PropTypes.object
};

export default SafetyRestrictionSignaturesViewer;
