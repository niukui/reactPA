import React, {PropTypes} from 'react';

class NewCollapsiblePanel extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isExpand: this.props.isExpand
        };
        this.exChangeCollapsed = this
            .exChangeCollapsed
            .bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isExpand != this.props.isExpand) {
            this
                .props
                .onStatusChange(this.props && this.props.name, nextProps.isExpand);
            this.setState({isExpand: nextProps.isExpand});
        }
    }

    renderHeaders(headers) {
        return (headers || []).map((header) => header);
    }

    exChangeCollapsed() {
        this
            .props
            .onStatusChange(this.props && this.props.name, !this.state.isExpand);
        this.setState({
            isExpand: !this.state.isExpand
        });
    }

    render() {
        const {isExpand} = this.state;
        const {headers} = this.props;

        let collapsed = isExpand === false;

        return (
            <div  className={`panel panelBarItem ${this.props.hideForPrint
                    ? 'hide-for-print'
                    : ''}`}>
                <div
                    className={`header ${collapsed
                    ? 'collapsed'
                    : 'expanded'}`}
                    onClick={this.exChangeCollapsed}>
                    <div
                        className={`arrow ${collapsed
                        ? 'collapse'
                        : 'expand'}`}></div>
                    <h4>{this.props.statusIcon}{this.props.title}</h4>
                    <div className="form-action TaskDetailLink">
                        {this.renderHeaders(headers)}
                    </div>
                </div>
                <div
                    className={`body ${collapsed
                    ? 'bodyHidden'
                    : 'bodyVisible'}`}>
                    <div className="read-only">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

NewCollapsiblePanel.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isExpand: PropTypes.bool.isRequired,
    headers: PropTypes.array,
    onStatusChange: PropTypes.func,
    statusIcon: PropTypes.element,
    children: PropTypes.node,
    hideForPrint: PropTypes.bool
};

export default NewCollapsiblePanel;
