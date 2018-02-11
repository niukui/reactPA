import React, { PropTypes } from 'react';

class SubCollapsiblePanel extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      collapsed: this.props.collapsed,
    };
    this.exChangeCollapsed = this.exChangeCollapsed.bind(this);
  }

  exChangeCollapsed(event) {
    this.setState({ collapsed: !this.state.collapsed });
  }

componentWillReceiveProps(nextProps){
 if(nextProps.collapsed != this.props.collapsed){
   this.setState({collapsed:nextProps.collapsed});
 }
}
  renderHeaders(headers) {
    return (headers || []).map((header) => header);
  }

  render() {
    const { collapsed } = this.state;
    const { headers } = this.props;
    return (
      <div className="panel">
        <div  className={`header sub-panel-header-one ${collapsed ? 'collapsed' : 'expanded'}`} onClick={this.exChangeCollapsed}>
          <div className={`arrow ${collapsed ? 'collapse' : 'expand'}`}></div>
          <h5>{this.props.statusIcon}{this.props.title}</h5>
          <div className="form-action TaskDetailLink">
            {this.renderHeaders(headers)}
          </div>
        </div>
        <div className={`body ${collapsed ? 'bodyHidden' : 'bodyVisible'}`}>
          <div className="form-panelbar-content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

SubCollapsiblePanel.propTypes = {
  children: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  headers: PropTypes.array,
  statusIcon: PropTypes.element
};

export default SubCollapsiblePanel;
