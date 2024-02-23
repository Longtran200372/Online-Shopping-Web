import UserForm from "../../components/Forms/UserForm";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

function CreateUser() {
  return (
    <Layout>
      <div className="container-fluid row mt-3">
        <div className="col-3">
          <AdminMenu />
        </div>
        <div className="col-9">
          <div className="container">
            <h1>Create new user</h1>
            <UserForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateUser;
