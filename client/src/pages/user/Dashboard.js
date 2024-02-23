import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

function Dashboard() {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title="Dashboard">
      <div className="container-fluid g-0 dashboard-wrapper row">
        <div className="col-3">
          <UserMenu />
        </div>
        <div className="col-9">
          <div className="card w-75 p-3">
            <h3>
              Admin Name: {auth?.user?.firstName} {auth?.user?.lastName}
            </h3>
            <h3>Admin Email: {auth?.user?.email}</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
