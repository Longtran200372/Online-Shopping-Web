import { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "../../axios";
import { useAuth } from "../../context/auth";
import ModalDashboard from "../../components/Atoms/Modal/ModalDashboard";
import { Link } from "react-router-dom";

function Users() {
  const [auth, setAuth] = useAuth();
  const [users, setUsers] = useState([]);
  const [object, setObject] = useState(null);
  const [method, setMethod] = useState("update");

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${auth?.token ? auth.token : ""}`,
        },
      });
      if (response?.data?.success) {
        setUsers(response.data.users);
      } else {
        toast.error(response?.data);
      }
    } catch (error) {
      toast.error("Get all users fail");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [object]);
  return (
    <Layout>
      <div className="container-fluid row mt-3">
        <div className="col-3">
          <AdminMenu />
        </div>
        <div className="col-9">
          <div className="container">
            <div className="container-fluid d-flex justify-content-between">
              <h3 className="d-inline-block">Manage Users</h3>
              <Link to="/admin/users/create-user" className="m-0">
                <button className="btn btn-primary">Create new user</button>
              </Link>
            </div>
            <div className="p-3"></div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.firstName + " " + user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? "admin" : "user"}</td>
                      <td>
                        <button
                          className="btn btn-secondary m-1"
                          data-bs-toggle="modal"
                          data-bs-target="#modal"
                          onClick={() => {
                            setObject(user);
                            setMethod("update");
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#modal"
                          onClick={() => {
                            setObject(user);
                            setMethod("delete");
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <ModalDashboard
              instance="user"
              object={object}
              setObject={setObject}
              method={method}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Users;
