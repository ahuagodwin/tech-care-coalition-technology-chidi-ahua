
export const HomePrefix = '/'
export const AuthPrefix = HomePrefix + 'auth';
export const DashboardPrefix = '/test/dashboard'


export const paths = {
    home: HomePrefix,
    login: AuthPrefix + '/login',
    dashboardOverview: DashboardPrefix + "/overview/",
    dashboardPatients: DashboardPrefix + "/patients/",
    dashboardSchedule: DashboardPrefix + "/schedule",
    dashboardMessage: DashboardPrefix + "/message",
    dashboardTransactions: DashboardPrefix + "/transactions",
}
