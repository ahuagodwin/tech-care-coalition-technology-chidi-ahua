
import { ref, computed, Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AuthService from '@/services/auth-service'

export const useNavigation = () => {
    const route = useRoute();
    const router = useRouter();


    interface badgeType {
        value: string | number;
        bgColor: string;
    }
    interface subMenuType {
        name: string;
        location?: string;
        routeName?: string;
        badge?: badgeType;
    }
    interface menuType {
        name: string;
        icon: string;
        location?: string;
        routeName?: string;
        logout?: boolean;
        subMenus?: subMenuType[];
    }

    const clientLinks: Ref<menuType[]> = ref([
        { name: 'Dashboard', icon: 'home', location: '/clients/dashboard', routeName: 'Clients.Dashboard' },
        { name: 'Request', icon: 'event_note', location: '/clients/request', routeName: 'Clients.Request' },
        { name: 'Brand', icon: 'discount', location: '/clients/brand', routeName: 'Clients.Brand' },
        { name: 'Switch To Affiliate', icon: 'swap_horiz', location: '/affiliate/dashboard', routeName: 'Affiliate.Dashboard' },
        { name: 'Workspace & Team', icon: 'groups', location: '/clients/workspace', routeName: 'Clients.Workspace' },
        { name: 'My Plans & Billings', icon: 'payments', location: '/clients/plans', routeName: 'Clients.Plans' },
        { name: 'Log Out', icon: 'power_settings_new', location: '', logout: true },
    ]);
    const affiliateLinks: Ref<menuType[]> = ref([
        { name: 'Dashboard', icon: 'home', location: '/affiliate/dashboard', routeName: 'Affiliate.Dashboard' },
        { name: 'Profile', icon: 'person_outline', location: '/affiliate/profile', routeName: 'Affiliate.Profile' },
        { name: 'Withdrawal', icon: 'discount', location: '/affiliate/withdrawal', routeName: 'Affiliate.Withdrawal' },
        { name: 'Switch To Client', icon: 'swap_horiz', location: '/clients/dashboard', routeName: 'Clients.Dashboard' },
        { name: 'Log Out', icon: 'power_settings_new', location: '', logout: true },
    ]);
    const sparkAdminLinks: Ref<menuType[]> = ref([
        { name: 'Overview', icon: 'home', location: '/admin/overview', routeName: 'Spark.Admin.Overview' },
        { name: 'Workspace', icon: 'groups', location: '/admin/workspace', routeName: 'Spark.Admin.Workspace' },
        { name: 'Analytics', icon: 'trending_up', location: '/admin/analytics', routeName: 'Spark.Admin.Analytics' },
        { name: 'Promo Code', icon: 'redeem', location: '/admin/promo-code', routeName: 'Spark.Admin.PromoCode' },
        { name: 'Portfolio', icon: 'person_outline', location: '/admin/portfolio', routeName: 'Spark.Admin.Portfolio' },
        { name: 'Plan & Pricing', icon: 'payments', location: '/admin/plan-and-pricing', routeName: 'Spark.Admin.PlanAndPricing' },
        { name: 'My Team', icon: 'groups', location: '/admin/my-team', routeName: 'Spark.Admin.MyTeam' },
        { name: 'Log Out', icon: 'power_settings_new', location: '', logout: true },
    ]);


    const links = computed(() => {
        safeLog(route.meta.menuItemsToShow)
        return {
            'affiliate': affiliateLinks.value,
            'client': clientLinks.value,
            'spark-admin': sparkAdminLinks.value
        }[route.meta.menuItemsToShow as string]
        //return route.meta.menuItemsToShow == 'client' ? clientLinks.value : affiliateLinks.value
    })

    const isActive = (paths: string | subMenuType[] | undefined) => {
        if (Array.isArray(paths)) {
            const locations = paths.map(path => path.location);
            return {
                active: locations.includes(route.path)
            };
        }
        return { active: paths == route.path };
    };
    const goTo = (link: menuType) => {
        if (link.logout) {
            AuthService.logOut()
            router.push({ name: "Auth.Login" })
        } else {
            router.push({ name: link.routeName })
        }
    }
    return {
        links,
        isActive,
        goTo
    }
}