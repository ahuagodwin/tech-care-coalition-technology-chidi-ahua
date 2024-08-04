import { Navigate, Outlet } from "react-router-dom";
import { paths } from "@/constants";



const Authorized = () => {
  const accessToken = localStorage.getItem("@basicAuth")

  const isValidToken = accessToken && typeof accessToken === 'string' && accessToken.trim() !== '';

  return isValidToken ? <Outlet /> : <Navigate to={paths.login} replace />;
};

export { Authorized };
