import { type RouteRecordRaw } from 'vue-router';
import DashboardPageLayout from '@/layouts/DashboardPageLayout.vue';
import DashboardView from './views/DashboardView.vue';
import ProfileView from './views/ProfileView.vue';
import WithdrawalView from './views/WithdrawalView.vue';
import { PreventAuth } from '@/router/middleware'
import RouteService from '@/services/route-service'

const AffiliateRoutes: Array<RouteRecordRaw> = RouteService.AppendRouteMiddlewareWith(
  { beforeAll: [PreventAuth] },
  [
    {
      path: '/affiliate',
      name: 'Affiliate',
      component: DashboardPageLayout,
      meta:{menuItemsToShow:'affiliate'},
      children: [
        {
          path: 'dashboard',
          name: 'Affiliate.Dashboard',
          component: DashboardView,
        },
        {
          path: 'profile',
          name: 'Affiliate.Profile',
          component: ProfileView,
        },
        {
          path: 'withdrawal',
          name: 'Affiliate.Withdrawal',
          component: WithdrawalView,
        },
      ]
    }
  ]);

export default AffiliateRoutes;
