import { NavLink } from "react-router-dom";
function AdminMenu() {
  return (
    <>
      <div className="text-center">
        <h4>Admin Panel</h4>
        <div className="list-group">
          <NavLink
            to="/admin/brands"
            className="list-group-item list-group-item-action"
          >
            Brands
          </NavLink>
          <NavLink
            to="/admin/categories"
            className="list-group-item list-group-item-action"
            aria-current="true"
          >
            Categories
          </NavLink>
          <NavLink
            to="/admin/products"
            className="list-group-item list-group-item-action"
          >
            Products
          </NavLink>
          <NavLink
            to="/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default AdminMenu;
