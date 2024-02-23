import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

import "./Cart.css";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faDatabase,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";

function Cart() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discountCoupon, setDiscountCoupon] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const convertPriceToString = (price) => {
    return price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  const getImageUrl = (url) => {
    return process.env.REACT_APP_BACKEND_DOMAIN + url;
  };

  const getCart = async () => {
    try {
      let response = await axios.get("/api/users/cart", {
        headers: {
          Authorization: `Bearer ${auth?.token ? auth.token : ""}`,
        },
      });
      if (response?.data?.success) {
        setCart(response.data.cart.products);
        setTotalPrice(
          response.data.cart.products.reduce((total, productObj) => {
            return (
              total +
              (productObj.quantity *
                (productObj.product.price *
                  (100 - productObj.product.discount))) /
                100
            );
          }, 0)
        );
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      setCart([]);
      setTotalPrice(0);
    }
  };

  const handleDeleteProduct = async (item, quantity) => {
    try {
      let response = await axios.post(
        "/api/carts/remove",
        {
          product: item.product._id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token ? auth.token : ""}`,
          },
        }
      );

      if (response?.data?.success) {
        setAuth({
          ...auth,
          cart: !auth.cart,
        });

        getCart();
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      toast.error("Remove product fail");
    }
  };

  const handleApplyCoupon = () => {};
  const handleOrder = async () => {
    try {
      let response = await axios.post("/api/carts/remove-all", null, {
        headers: {
          Authorization: `Bearer ${auth?.token ? auth.token : ""}`,
        },
      });
      if (response?.data?.success) {
        toast.success("Payment successfully!");
        getCart();
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      toast.error("Payment fail!");
    }
  };

  useEffect(() => {
    getCart();
  }, [auth]);
  return (
    <>
      <Layout>
        <div className="cart-wrapper container-fluid mb-5">
          <div className="">
            <button className="goback-btn" onClick={() => navigate("/")}>
              {"< "}Tiếp tục mua sắm
            </button>
          </div>
          <div className="row p-0">
            <div className="col-8 ps-0">
              <div className="products-container bg-white">
                <h3>
                  <FontAwesomeIcon icon={faBasketShopping} color="red" /> Giỏ
                  hàng
                </h3>

                <table className="table-borderless w-100">
                  <thead>
                    <tr>
                      <th scope="col" className="col-4">
                        Tên sản phẩm
                      </th>
                      <th scope="col" className="col-2">
                        Đơn giá
                      </th>
                      <th scope="col" className="col-2">
                        Số lượng
                      </th>
                      <th scope="col" className="col-2">
                        Thành tiền
                      </th>
                      <th scope="col" className="col-2 text-center">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.map((cartItem, index) => {
                      let realPrice =
                        (cartItem?.product?.price *
                          (100 - cartItem.product.discount)) /
                        100;
                      return (
                        <tr key={index}>
                          <td className="product-visible">
                            <div
                              className="product-image"
                              style={{
                                backgroundImage: `url(${getImageUrl(
                                  cartItem?.product?.images[0]
                                )})`,
                              }}
                            ></div>
                            <span>{cartItem?.product?.name}</span>
                          </td>
                          <td>{convertPriceToString(realPrice)}</td>

                          <td className="quantity-cell">
                            <div className="quantity-group">
                              <button
                                style={{ border: "none" }}
                                onClick={() => handleDeleteProduct(cartItem, 1)}
                              >
                                -
                              </button>
                              <span>{cartItem?.quantity}</span>
                              <button
                                style={{ border: "none" }}
                                onClick={() =>
                                  handleDeleteProduct(cartItem, -1)
                                }
                              >
                                +
                              </button>
                            </div>
                          </td>

                          <td>
                            {convertPriceToString(
                              realPrice * cartItem?.quantity
                            )}
                          </td>
                          <td className="text-center">
                            <button
                              style={{
                                border: "none",
                                backgroundColor: "transparent",
                              }}
                              className="delete-btn"
                              onClick={() =>
                                handleDeleteProduct(cartItem, cartItem.quantity)
                              }
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-4 pe-0">
              <div className="coupon-container bg-white">
                <div className="coupon-input">
                  <h5>Bạn có mã ưu đãi?</h5>
                  <div className="row p-0">
                    <div className="col-8 p-0">
                      <input
                        className="w-100 h-100 p-2"
                        style={{
                          borderRadius: 10,
                        }}
                        type="text"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Mã giảm giá"
                      />
                    </div>
                    <div className="col-4">
                      <button
                        className="btn btn-primary h-100 w-100"
                        onClick={() => handleApplyCoupon()}
                      >
                        Áp dụng
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pricing mt-4">
                  <div className="pricing-title">
                    <h5>
                      <FontAwesomeIcon icon={faDatabase} color="red" /> Thanh
                      toán
                    </h5>
                    <div className="row">
                      <span className="col-8">Tổng giá trị sản phẩm</span>
                      <span className="col-4 text-end">
                        {convertPriceToString(totalPrice)}
                      </span>
                    </div>

                    <div className="row">
                      <span className="col-8">Discount</span>
                      <span className="col-4 text-end">{discountCoupon}%</span>
                    </div>

                    <div className="row">
                      <span className="col-8">Số tiền cần thanh toán</span>
                      <span className="col-4 text-end">
                        {convertPriceToString(
                          (totalPrice * (100 - discountCoupon)) / 100
                        )}
                      </span>
                    </div>

                    <div className="row px-4">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleOrder()}
                      >
                        Đặt hàng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Cart;
