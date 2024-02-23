import { useSearch } from "../../../context/search";
import "./FilterBar.css";
function FilterBar() {
  const [search, setSearch] = useSearch();

  let setFilter = (object) => {
    setSearch({
      ...search,
      ...object,
    });
  };

  let setSort = (value) => {
    const sortBy = ["-discount", "price", "-price"];
    if (value > sortBy.length) setSearch({ ...search, sort: "-discount" });
    else setSearch({ ...search, sort: sortBy[value] });
  };
  return (
    <div className="container-fluid filter-bar-container">
      <div className="container">
        <h3>Lọc theo tiêu chí</h3>
        <div>
          <input
            type="checkbox"
            id="hasProduct"
            onChange={(e) => {
              if (e.target.checked) {
                setSearch({
                  ...search,
                  "quantity[gt]": "0",
                });
              } else {
                delete search["quantity[gt]"];
                setSearch({ ...search });
              }
            }}
          />
          <label htmlFor="hasProduct">Có hàng</label>

          <div className="dropdown d-inline-flex ms-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Giá
            </button>
            <div className="dropdown-menu row p-1">
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() =>
                  setFilter({
                    "price[gte]": "0",
                    "price[lt]": "9999999999",
                  })
                }
              >
                Bỏ chọn
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() =>
                  setFilter({
                    "price[gte]": "0",
                    "price[lt]": "4000000",
                  })
                }
              >
                Dưới 4 triệu
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() =>
                  setFilter({
                    "price[gte]": "4000000",
                    "price[lt]": "8000000",
                  })
                }
              >
                Từ 4 - 8 triệu
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() =>
                  setFilter({
                    "price[gte]": "8000000",
                    "price[lt]": "14000000",
                  })
                }
              >
                Từ 8 - 14 triệu
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() =>
                  setFilter({
                    "price[gte]": "14000000",
                    "price[lt]": "20000000",
                  })
                }
              >
                Từ 14 - 20
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() =>
                  setFilter({
                    "price[gte]": "20000000",
                    "price[lt]": "99999999999",
                  })
                }
              >
                Trên 20 triệu
              </button>
            </div>
          </div>

          <div className="dropdown d-inline-flex ms-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dung lượng ram
            </button>
            <div className="dropdown-menu row p-1">
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() => {
                  delete search["detail.ram"];
                  setSearch({ ...search });
                }}
              >
                Bỏ chọn
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() => setFilter({ "detail.ram": "2" })}
              >
                2GB
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() => setFilter({ "detail.ram": "3" })}
              >
                3GB
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() => setFilter({ "detail.ram": "4" })}
              >
                4GB
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() => setFilter({ "detail.ram": "6" })}
              >
                6GB
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() => setFilter({ "detail.ram": "8" })}
              >
                8GB
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() => setFilter({ "detail.ram": "12" })}
              >
                12GB
              </button>
            </div>
          </div>

          <div className="dropdown d-inline-flex ms-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Bộ nhớ trong
            </button>
            <div className="dropdown-menu row p-1">
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() => {
                  delete search["detail.memory"];
                  setSearch({ ...search });
                }}
              >
                Bỏ chọn
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() => setFilter({ "detail.memory": "32" })}
              >
                32GB
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() => setFilter({ "detail.memory": "64" })}
              >
                64GB
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() => setFilter({ "detail.memory": "128" })}
              >
                128GB
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() => setFilter({ "detail.memory": "256" })}
              >
                256GB
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() => setFilter({ "detail.memory": "512" })}
              >
                512GB
              </button>
            </div>
          </div>

          <div className="dropdown d-inline-flex ms-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Màn hình
            </button>
            <div className="dropdown-menu row p-1">
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() => {
                  delete search["detail.display_size[gte]"];
                  delete search["detail.display_size[lt]"];
                  setSearch({ ...search });
                }}
              >
                Bỏ chọn
              </button>

              <button
                className="filter-btn btn col-2 m-1"
                onClick={() =>
                  setFilter({
                    "detail.display_size[lt]": "5",
                    "detail.display_size[gte]": "0",
                  })
                }
              >
                Dưới 5 Inch
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() =>
                  setFilter({
                    "detail.display_size[lt]": "6",
                    "detail.display_size[gte]": "5",
                  })
                }
              >
                Từ 5-6 Inch
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() =>
                  setFilter({
                    "detail.display_size[lt]": "99999999999",
                    "detail.display_size[gte]": "6",
                  })
                }
              >
                Từ 6 Inch
              </button>
            </div>
          </div>

          <div className="dropdown d-inline-flex ms-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Camera
            </button>
            <div className="dropdown-menu row p-1">
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() => {
                  delete search["detail.rear_camera[gte]"];
                  delete search["detail.rear_camera[lt]"];
                  setSearch({ ...search });
                }}
              >
                Bỏ chọn
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() =>
                  setFilter({
                    "detail.rear_camera[lt]": "16",
                    "detail.rear_camera[gte]": "0",
                  })
                }
              >
                Dưới 16 MP
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() =>
                  setFilter({
                    "detail.rear_camera[lt]": "32",
                    "detail.rear_camera[gte]": "16",
                  })
                }
              >
                16MP - 32MP
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() =>
                  setFilter({
                    "detail.rear_camera[lt]": "64",
                    "detail.rear_camera[gte]": "32",
                  })
                }
              >
                32MP - 64MP
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() =>
                  setFilter({
                    "detail.rear_camera[lt]": "999999999",
                    "detail.rear_camera[gte]": "64",
                  })
                }
              >
                Trên 64MP
              </button>
            </div>
          </div>

          <div className="dropdown d-inline-flex ms-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dung lượng pin
            </button>
            <div className="dropdown-menu row p-1">
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() => {
                  delete search["detail.power[lt]"];
                  delete search["detail.power[gte]"];
                  setSearch({ ...search });
                }}
              >
                Bỏ chọn
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() =>
                  setFilter({
                    "detail.power[lt]": "3000",
                    "detail.power[gte]": "0",
                  })
                }
              >
                Dưới 3000mAh
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() =>
                  setFilter({
                    "detail.power[lt]": "4500",
                    "detail.power[gte]": "3000",
                  })
                }
              >
                3000 - 4500mAh
              </button>
              <button
                className="filter-btn btn col-2 m-1"
                onClick={() =>
                  setFilter({
                    "detail.power[lt]": "9999999999",
                    "detail.power[gte]": "4500",
                  })
                }
              >
                Trên 4500mAh
              </button>
            </div>
          </div>

          <div className=" d-inline-flex ms-3">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() =>
                setSearch({
                  limit: null,
                  sort: "-discount",
                })
              }
            >
              Reset All
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <h3>Sắp xếp theo</h3>
        <select
          className="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
          defaultValue={0}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value={0}>Giảm nhiều nhất</option>
          <option value={1}>Giá tăng dần</option>
          <option value={2}>Giá giảm dần</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
