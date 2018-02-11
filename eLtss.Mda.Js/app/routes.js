// These are the pages you can go to. They are all wrapped in the App component,
// which should contain the navbar etc See
// http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import {getAsyncInjectors} from 'utils/asyncInjectors';
import {MODULE_LIST, DEFAULT_MODULE, getRoutePrefix} from "config";
import lodash from 'lodash';
const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const {injectReducer, injectSagas} = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  const commonRoutes = {
    childRoutes: [
      {
        path: 'list',
        name: 'Common list Page',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import ('containers/ListPage/reducer'),
            System.import ('containers/ListPage/sagas'),
            System.import ('containers/ListPage')
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('listPage', reducer.default);
            injectSagas(sagas.default);

            renderRoute(component);
          });
          importModules.catch(errorLoading);
        }
      }, {
        path: 'create',
        name: 'Common Create Page',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import ('containers/CreatePage/reducer'),
            System.import ('containers/CreatePage/sagas'),
            System.import ('containers/CreatePage')
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('create', reducer.default);
            injectSagas(sagas.default);
            renderRoute(component);
          });
          importModules.catch(errorLoading);
        }
      }, {
        path: 'summary',
        name: 'Common Summary Page',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import ('containers/SummaryPage/reducer'),
            System.import ('containers/SummaryPage/sagas'),
            System.import ('containers/SummaryPage')
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('summary', reducer.default);
            injectSagas(sagas.default);

            renderRoute(component);
          });
          importModules.catch(errorLoading);
        }
      }, {
        path: 'SectionEdit',
        name: 'Common Section Edit Page',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import ('containers/SectionEditPage/reducer'),
            System.import ('containers/SectionEditPage/sagas'),
            System.import ('containers/SectionEditPage')
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('SectionEdit', reducer.default);
            injectSagas(sagas.default);

            renderRoute(component);
          });
          importModules.catch(errorLoading);
        }
      }
    ]
  };

  const ispRoutes = {
    childRoutes: [
      {
        path: 'part3Manage',
        name: 'individual support plan Part 3',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import ('containers/Business/IspPart3ManagePage/reducer'),
            System.import ('containers/Business/IspPart3ManagePage/sagas'),
            System.import ('containers/Business/IspPart3ManagePage')
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('ispPart3Manage', reducer.default);
            injectSagas(sagas.default);

            renderRoute(component);
          });
          importModules.catch(errorLoading);
        }
      },{
        path: 'overviewEdit',
        name: 'individual support plan',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import ('containers/Business/IspOverviewEdit/reducer'),
            System.import ('containers/Business/IspOverviewEdit/sagas'),
            System.import ('containers/Business/IspOverviewEdit')
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('ispOverview', reducer.default);
            injectSagas(sagas.default);

            renderRoute(component);
          });
          importModules.catch(errorLoading);
        }
      }, {
        path: 'ispPart5Summary',
        name: 'Plan For Supports',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import ('containers/Business/IspPat5SummaryPage/reducer'),
            System.import ('containers/Business/IspPat5SummaryPage/sagas'),
            System.import ('containers/Business/IspPat5SummaryPage')
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('ispPart5', reducer.default);
            injectSagas(sagas.default);

            renderRoute(component);
          });
          importModules.catch(errorLoading);
        }
      }, {
        path: 'editServiceOutcomes',
        name: 'Service and Outcomes',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import ('containers/Business/IspPart5OutcomeEditPage/reducer'),
            System.import ('containers/Business/IspPart5OutcomeEditPage/sagas'),
            System.import ('containers/Business/IspPart5OutcomeEditPage')
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('ispPart5Outcome', reducer.default);
            injectSagas(sagas.default);

            renderRoute(component);
          });
          importModules.catch(errorLoading);
        }
      }
    ]
  };

const pocRoutes ={
    childRoutes: [
    {
        path: 'sharedPlanning',
        name: 'plan of care Part 3',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import ('containers/Business/PocSharedPlanningManagePage/reducer'),
            System.import ('containers/Business/PocSharedPlanningManagePage/sagas'),
            System.import ('containers/Business/PocSharedPlanningManagePage')
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('pocPart3Manage', reducer.default);
            injectSagas(sagas.default);

            renderRoute(component);
          });
          importModules.catch(errorLoading);
        }
      },
      {
        path: 'sharedPlanningDetail',
        name: 'plan of care Part 3',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import ('containers/Business/PocSharedPlanningDetailsPage/reducer'),
            System.import ('containers/Business/PocSharedPlanningDetailsPage/sagas'),
            System.import ('containers/Business/PocSharedPlanningDetailsPage')
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('pocPart3Details', reducer.default);
            injectSagas(sagas.default);

            renderRoute(component);
          });
          importModules.catch(errorLoading);
        }
      },
      {
        path: 'pocServices',
        name: 'plan of care Part 5',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import ('containers/Business/PocServicesManagePage/reducer'),
            System.import ('containers/Business/PocServicesManagePage/sagas'),
            System.import ('containers/Business/PocServicesManagePage')
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('pocPart5Manage', reducer.default);
            injectSagas(sagas.default);

            renderRoute(component);
          });
          importModules.catch(errorLoading);
        }
      }
    ]
};
  const notFound = {
    path: '*',
    name: 'notfound',
    getComponent(nextState, cb) {
      System
        .import ('containers/NotFoundPage')
        .then(loadModule(cb))
        .catch(errorLoading);
    }
  };

  const routes = [];

  lodash.forEach(MODULE_LIST, module => {
    let route = Object.assign({}, commonRoutes);

    if (module.Name === 'PlanOfCare' || module.Name === 'IndividualSupportPlan' || module.Name === "PlanForSupport") {
      route.childRoutes = [
        ...route.childRoutes,
        ...ispRoutes.childRoutes,
        ...pocRoutes.childRoutes,
      ];
    }
    lodash.forEach(module.RoutePrefix,(prefix)=>{
      const newRoute = Object.assign({}, route);
      const path = getRoutePrefix(prefix);
      newRoute.name = module.Name;
      newRoute.path = path;
      routes.push(newRoute);
    })

  });
  routes.push(notFound);
  return routes;
}
