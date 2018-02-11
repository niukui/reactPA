import React, {PropTypes} from 'react';
import {FormattedNumber} from 'react-intl';

class GeneralCalendarCalculator extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  getTimeSpan(event) {
    let span = 8;
    if (!event.tag.DailySupport)
    {
      const hourSpan = event.tag.EndTime.Hours - event.tag.StartTime.Hours;
      const minuteSpan = event.tag.EndTime.Minutes - event.tag.StartTime.Minutes;
      span = hourSpan + minuteSpan / 60;
    }
    
    return span;
  }

  getTimeSpanCost(span, rate) {
    return span * rate
  }

  render() {

    const {supportsPackageServices, events} = this.props;
    let TotalWeeklyHours = 0;
    let TotalWeeklyCost = 0;

    return (
      <div>
        <table className="table supportsPackageTable">
          <thead>
            <tr>
              <th>Support Package Services</th>
              <th>{this.props.clientPreferredName}'s Weekly Hours</th>
              <th>Typical Projected by Model Hours</th>
              <th>Weekly Cost</th>
              <th>Typical Projected by Model Cost</th>
            </tr>
          </thead>
          <tbody>
            {              
              supportsPackageServices.length <= 0
              ? <tr>
                  <td colSpan="16" className="text-center">No data available in table.</td>
                </tr>
              : supportsPackageServices.map((service) => {
                let matchedEvents = events.filter(x => x.tag.ServiceDefinitionId === service.ServiceDefinitionId);
                let timeSpan = 0;
                let timeSpanCost = 0;
                matchedEvents.map((event) => {
                  if (event) {
                    timeSpan = timeSpan + this.getTimeSpan(event);
                    timeSpanCost = this.getTimeSpanCost(timeSpan, service.Rate);
                  }
                })

                TotalWeeklyHours = TotalWeeklyHours + timeSpan;
                TotalWeeklyCost = TotalWeeklyCost + timeSpanCost;

                return (
                  <tr key={service.Value}>
                    <td>{service.Text}</td>
                    <td>
                      <FormattedNumber value={timeSpan}/>
                    </td>
                    <td>
                      <FormattedNumber value={service.TotalProjectedByModelHours}/>
                    </td>
                    <td>
                      <FormattedNumber value={timeSpanCost} style="currency" currency="USD"/>
                    </td>
                    <td>
                      <FormattedNumber value={this.getTimeSpanCost(service.TotalProjectedByModelHours, service.Rate)} style="currency" currency="USD"/>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>

        <fieldset className="fieldset-container-one">
          <legend className="legend-header-one">Summary</legend>
          <div className="row">
            <label htmlFor="TotalWeeklyHours">Total Weekly Hours</label>
            <span id="TotalWeeklyHours">
              <FormattedNumber value={TotalWeeklyHours} />
            </span>
          </div>
          <div className="row">
            <label htmlFor="TotalAnnualHours">Total Annual Hours</label>
            <span id="TotalAnnualHours">
              <FormattedNumber value={TotalWeeklyHours * 52} />
            </span>            
          </div>
          <div className="row">
            <label htmlFor="TotalWeeklyCost">Total Weekly Cost</label>
            <span id="TotalWeeklyCost">
              <FormattedNumber value={TotalWeeklyCost} style="currency" currency="USD" />
            </span>            
          </div>
          <div className="row">
            <label htmlFor="TotalAnnualCost">Total Annual Cost</label>
            <span id="TotalAnnualCost">
              <FormattedNumber value={TotalWeeklyCost * 52} style="currency" currency="USD" />
            </span>            
            {TotalWeeklyCost * 52>this.props.totalDollarAmount&&<span className="error alert alert-danger">The Total Annual Cost for this individual exceeds the Total Dollar Amount Recommended. Please consider revising the calendar</span>}      
          </div>
          <div className="row">
            <label htmlFor="TotalDollarAmount">Total Dollar Amount</label>
            <span id="TotalDollarAmount">
              <FormattedNumber value={this.props.totalDollarAmount} style="currency" currency="USD" />
            </span>            
          </div>
        </fieldset>
      </div>
    );
  }
}

GeneralCalendarCalculator.propTypes = {
  clientPreferredName: PropTypes.string.isRequired,
  totalDollarAmount: PropTypes.number,
  supportsPackageServices: PropTypes.array,
  events: PropTypes.array
};

export default GeneralCalendarCalculator;