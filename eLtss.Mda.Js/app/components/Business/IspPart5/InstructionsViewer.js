import React, { PropTypes } from 'react';

class InstructionsViewer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { workflowStatus } = this.props;
    const workflowStatusName = workflowStatus && workflowStatus.Name;
    if (workflowStatusName !== "PendingScReview" && workflowStatusName !== "PendingProviderReview") {
      return (
        <fieldset className="fieldset-container-one">
          <legend className="legend-header-one">Instructions</legend>
          <div className="body">
            <p>
              <i>
                <b>We encourage the use of the Form Notes module to communicate reasons for the
                  requested changes to the Support Coordinator.
                </b> If an Outcome is changed or added, then the Support Coordinator will have a
                chance to review these changes and make edits as needed, but making them aware
                of the changes might speed up the approval process.
              </i>
            </p>
          </div>
        </fieldset>
      );
    } else if (workflowStatusName === "PendingScReview") {
      return (
        <fieldset className="fieldset-container-one">
          <legend className="legend-header-one">Instructions</legend>
          <div className="body">
            <p>
              <i>
                <b>Please use the Form Notes module to document any changes you make and discuss them with the provider.</b>
              </i>
            </p>
          </div>
        </fieldset>
      );
    } else if (workflowStatusName === "PendingProviderReview") {
      return (
        <fieldset className="fieldset-container-one">
          <legend className="legend-header-one">Instructions</legend>
          <div className="body">
            <p>
              <i>
                <b>We encourage the use of the Form Notes module to communicate reasons for the
                  requested changes to the Support Coordinator.
                </b>If an Outcome is changed or added, then the Support Coordinator will have a
                chance to review these changes and make edits as needed, but making them aware
                of the changes might speed up the approval process.
              </i>
            </p>
          </div>
        </fieldset>
      );
    }
  }
}

InstructionsViewer.propTypes = {
  data: PropTypes.object,
  workflowStatus: PropTypes.object
};
export default InstructionsViewer;