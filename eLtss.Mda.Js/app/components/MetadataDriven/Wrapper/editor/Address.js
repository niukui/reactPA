import React, {PropTypes} from 'react';
import DropdownList from 'components/Common/DropdownList';
import TextBox from 'components/Common/TextBox';
import {findNamesByCategory, findLookupItemsByCategory} from 'services/lookupServices';
import {forIn, filter} from 'lodash';

class Address extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            stateOptions: [],
            stateLookupItems: [],
            countyOptions: [],
            countyLookupItems: [],
            value: props.value || {
                AddressLine1: '',
                AddressLine2: '',
                City: '',
                StateProvince: {},
                PostalCode: '',
                County: {}
            },
            error: props.error || {}
        };
        this.validate = this
            .validate
            .bind(this);
    }

    componentWillMount() {
        const _this = this;
        findNamesByCategory('stateprovincetypes').then((options) => {
            _this.setState({
                stateOptions: Object.assign([], options)
            });
        });
        findLookupItemsByCategory('stateprovincetypes').then((lookups) => {
            _this.setState({
                stateLookupItems: Object.assign([], lookups)
            });
        });
        findNamesByCategory('counties').then((options) => {
            _this.setState({
                countyOptions: Object.assign([], options)
            });
        });
        findLookupItemsByCategory('counties').then((lookups) => {
            _this.setState({
                countyLookupItems: Object.assign([], lookups)
            });
        });
        if (this.props.registerValidate) {
            this
                .props
                .registerValidate(() => {
                    return this.validate(this.state.value);
                });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.validate(this.state.value);
        }
        if (nextProps.value !== null) {
            this.setState({value: nextProps.value});
        } else {
            this.setState({
                value: {
                    AddressLine1: '',
                    AddressLine2: '',
                    City: '',
                    StateProvince: {},
                    PostalCode: '',
                    County: {}
                }
            });
        }
    }

    componentWillUpdate(preProps, preState)
    {
        if (preProps.required !== this.props.required) {
            if (!this.props.required) {
                this.validate(this.state.value);
            }
        }
        if (preProps.readonly !== this.props.readonly) {
            if (this.props.readonly) {
                this.setState({error: {}});
            }
        }
    }

    validate(val, required = this.props.required) {
        let error = {};
        let hasError = false;
        if (required) {
            if (!val['AddressLine1']) {
                error['AddressLine1'] = 'Street Address 1 is required';
                hasError = true;
            } else {
                delete error['AddressLine1'];
            }
            if (!val['City']) {
                error['City'] = 'City is required';
                hasError = true;
            } else {
                delete error['City'];
            }
            if (!val['StateProvince'] || !val['StateProvince'].Id) {
                error['StateProvince'] = 'State/Province is required';
                hasError = true;
            } else {
                delete error['StateProvince'];
            }
            if (!val['PostalCode']) {
                error['PostalCode'] = 'Zip Code is required';
                hasError = true;
            } else {
                delete error['PostalCode'];
            }
            if (!val['County'] || !val['County'].Id) {
                error['County'] = 'County is required';
                hasError = true;
            } else {
                delete error['County'];
            }
        }
        if (val['PostalCode'] && !(/^\d{5}(?:[-\s]*\d{4})?$/.test(val['PostalCode']))) {
            error['PostalCode'] = 'Please enter a valid zip code';
            hasError = true;
        }
        this.setState({error: error});
        this.setState({hasError: hasError});
        return !hasError;
    }
    render() {

        const {
            item,
            name,
            onChange,
            value,
            readonly,
            required
        } = this.props;
        const {error} = this.state;

        const dropdownValueConverter = (lookupItems, event) => {

            let lookupItem = filter(lookupItems, function (option) {
                return option.Id === event.target.value.Id;
            });
            let UniqueAttribute = (lookupItem && lookupItem.length > 0)
                ? lookupItem[0].UniqueAttribute
                : null;
            return event.target.value.Id
                ? {
                    Id: event.target.value.Id,
                    UniqueAttribute
                }
                : null;
        };

        let wrapperClass = 'row';
        if (error && error.length > 0) {
            wrapperClass += " has-error";
        }

        const prepareChanges = (event) => {
            const key = event
                .target
                .name
                .split('_')[0];
            let newVal = {};
            if (event.target.name === `StateProvince_${name}`) {
                newVal[key] = dropdownValueConverter(this.state.stateLookupItems, event);
            } else {
                newVal[key] = event.target.value;
            }
            const val = Object.assign({}, this.state.value, newVal);

            this.setState({
                value: val
            }, () => {
                let changes = [];
                changes.push({name: name, value: val});
                onChange(changes);
            });
        };

        return (
            <div>
                <div className={wrapperClass}>
                    <label htmlFor={`AddressLine1_${name}`}>Street Address 1:</label>
                    <TextBox
                        readonly={readonly}
                        onChange={prepareChanges}
                        name={`AddressLine1_${name}`}
                        value={this.state.value && this.state.value.AddressLine1}
                        isRequired={required}/> {error.AddressLine1 && <div className="error alert alert-danger">{error.AddressLine1}</div>}
                </div>
                <div className={wrapperClass}>
                    <label htmlFor={`AddressLine2_${name}`}>Street Address 2:</label>
                    <TextBox
                        readonly={readonly}
                        onChange={prepareChanges}
                        name={`AddressLine2_${name}`}
                        value={this.state.value && this.state.value.AddressLine2}
                        isRequired={false}/>
                </div>
                <div className={wrapperClass}>
                    <label htmlFor={`City_${name}`}>City:</label>
                    <TextBox
                        readonly={readonly}
                        onChange={prepareChanges}
                        name={`City_${name}`}
                        value={this.state.value && this.state.value.City}
                        isRequired={required}/> {error.City && <div className="error alert alert-danger">{error.City}</div>}
                </div>
                <div className={wrapperClass}>
                    <label htmlFor={`StateProvince_${name}`}>State/Province:</label>
                    <DropdownList
                        readonly={readonly}
                        onChange={prepareChanges}
                        name={`StateProvince_${name}`}
                        value={this.state.value && this.state.value.StateProvince}
                        options={this.state.stateOptions}
                        saveRequired={required}/> {error.StateProvince && <div className="error alert alert-danger">{error.StateProvince}</div>}
                </div>
                <div className={wrapperClass}>
                    <label htmlFor={`PostalCode_${name}`}>Zip Code:</label>
                    <TextBox
                        readonly={readonly}
                        onChange={prepareChanges}
                        name={`PostalCode_${name}`}
                        value={this.state.value && this.state.value.PostalCode}
                        isRequired={required}/> {error.PostalCode && <div className="error alert alert-danger">{error.PostalCode}</div>}
                </div>
                <div className={wrapperClass}>
                    <label htmlFor={`County_${name}`}>County:</label>
                    <DropdownList
                        readonly={readonly}
                        onChange={prepareChanges}
                        name={`County_${name}`}
                        value={this.state.value && this.state.value.County}
                        options={this.state.countyOptions}
                        saveRequired={required}/> {error.County && <div className="error alert alert-danger">{error.County}</div>}
                </div>
            </div>
        );
    }
}

Address.propTypes = {
    name: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
    error: PropTypes.string,
    readonly: PropTypes.bool.isRequired,
    required: PropTypes.bool.isRequired,
    registerValidate: PropTypes.func
};

export default Address;
