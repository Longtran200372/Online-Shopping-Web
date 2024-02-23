import axios from "../../axios";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";

function ProductForm({ product = null, setObject, submitRef }) {
  const [auth, setAuth] = useAuth();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [deleteImage, setDeleteImage] = useState([]);
  const imageInputRef = useRef();

  const [initForm, setInitForm] = useState({
    name: "",
    description: "",
    brand: "",
    categories: [],
    price: 1,
    discount: 0,
    quantity: 0,
    rear_camera: 0,
    front_camera: 0,
    operating_system: "",
    display_size: 0,
    power: 0,
    memory: 0,
    ram: 0,
  });

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // create product submit
      if (product === null) {
        if (images.length === 0) {
          toast.error("Image is requied");
          imageInputRef.current.focus();
          return;
        }
        const formData = new FormData();
        for (let image of images) {
          formData.append("images", image);
        }
        for (let key of Object.keys(initForm)) {
          formData.append(key, initForm[key]);
        }

        const response = await axios.post("/api/products", formData, {
          headers: {
            Authorization: `Bearer ${auth?.token ? auth.token : ""}`,
          },
        });

        if (response?.data?.success) {
          toast.success("Create new product successffully");
          setImages([]);
        } else {
          toast.error(response?.data);
        }
      } else {
        const formData = new FormData();
        for (let image of images) {
          formData.append("images", image);
        }
        for (let key of Object.keys(initForm)) {
          formData.append(key, initForm[key]);
        }

        formData.append("deleteImage", deleteImage);
        const response = await axios.put(
          `/api/products/${product._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${auth?.token ? auth.token : ""}`,
            },
          }
        );
        if (response?.data?.success) {
          toast.success("Update product successfully");
          setObject(null);
          setDeleteImage(null);
        } else {
          toast.error(response?.data);
        }
      }
    } catch (error) {
      toast.error("Failure");
    }
  };

  const getAllBrands = async () => {
    try {
      const response = await axios.get("/api/brands");
      if (response?.data?.success) {
        setBrands(response.data.brands);
      } else toast.error(response?.data);
    } catch (error) {
      toast.error("Get all brands fail");
    }
  };

  const getAllCategory = async () => {
    try {
      const response = await axios.get("/api/categories");
      if (response?.data?.success) {
        setCategories(response.data.categories);
      } else toast.error(response?.data);
    } catch (error) {
      toast.error("Get all categories fail");
    }
  };

  // get brands and categories
  useEffect(() => {
    getAllBrands();
    getAllCategory();
  }, []);

  // set product for update
  useEffect(() => {
    if (product !== null) {
      let cloneInitForm = {};
      for (let key of Object.keys(initForm)) {
        if (
          [
            "name",
            "description",
            "brand",
            "categories",
            "price",
            "discount",
            "quantity",
            "sold",
          ].includes(key)
        ) {
          cloneInitForm[key] = product[key];
        } else {
          cloneInitForm[key] = product.detail[key];
        }
      }

      setInitForm(cloneInitForm);
    }

    setDeleteImage([]);
    setImages([]);
  }, [product]);
  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-3">
        <label htmlFor="nameInput" className="form-label fw-bold">
          Name
        </label>
        <input
          type="text"
          value={initForm.name}
          onChange={(e) =>
            setInitForm((preInit) => {
              return { ...preInit, name: e.target.value };
            })
          }
          className="form-control"
          id="nameInput"
          placeholder="Enter product name"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="descriptionInput" className="form-label fw-bold">
          Description
        </label>
        <textarea
          type="text"
          value={initForm.description}
          onChange={(e) =>
            setInitForm((preInit) => {
              return { ...preInit, description: e.target.value };
            })
          }
          className="form-control"
          id="descriptionInput"
          placeholder="Enter product description"
          required
        ></textarea>
      </div>
      {/* select multi category */}
      <div className="mb-3">
        <label htmlFor="categorySelect" className="form-label fw-bold">
          Category
        </label>
        <select
          className="form-select mb-2"
          id="categorySelect"
          aria-label="Default select example"
          defaultValue="default"
          onChange={(e) =>
            setInitForm((preInit) => {
              return {
                ...preInit,
                categories: [...preInit.categories, e.target.value],
              };
            })
          }
        >
          <option value="default" disabled>
            Select product category
          </option>
          {categories.map((category, index) => {
            return (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            );
          })}
        </select>
        {initForm?.categories?.length > 0 && (
          <div>
            <h6>Seleted category:</h6>
            <ul>
              {initForm.categories.map((category, index) => {
                return <li key={index}>{category}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
      {/* select one brand */}
      <div className="mb-3">
        <label htmlFor="brandSelect" className="form-label fw-bold">
          Brand
        </label>
        <select
          className="form-select mb-2"
          id="brandSelect"
          aria-label="Default select example"
          defaultValue={(product !== null && product.brand) || "default"}
          onChange={(e) =>
            setInitForm((preInit) => {
              return { ...preInit, brand: e.target.value };
            })
          }
        >
          <option value="default" disabled>
            Select product brand
          </option>
          {brands.map((brand, index) => {
            return (
              <option key={index} value={brand.name}>
                {brand.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="row mb-3">
        <div className="col-3 d-inline-block me-3">
          <label htmlFor="productPrice" className="form-label fw-bold">
            Price
          </label>
          <input
            type="number"
            value={initForm.price}
            onChange={(e) =>
              setInitForm((preInit) => {
                return { ...preInit, price: e.target.value };
              })
            }
            className="form-control"
            id="productPrice"
            placeholder="Enter product price"
            required
          />
        </div>

        <div className="col-3 d-inline-block me-3">
          <label htmlFor="productDiscount" className="form-label fw-bold">
            Discount
          </label>
          <input
            type="number"
            value={initForm.discount}
            onChange={(e) =>
              setInitForm((preInit) => {
                return { ...preInit, discount: e.target.value };
              })
            }
            className="form-control"
            id="productDiscount"
            placeholder="Enter product discount"
            required
          />
        </div>

        <div className="col-3 d-inline-block">
          <label htmlFor="productQuantity" className="form-label fw-bold">
            Quantity
          </label>
          <input
            type="number"
            value={initForm.quantity}
            onChange={(e) =>
              setInitForm((preInit) => {
                return { ...preInit, quantity: e.target.value };
              })
            }
            className="form-control"
            id="productQuantity"
            placeholder="Enter product quantity"
            required
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="productImages" className="form-label fw-bold">
          Images
        </label>
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={(e) => {
            let selects = [];
            for (let i = 0; i < e.target.files.length; i++) {
              selects.push(e.target.files.item(i));
            }
            setImages((preImages) => [...preImages, ...selects]);
          }}
          className="form-control"
          id="productImages"
          ref={imageInputRef}
          multiple
        />

        <div className="image-container row d-flex justify-content-center">
          {/* show images select */}
          {images.length > 0 &&
            images.map((image, index) => {
              return (
                <div
                  className="col-4 col-md-3 col-lg-2 p-1 d-flex justify-content-center"
                  key={index}
                  style={{
                    position: "relative",
                  }}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    style={{
                      width: "100%",
                      border: "1px solid",
                      borderRadius: "5px",
                    }}
                  />

                  <div
                    className="clear-icon fw-bold"
                    style={{
                      color: "red",
                      border: "1px solid black",
                      borderRadius: "50%",
                      padding: "5px",
                      height: "15px",
                      width: "15px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      zIndex: "1",
                      position: "absolute",
                      top: 0,
                      right: 0,
                      background: "#ccc",
                    }}
                    onClick={() => {
                      let newImages = [...images];
                      newImages.splice(index, 1);
                      setImages(newImages);
                    }}
                  >
                    &times;
                  </div>
                </div>
              );
            })}
          {/* show old images of product */}
          {product !== null &&
            product?.images?.length > 0 &&
            product.images.map((url, index) => {
              if (!deleteImage.includes(url)) {
                return (
                  <div
                    className="col-4 col-md-3 col-lg-2 p-1 d-flex justify-content-center"
                    key={index}
                    style={{
                      position: "relative",
                    }}
                  >
                    <img
                      src={`http://localhost:8080${url}`}
                      alt=""
                      style={{
                        width: "100%",
                        border: "1px solid",
                        borderRadius: "5px",
                      }}
                    />

                    <div
                      className="clear-icon fw-bold"
                      style={{
                        color: "red",
                        border: "1px solid black",
                        borderRadius: "50%",
                        padding: "5px",
                        height: "15px",
                        width: "15px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        zIndex: "1",
                        position: "absolute",
                        top: 0,
                        right: 0,
                        background: "#ccc",
                      }}
                      onClick={() => {
                        setDeleteImage((pre) => [...pre, url]);
                      }}
                    >
                      &times;
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label fw-bold">Chi tiết kỹ thuật</label>
        <div className="productDetail">
          <div className="row mb-3">
            <div className="col-3 d-inline-block me-3">
              <label htmlFor="rearCameraDetail" className="form-label fw-bold">
                Rear camera
              </label>
              <input
                type="number"
                value={initForm.rear_camera}
                onChange={(e) =>
                  setInitForm((preInit) => {
                    return { ...preInit, rear_camera: e.target.value };
                  })
                }
                className="form-control"
                id="rearCameraDetail"
                placeholder="Enter product price"
                required
              />
            </div>

            <div className="col-3 d-inline-block me-3">
              <label htmlFor="frontCameraDetail" className="form-label fw-bold">
                Front camera
              </label>
              <input
                type="number"
                value={initForm.front_camera}
                onChange={(e) =>
                  setInitForm((preInit) => {
                    return { ...preInit, front_camera: e.target.value };
                  })
                }
                className="form-control"
                id="frontCameraDetail"
                placeholder="Enter product discount"
                required
              />
            </div>

            <div className="col-3 d-inline-block">
              <label htmlFor="osDetail" className="form-label fw-bold">
                Operating system
              </label>
              <select
                className="form-select mb-2"
                id="osDetail"
                aria-label="Default select example"
                defaultValue={
                  (product !== null && product?.detail?.operating_system) ||
                  "default"
                }
                onChange={(e) =>
                  setInitForm((preInit) => {
                    return { ...preInit, operating_system: e.target.value };
                  })
                }
              >
                <option value="default" disabled>
                  Select product OS
                </option>
                <option value="IOS">IOS</option>
                <option value="Android">Android</option>
                <option value="Symbian">Symbian</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-3 d-inline-block me-3">
              <label htmlFor="powerDetail" className="form-label fw-bold">
                Power
              </label>
              <input
                type="number"
                value={initForm.power}
                onChange={(e) =>
                  setInitForm((preInit) => {
                    return { ...preInit, power: e.target.value };
                  })
                }
                className="form-control"
                id="powerDetail"
                placeholder="Enter product price"
                required
              />
            </div>

            <div className="col-3 d-inline-block me-3">
              <label htmlFor="memoryDetail" className="form-label fw-bold">
                Memory
              </label>
              <input
                type="number"
                value={initForm.memory}
                onChange={(e) =>
                  setInitForm((preInit) => {
                    return { ...preInit, memory: e.target.value };
                  })
                }
                className="form-control"
                id="memoryDetail"
                placeholder="Enter product discount"
                required
              />
            </div>

            <div className="col-3 d-inline-block">
              <label htmlFor="ramDetail" className="form-label fw-bold">
                Ram
              </label>
              <input
                type="number"
                value={initForm.ram}
                onChange={(e) =>
                  setInitForm((preInit) => {
                    return { ...preInit, ram: e.target.value };
                  })
                }
                className="form-control"
                id="ramDetail"
                placeholder="Enter product quantity"
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-3 d-inline-block me-3">
              <label htmlFor="displayDetail" className="form-label fw-bold">
                Display size
              </label>
              <input
                type="number"
                value={initForm.display_size}
                onChange={(e) =>
                  setInitForm((preInit) => {
                    return { ...preInit, display_size: e.target.value };
                  })
                }
                className="form-control"
                id="displayDetail"
                placeholder="Enter product price"
                required
              />
            </div>
          </div>
        </div>
      </div>
      {product !== null ? (
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

export default ProductForm;
