import { type RouteRecordRaw } from 'vue-router';
import HomeLayout from '@/layouts/HomeLayout.vue';
import IndexPage from './views/IndexPage.vue'
import WorksPage from './views/WorksPage.vue'
import PricingPage from './views/PricingPage.vue'
import BecomeAnAffiliate from './views/BecomeAnAffiliate.vue'
import GetADemo from './views/GetADemo.vue'
import TidalBooking from './views/TidalBooking.vue'
import PrivacyPolicy from './views/PrivacyPolicy.vue'
import TermsOfService from './views/TermsOfService.vue'
import WatchDemoProcess from './views/WatchDemoProcess.vue'

const HomeRoutes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Home',
      component: HomeLayout,
      children: [
        {
            path: '/',
            name: 'Home.Index',
            alias: '/index',
            component: IndexPage,
        },
        {
            path: '/works',
            name: 'Home.Works',
            component: WorksPage,
        },
        {
            path: '/pricing',
            name: 'Home.Pricing',
            component: PricingPage,
        },
        {
            path: '/affiliate',
            name: 'Home.Affiliate',
            component: BecomeAnAffiliate,
        },
        {
            path: '/get-a-demo',
            name: 'Home.GetADemo',
            component: GetADemo,
        },
        {
            path: '/demo-booking',
            name: 'Home.Booking',
            component: TidalBooking,
        },
        {
            path: '/privacy-policy',
            name: 'Home.Policy',
            component: PrivacyPolicy,
        },
        {
            path: '/terms-of-service',
            name: 'Home.Terms',
            component: TermsOfService,
        },
        {
            path: '/watch-demo-form',
            name: 'Home.WatchDemo',
            component: WatchDemoProcess,
        },
      ]
    }
];

export default HomeRoutes;
