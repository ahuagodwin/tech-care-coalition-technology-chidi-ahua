import { RouteLocationNormalized, type RouteRecordRaw } from 'vue-router';

import {PreventAuth, CheckPermissions } from '../../router/middleware';
import RouteService from '@/services/route-service'
import DashboardPageLayout from '@/layouts/DashboardPageLayout.vue';
import OverviewView from './views/OverviewView.vue';

import WorkspaceViewMock from './views/WorkspaceViewMock.vue';
import WorkspaceView from './views/WorkspaceView.vue';

import RequestView from './views/RequestView.vue';
import AnalyticsView from './views/AnalyticsView.vue';
import PortfolioView from './views/PortfolioView.vue';
import PlanAndPricingView from './views/PlanAndPricingView.vue';
import CreatePlanView from './views/CreatePlanView.vue';
import PromoCodeView from './views/PromoCodeView.vue';
import MyTeamView from './views/MyTeamView.vue';
import CreateRoleView from './views/CreateRoleView.vue';

const ClientRoutes: Array<RouteRecordRaw> = RouteService.AppendRouteMiddlewareWith(
  { beforeAll: [PreventAuth, CheckPermissions] },
  [
    {
      path: '/admin',
      name: 'Spark.Admin',
      component: DashboardPageLayout,
      meta:{menuItemsToShow:'spark-admin'},
      children: [
        {
          path: 'overview',
          name: 'Spark.Admin.Overview',
          component: OverviewView,
        },
        {
          path: 'workspace',
          name: 'Spark.Admin.Workspace',
          component: WorkspaceView,
        },
        {
          path: 'request/:workspaceId',
          name: 'Spark.Admin.Request',
          component: RequestView,
          // meta: {
          //   hideTopImage: true,
          //   authorization: {
          //     permissions: ['view_request'],
          //   },
          // }
        },
        {
          path: 'analytics',
          name: 'Spark.Admin.Analytics',
          component: AnalyticsView,
          meta:{hideTopImage:true}
        },
        {
          path: 'promo-code',
          name: 'Spark.Admin.PromoCode',
          component: PromoCodeView,
        },
        {
          path: 'portfolio',
          name: 'Spark.Admin.Portfolio',
          component: PortfolioView,
        },
        {
          path: 'plan-and-pricing',
          name: 'Spark.Admin.PlanAndPricing',
          component: PlanAndPricingView,
        },
        {
          path: 'create-plan',
          name: 'Spark.Admin.CreatePlan',
          component: CreatePlanView,
        },
        {
          path: 'my-team',
          name: 'Spark.Admin.MyTeam',
          component: MyTeamView,
        },
        {
          path: 'create-role',
          name: 'Spark.Admin.CreateRole',
          component: CreateRoleView,
        },
        {
          path: 'update-role',
          name: 'Spark.Admin.UpdateRole',
          component: CreateRoleView,
        },
      ]
    }
  ]);

export default ClientRoutes;
