import { Navigate, Outlet } from "react-router-dom"
import { paths } from '@/constants'

const Authorized:React.FC<UserAccess> = ({ accessToken }) => {

  const isValidToken = Boolean(accessToken)

  return isValidToken ? <Outlet /> : <Navigate to={paths.login} replace />
}

export { Authorized }
