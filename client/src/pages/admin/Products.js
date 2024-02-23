import { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "../../axios";
import { useAuth } from "../../context/auth";
import ModalDashboard from "../../components/Atoms/Modal/ModalDashboard";
import { Link } from "react-router-dom";

function Products() {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [object, setObject] = useState(null);
  const [method, setMethod] = useState("update");

  const getAllProducts = async () => {
    try {
      const response = await axios.get("/api/products", {
        headers: {
          Authorization: `Bearer ${auth?.token ? auth.token : ""}`,
        },
      });
      if (response?.data?.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response?.data);
      }
    } catch (error) {
      toast.error("Get all products fail");
    }
  };

  useEffect(() => {
    getAllProducts();
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
              <h3 className="d-inline-block">Manage Products</h3>
              <Link to="/admin/products/create-product" className="m-0">
                <button className="btn btn-primary">Create new product</button>
              </Link>
            </div>
            <div className="p-3"></div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.brand}</td>
                      <td>
                        <button
                          className="btn btn-secondary m-1"
                          data-bs-toggle="modal"
                          data-bs-target="#modal"
                          onClick={() => {
                            setObject(product);
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
                            setObject(product);
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
              instance="product"
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

export default Products;
