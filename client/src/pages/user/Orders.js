import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

function Orders() {
  return (
    <Layout>
      <div className="container-fluid row mt-3">
        <div className="col-3">
          <UserMenu />
        </div>
        <div className="col-9">All Orders</div>
      </div>
    </Layout>
  );
}

export default Orders;
