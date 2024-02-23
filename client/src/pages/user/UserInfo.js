import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

function UserInfo() {
  return (
    <Layout>
      <div className="container-fluid row mt-3">
        <div className="col-3">
          <UserMenu />
        </div>
        <div className="col-9">Infomation</div>
      </div>
    </Layout>
  );
}

export default UserInfo;
