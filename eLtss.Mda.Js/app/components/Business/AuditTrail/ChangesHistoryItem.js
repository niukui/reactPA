import React, {PropTypes} from 'react';
import {formatJsonDateTime} from 'utils/dateHelper';
import ChangesHistoryDetails from './ChangesHistoryDetails';
import AuditTrailDetails from './AuditTrailDetails';
import lodash from 'lodash';
import toastr from 'toastr';

class ChangesHistoryItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      bodyVisible: false,
    };

    this.toggleBodyVisible = this.toggleBodyVisible.bind(this);
    this.tryFindSectionName = this.tryFindSectionName.bind(this);
    this.tryParseJson = this.tryParseJson.bind(this);
    this.isJsonString = this.isJsonString.bind(this);
  }

  isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  tryParseJson(str) {
    if (str) {
      if (typeof str === 'string') {
        if (this.isJsonString(str)) {
          try {
            return JSON.parse(str);
          } catch (err) {
            toastr.error(err);
          }
        } 
      } else if (typeof str === 'object') {
        return str;
      } else {
        toastr.error(`'${str}' is not a valid JSON string.`);
      }
    }
    return {};
  }

  toggleBodyVisible() {
    this.setState({bodyVisible: !this.state.bodyVisible});
  }

  tryFindSectionName(history) {
    let sectionName = null;
    const args = lodash.filter(history.DomainMethodArguments, {
      ArgumentName: 'changesHistory',
    });
    lodash.forEach(args, (arg, key) => {
      lodash.forOwn(this.tryParseJson(arg.Value), (v, k) => {
        if (k === 'SectionDisplayName') {
          sectionName = v;
        }
      });
    });
    return sectionName;
  }

  render() {
    const {history} = this.props;
    const {bodyVisible} = this.state;
    const containChangesHistory = history.DomainMethodArguments.find(x=>x.ArgumentName==="changesHistory");
    let auditTrails=[];
    auditTrails.push(history);

    return (
      <div className="panel">
        <div
          onClick={this.toggleBodyVisible}
          className={
            'header sub-panel-header-one ' +
              (bodyVisible ? 'expanded' : 'collapsed')
          }
        >
          <div className={bodyVisible ? 'arrow expand' : 'arrow collapse'} />
          <h5>
            <span style={{fontWeight: 'bold', fontSize: '1em'}}>
              {
                history.DomainMethodDisplayName +
                  (this.tryFindSectionName(history)
                    ? ' (' + this.tryFindSectionName(history) + ') '
                    : '  ')
              }
            </span>
            <span style={{fontWeight: 'normal', fontSize: "0.8em"}}>
              {" — " + history.Stamp.CreatedOnBehalfOf.FullName + " "} 
            </span>
            <span style={{ fontWeight: 'normal', fontSize: '0.8em'}}>
              {'(' + formatJsonDateTime(history.CurrentDateTime) + ')'}
            </span>
          </h5>
        </div>

        <div className={bodyVisible ? 'body bodyVisible' : 'body bodyHidden'}>
          <div className="form-panelbar-content">
            {containChangesHistory?
             <ChangesHistoryDetails history={history} />:
             <AuditTrailDetails auditTrails={auditTrails} />}
          </div>
        </div>

      </div>
    );
  }
}

ChangesHistoryItem.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ChangesHistoryItem;
