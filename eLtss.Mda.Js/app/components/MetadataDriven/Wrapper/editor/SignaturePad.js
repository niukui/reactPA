import React, {PropTypes} from 'react';
import EsignaturePad from 'components/Common/SignaturePad';

const SignaturePad = ({
    name,
    item,
    onChange,
    eventType,
    value,
    error,
    readonly,
    required,
    customAttribute
    
}) => {
    let wrapperClass = "row";
    // let style = {     color: "darkblue",     border: "dotted 2px black",
    // width: "60%; margin: 0 auto" }
    if (error && error.length > 0) {
        wrapperClass += " has-error";
    }
    const prepareChanges = (event) => {
        let changes = [];
        changes.push({name: event.target.name, value: event.target.value});
        onChange(changes);
    };

    return (
        <div className={wrapperClass}>
            <div className="signatureContainer">
                <EsignaturePad
                    clearButton={true}
                    onChange={prepareChanges}
                    eventType = {eventType}
                    name={name}
                    value={value}
                    customAttribute
                    ={customAttribute}/> {error && <div className="error alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

SignaturePad.propTypes = {
    name: PropTypes.string,
    item: PropTypes.object,
    onChange: PropTypes.func,
    eventType: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    readonly: PropTypes.bool,
    required: PropTypes.bool,
    customAttribute: PropTypes.string
}

export default SignaturePad;