import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFount from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";

import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import Products from "./pages/admin/Products";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import CreateUser from "./pages/admin/CreateUser";

import UserRoute from "./components/Routes/UserRoute";
import Orders from "./pages/user/Orders";
import UserInfo from "./pages/user/UserInfo";
import Brands from "./pages/admin/Brands";
import ProductBrand from "./pages/ProductsBrand";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/user" element={<UserRoute />}>
          <Route path="" element={<Dashboard />}></Route>
          <Route path="orders" element={<Orders />}></Route>
          <Route path="info" element={<UserInfo />}></Route>
        </Route>
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="" element={<AdminDashboard />}></Route>
          <Route path="brands" element={<Brands />}></Route>
          <Route path="categories" element={<Categories />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route
            path="products/create-product"
            element={<CreateProduct />}
          ></Route>
          <Route path="users" element={<Users />}></Route>
          <Route path="users/create-user" element={<CreateUser />}></Route>
        </Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route
          path="/products/brands/:brand"
          element={<ProductBrand />}
        ></Route>
        <Route
          path="/products/detail/:productId"
          element={<ProductDetail />}
        ></Route>
        <Route path="/*" element={<PageNotFount />}></Route>
      </Routes>
    </>
  );
}

export default App;
