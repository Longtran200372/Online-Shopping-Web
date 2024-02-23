import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "../../axios";
import { toast } from "react-hot-toast";
import Spiner from "../Atoms/Spiner";

function AdminRoute() {
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/is-admin", {
        headers: {
          Authorization: `Bearer ${auth?.token ? auth.token : ""}`,
        },
      });
      if (res?.data?.ok) {
        setOk(true);
      } else {
        toast.error(res?.data);
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth.token]);
  return ok ? <Outlet /> : <Spiner />;
}

export default AdminRoute;
