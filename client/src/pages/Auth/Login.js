import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

import axios from "../../axios";
import { useAuth } from "../../context/auth";

function Login({ path = null }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/signin", { userName, password });
      if (res?.data?.success) {
        toast.success("Login successfully");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.access_token,
        });
        sessionStorage.setItem("auth", JSON.stringify(res.data));
        navigate(path || "/");
      } else toast.error(res?.data);
    } catch (error) {
      toast.error("Login fail");
    }
  };
  return (
    <Layout title="Login account">
      <div className="form-container">
        <form onSubmit={handleLogin}>
          <h4 className="title">LOGIN FORM</h4>
          <div className="mb-3 form-group">
            <label htmlFor="userNameInput" className="form-label">
              UserName
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="form-control"
              id="userNameInput"
              placeholder="Enter your userName"
              required
            />
          </div>

          <div className="mb-3 form-group">
            <label htmlFor="passwordInput" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="passwordInput"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary auth-btn">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
