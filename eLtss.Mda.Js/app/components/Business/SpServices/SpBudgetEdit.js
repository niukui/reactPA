import React, {PropTypes} from 'react';
import ReactModal from "react-modal";
import DropdownList from 'components/Common/DropdownList';
import {selectListItemsForDropdown} from 'utils/dropdownTransformer';
import TextBox from 'components/Common/TextBox';
import lodash from 'lodash';

class SpBudgetEdit extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpen: false,
            isAdd: true,
            spBudgets: this.defaultSpBudgets(),
            spBudgetsError: this.defaultSpBudgetsError()    
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
        if(this.formValidation())
        {
            e.preventDefault();
            e.stopPropagation();

            if (this.props.onFinish) {
                this
                    .props
                    .onFinish(false);
            }
            this
                .props
                .onSave(this.state.spBudgets);
            this.closeDialog(e);
        }
    }

    openDialog(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({isOpen: true});
    }

    closeDialog(e) {
        this.setState({isOpen: false, spBudgetsError: this.defaultSpBudgetsError()});
    }

    onChangeForm(e) {
        let spBudgetsError = this.state.spBudgetsError;

        const field = e
            .target
            .name
            .slice(0, -1);
        const level = e
            .target
            .name
            .slice(-1);

        let spBudgets = this.state.spBudgets;
        spBudgets[level - 1][field] = e.target.value;
        this.setState({spBudgets});

        if(isNaN(e.target.value)||lodash.isEmpty(e.target.value)){
            spBudgetsError[level-1][field+'Error'] = "This field is required";
        }
        else{
            spBudgetsError[level-1][field+'Error'] = "";
        }
        
        this.setState({spBudgetsError});
    }

    formValidation(){
        let formIsValid = true;
        let spBudgetsError = this.state.spBudgetsError;
        
        this
            .state
            .spBudgets
            .map((budget) => {
                if(isNaN(budget.TotalDollarAmount)||this.isEmpty(budget.TotalDollarAmount)){
                    spBudgetsError[budget.Level-1].TotalDollarAmount = "This field is required";
                    formIsValid = false;
                }
            });
        
        this.setState({spBudgetsError});
        return formIsValid;
    }
    
    isEmpty(value) {
        return (value === "" || value === null || typeof(value) === "undefined")
    }

    defaultSpBudgetsError(){
        return[
                {
                    "Level":"1",
                    "TotalDollarAmountError":""
                },
                {
                    "Level":"2",
                    "TotalDollarAmountError":""
                },
                {
                    "Level":"3",
                    "TotalDollarAmountError":""
                },
                {
                    "Level":"4",
                    "TotalDollarAmountError":""
                },
                {
                    "Level":"5",
                    "TotalDollarAmountError":""
                },
                {
                    "Level":"6",
                    "TotalDollarAmountError":""
                },
                {
                    "Level":"7",
                    "TotalDollarAmountError":""
                }
            ];
    }

    defaultSpBudgets() {
        return  [
                {
                    "Level": "1",
                    "TotalDollarAmount": "0.00"
                }, {
                    "Level": "2",
                    "TotalDollarAmount": "0.00"
                }, {
                    "Level": "3",
                    "TotalDollarAmount": "0.00"
                }, {
                    "Level": "4",
                    "TotalDollarAmount": "0.00"
                }, {
                    "Level": "5",
                    "TotalDollarAmount": "0.00"
                }, {
                    "Level": "6",
                    "TotalDollarAmount": "0.00"
                }, {
                    "Level": "7",
                    "TotalDollarAmount": "0.00"
                }
            ];
    }

    componentWillMount() {
        if (!lodash.isEmpty(this.props.spBudgets)) {
            this.setState({
                spBudgets: Object.assign([], this.props.spBudgets),
                isAdd: false
            });
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if (!lodash.isEmpty(nextProps.spBudgets)) {
            this.setState({
                spBudgets: Object.assign([], nextProps.spBudgets),
                isAdd: false
            });
        }
    }

    render() {
        const {spBudgets, spBudgetsError} = this.state;

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

        const TotalDollarColumn = {
            width: "30%",
            marginLeft: "2%",
            display: 'inline-block'
        }

        const BorderStyle = {
            borderBottom: '1px solid #e5e5e5',
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
                    contentLabel="" >
                    <div className="confirm-title">Edit Total Dollar Amount
                        <span>
                            <button onClick={this.handleClose}>X</button>
                        </span>
                    </div>

                    <div className="confirm-message">
                        <div className="providerSearchTableWrapper">
                            <div className="row" >
                                <span className='' style={Object.assign({}, HeaderStyle, LevelColumn)}  htmlFor="SourceInfo">Level</span>
                                <span className='' style={Object.assign({}, HeaderStyle, TotalDollarColumn)}  htmlFor="SourceInfo">Total Dollar Amount:</span>
                            </div>
                            {this.state.spBudgets && this
                                .state
                                .spBudgets
                                .map((budget) => {
                                    return (
                                        <div className="row" key={budget.Level} style={RowStyle}>
                                            <span className='' style={Object.assign({}, LevelColumn, BorderStyle)} htmlFor="SourceInfo">{budget.Level}</span>
                                            <span style={Object.assign({}, TotalDollarColumn, BorderStyle)}>
                                                <label htmlFor={'TotalDollarAmount' + budget.Level} className="ui-hide">Total Dollar Amount for level {budget.Level}</label>
                                                <TextBox
                                                    key={"TotalDollarAmount" + budget.Level}
                                                    id={budget
                                                    .Level
                                                    .toString()}
                                                    name={"TotalDollarAmount" + budget.Level}
                                                    type="number"
                                                    value={budget
                                                    .TotalDollarAmount
                                                    .toString()}
                                                    onChange={this.onChangeForm}
                                                    isRequired
                                                    extraProps
                                                    ={{
                                                    "step": "any",
                                                    "min": 0,
                                                    "max": 5000,
                                                    "style": InputStyle
                                                }}/>
                                                {this.state.spBudgetsError[budget.Level-1]["TotalDollarAmountError"] && <div className="error alert alert-danger">{this.state.spBudgetsError[budget.Level-1]["TotalDollarAmountError"]}</div>}
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

SpBudgetEdit.propTypes = {
    spBudgets: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onFinish: PropTypes.func,
    title: PropTypes.string
};

export default SpBudgetEdit;