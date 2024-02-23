import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

import "./ModalBuyNow.css";

function ModalBuyNow({ product = null }) {
  const [count, setCount] = useState(1);

  const convertPriceToString = (price) => {
    return price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  const getImageUrl = (url) => {
    return process.env.REACT_APP_BACKEND_DOMAIN + url;
  };

  useEffect(() => {
    setCount(1);
  }, [product]);
  return (
    <>
      <div
        className="modal fade"
        id="modal-buy-now"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Mua ngay
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
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
                  </tr>
                </thead>
                <tbody>
                  {product !== null && (
                    <tr>
                      <td className="product-visible">
                        <div
                          className="product-image"
                          style={{
                            backgroundImage: `url(${getImageUrl(
                              product?.images[0]
                            )})`,
                          }}
                        ></div>
                        <span>{product?.name}</span>
                      </td>
                      <td>
                        {convertPriceToString(
                          (product?.price * (100 - product?.discount)) / 100
                        )}
                      </td>

                      <td className="quantity-cell">
                        <div className="quantity-group">
                          <button
                            style={{ border: "none" }}
                            onClick={() =>
                              setCount((pre) => {
                                if (pre - 1 <= 0) return 0;
                                else return pre - 1;
                              })
                            }
                          >
                            -
                          </button>
                          <span>{count}</span>
                          <button
                            style={{ border: "none" }}
                            onClick={() => setCount((pre) => pre + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td>
                        {convertPriceToString(
                          (count * product?.price * (100 - product?.discount)) /
                            100
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setCount(1);
                  toast.success("Payment successfully!");
                }}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalBuyNow;
