import { NavLink } from "react-router-dom";
function UserMenu() {
  return (
    <>
      <div className="text-center">
        <h4>User Panel</h4>
        <div className="list-group">
          <NavLink
            to="/user/Orders"
            className="list-group-item list-group-item-action"
            aria-current="true"
          >
            All orders
          </NavLink>
          <NavLink
            to="/user/info"
            className="list-group-item list-group-item-action"
          >
            Update Info
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default UserMenu;
