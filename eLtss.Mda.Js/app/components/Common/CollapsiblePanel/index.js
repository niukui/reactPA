import React, { PropTypes } from 'react';

class CollapsiblePanel extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      status: this.props.status,
    };
    this.exChangeCollapsed = this.exChangeCollapsed.bind(this);
  }

  exChangeCollapsed(event) {
    event.preventDefault();
    this.props.onSwitchExpandStatus();
  }

  renderHeaders(headers) {
    return (headers || []).map((header) => header);
  }

  render() {
    const { status } = this.state;
     const {headers} = this.props;

    let collapsed = status ? !status.isExpand : true;

    return (
      <div className="panel panelBarItem">
        <div className={`header ${collapsed ? 'collapsed' : 'expanded'}`} onClick={this.exChangeCollapsed}>
          <div className={`arrow ${collapsed ? 'collapse' : 'expand'}`}></div>
          <h4>{this.props.statusIcon}{this.props.title}</h4>
          <div className="form-action TaskDetailLink">
            {this.renderHeaders(headers)}
          </div>
        </div>
        <div className={`body ${collapsed ? 'bodyHidden' : 'bodyVisible'}`}>
          <div className="read-only">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

CollapsiblePanel.propTypes = {
  title: PropTypes.string,
  status: PropTypes.object.isRequired,
  headers: PropTypes.array,
  onSwitchExpandStatus: PropTypes.func.isRequired,
  statusIcon: PropTypes.element,
  children:PropTypes.node
};

export default CollapsiblePanel;
