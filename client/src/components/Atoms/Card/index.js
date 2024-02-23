import {
  faArrowDown,
  faFire,
  faMicrochip,
  faMobileScreen,
  faSdCard,
} from "@fortawesome/free-solid-svg-icons";
import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function Card({
  product = null,
  // {
  //   _id: "123456",
  //   image: [
  //     "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/1896224739.jpeg",
  //     "product-1681974909771-iphone-13-starlight.jpg",
  //     "product-1681974909771-iPhone-14.jpg",
  //   ],
  //   name: "Iphone 14 Pro Max 128Gb",
  //   description: "Sản phẩm mới nhất của nhãn hàng Iphone",
  //   detail: {
  //     rear_camera: "14",
  //     front_camera: "14",
  //     operating_system: "IOS",
  //     display_size: "6.1",
  //     power: "3279",
  //     memory: "128",
  //     ram: "4",
  //   },
  //   category: "Iphone",
  //   price: 29999990,
  //   discount: 5,
  // },
  className = "",
}) {
  const navigate = useNavigate();
  const classes = ["product", className].join(" ");

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

  const handleClickCard = () => {
    navigate(`/products/detail/${product?._id}`);
  };

  return product !== null ? (
    <div className="card-container container-fluid" onClick={handleClickCard}>
      <div className="row flex-column">
        <span className="col-12" style={{ color: "red", fontWeight: "bold" }}>
          <FontAwesomeIcon icon={faFire} />
          {product?.discount > 0
            ? " Giảm " +
              convertPriceToString(
                Math.ceil(product.price * product.discount) / 100
              )
            : " Giá tốt"}
        </span>
        <span className="col-12" style={{ minHeight: "25px" }}>
          {product?.quantity <= 0 ? "Tạm hết hàng" : ""}
        </span>
      </div>
      <div
        className="product-image container-fluid"
        style={{
          backgroundImage: `url(${getImageUrl(product.images[0])})`,
        }}
      ></div>
      <div className="product-info container-fluid">
        <div className="row">
          <h5
            style={{
              padding: 0,
              textTransform: "capitalize",
            }}
            className="col-12 text-center"
          >
            {product.name}
          </h5>
          <p className="col-12 text-center text-decoration-line-through text-danger">{convertPriceToString(product.price)}</p>
        </div>
        <div className="row justify-content-around">
          <div className="col-12 col-lg-6 px-2 price">
            {product.discount > 0
              ? convertPriceToString(
                  (product.price * (100 - product.discount)) / 100
                )
              : convertPriceToString(product.price)}
          </div>

          {product.discount > 0 && (
            <div className="col-12 col-lg-3 px-2 discount bg-primary text-light rounded-5">
              <FontAwesomeIcon icon={faArrowDown} />
              {product.discount}%
            </div>
          )}
        </div>
      </div>
      <div className="product-detail container-fluid row g-0">
        <div className="col-6 col-sm-12 col-md-12 col-lg-6">
          <FontAwesomeIcon icon={faMicrochip} />{" "}
          {product.detail.operating_system}
        </div>
        <div className="col-6 col-sm-12 col-md-12 col-lg-6">
          <FontAwesomeIcon icon={faMobileScreen} />{" "}
          {product.detail.display_size} Inch
        </div>
        <div className="col-6 col-sm-12 col-md-12 col-lg-6">
          <FontAwesomeIcon icon={faSdCard} /> {product.detail.ram} Gb
        </div>
        <div className="col-6 col-sm-12 col-md-12 col-lg-6">
          <FontAwesomeIcon icon={faSdCard} /> {product.detail.memory} Gb
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Card;
