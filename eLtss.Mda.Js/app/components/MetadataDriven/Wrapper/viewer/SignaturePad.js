import React, {PropTypes} from 'react';

const SignaturePad = ({name, label, value, item})=> {
    return(
        <div className="row">
           <span>{label}</span>
           <div style={{textAlign: 'right'}}>
             <div className="signature">
                <div className="data-element signature-wrapper">
                   <img src={value}/>
                    <div className="signatureLine">
                       <span>signed By testing </span>
                    </div>
                </div>
             </div>
            </div>
        </div>
    );
};

SignaturePad.propTypes = {
    item:PropTypes.object,
    name:PropTypes.string,
    label:PropTypes.string,
    value:PropTypes.string,
}

export default SignaturePad;