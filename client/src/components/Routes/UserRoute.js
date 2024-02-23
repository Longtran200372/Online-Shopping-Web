import { useAuth } from "../../context/auth";
import { Outlet, useLocation } from "react-router-dom";
import Login from "../../pages/Auth/Login";
function UserRoute() {
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  return auth?.user ? <Outlet /> : <Login path={location.pathname} />;
}

export default UserRoute;
