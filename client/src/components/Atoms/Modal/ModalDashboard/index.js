import { toast } from "react-hot-toast";
import axios from "../../../../axios";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../../context/auth";
import ProductForm from "../../../Forms/ProductForm";
import UserForm from "../../../Forms/UserForm";
function ModalDashboard({ instance, object = null, method, setObject }) {
  const [auth, setAuth] = useAuth();
  const [newName, setNewName] = useState("");
  const submitRef = useRef();
  const handleDelete = async () => {
    try {
      if (instance === "category") {
        const response = await axios.delete(`/api/categories/${object?._id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token ? auth.token : ""}`,
          },
        });
        if (response?.data?.success) {
          toast.success(`Delete category ${object?.name} successfully`);
        } else toast.error(response?.data);
        setObject({ name: "" });
      }

      if (instance === "brand") {
        const response = await axios.delete(`/api/brands/${object?._id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token ? auth.token : ""}`,
          },
        });
        if (response?.data?.success) {
          toast.success(`Delete brand ${object?.name} successfully`);
        } else toast.error(response?.data);
        setObject({ name: "" });
      }

      if (instance === "product") {
        const response = await axios.delete(`/api/products/${object?._id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token ? auth.token : ""}`,
          },
        });
        if (response?.data?.success) {
          toast.success(`Delete product ${object?.name} successfully`);
        } else toast.error(response?.data);
        setObject(null);
      }

      if (instance === "user") {
        const response = await axios.delete(`/api/users/${object?._id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token ? auth.token : ""}`,
          },
        });
        if (response?.data?.success) {
          toast.success(
            `Delete user ${object?.firstName} ${object?.lastName} successfully`
          );
        } else toast.error(response?.data);
        setObject(null);
      }
    } catch (error) {
      toast.error(`Delete ${instance} fail`);
    }
  };
  const handleUpdate = async () => {
    try {
      if (instance === "category") {
        const response = await axios.put(
          `/api/categories/${object?._id}`,
          {
            name: newName,
          },
          {
            headers: {
              Authorization: `Bearer ${auth?.token ? auth.token : ""}`,
            },
          }
        );
        if (response?.data?.success) {
          toast.success("Update category successfully");
        } else {
          toast.error(response?.data);
        }
        setObject({ name: "" });
      }

      if (instance === "brand") {
        const response = await axios.put(
          `/api/brands/${object?._id}`,
          {
            name: newName,
          },
          {
            headers: {
              Authorization: `Bearer ${auth?.token ? auth.token : ""}`,
            },
          }
        );
        if (response?.data?.success) {
          toast.success("Update brand successfully");
        } else {
          toast.error(response?.data);
        }
        setObject({ name: "" });
      }

      if (instance === "product") {
        submitRef.current.click();
      }

      if (instance === "user") {
        submitRef.current.click();
      }
    } catch (error) {
      toast.error(`Update ${instance} fail`);
    }
  };

  useEffect(() => {
    if (instance === "category" || instance === "brand") {
      setNewName(object?.name);
    }
  }, [object]);
  return (
    <div
      className="modal fade"
      id="modal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Modal title
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            {instance === "brand" && (
              <>
                {method === "delete" && (
                  <>
                    Bạn chắc chắn muốn xóa brand{" "}
                    {object?.name !== "" ? object?.name : ""}
                  </>
                )}

                {method === "update" && (
                  <>
                    <input
                      type="text"
                      className="p-1 w-100"
                      style={{ border: "1px solid #333" }}
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </>
                )}
              </>
            )}
            {instance === "category" && (
              <>
                {method === "delete" && (
                  <>
                    Bạn chắc chắn muốn xóa danh mục{" "}
                    {object?.name !== "" ? object?.name : ""}
                  </>
                )}

                {method === "update" && (
                  <>
                    <input
                      type="text"
                      className="p-1 w-100"
                      style={{ border: "1px solid #333" }}
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </>
                )}
              </>
            )}
            {instance === "product" && (
              <>
                {method === "delete" && (
                  <>
                    Bạn chắc chắn muốn xóa sản phẩm{" "}
                    {object?.name !== "" ? object?.name : ""}
                  </>
                )}

                {method === "update" && (
                  <>
                    <ProductForm
                      product={object}
                      setObject={setObject}
                      submitRef={submitRef}
                    />
                  </>
                )}
              </>
            )}

            {instance === "user" && (
              <>
                {method === "delete" && (
                  <>
                    Bạn chắc chắn muốn xóa tài khoản {object?.firstName}{" "}
                    {object?.lastName}
                  </>
                )}

                {method === "update" && (
                  <>
                    <UserForm
                      user={object}
                      setObject={setObject}
                      submitRef={submitRef}
                    />
                  </>
                )}
              </>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            {method === "delete" && (
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
            {method === "update" && (
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleUpdate}
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDashboard;
