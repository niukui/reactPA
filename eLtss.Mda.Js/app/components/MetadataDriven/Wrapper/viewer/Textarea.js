import React, {PropTypes} from 'react';
import TextareaInput from 'components/Common/Textarea';
import RequiredIndicator from 'components/Common/RequiredIndicator';
import {toString} from 'lodash';

const Textarea = ({
  item,
  name,
  label,
  value,
  required
}) => {

  let wrapperClass = item.ClassName || 'row';

  return (
    <div>
      <div className={wrapperClass}>
        <label
          htmlFor={item.Name}
          className={`${item.IsRequired ? 'complete-required' : ''} auto-width`}>
          {label}{required && <RequiredIndicator /> }
        </label>
        { item.Description ? <span className="label-info">{item.Description}</span> : ``}
        <TextareaInput
          readonly
          id={item.Name}
          name={item.Name}
          value={toString(value)}
          />
      </div>


     {item.AdditionalDisplayName &&
       <div className={wrapperClass}>
          <span>{item.AdditionalDisplayName}
            {item.HyperLink &&
            item.HyperLink.Type==='AdditionalDisplayName' &&
            <a href={item.HyperLink.Href} target="_blank">{item.HyperLink.Text}</a>}</span>
       </div>}
    </div>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  required: PropTypes.bool,
  item: PropTypes.any,
};

export default Textarea;
