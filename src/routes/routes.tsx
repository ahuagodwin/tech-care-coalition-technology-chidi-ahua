
import { paths } from '@/constants'
import { DashboardMessage, DashboardOverview, DashboardPatients, DashboardSchedule, DashboardTransactions, LoginAuth } from '@/modules'
import { Routes, Route, Navigate } from "react-router-dom"


const AppRoutes = () => {
  return (
    <>
        <Routes>
            <Route path={paths.home} element={<Navigate to={paths.login} replace />} />
            <Route path={paths.login} element={<LoginAuth />} />

            <Route path={paths.dashboardOverview} element={<DashboardOverview />} />
            <Route path={paths.dashboardPatients} element={<DashboardPatients/>} />
            <Route path={paths.dashboardSchedule} element={<DashboardSchedule />} />
            <Route path={paths.dashboardMessage} element={<DashboardMessage />} />
            <Route path={paths.dashboardTransactions} element={<DashboardTransactions />} />
        </Routes>
    </>
  )
}

export default AppRoutes
