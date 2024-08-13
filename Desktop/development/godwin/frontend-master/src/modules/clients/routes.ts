//import { RouteLocationNormalized, type RouteRecordRaw } from 'vue-router';
import { type RouteRecordRaw } from 'vue-router';

import {PreventAuth, CheckPermissions } from '../../router/middleware';
import RouteService from '@/services/route-service'
import DashboardPageLayout from '@/layouts/DashboardPageLayout.vue';
import DashboardView from './views/DashboardView.vue';
import DashboardViewMock from './views/DashboardViewMock.vue';
import BrandView from './views/BrandView.vue';
import WorkspaceView from './views/WorkspaceView.vue';
import WorkspaceViewMock from './views/WorkspaceViewMock.vue';
import PlansView from './views/PlansView.vue';
import PlansViewMock from './views/PlansViewMock.vue';
import CreateProjectView from './views/CreateProjectView.vue';
import CreateProjectViewMock from './views/CreateProjectViewMock.vue';
import RequestViewMock from './views/RequestViewMock.vue';
import RequestView from './views/RequestView.vue';
//import ReceiptFile from '@/components/ReceiptFile.vue'

const ClientRoutes: Array<RouteRecordRaw> = RouteService.AppendRouteMiddlewareWith(
  { beforeAll: [PreventAuth, CheckPermissions] },
  [
    {
      path: '/clients',
      name: 'Clients',
      component: DashboardPageLayout,
      meta:{menuItemsToShow:'client'},
      children: [
        {
          path: 'dashboard/mock',
          name: 'Clients.Dashboard.Mock',
          component: DashboardViewMock,
        },
        {
          path: 'dashboard',
          name: 'Clients.Dashboard',
          component: DashboardView,
        },
        {
          path: 'brand/:mock?',
          name: 'Clients.Brand',
          component: BrandView,
          // meta: {
          //   authorization: {
          //     permissions: ['manage_brand'],
          //   },
          // },
        },
        {
          path: 'workspace/mock',
          name: 'Clients.Workspace.Mock',
          component: WorkspaceViewMock,
          // meta: {
          //   authorization: {
          //     permissions: ['manage_teams'],
          //   },
          // },
        },
        {
          path: 'workspace',
          name: 'Clients.Workspace',
          component: WorkspaceView,
          // meta: {
          //   authorization: {
          //     permissions: ['manage_teams'],
          //   },
          // },
        },
        {
          path: 'plans/mock',
          name: 'Clients.Plans.Mock',
          component: PlansViewMock,
        },
        {
          path: 'plans',
          name: 'Clients.Plans',
          component: PlansView,
        },
        {
          path: 'create/project/mock',
          name: 'Clients.Create.Project.Mock',
          component: CreateProjectViewMock,
          // meta: {
          //   hideSidebar: true, hideTopbar: true,
          //   authorization: {
          //     permissions: ['create_request'],
          //   },
          // }
        },
        {
          path: 'create/project',
          name: 'Clients.Create.Project',
          component: CreateProjectView,
          // meta: {
          //   hideSidebar: true, hideTopbar: true,
          //   authorization: {
          //     permissions: ['create_request'],
          //   },
          // }
        },
        {
          path: 'duplicate/project',
          name: 'Clients.Duplicate.Project',
          component: CreateProjectView,
          meta:{hideSidebar:true,hideTopbar:true}
        },
        {
          path: 'request/mock',
          name: 'Clients.Request.Mock',
          component: RequestViewMock,
          // meta: {
          //   hideTopImage: true,
          //   authorization: {
          //     permissions: ['view_request'],
          //   },
          // }
        },
        {
          path: 'request',
          name: 'Clients.Request',
          component: RequestView,
          // meta: {
          //   hideTopImage: true,
          //   authorization: {
          //     permissions: ['view_request'],
          //   },
          // }
        },
        // {
        //   path: 'receipt/:download?',
        //   name: 'Clients.Receipt',
        //   component: ReceiptFile,
        //   meta:{print:true}
        // },
      ]
    }
  ]);

export default ClientRoutes;
