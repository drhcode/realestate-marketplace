import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";
import Loading from "./Loading";

const PrivateRoute = () => {
  const { loggedIn, checkIngStatus } = useAuthStatus();
  if (checkIngStatus) {
    return <Loading />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
