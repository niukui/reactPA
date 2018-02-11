import React, { PropTypes } from 'react';
import { formatJsonDateTime ,formatJsonDate} from 'utils/dateHelper';
class AuditTrailDetails extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            auditTrails: [],
        };
    }
    processArgument(argument,index)
    {
        if ("Effective Date and End Date" === argument.ArgumentDisplayName)
        {
      
            if(argument.Value===undefined || argument.Value === null)
            {
                return ( 
                <span key={index}>
                    {`${argument.ArgumentDisplayName || argument.ArgumentName} -> ${(argument.Value === undefined || argument.Value === null) ? 'NULL' : argument.Value}`}
                    <br /></span>
                ); 
                    }
              const effectiveValue=JSON.parse(argument.Value);  
              return ( 
                <span key={index}>
                    {'Effective Date -> '+ formatJsonDate(effectiveValue.StartDateTime)}
                    <br />
                    {'End Date -> '+ formatJsonDate(effectiveValue.EndDateTime)}
                    </span>
                );
                    }
            return ( 
              <span key={index}>
                    {`${argument.ArgumentDisplayName || argument.ArgumentName} -> ${(argument.Value === undefined || argument.Value === null) ? 'NULL' : argument.Value}`}
          <br /></span>);
    }
    formatArguments(domainMethodArguments) {
      return (
        domainMethodArguments.filter((argument) => !argument.IsIgnoreDisplay).map((argument, index) =>
             this.processArgument(argument,index)
          )
      );
    }

    render() {
      return (
        <table className="generalTable noInit">
          <thead>
            <tr>
              <th>Action Taken</th>
              <th>Action Taken By</th>
              <th>Date of Action</th>
              <th>Values</th>
            </tr>
          </thead>
          <tbody>
    {this.props.auditTrails && this.props.auditTrails.map((domainAuditTrail) =>
              <tr key={domainAuditTrail.Id}>
                <td>{domainAuditTrail.DomainMethodDisplayName}</td>
                <td>{domainAuditTrail.Stamp.CreatedOnBehalfOf.FullName}</td>
                <td>{formatJsonDateTime(domainAuditTrail.CurrentDateTime)}</td>
                <td>
    {this.formatArguments(domainAuditTrail.DomainMethodArguments)}
                </td>
              </tr>
             )}
          </tbody>
        </table>
      );
    }
    }

  AuditTrailDetails.propTypes = {
        auditTrails: PropTypes.array.isRequired,
    };

  export default AuditTrailDetails;

