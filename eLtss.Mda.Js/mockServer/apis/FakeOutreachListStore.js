/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import {FindByCategory} from './lookupApi';
import faker from 'faker';
import moment from 'moment';
import lodash from 'lodash';
class FakeOutreachListStore {
  constructor(/*number*/
  size) {
    this.size = size || 2000;
    this._cache = [];
    this.clientIds = [
      "clients/567f0761-f118-4f97-940e-01c802828e08",
      "clients/1337035f-6fb3-4772-a9fa-1240eb9dfed7",
      "clients/9fc32895-afdf-46ab-9144-824c35cc6626",
      "clients/6116fd73-c0f5-444a-9378-7ed7830c4574",
      "clients/cb08db50-5767-4d24-8470-1366f940bfc0",
      "clients/56daeb75-4cd6-4885-b9c3-ca685599cff8",
      "clients/a49ac6b6-05d0-4aaf-b476-4ebff64a2dd1",
      "clients/88c30ca5-9732-4c80-9c61-108fa22a7dcd",
      "clients/35afe6f0-451b-480f-812b-523614992bc6",
      "clients/07c4c9ab-ef6d-46a4-a140-0afc63c413e0",
      "clients/a4ce557b-c386-4635-9490-2c7a01d30b3a",
      "clients/b340bee1-caab-4ee8-af23-d836f2756b7a",
      "clients/53da21dc-0507-4e9f-8999-4b0b22e7a991",
      "clients/da20eafc-90cb-42bb-a155-0dda1fc975b7",
      "clients/946ea707-156f-42c8-ba52-e141e81e6560",
      "clients/2a2786aa-8440-45ab-bb02-783048f414da",
      "clients/3992e8e6-9eb5-48e6-9b2c-d9416183ee77",
      "clients/973f61e8-dfe5-4f48-8bbc-8a3613bc90cf",
      "clients/4eb2d0ac-4d98-4c28-82a7-be0d3b543ee7",
      "clients/c554ba5e-496c-4d88-af69-46fdcecbb218",
      "clients/1f495e69-6c78-4c9e-99d5-059597da2929",
      "clients/9fb60765-c931-432f-9b8f-ea9ff214eaf9",
      "clients/136bbbf1-a800-46b0-8cff-af232b1c2048",
      "clients/6c5bddff-5402-4507-8ed3-fc0e5b008304",
      "clients/7c1cbe8b-e114-4693-bf04-0f985f78cb21",
      "clients/6d0c8d88-d35f-42a1-8d68-0307fc66833c",
      "clients/572bc4d0-9af5-4e2c-aca0-20c9de202c8f",
      "clients/b5d63e90-d43b-4189-80fc-7cb3a217b0c7",
      "clients/e0f8d9d8-7482-4008-a0fe-d38d748c4d5f",
      "clients/52205ee6-0e63-48a4-b0c0-f869daf46ba7",
      "clients/6f84446b-e03d-4708-8239-bdb422f05cd3",
      "clients/d34ad70e-befd-44c3-bda4-90ef4605eef4",
      "clients/a26d3285-23df-4890-8b8b-ca90794766b5",
      "clients/062cf349-5829-4cbd-b4a4-9d524d61571f",
      "clients/ad241957-5874-4778-b530-cda7e3cac0ac",
      "clients/c94d41de-a3de-4499-9091-f4285a2f75d7",
      "clients/5721aaa1-60e2-4392-a495-b22454214d2f",
      "clients/1a147f71-7795-47af-a656-321a38a49e65",
      "clients/9b76843b-9e00-4370-8bee-912d4e389a24",
      "clients/9491bbe2-f93d-4ad9-a848-51f73dbb0fa1",
      "clients/b1ed7e61-1829-4f3b-9f68-43074a293513",
      "clients/0d32e6b1-56c4-4493-a407-95bd7a5e68f6",
      "clients/bf5f06b2-5109-4976-9c9a-0cb941e0af97",
      "clients/93935857-2fa4-47be-869a-01c09b2ce0e4",
      "clients/56fde48e-503f-4b76-b724-8fc203b0797d",
      "clients/6d249adc-05cb-486e-b8e1-2d59a09c6797",
      "clients/f21283da-011c-4489-8405-311dea100d17",
      "clients/5f757f84-f5d3-498a-9de1-6c0482258f06",
      "clients/60ca0624-e067-401d-8e8b-f2e7989a30f7",
      "clients/8be47058-4458-48a1-80f5-d81a3061b0c4",
      "clients/3cd06c65-1195-453a-a5e9-bc8ea9e55a38",
      "clients/09d8e277-dc15-449e-ac71-cccdfb30ce70",
      "clients/4d021cb9-b705-4fa1-a11a-df37cc141eb3",
      "clients/35a37ce6-c621-4d61-9b10-ca5b456d66aa",
      "clients/fbeee753-621f-406a-b986-18609a08467a",
      "clients/1415609f-f6ea-475c-923e-71e6b8d9bd33",
      "clients/3e26cf6e-62c3-4ff2-8e4d-16679996c022",
      "clients/e953e297-ba57-474c-b227-422fe9c52390",
      "clients/90180879-1074-492b-b4f8-ad88860a294b",
      "clients/517adb6f-161e-44e7-98b5-595aebba0e9b",
      "clients/2a7439ac-3b86-4b16-9532-8614410355c1",
      "clients/dc0a86db-c7c4-475d-b882-a3f6183b5d1c",
      "clients/78d858ca-e910-4115-9033-8020af787dc6",
      "clients/c0eb933d-2fd9-4a6b-b982-b5c39dd07a20",
      "clients/61b3f54b-13e4-43da-9fc5-b2a6b5f82c2f",
      "clients/26917e11-06cc-4e6e-98d5-03caab08e1c7",
      "clients/942da3c0-7eff-4d40-a055-38350deabe8a",
      "clients/2ae0ccb4-a01c-436c-b189-31c1e10f0f22",
      "clients/46ddd63c-a2b6-4623-9f32-ccf017d3a86f",
      "clients/8fe13c91-3921-4f3a-9f01-ab6cb731bead",
      "clients/30aee238-a084-4069-88b5-29424f962a62",
      "clients/e77a942a-1c05-4581-9fb5-a14388f4c18c",
      "clients/62d610c1-9b80-4fac-a10a-e3180351c8af",
      "clients/d667bb43-2187-4958-a8fc-3c782ab32a2f",
      "clients/22552a25-b57f-4418-9f87-27f199dfbccc",
      "clients/3dbad736-efbb-439c-8568-4015f2f7a205",
      "clients/71baded3-8726-4ce9-88ff-62cf396a264d",
      "clients/fd5b78ce-b57a-4a5b-b610-ed04011f5cf2",
      "clients/0352e3ab-f696-487e-84b2-8caca184946f",
      "clients/d98a7418-e05c-44f4-b030-9d82ef957b24",
      "clients/f9c94ca3-769e-4458-84eb-587930006eba",
      "clients/2dac4019-96ca-4341-a2c0-e8780e6f5094",
      "clients/a5ee7c84-d6a5-4693-b01b-bd28f44515e3",
      "clients/d3da94c7-6cc0-40a2-9326-e9060503ef98",
      "clients/4d44bc29-9b77-4d9e-b466-25016c245b9c",
      "clients/ba08e22b-6893-41d7-8118-521a414e189d",
      "clients/e500ab80-479e-4ba1-bdab-0783631064e0",
      "clients/171e25d2-512a-43e5-8b6b-81f497d3098b",
      "clients/9c7946bc-5cd7-4998-84e6-b55b909b7c08",
      "clients/db498927-306c-4a63-aed1-73eb4863f928",
      "clients/6e060ad7-2135-464d-a9fd-8541810e83b6",
      "clients/7fcd3336-3c05-4d05-8c6c-4a5dc6ea719b",
      "clients/ca52b45c-3a51-4943-b723-30131c9e70a5",
      "clients/87b2513f-e5c5-4629-bb1c-ff66afd58a92",
      "clients/b136ebf8-3905-49a0-87f0-5ceedf0e56d2",
      "clients/acaf6b21-2622-4196-aa20-9650dc95a8a9",
      "clients/f038ea7f-7337-415f-99e1-cf476ef5daf5",
      "clients/179b4074-19a6-4ee4-ab53-3380eefa2368",
      "clients/3bed918c-3aed-4446-8e30-2b377707253f",
      "clients/0e350b74-5008-412a-9206-c0eb2b396184",
      "clients/5ead6b83-78e3-4003-9586-d50c27e4f996",
      "clients/70187105-39f0-4551-8534-f6a4a08e4014",
      "clients/c0f93e21-4acf-4798-aa02-6bfbdc9677ba",
      "clients/b4ad24a2-1e69-458a-bc7b-c086b8cf77e3",
      "clients/129c32a4-819c-4133-a399-fbddebdc9aaf",
      "clients/1235bb1f-a11b-47ef-82f8-a93b08ac79af",
      "clients/b9fe379e-ba64-458c-83cf-14487d20894c",
      "clients/8423de97-c895-4222-b7d7-ba7c5fcebf86",
      "clients/298ef2be-427b-4d9c-835a-0ca006d0bc8a",
      "clients/dbcf4ad0-22aa-4a47-9db8-ef55fac877d0",
      "clients/2cb7c88d-b573-4c1a-91b5-8024c63529f5",
      "clients/8e509aac-ece7-4b98-b083-7276a08c5c8b",
      "clients/8f7dd260-ed9a-4185-8540-d56a0e70e5b7",
      "clients/66adadfa-9f9c-4be8-8045-50b92df6d00b",
      "clients/043e4e6a-1128-4c00-ae1d-43a92d53100f",
      "clients/cfaca790-0fdc-4590-b0e4-53c35c2ae77c",
      "clients/361547c5-ce18-4714-903a-f69289c7da3d",
      "clients/88278323-ef01-4b53-82bf-b4a80cc7ab7c"
    ]
    this.statusList = [
      {
        "Text": "New",
        "Value": "New"
      }, {
        "Text": "In Progress",
        "Value": "InProgress"
      }, {
        "Text": "Completed",
        "Value": "Completed"
      }
    ];
    this.staffList = [
      {
        "Text": "N/A",
        "Value": "N/A"
      }, {
        "Value": "staffs/71542dec-177a-498c-b780-2a47a3726f9d",
        "Text": "CCOne AH"
      }, {
        "Value": "staffs/6b7d5854-854b-4eb2-bcea-62aa19851740",
        "Text": "CCTwo AH"
      }, {
        "Value": "staffs/b94452f7-9fc5-4795-98fb-f197c218bdcc",
        "Text": "MOne CMOne"
      }, {
        "Value": "staffs/dd571141-e956-4fdd-b963-cb7b36f494f0",
        "Text": "MTwo CMOne"
      }, {
        "Value": "staffs/a78b4af8-1f85-496a-bd7b-be3ecc2e479f",
        "Text": "MOne CMTwo"
      }, {
        "Value": "staffs/cdea85a7-f7d8-4c09-be22-af9cee23ef1d",
        "Text": "MTwo CMTwo"
      }
    ]

  }

  createFakeRowObjectData(/*number*/
  index)/*object*/
  {
    let data = {
      Id: 'outreachs/' + faker
        .random
        .uuid(),
      ClientId: this.clientIds[
        faker
          .random
          .number({
            min: 0,
            max: this.clientIds.length - 1
          })
      ],
      ClientIdentifier: faker
        .hacker
        .abbreviation() + faker
        .finance
        .account(),
      PersonName: {
        FirstName: faker
          .name
          .firstName(),
        LastName: faker
          .name
          .lastName()
      },
      DateOfBirth: faker
        .date
        .past(),
      EnrollmentDate: faker
        .date
        .past(),
      TerminationDate: faker
        .date
        .past(),

      AddedDate: faker
        .date
        .past(),

      RemovedDate: faker
        .date
        .past(),

      FirstAttempt: {
        ContactResults: faker
          .random
          .boolean(),
        ContactDate: faker
          .date
          .past(),
        OutreachDate: faker
          .date
          .past(),
        FailedReason: {},
        Comments: faker
          .address
          .streetName()
      },

      SecondAttempt: {
        ContactResults: faker
          .random
          .boolean(),
        ContactDate: faker
          .date
          .past(),
        OutreachDate: faker
          .date
          .past(),
        FailedReason: {},
        Comments: faker
          .address
          .streetName()
      },
      Score: faker
        .random
        .number(),
      InitialScreeningDate: faker
        .date
        .past(),
      InitialVisitDate: faker
        .date
        .past(),
      UtrLetterDate: faker
        .date
        .past(),
      Checkintimestamp: faker
        .date
        .past(),
      Checkouttimestamp: faker
        .date
        .past(),
      WelcomeLetterDate: faker
        .date
        .past(),

      CCAssignmentStatus: faker
        .random
        .boolean(),
      CCAssignmentDate: faker
        .date
        .past(),

      CMOUAssignmentStatus: faker
        .random
        .boolean(),

      CMOUAssignmentDate: faker
        .date
        .past(),

      CurrentCheckedInfo: {
        Comments: faker
          .address
          .streetName(),
        CheckedBy: {
          FullName: faker
            .name
            .firstName() + " " + faker
            .name
            .lastName(),
          FirstName: faker
            .name
            .firstName(),
          LastName: faker
            .name
            .firstName()
        }
      },
      ChangesHistory: [
        {
          CheckedType: {
            "Id": "lookupitems/checkinouttypes/19dac65d-7fe7-4f3d-b265-94588580ab95",
            "Category": "checkinouttypes",
            "ParentId": null,
            "Abbreviation": "CheckIn",
            "Name": "Check In",
            "Description": null,
            "SortOrder": 100,
            "Inactive": false,
            "UniqueAttribute": {
              "Guid": "19dac65d-7fe7-4f3d-b265-94588580ab95",
              "Description": "Check In"
            },
            "RuleAttributes": []
          },
          CheckedBy: {
            FullName: faker
              .name
              .firstName() + " " + faker
              .name
              .lastName(),
            FirstName: faker
              .name
              .firstName(),
            LastName: faker
              .name
              .firstName()
          },
          Comments: "This is a comment",
          CheckedTimestamp: faker
            .date
            .past()
        }, {
          CheckedType: {
            "Id": "lookupitems/checkinouttypes/ebe894a0-5309-44e2-b0cd-4ff1efc95c08",
            "Category": "checkinouttypes",
            "ParentId": null,
            "Abbreviation": "CheckOut",
            "Name": "Check Out",
            "Description": null,
            "SortOrder": 110,
            "Inactive": false,
            "UniqueAttribute": {
              "Guid": "ebe894a0-5309-44e2-b0cd-4ff1efc95c08",
              "Description": "Check Out"
            },
            "RuleAttributes": []
          },
          CheckedBy: {
            FullName: faker
              .name
              .firstName() + " " + faker
              .name
              .lastName(),
            FirstName: faker
              .name
              .firstName(),
            LastName: faker
              .name
              .firstName()
          },
          Comments: "This is another comment",
          CheckedTimestamp: faker
            .date
            .past()
        }
      ],
      summary: 'Summary'
    };
    if (data.SecondAttempt.ContactDate < data.FirstAttempt.ContactDate) {
      const temp = data.FirstAttempt.ContactDate;
      data.FirstAttempt.ContactDate = data.SecondAttempt.ContactDate;
      data.SecondAttempt.ContactDate = data.FirstAttempt.ContactDate;
    }
    data.OutreachId=data.Id;
    const programtypes = FindByCategory("programtypes");
    data.ProgramType = programtypes.DataObject[
      faker
        .random
        .number({
          min: 0,
          max: programtypes.DataObject.length - 1
        })
    ];
    const status = this.statusList[
      faker
        .random
        .number({
          min: 0,
          max: this.statusList.length - 1
        })
    ];
    if (status.Value !== "Completed") {
      data.RemovedDate = null;
      data.TerminationDate = null;
    }
    if (status.Value === "New") {

      data.RemovedDate = null;
      data.FirstAttempt = null;
      data.SecondAttempt = null;
      data.Score = null;
      data.InitialScreeningDate = null;
      data.InitialVisitDate = null;
      data.UtrLetterDate = null;
      data.WelcomeLetterDate = null;
      data.CCAssignmentStatus = false;
      data.CCAssignmentDate = null;
      data.CMOUAssignmentStatus = false;
      data.CMOUAssignmentDate = false;
    } else {
      if (data.FirstAttempt && data.FirstAttempt.ContactResults || data.SecondAttempt && data.SecondAttempt.ContactResults) {
        data.UtrLetterDate = null;
      } else {
        data.InitialScreeningDate = null;
        data.InitialVisitDate = null;
      }
    }

    if (!data.CMOUAssignmentStatus) {
      data.CMOUAssignmentDate = null;
    }

    if (!data.CCAssignmentStatus) {
      data.CCAssignmentDate = null;
    }

    if (data.FirstAttempt && data.FirstAttempt.ContactResults) {
      data.SecondAttempt = null;
    }

    data.WorkflowStatus = {
      Name: status.Value,
      DisplayName: status.Text
    };
    if (status.Value === "New") {
      data.NextAvailableEvents = [
        {
          Name: "CheckIn",
          DisplayName: "The 1st check in"
        }
      ]
    }
    if (status.Value === "InProgress") {
      data.NextAvailableEvents = [
        {
        
          Name: "CheckIn",
          DisplayName: "The 1st check in"
        }
      ]
    }

    const staff = this.staffList[
      faker
        .random
        .number({
          min: 0,
          max: this.staffList.length - 1
        })
    ];
    if (staff.Value === "N/A") {
      data.CurrentCheckedInfo = null;
    } else {
      data.CurrentCheckedInfo.CheckedBy.FullName = staff.Text;
      data.CurrentCheckedInfo.CheckedBy.FirstName = staff.Text;
      data.CurrentCheckedInfo.CheckedBy.LastName = "";
      data.CurrentCheckedInfo.CheckedBy.UserId = staff.Value;
    }

    return data;
  }

  getObjectAt(/*number*/
  index)/*?object*/
  {
    if (index < 0 || index > this.size) {
      return undefined;
    }
    if (this._cache[index] === undefined) {
      let outreach = this.createFakeRowObjectData(index);

      if (index === 0) {
        outreach.ClientId = "clients/3305cc0b-546f-4a01-896e-e2fec3f195c7";
        outreach.ClientIdentifier = "2949633NA334100";
        outreach.PersonName.FirstName = "Andersen";
        outreach.PersonName.LastName = "Booth";
        outreach.DateOfBirth = moment("1946-09-04", "YYYY-MM-DD");
        outreach.EnrollmentDate = moment("2014-01-01", "YYYY-MM-DD");
        lodash.set(outreach, "FirstAttempt.ContactDate", moment("2014-03-01", "YYYY-MM-DD"));
        lodash.set(outreach, "FirstAttempt.ContactResults", false);
        lodash.set(outreach, "FirstAttempt.FailedReason", {
          "Id": "lookupitems/outreachcontactfailedreasons/8bd03649-0139-470f-bf23-d1a6532b6b01",
          "Category": "outreachcontactfailedreasons",
          "ParentId": null,
          "Abbreviation": "NoAnswerAbleToLeaveMessage",
          "Name": "No answer – able to leave message",
          "Description": null,
          "SortOrder": 110,
          "Inactive": false,
          "UniqueAttribute": {
            "Guid": "8bd03649-0139-470f-bf23-d1a6532b6b01",
            "Description": "No answer – able to leave message"
          },
          "RuleAttributes": []
        });
        lodash.set(outreach, "SecondAttempt.ContactDate", moment("2014-06-05", "YYYY-MM-DD"));
        lodash.set(outreach, "SecondAttempt.ContactResults", false);
        lodash.set(outreach, "SecondAttempt.FailedReason", {
          "Id": "lookupitems/outreachcontactfailedreasons/8bd03649-0139-470f-bf23-d1a6532b6b01",
          "Category": "outreachcontactfailedreasons",
          "ParentId": null,
          "Abbreviation": "NoAnswerAbleToLeaveMessage",
          "Name": "No answer – able to leave message",
          "Description": null,
          "SortOrder": 110,
          "Inactive": false,
          "UniqueAttribute": {
            "Guid": "8bd03649-0139-470f-bf23-d1a6532b6b01",
            "Description": "No answer – able to leave message"
          },
          "RuleAttributes": []
        });
        outreach.InitialVisitDate = null;
        outreach.WelcomeLetterDate = null;
        outreach.UtrLetterDate = moment("2014-02-20", "YYYY-MM-DD");
        outreach.Checkintimestamp = moment("2013-01-20", "YYYY-MM-DD");
        outreach.Checkouttimestamp = moment("2013-01-20", "YYYY-MM-DD");
        outreach.CCAssignmentDate = moment("2014-02-20", "YYYY-MM-DD");
        outreach.CCAssignmentStatus = true;
        outreach.CMOUAssignmentStatus = false;
        outreach.CMOUAssignmentDate = null;
        outreach.Score = null;
        outreach.InitialScreeningDate = null;
        outreach.AddedDate = moment("2014-01-20", "YYYY-MM-DD");
        outreach.RemovedDate = moment("2014-02-20", "YYYY-MM-DD");
        outreach.WorkflowStatus = {
          "Name": "Completed",
          "DisplayName": "Completed"
        };
        outreach.CheckedBystaff = {
          "Name": "Tim",
          "DisplayName": "Tim"
        }

      }
      if (index === 1) {
        outreach.ClientId = "clients/361547c5-ce18-4714-903a-f69289c7da3d";
        outreach.ClientIdentifier = "1909546IM533130";
        outreach.PersonName.FirstName = "Minnie";
        outreach.PersonName.LastName = "Mouse";
        outreach.DateOfBirth = moment("1935-9-30", "YYYY-MM-DD");
        outreach.EnrollmentDate = moment("2018-1-01", "YYYY-MM-DD");
        lodash.set(outreach, "FirstAttempt.OutreachDate", moment("2017-6-01", "YYYY-MM-DD"));
        lodash.set(outreach, "FirstAttempt.ContactDate", moment("2017-6-01", "YYYY-MM-DD"));
        lodash.set(outreach, "FirstAttempt.ContactResults", true);
        lodash.set(outreach, "SecondAttempt", null);
        outreach.UtrLetterDate = null;
        outreach.WelcomeLetterDate = moment("2017-6-25", "YYYY-MM-DD");
        outreach.CCAssignmentDate = moment("2017-6-25", "YYYY-MM-DD");
        outreach.CCAssignmentStatus = true;
        outreach.CMOUAssignmentStatus = true;
        outreach.CMOUAssignmentDate = moment("2017-6-25", "YYYY-MM-DD");
        outreach.InitialVisitDate = moment("2017-6-20 09:30", "YYYY-MM-DD hh:mm");
        outreach.InitialVisitLocation = "600 Commonwealth Place, Pittsburgh";
        outreach.InitialScreeningDate = moment("2017-6-5", "YYYY-MM-DD");
        outreach.Score = 3.477;
        outreach.AddedDate = moment("2017-3-20", "YYYY-MM-DD");
        outreach.RemovedDate = null;
        outreach.WorkflowStatus = {
          "Name": "InProgress",
          "DisplayName": "In Progress"
        };

      }
      if (index === 2) {
        outreach.ClientId = "clients/88278323-ef01-4b53-82bf-b4a80cc7ab7c";
        outreach.ClientIdentifier = "2809722AS225130";
        outreach.PersonName.FirstName = "Sam";
        outreach.PersonName.LastName = "Cooke";
        outreach.DateOfBirth = moment("1957-08-30", "YYYY-MM-DD");
        lodash.set(outreach, "FirstAttempt.OutreachDate", moment("2017-07-01", "YYYY-MM-DD"));
        lodash.set(outreach, "FirstAttempt.ContactDate", moment("2017-07-01", "YYYY-MM-DD"));
        lodash.set(outreach, "FirstAttempt.ContactResults", true);
        lodash.set(outreach, "SecondAttempt", null);
        outreach.EnrollmentDate = moment("2018-1-01", "YYYY-MM-DD");
        outreach.UtrLetterDate = null;
        outreach.CCAssignmentDate = moment("2017-7-20", "YYYY-MM-DD");
        outreach.WelcomeLetterDate = moment("2017-7-20", "YYYY-MM-DD");
        outreach.CCAssignmentStatus = true;
        outreach.CMOUAssignmentStatus = true;
        outreach.CMOUAssignmentDate = moment("2017-7-20", "YYYY-MM-DD");
        outreach.InitialScreeningDate = moment("2017-7-1", "YYYY-MM-DD");
        outreach.InitialVisitDate = moment("2017-7-20 14:30", "YYYY-MM-DD hh:mm");
        outreach.InitialVisitLocation = "700 Bower Hill Road, Pittsburgh";
        outreach.AddedDate = moment("2017-4-20", "YYYY-MM-DD");
        outreach.RemovedDate = null;
        outreach.WorkflowStatus = {
          "Name": "InProgress",
          "DisplayName": "In Progress"
        };

      }

      this._cache[index] = outreach;
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
  getStaffList()
  {
    return this.staffList;
  }
}

module.exports = FakeOutreachListStore;
