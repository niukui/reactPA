import React, {PropTypes} from 'react';
import {formatJsonDateTime} from 'utils/dateHelper';
import lodash from 'lodash';
import toastr from 'toastr';
import ObjectInspector from 'react-object-inspector';

const breakLineTd = {
  wordBreak: 'break-all',
  wordWrap: 'break-word',
  whiteSpace: 'pre',
  whiteSpace: '-moz-pre-wrap',
  whiteSpace: 'pre-wrap',
  whiteSpace: 'pre\9',
  width: '40%',
};

class ChangesHistoryDetails extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.tryParseJson = this.tryParseJson.bind(this);
    this.renderValue = this.renderValue.bind(this);
    this.convertValue = this.convertValue.bind(this);
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

  convertValue(val) {
    if (val) {
      if (typeof val === 'string') {
        if (this.isJsonString(val)) {
          return <ObjectInspector data={this.tryParseJson(val)} />;
        } else {
          return <span>{val}</span>;
        }
      } else if (typeof val === 'object') {
        return <ObjectInspector data={val} />;
      } else {
        return <span>{val}</span>;
      }
    }
    return <span />;
  }

  renderValue(val, index) {
    let trs = [];
    lodash.forOwn(val, (v, k) => {
      if (k !== 'SectionDisplayName') {
        trs.push(
          <tr key={index + '_' + k}>
            <td style={{width: '20%'}}>
              {`${v.DisplayField}`}
            </td>
            <td style={breakLineTd}>
              {this.convertValue(v.FromValue)}
            </td>
            <td style={breakLineTd}>
              {this.convertValue(v.ToValue)}
            </td>
          </tr>
        );
      }
    });
    return trs;
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

  render() {
    const {history} = this.props;
    return (
      <table className="generalTable noInit">
        <thead>
          <tr>
            <th>Field</th>
            <th>Old Value</th>
            <th>New Value</th>
          </tr>
        </thead>
        <tbody>
          {lodash
            .filter(history.DomainMethodArguments, {
              IsIgnoreDisplay: false,
              ArgumentName: 'changesHistory',
            })
            .map((item, index) => {
              return this.renderValue(this.tryParseJson(item.Value), index);
            })}
        </tbody>
      </table>
    );
  }
}

ChangesHistoryDetails.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ChangesHistoryDetails;
