import {FindByCategory} from './lookupApi';
import faker from 'faker';

class FakeVisitChecklistStore {
  constructor(/*number*/
  size) {
    this.size = size || 20;
    this._cache = [];
    this.statusList = [
      {
        "Text": "In Progress",
        "Value": "InProgress"
      }, {
        "Text": "Completed",
        "Value": "Completed"
      }, {
        "Text": "Discarded",
        "Value": "Discarded"
      }
    ];
    this.vclvisitsettings = ["Community", "Nursing Facility"];
    this.vclvisittypes = ["Initial", "Reassessment", "Transition", "Change In Condition"];
  }

  createFakeRowObjectData(/*number*/
  index)/*object*/
  {
    let data = {
      Id: 'visitChecklist/' + faker
        .random
        .uuid(),
      ClientId: 'clients/' + faker
        .random
        .uuid(),
      ClientIdentifier: faker
        .hacker
        .abbreviation() + faker
        .finance
        .account(),
      CreatedDate: faker
        .date
        .past(),
      CreatedBy: faker
        .name
        .firstName() + " " + faker
        .name
        .lastName(),
      VisitDate: faker
        .date
        .past(),
      summary: 'Summary'
    };

    const status = this.statusList[
      faker
        .random
        .number({
          min: 0,
          max: this.statusList.length - 1
        })
    ];

    data.WorkflowStatus = {
      Name: status.Value,
      DisplayName: status.Text
    };
    
    if(status.Value === "InProgress")
    {
      data.NextAvailableEvents=[{
          Name: "Completed",
          DisplayName: "Completed"
        }, 
        {
          Name: "Discarded",
          DisplayName: "Discarded"
        }
      ]
    }

    const visitSetting = this.vclvisitsettings[
      faker
        .random
        .number({
          min: 0,
          max: this.vclvisitsettings.length - 1
        })
    ];

    data.VisitSetting = visitSetting;

    const visitType = this.vclvisittypes[
      faker
        .random
        .number({
          min: 0,
          max: this.vclvisittypes.length - 1
        })
    ];

    data.VisitType = visitType;

    if (data.WorkflowStatus.Name === "Completed") {
      data.CompletedDate = faker
        .date
        .past()
    };
    return data;
  }

  getObjectAt(/*number*/
  index)/*?object*/
  {
    if (index < 0 || index > this.size) {
      return undefined;
    }
    if (this._cache[index] === undefined) {
      this._cache[index] = this.createFakeRowObjectData(index);
    }
    return this._cache[index];
  }

  /**
  * Populates the entire cache with data.
  * Use with Caution! Behaves slowly for large sizes
  * ex. 100,000 rows
  */
  getAll() {
    if (this._cache.length < this.size) {
      for (var i = 0; i < this.size; i++) {
        this.getObjectAt(i);
      }
    }
    return this
      ._cache
      .slice();
  }

  getSize() {
    return this.size;
  }

  getStatusList() {
    return this.statusList;
  }

}

module.exports = FakeVisitChecklistStore;
