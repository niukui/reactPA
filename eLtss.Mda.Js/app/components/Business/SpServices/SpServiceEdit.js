import React, {PropTypes} from 'react';
import ReactModal from "react-modal";
import DropdownList from 'components/Common/DropdownList';
import {selectListItemsForDropdown} from 'utils/dropdownTransformer';
import TextBox from 'components/Common/TextBox';
import lodash from 'lodash';

class SpServiceEdit extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpen: false,
            isAdd: true,
            spService: this.defaultSpService(),
            spServiceError: this.defaultSpServiceError()
        };

        this.handleClose = this
            .handleClose
            .bind(this);

        this.handleCancel = this
            .handleCancel
            .bind(this);

        this.openDialog = this
            .openDialog
            .bind(this);

        this.handleSearch = this
            .handleSearch
            .bind(this);

        this.onChangeForm = this
            .onChangeForm
            .bind(this);

        this.handleSave = this
            .handleSave
            .bind(this);

        this.formValidation = this
            .formValidation
            .bind(this);
    }

    handleClose(e) {
        this.closeDialog(e);
        if (this.props.onFinish) {
            this
                .props
                .onFinish(false);
        }
    }

    handleSearch(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleCancel(e) {
        e.preventDefault();
        e.stopPropagation();
        this.handleClose(e);
    }

    handleSave(e) {
        if (this.formValidation()) {
            e.preventDefault();
            e.stopPropagation();

            if (this.props.onFinish) {
                this
                    .props
                    .onFinish(false);
            }
            this
                .props
                .onSave(this.state.spService);
            this.closeDialog(e);
        }
    }

    openDialog(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({isOpen: true});
    }

    closeDialog(e) {
        this.setState({
            isOpen: false,
            spServiceError: this.defaultSpServiceError()
        });
    }

    onChangeForm(e) {
        let spServiceError = this.state.spServiceError;

        if (e.target.name === 'LxService') {
            let spService = this.state.spService;
            spService.ServiceDefinitionId = e.target.value.Id;
            spService.Name = e.target.value.Name;
            this.setState({spService});

            if (!spService.ServiceDefinitionId) {
                spServiceError.ServiceDefinitionError = "This field is required";
            } else {
                spServiceError.ServiceDefinitionError = "";
            }
        } else {
            const field = e
                .target
                .name
                .slice(0, -1);
            const level = e
                .target
                .name
                .slice(-1);
            let spService = this.state.spService;
            spService.ServiceDetails[level - 1][field] = e.target.value;
            this.setState({spService});

            if (isNaN(e.target.value) || lodash.isEmpty(e.target.value)) {
                spServiceError.ServiceDetails[level - 1][field + 'Error'] = "This field is required";
            } else {
                spServiceError.ServiceDetails[level - 1][field + 'Error'] = "";
            }
        }
        this.setState({spServiceError});
    }

    formValidation() {
        let formIsValid = true;
        let spServiceError = this.state.spServiceError;
        if (!this.state.spService.ServiceDefinitionId) {
            spServiceError.ServiceDefinitionError = "This field is required";
            formIsValid = false;
        }

        this
            .state
            .spService
            .ServiceDetails
            .map((detail) => {
                if (isNaN(detail.TotalProjectedByModelHours) || this.isEmpty(detail.TotalProjectedByModelHours)) {
                    spServiceError.ServiceDetails[detail.Level - 1].TotalProjectedByModelHoursError = "This field is required";
                    formIsValid = false;
                }
                if (isNaN(detail.Rate) || this.isEmpty(detail.Rate)) {
                    spServiceError.ServiceDetails[detail.Level - 1].RateError = "This field is required";
                    formIsValid = false;
                }
            });

        this.setState({spServiceError});
        return formIsValid;
    }

    isEmpty(value) {
        return (value === "" || value === null || typeof(value) === "undefined")
    }

    defaultSpServiceError() {
        return {
            "ServiceDefinitionError": "",
            "ServiceDetails": [
                {
                    "Level": "1",
                    "TotalProjectedByModelHoursError": "",
                    "RateError": ""
                }, {
                    "Level": "2",
                    "TotalProjectedByModelHoursError": "",
                    "RateError": ""
                }, {
                    "Level": "3",
                    "TotalProjectedByModelHoursError": "",
                    "RateError": ""
                }, {
                    "Level": "4",
                    "TotalProjectedByModelHoursError": "",
                    "RateError": ""
                }, {
                    "Level": "5",
                    "TotalProjectedByModelHoursError": "",
                    "RateError": ""
                }, {
                    "Level": "6",
                    "TotalProjectedByModelHoursError": "",
                    "RateError": ""
                }, {
                    "Level": "7",
                    "TotalProjectedByModelHoursError": "",
                    "RateError": ""
                }
            ]
        };
    }

    defaultSpService() {
        return {
            "Id": "",
            "ServiceDefinitionId": null,
            "Name": "",
            "ServiceDetails": [
                {
                    "Level": "1",
                    "TotalProjectedByModelHours": "0.0",
                    "Rate": "0.00"
                }, {
                    "Level": "2",
                    "TotalProjectedByModelHours": "0.0",
                    "Rate": "0.00"
                }, {
                    "Level": "3",
                    "TotalProjectedByModelHours": "0.0",
                    "Rate": "0.00"
                }, {
                    "Level": "4",
                    "TotalProjectedByModelHours": "0.0",
                    "Rate": "0.00"
                }, {
                    "Level": "5",
                    "TotalProjectedByModelHours": "0.0",
                    "Rate": "0.00"
                }, {
                    "Level": "6",
                    "TotalProjectedByModelHours": "0.0",
                    "Rate": "0.00"
                }, {
                    "Level": "7",
                    "TotalProjectedByModelHours": "0.0",
                    "Rate": "0.00"
                }
            ]
        };
    }

    componentWillMount() {
        if (!lodash.isEmpty(this.props.spService)) {
            this.setState({
                spService: Object.assign({}, this.props.spService),
                isAdd: false
            });
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if (!lodash.isEmpty(nextProps.spService)) {
            this.setState({
                spService: Object.assign({}, nextProps.spService),
                isAdd: false
            });
        }
    }

    render() {
        const modalPadding = {
            background: 'red'
        };

        const RowStyle = {
            marginBottom: '10px'
        };

        const HeaderStyle = {
            fontWeight: 'bold',
            display: 'inline-block'
        };

        const LevelColumn = {
            width: '9%',
            marginRight: '1%',
            display: 'inline-block'
        };

        const PerWeekColumn = {
            width: "30%",
            marginLeft: "2%",
            display: 'inline-block'
        }

        const BorderStyle = {
            borderBottom: '1px solid #e5e5e5'
        };

        const InputStyle = {
            width: '33%',
            marginRight: '20.5%',
            display: 'inline-block',
            marginTop: '-5px'
        };

        return (
            <div>
                <a href="javascript:void(0);" onClick={this.openDialog}>{this.props.title}</a>

                <ReactModal
                    className="supportsPackageEditModal"
                    overlayClassName="overlay"
                    isOpen={this.state.isOpen}
                    onRequestClose={() => {}}
                    contentLabel="">
                    <div className="confirm-title">Add/Edit Service
                        <span>
                            <button onClick={this.handleClose}>X</button>
                        </span>
                    </div>

                    <div className="confirm-message">
                        <div className="providerSearchTableWrapper">
                            <div className="row">
                                <label className="complete-required" htmlFor="LxService">Service:</label>
                                {this.props.canSelectService && <DropdownList
                                    name="LxService"
                                    id="LxService"
                                    onChange={this.onChangeForm}
                                    value={{
                                    Id: this.state.spService.ServiceDefinitionId
                                }}
                                    options={selectListItemsForDropdown(this.props.serviceSelectList || [])}
                                    saveRequired={true}/>
}
                                {this.state.spServiceError.ServiceDefinitionError && <div className="error alert alert-danger">{this.state.spServiceError.ServiceDefinitionError}</div>
}
                                {!this.props.canSelectService && <TextBox
                                    id="LxService"
                                    label="Service:"
                                    value
                                    ={this.state.spService.Name}
                                    readonly={true}/>
}
                            </div>
                            <div className="row">
                                <span
                                    className=''
                                    style={Object.assign({}, HeaderStyle, LevelColumn)}
                                    htmlFor="SourceInfo">Level</span>
                                <span
                                    className=''
                                    style={Object.assign({}, HeaderStyle, PerWeekColumn)}
                                    htmlFor="SourceInfo">Total Projected by Model Hours:</span>
                                <span
                                    className=''
                                    style={Object.assign({}, HeaderStyle, PerWeekColumn)}
                                    htmlFor="SourceInfo">Rate:</span>
                            </div>
                            {this.state.spService && this.state.spService.ServiceDetails && this
                                .state
                                .spService
                                .ServiceDetails
                                .map((detail) => {
                                    return (
                                        <div className="row" key={detail.Level} style={RowStyle}>
                                            <span
                                                className=''
                                                style={Object.assign({}, LevelColumn, BorderStyle)}
                                                htmlFor="SourceInfo">{detail.Level}</span>
                                            <span style={Object.assign({}, PerWeekColumn, BorderStyle)}>
                                                <label
                                                    htmlFor={"TotalProjectedByModelHours" + detail.Level}
                                                    className="ui-hide">Total Projected by Model Hours for level {detail.Level}</label>
                                                <TextBox
                                                    key={"TotalProjectedByModelHours" + detail.Level}
                                                    id={"TotalProjectedByModelHours" + detail.Level}
                                                    name={"TotalProjectedByModelHours" + detail.Level}
                                                    type="number"
                                                    value={detail
                                                    .TotalProjectedByModelHours
                                                    .toString()}
                                                    onChange={this.onChangeForm}
                                                    isRequired
                                                    extraProps
                                                    ={{
                                                    "step": "any",
                                                    "min": 0,
                                                    "max": 168,
                                                    "style": InputStyle
                                                }}/> {this.state.spServiceError.ServiceDetails[detail.Level - 1].TotalProjectedByModelHoursError && <div className="error alert alert-danger">{this.state.spServiceError.ServiceDetails[detail.Level - 1].TotalProjectedByModelHoursError}</div>}
                                            </span>
                                            <span style={Object.assign({}, PerWeekColumn, BorderStyle)}>
                                                <label htmlFor={'Rate' + detail.Level} className="ui-hide">Rate for level {detail.Level}</label>
                                                <TextBox
                                                    key={"Rate" + detail.Level}
                                                    id={detail
                                                    .Level
                                                    .toString()}
                                                    name={"Rate" + detail.Level}
                                                    type="number"
                                                    value={detail
                                                    .Rate
                                                    .toString()}
                                                    onChange={this.onChangeForm}
                                                    isRequired
                                                    extraProps
                                                    ={{
                                                    "step": "any",
                                                    "min": 0,
                                                    "max": 5000,
                                                    "style": InputStyle
                                                }}/> {this.state.spServiceError.ServiceDetails[detail.Level - 1]["RateError"] && <div className="error alert alert-danger">{this.state.spServiceError.ServiceDetails[detail.Level - 1]["RateError"]}</div>}
                                            </span>

                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="searchspace-footer-bar">
                        <div className="float-right">
                            <button className="confirm-button-no" onClick={this.handleCancel}>Cancel</button>
                            <button className="confirm-button-no" onClick={this.handleSave}>Save</button>
                        </div>
                    </div>
                </ReactModal>
            </div>
        );
    }
};

SpServiceEdit.propTypes = {
    spService: PropTypes.object.isRequired,
    serviceSelectList: PropTypes.array.isRequired,
    onSave: PropTypes.func.isRequired,
    onFinish: PropTypes.func,
    title: PropTypes.string,
    canSelectService: PropTypes.bool
};

export default SpServiceEdit;