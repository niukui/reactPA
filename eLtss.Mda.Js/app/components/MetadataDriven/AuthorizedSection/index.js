import React, {PropTypes} from 'react';
import moment from 'moment';
import CollapsiblePanel from 'components/Common/CollapsiblePanel';
import NewCollapsiblePanel from 'components/Common/NewCollapsiblePanel';
import SubCollapsiblePanel from 'components/Common/SubCollapsiblePanel';
import SectionStatus from 'components/MetadataDriven/SectionStatus';
import SectionViewer from 'components/MetadataDriven/SectionViewer';
import ArraySectionViewer from 'components/MetadataDriven/ArraySectionViewer';
import * as aclHelper from 'utils/aclHelper';
import {get, set} from 'lodash';
import AuthorizedLink from 'components/Common/links/AuthorizedLink';
import {HOST} from "config";

class AuthorizedSection extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const {
            isExpand,
            data,
            metadata,
            section,
            componentsState,
            securityContext,
            resourceName,
            moduleName
        } = this.props;

        if (!section || !section.Sections) {
            return null;
        }
        const canEdit = aclHelper.canEdit(securityContext, resourceName);
        
        const resourceList = section
            .Sections
            .map((subSection) => {
                return subSection.Name;
            });
        const entityData = data && data[metadata.Name];
        const subAccessLevels = aclHelper.getAccessList(securityContext, resourceList, section.Name);        
        return (
            <NewCollapsiblePanel hideForPrint={this.props.hideForPrint}
                statusIcon={(<SectionStatus fieldNamePrefix="" section={section} data={entityData}/>)}
                title={section.DisplayName}
                name={section.Name}
                isExpand={isExpand}
                onStatusChange={this.props.onStatusChange}
                headers={[
                (section.EditLink && canEdit && <AuthorizedLink
                    key={section.Name}
                    text={section.LinkText || 'Edit'}
                    prefix={metadata && metadata.Options.Prefix}
                    to={{
                    pathname: section.EditLink,
                    query: {
                        dataId: entityData && entityData.Id,
                        path: section.Name,
                        moduleName: moduleName,
                        clientId: entityData && entityData.ClientId
                    }
                }}
                    activeClassName="active"/>),
                (section.OuterLink && <a
                    key={section.OuterLink}
                    onClick={(e)=>e.stopPropagation()}
                    href={`${HOST}${section.OuterLink.LinkPath}/?clientId=${entityData.ClientId}`}>{section.OuterLink.LinkText}</a>)
            ]}>
                <div>
                    {section.Sections && section
                        .Sections
                        .map(subSection => <SectionViewer
                            componentState={get(componentsState, subSection.Name)}
                            key={subSection.Name}
                            moduleName={moduleName}
                            fieldNamePrefix={section.Name}
                            section={subSection}
                            metadata={metadata}
                            data={entityData}
                            sectionEditLink={'SectionEdit'}
                            subCollapsed = {!this.props.isExpand}
                            accessLevel={subAccessLevels[subSection.Name]}/>)}
                    {section && section.Items && section.Items.length > 0 && <SectionViewer
                        componentState={componentsState}
                        key={section.Name + "SectionViewer"}
                        moduleName={moduleName}
                        fieldNamePrefix={""}
                        sectionEditLink={""}
                        section={section}
                        metadata={metadata}
                        subCollapsed = {!this.props.isExpand}
                        data={entityData}/>}

                </div>
            </NewCollapsiblePanel>
        );
    }
}
AuthorizedSection.propTypes = {
    isExpand: PropTypes.bool.isRequired,
    onStatusChange: PropTypes.func,
    data: PropTypes.object.isRequired,
    securityContext: PropTypes.object.isRequired,
    metadata: PropTypes.object,
    section: PropTypes.object,
    componentsState: PropTypes.object.isRequired,
    moduleName: PropTypes.string.isRequired,
    hideForPrint: PropTypes.bool,
};

export default AuthorizedSection;