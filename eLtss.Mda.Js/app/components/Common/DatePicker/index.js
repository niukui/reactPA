import React, { PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class FeiDatePicker extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { value, onChange, name, saveRequired, readonly, extraProps, id } = this.props;
        if (readonly && readonly === true) {
            var displayValue = (value && moment(value))
                ? (moment(value).isUtc()
                    ? moment(value).utc().format('MM/DD/YYYY')
                    : moment(value).utcOffset(moment().utcOffset()).format('MM/DD/YYYY'))
                : '';
            return (<input
                name={name}
                id={id}
                type="text"
                value={displayValue}
                readOnly="readonly"
                className="readonly" />);
        }

        return (<DatePicker
            autoComplete="off"
            id={id}
            name={name}
            utcOffset={moment().utcOffset()}
            showYearDropdown
            scrollableYearDropdown
            selected={value
                ? moment(value).utcOffset(moment().utcOffset())
                : null}
            className={`${saveRequired
                ? 'required '
                : ''}`}
            {...extraProps}
            onChange={(m, e) => {
                let val = m
                    ? (m.isUtc()
                        ? m.utc()
                        : m)
                    : null;
                if (e) {
                    e.target.name = name;
                    e.target.value = val;
                } else {
                    e = {
                        target: {
                            name: name,
                            value: val,
                        }
                    };
                }
                onChange(e);
            }} />);
    }
}

FeiDatePicker.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    saveRequired: PropTypes.bool,
    readonly: PropTypes.bool,
    id: PropTypes.string,
    extraProps: PropTypes.object,

}


export default FeiDatePicker;
