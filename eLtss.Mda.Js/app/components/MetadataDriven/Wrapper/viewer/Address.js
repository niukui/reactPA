import React, {PropTypes} from 'react';
import TextBox from 'components/Common/TextBox';
import {findNamesByCategory, findLookupItemsByCategory} from 'services/lookupServices';
import {forIn, toString} from 'lodash';

class Address extends React.Component {
    render() {
        const {name, value} = this.props;

        let wrapperClass = 'row';
        return (
            <div>
                <div className={wrapperClass}>
                    <label htmlFor={`StreetAddress1_${name}`}>Street Address 1:</label>
                    <TextBox
                        readonly
                        name={`StreetAddress1_${name}`}
                        value={value && value.AddressLine1 || ''}/>
                </div>
                <div className={wrapperClass}>
                    <label htmlFor={`StreetAddress2_${name}`}>Street Address 2:</label>
                    <TextBox
                        readonly
                        name={`StreetAddress2_${name}`}
                        value={value && value.AddressLine2 || ''}/>
                </div>
                <div className={wrapperClass}>
                    <label htmlFor={`City_${name}`}>City:</label>
                    <TextBox readonly name={`City_${name}`} value={value && value.City || ''}/>
                </div>
                <div className={wrapperClass}>
                    <label htmlFor={`State_${name}`}>State/Province:</label>
                    <TextBox
                        readonly
                        name={`State_${name}`}
                        value={value && value.StateProvince && value.StateProvince.UniqueAttribute && value.StateProvince.UniqueAttribute.Description || ''}/>
                </div>
                <div className={wrapperClass}>
                    <label htmlFor={`ZipCode_${name}`}>Zip Code:</label>
                    <TextBox readonly name={`ZipCode_${name}`} value={value && value.PostalCode || ''}/>
                </div>
                <div className={wrapperClass}>
                    <label htmlFor={`County_${name}`}>County:</label>
                    <TextBox
                        readonly
                        name={`County_${name}`}
                        value={value && value.County && value.County.Name || ''}/>
                </div>
            </div>
        );
    }
}

Address.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any
};

export default Address;
