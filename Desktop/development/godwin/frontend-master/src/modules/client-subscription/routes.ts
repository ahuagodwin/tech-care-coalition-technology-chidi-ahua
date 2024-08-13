//import { RouteLocationNormalized, type RouteRecordRaw } from 'vue-router';
import { type RouteRecordRaw } from 'vue-router';

import { PreventAuth } from '../../router/middleware';
import RouteService from '@/services/route-service'
import AuthLayout from '@/layouts/AuthLayout.vue';
import SubscriptionPlans from './views/SubscriptionPlans.vue';
import SubscriptionPlansMock from './views/SubscriptionPlansMock.vue';
import SubscriptionCart from './views/SubscriptionCart.vue';
import SubscriptionCartMock from './views/SubscriptionCartMock.vue';

const AuthRoutes: Array<RouteRecordRaw> = RouteService.AppendRouteMiddlewareWith(
  { beforeAll: [PreventAuth] },
  [
    {
      path: '/subscription',
      name: 'Subscription',
      component: AuthLayout,
      children: [
        {
            path: 'plans/mock',
            name: 'Subscription.Plans.Mock',
            component: SubscriptionPlansMock,
            meta:{hideTopImage:true,hideBottomImage:true, hideLogo:true}
        },
        {
            path: 'plans',
            name: 'Subscription.Plans',
            component: SubscriptionPlans,
            meta:{hideTopImage:true,hideBottomImage:true, }
        },
        {
            path: 'cart/mock',
            name: 'Subscription.Cart.Mock',
            component: SubscriptionCartMock,
            meta:{hideLogo:true}
        },
        {
            path: 'cart',
            name: 'Subscription.Cart',
            component: SubscriptionCart,
            meta:{hideLogo:true}
        },
      ]
    }
  ]);

export default AuthRoutes;
