import React, {PropTypes} from 'react';

const YesNoRadioButtons = ({name, onChange, value, readonly}) => {
    const prepareOnChange = (e) => {
        onChange({
            target: {
                name: e.target.name,
                value: e.target.value === "false"
                    ? false
                    : (e.target.value === "true"
                        ? true
                        : null)
            }
        });
    };
    if (readonly) {
        return (
            <span>
                <input
                    type="radio"
                    id={name + "_yes"}
                    name={name}
                    checked={value === true}
                    value
                    readOnly="readonly"
                    disabled="disabled"
                    className="reactComponent"/>
                <label htmlFor={name + "_yes"} className="auto-width">Yes</label>
                <input
                    type="radio"
                    id={name + "_no"}
                    name={name}
                    checked={value === false}
                    value={false}
                    readOnly="readonly"
                    disabled="disabled"
                    className="reactComponent"/>
                <label htmlFor={name + "_no"} className="auto-width">No</label>
            </span>
        );
    } else {
        return (
            <span>
                <input
                    type="radio"
                    id={name + "_yes"}
                    name={name}
                    checked={value === true}
                    value
                    className="reactComponent"
                    onChange={prepareOnChange}/>
                <label htmlFor={name + "_yes"} className="auto-width">Yes</label>
                <input
                    type="radio"
                    id={name + "_no"}
                    name={name}
                    checked={value === false}
                    value={false}
                    className="reactComponent"
                    onChange={prepareOnChange}/>
                <label htmlFor={name + "_no"} className="auto-width">No</label>
            </span>
        );
    }
};

YesNoRadioButtons.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.bool,
    readonly: PropTypes.bool
};

export default YesNoRadioButtons;
