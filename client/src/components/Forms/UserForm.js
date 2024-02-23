import axios from "../../axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";

function UserForm({ user = null, setObject, submitRef }) {
  const [auth, setAuth] = useAuth();
  const [initForm, setInitForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // create
      if (user === null) {
        const data = { ...initForm, password };
        const response = await axios.post("/api/users/signup", data);
        if (response?.data?.success) {
          toast.success("Create successfully!");
        } else toast.error(response?.data);
      } else {
        // update
        const response = await axios.put(`/api/users/${user._id}`, initForm, {
          headers: {
            Authorization: `Bearer ${auth?.token ? auth.token : ""}`,
          },
        });

        if (response?.data?.success) {
          toast.success("Update user successfully");
          setObject(null);
        } else {
          toast.error(response?.data);
        }
      }
    } catch (error) {
      toast.error("Failure");
    }
  };

  // set user for update
  useEffect(() => {
    if (user !== null) {
      let cloneInitForm = {};
      for (let key of Object.keys(initForm)) {
        cloneInitForm[key] = user[key] || "";
      }
      setInitForm(cloneInitForm);
    }
  }, [user]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="firstNameInput" className="form-label">
          First Name
        </label>
        <input
          type="text"
          value={initForm.firstName}
          onChange={(e) => {
            setInitForm((preInitForm) => {
              return {
                ...preInitForm,
                firstName: e.target.value,
              };
            });
          }}
          className="form-control"
          id="firstNameInput"
          placeholder="Enter user first name"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="lastNameInput" className="form-label">
          LastName
        </label>
        <input
          type="text"
          value={initForm.lastName}
          onChange={(e) => {
            setInitForm((preInitForm) => {
              return {
                ...preInitForm,
                lastName: e.target.value,
              };
            });
          }}
          className="form-control"
          id="lastNameInput"
          placeholder="Enter user last name"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="userNameInput" className="form-label">
          userName
        </label>
        {user !== null ? (
          <input
            type="text"
            value={initForm?.userName}
            className="form-control"
            id="userNameInput"
            placeholder="Enter userName"
            required
            disabled
          />
        ) : (
          <input
            type="text"
            value={initForm.userName}
            onChange={(e) => {
              setInitForm((preInitForm) => {
                return {
                  ...preInitForm,
                  userName: e.target.value,
                };
              });
            }}
            className="form-control"
            id="userNameInput"
            placeholder="Enter userName"
            required
          />
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="emailInput" className="form-label">
          Email
        </label>
        <input
          type="email"
          value={initForm.email}
          onChange={(e) => {
            setInitForm((preInitForm) => {
              return {
                ...preInitForm,
                email: e.target.value,
              };
            });
          }}
          className="form-control"
          id="emailInput"
          placeholder="Enter user email"
          required
        />
      </div>

      {user === null && (
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control"
            id="passwordInput"
            placeholder="Enter user email"
            required
          />
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="phoneInput" className="form-label">
          Phone
        </label>
        <input
          type="text"
          value={initForm.phone}
          onChange={(e) => {
            setInitForm((preInitForm) => {
              return {
                ...preInitForm,
                phone: e.target.value,
              };
            });
          }}
          className="form-control"
          id="phoneInput"
          placeholder="Enter user phone"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="addressInput" className="form-label">
          address
        </label>
        <input
          type="text"
          value={initForm.address}
          onChange={(e) => {
            setInitForm((preInitForm) => {
              return {
                ...preInitForm,
                address: e.target.value,
              };
            });
          }}
          className="form-control"
          id="addressInput"
          placeholder="Enter user address"
        />
      </div>

      {user !== null ? (
        <button
          type="submit"
          className="btn btn-primary"
          ref={submitRef}
          hidden
        >
          Submit
        </button>
      ) : (
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      )}
    </form>
  );
}

export default UserForm;
