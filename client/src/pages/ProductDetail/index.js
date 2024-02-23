import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../axios";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import "./ProductDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faStar,
  faShoppingBag,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/auth";
import ModalBuyNow from "../../components/Atoms/Modal/ModalBuyNow";

function ProductDetail() {
  const params = useParams();
  const [auth, setAuth] = useAuth();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(0);
  const arr = [0, 0, 0, 0, 0];
  const currency = {
    rear_camera: "MP",
    front_camera: "MP",
    operating_system: "",
    display_size: "Inch",
    power: "mAh",
    memory: "GB",
    ram: "GB",
  };

  const getCurrentProduct = async () => {
    const response = await axios.get(`/api/products/${params.productId}`);
    if (response?.data?.success) {
      setCurrentProduct(response.data.product);
      setCurrentImage(response.data.product.images[0]);
    } else toast.error(response.data);
  };

  // convert number of price to VND format
  const convertPriceToString = (price) => {
    return price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  const getImageUrl = (url) => {
    return process.env.REACT_APP_BACKEND_DOMAIN + url;
  };

  const handleBuyNow = () => {
    if (!auth?.user) {
      toast.error("You need to login", {
        duration: 1000,
      });
      return;
    }
  };

  const handleAddToCart = async () => {
    // if (!auth?.user) {
    //   toast.error("Bạn cần đăng nhập", {
    //     duration: 1000,
    //   });
    //   return;
    // }

    try {
      let response = await axios.post(
        "/api/carts/add",
        {
          product: currentProduct._id,
          quantity: 1,
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
        toast.success("Add to cart successfully!");
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      toast.error("Add to cart fail!");
    }
  };

  const handleComment = () => {
    setComment("");
  };

  const handleRating = (index) => {
    setRating(index + 1);
  };

  const handleRatingOut = () => {
    setRating(rated);
  };

  const handleRated = (index) => {
    setRated(index + 1);
  };
  useEffect(() => {
    getCurrentProduct();
  }, [params.productId]);
  return (
    <Layout title={"Product detail"}>
      <div className="container-fluid  product-detail-wrapper">
        {currentProduct !== null ? (
          <>
            {/* Product detail  */}
            <div className="row container-fluid justify-content-between">
              <div className="col-12 col-md-5 col-lg-5">
                <div className="product-image-container container-fluid bottom-shadow">
                  <div
                    className="image-show"
                    style={{
                      backgroundImage: `url(${getImageUrl(currentImage)})`,
                    }}
                  ></div>
                  <div className="all-images row justify-content-center">
                    {currentProduct !== null &&
                      currentProduct.images.map((image, index) => {
                        return (
                          <div
                            className="sub-image col-2 mb-2"
                            style={{
                              backgroundImage: `url(${getImageUrl(
                                currentProduct?.images[index]
                              )})`,
                            }}
                            key={index}
                            onMouseOver={() =>
                              setCurrentImage(currentProduct.images[index])
                            }
                          ></div>
                        );
                      })}
                  </div>
                </div>
                <div className="description-container d-flex p-3">
                  {currentProduct.description}
                </div>
              </div>
              <div className="col-12 col-md-7 col-lg-7">
                {/* Info current product */}
                <div className="product-info-container container-fluid bottom-shadow">
                  {/* base info like (name, price, quantity) */}
                  <div className="base-info-container">
                    <h4>{currentProduct.name}</h4>
                    <div>
                      <span
                        style={{
                          color: "red",
                          fontSize: "24px",
                          fontWeight: "bold",
                          paddingRight: "20px",
                        }}
                      >
                        {convertPriceToString(
                          (currentProduct.price *
                            (100 - currentProduct.discount)) /
                            100
                        )}
                      </span>
                      {currentProduct.discount > 0 && (
                        <span style={{ textDecoration: "line-through" }}>
                          {convertPriceToString(currentProduct.price)}
                        </span>
                      )}
                    </div>

                    <p className="" style={{ fontWeight: "bold" }}>
                      {currentProduct.quantity > 0 ? "Còn hàng" : "Hết hàng"}
                    </p>
                    <div className="btn-container">
                      <button
                        className="btn btn-danger p-2 me-3"
                        data-bs-toggle={auth?.token ? "modal" : undefined}
                        data-bs-target={
                          auth?.token ? "#modal-buy-now" : undefined
                        }
                        onClick={() => {
                          handleBuyNow();
                        }}
                      >
                        <FontAwesomeIcon icon={faShoppingBag} /> Mua ngay
                      </button>
                      <button
                        className="btn btn-primary p-2"
                        onClick={() => handleAddToCart()}
                      >
                        <FontAwesomeIcon icon={faCartPlus} /> Thêm vào giỏ hàng
                      </button>
                    </div>
                  </div>
                  {/* detail is thông số kỹ thuật */}
                  <div className="detail-info-container mt-2">
                    <h4>
                      <FontAwesomeIcon icon={faGear} /> Thông số
                    </h4>
                    <table className="table table-striped">
                      <tbody>
                        {Object.keys(currentProduct.detail).map(
                          (value, index) => {
                            return (
                              <tr key={index}>
                                <th>{value} :</th>
                                <td>
                                  {currentProduct.detail[value] +
                                    " " +
                                    currency[value]}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="container-fluid row">
              <div className="col-12">
                <div className="container-fluid rate-container p-3">
                  <div className="container-fluid">
                    <span className="d-inline-block me-4">
                      Xếp hạng sản phẩm:
                    </span>
                    <span className="d-inline-block">
                      {arr.map((value, index) => {
                        if (index < rating) {
                          return (
                            <FontAwesomeIcon
                              icon={faStar}
                              key={index}
                              style={{ color: "yellow" }}
                              onMouseOver={() => handleRating(index)}
                              onMouseOut={handleRatingOut}
                              onClick={() => handleRated(index)}
                            />
                          );
                        } else
                          return (
                            <FontAwesomeIcon
                              icon={faStar}
                              key={index}
                              onMouseOver={() => handleRating(index)}
                              onMouseOut={handleRatingOut}
                              onClick={() => handleRated(index)}
                            />
                          );
                      })}
                    </span>
                  </div>

                  <div className="row">
                    <p className="mb-1">Nhận xét</p>
                    <textarea
                      className="rate-comment-input"
                      name=""
                      id=""
                      cols="30"
                      rows="8"
                      placeholder="Enter your comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>

                  <button
                    className="btn btn-secondary mt-2"
                    style={{ margin: "0 12px", padding: "10px 20px" }}
                    onClick={handleComment}
                  >
                    Gửi
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1>Sản phẩm này không còn tồn tại</h1>
          </>
        )}
      </div>

      <ModalBuyNow product={currentProduct} />
    </Layout>
  );
}

export default ProductDetail;
