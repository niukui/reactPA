import React, {PropTypes} from 'react';

const manageModes = {
  "WorkspaceIndicator_New": function () {
    return (
      <span>New</span>
    );
  },
  "WorkspaceIndicator_Edit": function () {
    return (
      <span>Edit</span>
    );
  },
  "WorkspaceIndicator_View": function () {
    return (
      <span>View</span>
    );
  },
  "WorkspaceIndicator_Manage": function () {
    return (
      <span>Manage</span>
    );
  },
  "WorkspaceIndicator_Summary": function () {
    return (
      <span>Summary</span>
    );
  },
  "WorkspaceIndicator_List": function () {
    return null;
  }
};

const PageHeader = ({title, manageMode, links, buttons, description}) => {

  return (
    <div className="selection-summaryinfo">
      <div role="presentation">
        <h3>{title}</h3>
        <div aria-label="Manage Mode" className="read-edit-toggle">
          {manageModes[manageMode]()}
        </div>
        <span> {description} </span>
        <div className="workspace-header-bar">
          <div className="float-left">
            {links}
          </div>
          <div className="float-right">
            {buttons}
          </div>
        </div>
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  manageMode: PropTypes.string.isRequired,
  links: PropTypes.array,
  buttons: PropTypes.array,
  description:PropTypes.string
};

export default PageHeader;
