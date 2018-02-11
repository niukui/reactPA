import React, {PropTypes} from 'react';
import lodash from 'lodash';
import ModalConfirm from "components/Common/ModalConfirm";
import * as aclHelper from 'utils/aclHelper';
import WorkflowPopup from './workflowPopup';
import CustomPopup from './customPopup';

class WorkflowSection extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            workflowActionConfirmations: {},
            WorkflowPopupIsOpen: false,
            EventName: '',
            workflowData: {},
            validationList: [],
            formValidated: false,
            printHTML: ''
        };
        this.clickSubmit = this
            .clickSubmit
            .bind(this);
        this.onSubmit = this
            .onSubmit
            .bind(this);
        this.onChange = this
            .onChange
            .bind(this);
        this.onConfirmSubmit = this
            .onConfirmSubmit
            .bind(this);
        this.onUiUpdate = this
            .onUiUpdate
            .bind(this);
    }

    onChange(changes) {
        if (changes && changes.length > 0) {
            let workflowData = this.state.workflowData;
            lodash.set(workflowData, changes[0].name, changes[0].value);
            this.setState({workflowData: workflowData});
        }
    }

    onUiUpdate(name, validate) {
        const currentValidation = {
            name: name,
            validate: validate
        };
        const validation = lodash.find(this.state.validationList, {name: name});
        if (!validation || validation.length === 0) {
            let validationList = this.state.validationList;
            validationList.push(currentValidation);
            this.setState({validationList: validationList})
        }
    }

    clickSubmit(e, eventName) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        this
            .props
            .actions
            .preProcessEvent(this.props.data.Id, this.props.moduleName, eventName)
    }

    onConfirmSubmit(e, eventName, workflowData, printHTML) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.setState({formValidated: true});
        let validationResult = true;
        for (let validation of this.state.validationList) {
            if (!validation.validate()) {
                validationResult = false;
            }
        }
        this.setState({formValidated: false});
        if (validationResult) {
            this
                .props
                .actions
                .processEvent(this.props.data.Id, this.props.data.ClientId, this.props.moduleName, eventName, true, workflowData, printHTML);
            this.setState({WorkflowPopupIsOpen: false, workflowData: {}})
        }

    }

    onCancelSubmit(eventName) {
        this.setState({WorkflowPopupIsOpen: false, workflowData: {}});
    }

    onSubmit(e, eventName, printHTML) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        this
            .props
            .actions
            .processEvent(this.props.data.Id, this.props.data.ClientId, this.props.moduleName, eventName, false, null, printHTML);
    }

    render() {
        const {
            data,
            metadata,
            securityContext,
            moduleName,
            workflowConfirmations,
            onToggle,
            expandAll,
            actions,
            dropdownDataSource
        } = this.props;

        const renderButtons = (data, securityContext, metadata) => {
            var result = []
            data.NextAvailableEvents && data
                .NextAvailableEvents
                .map((event, index) => {
                    if (aclHelper.canManage(securityContext, event.Name)) {
                        const needConfirmation = metadata.views && metadata.views.workflowPopups && metadata.views.workflowPopups[event.Name] && metadata.views.workflowPopups[event.Name].NeedConfirmation;
                        result.push(
                            <button
                                key={index}
                                onClick={(e) => {
                                let printHTML;
                                if (metadata.views && metadata.views.workflowPopups && metadata.views.workflowPopups[event.Name] && metadata.views.workflowPopups[event.Name].NeedPrintHTML === true) {
                                    if(window.fetchHtmlFromPrintFormWithoutHeader && typeof(window.fetchHtmlFromPrintFormWithoutHeader) == "function"){
                                        printHTML = window.fetchHtmlFromPrintFormWithoutHeader();
                                    }
                                }
                                if (metadata.views.workflowPopups && needConfirmation) {
                                    this.setState({WorkflowPopupIsOpen: true, EventName: event.Name, printHTML: printHTML})
                                } else {
                                    this.onSubmit(e, event.Name, printHTML)
                                }
                            }}>
                                {event.DisplayName}
                            </button>
                        );
                    }
                })

            result.push(
                <button
                    key={result.length + 2}
                    onClick={() => {
                    onToggle()
                }}
                    className="isCollapsed initialized">
                    {expandAll
                        ? "Collapse All"
                        : "Expand All"}</button>
            )
            return result;
        }

        const renderWorkflowPopup = (isOpen, eventName, metadata, data) => {
            const events = metadata.views.workflowPopups;
            let needConfirmation = (events[eventName] && events[eventName].NeedConfirmation) || false;
            if (needConfirmation) {
                if(events[eventName].customPopupName&&events[eventName].customPopupName==="customPopup"){
                    return <CustomPopup
                        dropdownDataSource={dropdownDataSource}
                        onChange={this.onChange}
                        onUiUpdate={this.onUiUpdate}
                        formValidated={this.state.formValidated}
                        data={data}
                        fieldNamePrefix={''}
                        message={events[eventName] && events[eventName].Message}
                        items={events[eventName] && events[eventName].Items}
                        isOpen={isOpen}
                        title={events[eventName] && events[eventName].Title}
                        onNo={() => {
                        this.onCancelSubmit(eventName);
                    }}
                        onClose={() => {
                        this.onCancelSubmit(eventName);
                    }}
                        onYes={(e) => this.onConfirmSubmit(e, eventName, this.state.workflowData)}>

                    </CustomPopup>}
                return (
                    <WorkflowPopup
                        dropdownDataSource={dropdownDataSource}
                        onChange={this.onChange}
                        onUiUpdate={this.onUiUpdate}
                        formValidated={this.state.formValidated}
                        data={data}
                        fieldNamePrefix={''}
                        message={events[eventName] && events[eventName].Message}
                        items={events[eventName] && events[eventName].Items}
                        isOpen={isOpen}
                        title={events[eventName] && events[eventName].Title}
                        onNo={() => {
                        this.onCancelSubmit(eventName);
                    }}
                        onClose={() => {
                        this.onCancelSubmit(eventName);
                    }}
                        onYes={(e) => this.onConfirmSubmit(e, eventName, this.state.workflowData, this.state.printHTML)}></WorkflowPopup>
                );
            } else {
                return null;
            }
        }

        if (data == null || securityContext == null) {
            return null;
        }

        const buttons = renderButtons(data, securityContext, metadata);
        if (buttons) {    
            if(data && data.PlanOfCareType) {
                this.state.workflowData.CurrentPlanOfCareType = data && data.PlanOfCareType;
            }        
            return (
                <div>
                    {buttons}
                    {metadata.views && metadata.views.workflowPopups && renderWorkflowPopup(this.state.WorkflowPopupIsOpen, this.state.EventName, metadata, this.state.workflowData)}
                </div>
            );
        } else {
            return null;
        }
    }
}

WorkflowSection.propTypes = {
    data: PropTypes.object.isRequired,
    securityContext: PropTypes.object.isRequired,
    metadata: PropTypes.object,
    actions: PropTypes.any,
    moduleName: PropTypes.string.isRequired,
    workflowConfirmations: PropTypes.object.isRequired,
    onToggle: PropTypes.func,
    expandAll: PropTypes.bool
};

export default WorkflowSection;
