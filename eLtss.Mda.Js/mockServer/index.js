import hapi from 'hapi';
import addCorsHeaders from 'hapi-cors-headers';
import logger from './logger';
import * as mockIspApis from './apis/mockIspApi';
import * as mockPocApis from './apis/mockPocApi';
import * as lookupApis from './apis/lookupApi';
import getAccessPoliciesByModule from './apis/accessControlApi';
import * as mockSpApis from './apis/mockSpApi';
import * as mockIpcApis from './apis/mockIpcApi';
import * as mockOutreachApis from './apis/mockOutreachApi';
import * as mockVisitChecklistApi from './apis/mockVisitChecklistApi';
import fs from 'fs';

const port = 3001;
const server = new hapi.Server();
server.connection({
  port: port,
  host: 'localhost',
  "router": {
    "isCaseSensitive": false,
    "stripTrailingSlash": false
  },
  routes: {
    cors: {
      origin: ['*'],
      credentials: true,
      additionalHeaders: ['cache-control', 'x-requested-with']
    }
  }
});

server.ext('onPreResponse', addCorsHeaders);
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Mock APIs');
  }
});

server.route({
  method: 'GET',
  path: '/AuditTrail/FindDomainAuditTrailsByActions',
  handler: function (request, reply) {
    reply(mockIspApis.findDomainAuditTrailsByActions());
  }
});

server.route({
  method: 'GET',
  path: '/ProviderCommonSearch/GetProviderCriteriaData',
  handler: function (request, reply) {
    reply({});
  }
});

server.route({
  method: 'POST',
  path: '/ProviderCommonSearch/SearchProviders',
  handler: function (request, reply) {
    reply([]);
  }
});

server.route({
  method: 'GET',
  path: '/IndividualSupportPlans/IndividualSupportPlan/GetOverviewModel',
  handler: function (request, reply) {
    reply(mockIspApis.getIndividualSupportPlan());
  }
});

server.route({
  method: 'POST',
  path: '/IndividualSupportPlans/IndividualSupportPlan/SaveOverview',
  handler: function (request, reply) {
    reply(mockIspApis.getIndividualSupportPlan());
  }
});

server.route({
  method: 'GET',
  path: '/IndividualSupportPlans/IndividualSupportPlan/GetSummaryInfo',
  handler: function (request, reply) {
    reply(mockIspApis.getIndividualSupportPlan());
  }
});

server.route({
  method: 'GET',
  path: '/IndividualSupportPlans/IndividualSupportPlan/GetPlanForSupportList',
  handler: function (request, reply) {
    reply(mockIspApis.getPlanForSupportList());
  }
});

server.route({
  method: 'POST',
  path: '/IndividualSupportPlans/IndividualSupportPlan/EditGeneralScheduleSupportComment',
  handler: function (request, reply) {
    reply(mockIspApis.editGeneralScheduleSupportComment(request.payload.generalScheduleSupportComment));
  }
});

server.route({
  method: 'POST',
  path: '/IndividualSupportPlans/IndividualSupportPlan/AddSharedPlanning',
  handler: function (request, reply) {
    reply(mockIspApis.addSharedPlanning(sharedPlanningJson, request.payload.completionStatusJson));
  }
});

server.route({
  method: 'POST',
  path: '/IndividualSupportPlans/IndividualSupportPlan/EditSharedPlanning',
  handler: function (request, reply) {
    reply(mockIspApis.editSharedPlanning(request.payload.sharedPlanningJson, request.payload.completionStatusJson));
  }
});

server.route({
  method: 'POST',
  path: '/IndividualSupportPlans/IndividualSupportPlan/DeleteSharedPlanning',
  handler: function (request, reply) {
    reply(mockIspApis.deleteSharedPlanning(request.payload.sharedPlanningJson, request.payload.completionStatusJson));
  }
});

server.route({
  method: 'GET',
  path: '/IndividualSupportPlans/IndividualSupportPlan/FindDomainAuditTrails',
  handler: function (request, reply) {
    reply(mockIspApis.findDomainAuditTrails());
  }
});

server.route({
  method: 'POST',
  path: '/IndividualSupportPlans/IndividualSupportPlan/SaveSectionObject',
  handler: function (request, reply) {
    const sectionPath = request.query.sectionPath;
    reply(mockIspApis.saveSectionObject(sectionPath, request.payload.sectionJson, request.payload.completionStatusJson));
  }
});

server.route({
  method: 'GET',
  path: '/IndividualSupportPlans/IndividualSupportPlan/GetPart5SummaryInfo',
  handler: function (request, reply) {
    reply(mockIspApis.getPart5SummaryInfo());
  }
});

server.route({
  method: 'POST',
  path: '/IndividualSupportPlans/IndividualSupportPlan/CreatePlanForSupport',
  handler: function (request, reply) {
    reply(mockIspApis.createPlanForSupport());
  }
});

server.route({
  method: 'POST',
  path: '/IndividualSupportPlans/IndividualSupportPlan/ChangePart5Section',
  handler: function (request, reply) {
    const index = request
      .url
      .path
      .indexOf('sectionPath');
    const path = request
      .url
      .path
      .substring(index + 12);
    reply(mockIspApis.changePart5Section(path, request.payload.sectionJson));
  }
});

server.route({
  method: 'POST',
  path: '/IndividualSupportPlans/IndividualSupportPlan/AddGeneralScheduleSupport',
  handler: function (request, reply) {
    reply(mockIspApis.addGeneralScheduleSupport(request.payload.sectionJson, request.payload.completionStatusJson));
  }
});

server.route({
  method: 'POST',
  path: '/IndividualSupportPlans/IndividualSupportPlan/EditGeneralScheduleSupport',
  handler: function (request, reply) {
    reply(mockIspApis.editGeneralScheduleSupport(request.payload.sectionJson));
  }
});

server.route({
  method: 'POST',
  path: '/IndividualSupportPlans/IndividualSupportPlan/DeleteGeneralScheduleSupport',
  handler: function (request, reply) {
    reply(mockIspApis.deleteGeneralScheduleSupport(request.payload.generalScheduleSupportId, request.payload.completionStatusJson));
  }
});

server.route({
  method: 'GET',
  path: '/IndividualSupportPlans/IndividualSupportPlan/GetServiceOutcomesSection',
  handler: function (request, reply) {
    reply(mockIspApis.getServiceOutcomesSection());
  }
});

server.route({
  method: 'POST',
  path: '/IndividualSupportPlans/IndividualSupportPlan/ChangeServiceOutcomes',
  handler: function (request, reply) {
    reply(mockIspApis.changeServiceOutcomes(request.payload.sectionJson));
  }
});
server.route({
  method: 'POST',
  path: '/IndividualSupportPlans/IspFormNote/CreateNewIspFormNote',
  handler: function (request, reply) {
    reply(mockIspApis.createNewIspFormNote(request.payload));
  }
});

server.route({
  method: 'GET',
  path: '/Account/GetAccessPolicies',
  handler: function (request, reply) {
    reply(getAccessPoliciesByModule(request.query.name));
  }
});
server.route({
  method: 'GET',
  path: '/Account/GetAccessPoliciesByModuleName',
  handler: function (request, reply) {
    reply(getAccessPoliciesByModule(request.query.name));
  }
});
server.route({
  method: 'GET',
  path: '/Lookup/FindByCategory',
  handler: function (request, reply) {
    const category = request.query.category;
    reply(lookupApis.FindByCategory(category));
  }
});

server.route({
  method: 'POST',
  path: '/SupportsPackages/SupportsPackage/SaveSectionObject',
  handler: function (request, reply) {
    const sectionPath = request.query.sectionPath;
    reply(mockSpApis.saveSectionObject(sectionPath, request.payload.sectionJson, request.payload.completionStatusJson));

  }
});

server.route({
  method: 'GET',
  path: '/SupportsPackages/SupportsPackage/GetSummaryInfo',
  handler: function (request, reply) {
    reply(mockSpApis.getSupportsPackage());
  }
});

server.route({
  method: 'POST',
  path: '/SupportsPackages/SupportsPackage/CreateOrUpdateService',
  handler: function (request, reply) {
    reply(mockSpApis.createOrUpdateService(request.payload.serviceJson));
  }
});

server.route({
  method: 'POST',
  path: '/SupportsPackages/SupportsPackage/RemoveService',
  handler: function (request, reply) {
    reply(mockSpApis.removeService(request.payload.serviceId));
  }
});

server.route({
  method: 'GET',
  path: '/IndividualPlanningCalendars/IndividualPlanningCalendar/GetSummaryInfo',
  handler: function (request, reply) {
    reply(mockIpcApis.getIndividualPlanningCalendar());
  }
});

server.route({
  method: 'GET',
  path: '/IndividualPlanningCalendars/IndividualPlanningCalendar/GetListData',
  handler: function (request, reply) {
    reply(mockIpcApis.getGetListData(request.query.clientId));
  }
});

server.route({
  method: 'GET',
  path: '/Outreach/OutreachQueue/GetSummaryInfo',
  handler: function (request, reply) {
    reply(mockOutreachApis.getOutreach(request.query.clientId,request.query.dataId));
  }
});

server.route({
    method: 'GET',
    path: '/Outreach/OutreachQueue/GetAttemptSummaryInfo',
    handler: function (request, reply) {
        reply(mockOutreachApis.getOutreachAttempt());
    }
});
server.route({
    method: 'GET',
    path: '/Outreach/OutreachQueue/GetInitialVisitSummaryInfo',
    handler: function (request, reply) {
        reply(mockOutreachApis.getOutreachInitialVisit());
    }
});

server.route({
  method: 'GET',
  path: '/Outreach/OutreachQueue/GetListData',
  handler: function (request, reply) {
    const query=request.query;
    reply(mockOutreachApis.getListData(
      query.FirstName,
      query.LastName,
      query.ProgramType,
      query.Status,
      query.checkedOutTo));
  }
});

server.route({
  method: 'POST',
  path: '/Outreach/OutreachQueue/ProcessEvent',
  handler: function (request, reply) {
    const query=request.query;
    reply(mockOutreachApis.processEvent(query.dataId, query.eventName, query.comments));
  }
});

server.route({
  method: 'GET',
  path: '/Outreach/OutreachQueue/GetAllListData',
  handler: function (request, reply) {
    const query=request.query;
    reply(mockOutreachApis.getAllListData());
  }
});

server.route({
  method: 'GET',
  path: '/Outreach/OutreachQueue/GetListModel',
  handler: function (request, reply) {
    const query=request.query;
    reply(mockOutreachApis.GetListModel());
  }
});

server.route({
  method: 'POST',
  path: '/Outreach/OutreachQueue/SaveSectionObject',
  handler: function (request, reply) {
    const sectionPath = request.query.sectionPath;
    reply(mockOutreachApis.saveSectionObject(sectionPath, request.payload.sectionJson));
  }
});

server.route({
  method: 'GET',
  path: '/Outreach/OutreachSummary/GetSummaryInfo',
  handler: function (request, reply) {
    reply(mockOutreachApis.getOutreach(request.query.clientId,request.query.dataId));
  }
});

server.route({
    method: 'GET',
    path: '/Outreach/OutreachSummary/GetAttemptSummaryInfo',
    handler: function (request, reply) {
        reply(mockOutreachApis.getOutreachAttempt());
    }
});
server.route({
    method: 'GET',
    path: '/Outreach/OutreachSummary/GetInitialVisitSummaryInfo',
    handler: function (request, reply) {
        reply(mockOutreachApis.getOutreachInitialVisit());
    }
});

server.route({
  method: 'GET',
  path: '/Outreach/OutreachSummary/GetListDataByClient',
  handler: function (request, reply) {
    const query=request.query;
    reply(mockOutreachApis.getListDataByClient(request.query.clientId));
  }
});

server.route({
  method: 'POST',
  path: '/Outreach/OutreachSummary/ProcessEvent',
  handler: function (request, reply) {
    const query=request.query;
    reply(mockOutreachApis.processEvent(query.dataId, query.eventName, query.comments));
  }
});

server.route({
  method: 'GET',
  path: '/Outreach/OutreachSummary/GetAllListData',
  handler: function (request, reply) {
    const query=request.query;
    reply(mockOutreachApis.getAllListData());
  }
});

server.route({
  method: 'GET',
  path: '/Outreach/OutreachSummary/GetListModel',
  handler: function (request, reply) {
    const query=request.query;
    reply(mockOutreachApis.GetListModel());
  }
});

server.route({
  method: 'POST',
  path: '/Outreach/OutreachSummary/SaveSectionObject',
  handler: function (request, reply) {
    const sectionPath = request.query.sectionPath;
    reply(mockOutreachApis.saveSectionObject(sectionPath, request.payload.sectionJson));
  }
});

server.route({
  method: 'GET',
  path: '/VisitChecklists/VisitChecklist/GetListData',
  handler: function (request, reply) {
    const query=request.query;
    reply(mockVisitChecklistApi.getListData(request.query.clientId));
  }
});

server.route({
  method: 'GET',
  path: '/VisitChecklists/VisitChecklist/GetSummaryInfo',
  handler: function (request, reply) {
    const query=request.query;
    reply(mockVisitChecklistApi.getSummaryInfo(query.clientId, query.dataId));
  }
});

server.route({
  method: 'POST',
  path: '/VisitChecklists/VisitChecklist/SaveSectionObject',
  handler: function (request, reply) {
    const query = request.query.sectionPath;
    reply(mockVisitChecklistApi.saveSectionObject(query.dataId, query.sectionPath, request.payload.sectionJson));
  }
});

server.route({
  method: 'GET',
  path: '/VisitChecklists/VisitChecklist/PreCreate',
  handler: function (request, reply) {
    const sectionPath = request.query.sectionPath;    
    reply({DataObject:{
      VisitChecklist:{
        VisitDate: new Date(),
        ParticipantName: 'Participant Name',
      }
    }});
  }
})

server.route({
  method: 'POST',
  path: '/VisitChecklists/VisitChecklist/Create',
  handler: function (request, reply) {
    const sectionPath = request.query.sectionPath;    
    reply(mockVisitChecklistApi.create(request.payload.sectionJson));
  }
})

server.route({
  method: 'GET',
  path: '/IndividualPlanningCalendars/IndividualPlanningCalendar/InitiateModel',
  handler: function(request, reply){
    reply(mockIpcApis.initiateIpcModel());
  }
})

server.route({
  method: 'POST',
  path: '/IndividualPlanningCalendars/IndividualPlanningCalendar/Create',
  handler: function (request, reply) {
    const sectionPath = request.query.sectionPath;
    reply(mockIpcApis.createIpc('clients/test', request.payload.sectionJson));
  }
})

server.route({
  method: 'POST',
  path: '/IndividualPlanningCalendars/IndividualPlanningCalendar/SaveSectionObject',
  handler: function (request, reply) {
    const sectionPath = request.query.sectionPath;
    reply(mockIpcApis.saveSectionObject(sectionPath, request.payload.sectionJson, request.payload.completionStatusJson));
  }
});

server.route({
  method: 'POST',
  path: '/IndividualPlanningCalendars/IndividualPlanningCalendar/AddGeneralEvent',
  handler: function (request, reply) {
    reply(mockIpcApis.addGeneralEvent(request.payload.dataId, request.payload.sectionJson));
  }
});

server.route({
  method: 'POST',
  path: '/IndividualPlanningCalendars/IndividualPlanningCalendar/EditGeneralEvent',
  handler: function (request, reply) {
    const sectionPath = request.query.sectionPath;
    reply(mockIpcApis.editGeneralEvent(request.payload.dataId, request.payload.sectionJson));
  }
});

server.route({
  method: 'POST',
  path: '/IndividualPlanningCalendars/IndividualPlanningCalendar/DeleteGeneralEvent',
  handler: function (request, reply) {
    reply(mockIpcApis.deleteGeneralEvent(request.payload.dataId, request.payload.generalEventId));
  }
});

server.route({
  method: 'GET',
  path: '/PlanOfCares/PlanOfCare/ListInfo',
  handler: function (request, reply) {
    reply(mockPocApis.ListInfo(request.query.clientId));
  }
});
server.route({
  method: 'GET',
  path: '/PlanOfCares/PlanOfCare/GetOverviewModel',
  handler: function (request, reply) {
    reply(mockPocApis.getPlanOfCare());
  }
});

server.route({
  method: 'POST',
  path: '/PlanOfCares/PlanOfCare/SaveOverview',
  handler: function (request, reply) {
    reply(mockPocApis.getPlanOfCare());
  }
});

server.route({
  method: 'GET',
  path: '/PlanOfCares/PlanOfCare/GetSummaryInfo',
  handler: function (request, reply) {
    reply(mockPocApis.getPlanOfCare());
  }
});
server.route({
  method: 'GET',
  path: '/PlanOfCares/PlanOfCare/GetTestSummaryInfo',
  handler: function (request, reply) {
    reply(mockPocApis.gettestobject());
  }
});

server.route({
  method: 'POST',
  path: '/PlanOfCares/PlanOfCare/Create',
  handler: function (request, reply) {
    const sectionPath = request.query.sectionPath;    
    reply(mockPocApis.create(request.payload.sectionJson));
  }
});

server.route({
  method: 'POST',
  path: '/PlanOfCares/PlanOfCare/CreateObject',
  handler: function (request, reply) {
    const sectionPath = request.query.sectionPath;    
    reply(mockPocApis.create(request.payload.sectionJson));
  }
});

server.route({
  method: 'GET',
  path: '/PlanOfCares/PlanOfCare/GetPlanForSupportList',
  handler: function (request, reply) {
    reply(mockPocApis.getPlanForSupportList());
  }
});

server.route({
  method: 'POST',
  path: '/PlanOfCares/PlanOfCare/EditGeneralScheduleSupportComment',
  handler: function (request, reply) {
    reply(mockPocApis.editGeneralScheduleSupportComment(request.payload.generalScheduleSupportComment));
  }
});

server.route({
  method: 'POST',
  path: '/PlanOfCares/PlanOfCare/AddSharedPlanning',
  handler: function (request, reply) {
    reply(mockPocApis.addSharedPlanning(sharedPlanningJson, request.payload.completionStatusJson));
  }
});

server.route({
  method: 'POST',
  path: '/PlanOfCares/PlanOfCare/EditSharedPlanning',
  handler: function (request, reply) {
    reply(mockPocApis.editSharedPlanning(request.payload.sharedPlanningJson, request.payload.completionStatusJson));
  }
});

server.route({
  method: 'POST',
  path: '/PlanOfCares/PlanOfCare/DeleteSharedPlanning',
  handler: function (request, reply) {
    reply(mockPocApis.deleteSharedPlanning(request.payload.sharedPlanningJson, request.payload.completionStatusJson));
  }
});

server.route({
  method: 'GET',
  path: '/PlanOfCares/PlanOfCare/FindDomainAuditTrails',
  handler: function (request, reply) {
    reply(mockPocApis.findDomainAuditTrails());
  }
});

server.route({
  method: 'POST',
  path: '/PlanOfCares/PlanOfCare/SaveSectionObject',
  handler: function (request, reply) {
    const sectionPath = request.query.sectionPath;
    reply(mockPocApis.saveSectionObject(sectionPath, request.payload.sectionJson, request.payload.completionStatusJson));
  }
});

server.route({
  method: 'GET',
  path: '/PlanOfCares/PlanOfCare/GetPart5SummaryInfo',
  handler: function (request, reply) {
    reply(mockPocApis.getPart5SummaryInfo());
  }
});

server.route({
  method: 'POST',
  path: '/PlanOfCares/PlanOfCare/CreatePlanForSupport',
  handler: function (request, reply) {
    reply(mockPocApis.createPlanForSupport());
  }
});

server.route({
  method: 'POST',
  path: '/PlanOfCares/PlanOfCare/ChangePart5Section',
  handler: function (request, reply) {
    const index = request
      .url
      .path
      .indexOf('sectionPath');
    const path = request
      .url
      .path
      .substring(index + 12);
    reply(mockPocApis.changePart5Section(path, request.payload.sectionJson));
  }
});

server.route({
  method: 'POST',
  path: '/PlanOfCares/PlanOfCare/AddGeneralScheduleSupport',
  handler: function (request, reply) {
    reply(mockPocApis.addGeneralScheduleSupport(request.payload.sectionJson, request.payload.completionStatusJson));
  }
});

server.route({
  method: 'POST',
  path: '/PlanOfCares/PlanOfCare/EditGeneralScheduleSupport',
  handler: function (request, reply) {
    reply(mockPocApis.editGeneralScheduleSupport(request.payload.sectionJson));
  }
});

server.route({
  method: 'POST',
  path: '/PlanOfCares/PlanOfCare/DeleteGeneralScheduleSupport',
  handler: function (request, reply) {
    reply(mockPocApis.deleteGeneralScheduleSupport(request.payload.generalScheduleSupportId, request.payload.completionStatusJson));
  }
});

server.route({
  method: 'GET',
  path: '/PlanOfCares/PlanOfCare/GetServiceOutcomesSection',
  handler: function (request, reply) {
    reply(mockPocApis.getServiceOutcomesSection());
  }
});

server.route({
  method: 'POST',
  path: '/PlanOfCares/PlanOfCare/ChangeServiceOutcomes',
  handler: function (request, reply) {
    reply(mockPocApis.changeServiceOutcomes(request.payload.sectionJson));
  }
});

server.start((err) => {
  if (err) {
    logger.error(err);
  }
  logger.appStarted(port);
});
