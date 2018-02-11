import React, {PropTypes} from 'react';
import lodash from 'lodash';

class Group extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onStatusChange = this
            .onStatusChange
            .bind(this);
    }
    onStatusChange(name, isExpand) {
    }
    render() {
        const childrenWithProps = React
            .Children
            .map(this.props.children, (child) => React.cloneElement(child, {onStatusChange: this.onStatusChange}));

        return (
            <div
                className="panelbar-formheader-style no-auto-expand genericform-style read-only">{childrenWithProps}</div>
        );
    }
}

Group.propTypes = {
    onAllPanelsStatusChanged: PropTypes.func,
    children: PropTypes.node
};

export default Group;
