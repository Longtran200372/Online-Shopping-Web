import { useEffect, useState } from "react";
import Card from "../components/Atoms/Card";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "../axios";
import ListBanner from "../components/Layout/ListBanner";
import { useParams } from "react-router-dom";
import { useSearch } from "../context/search";
import FilterBar from "../components/Layout/FilterBar";

function ProductBrand() {
  const params = useParams();
  const [auth, setAuth] = useAuth();
  const [search, setSearch] = useSearch();
  const [products, setProducts] = useState([]);

  const getAllProductsOfBrand = async () => {
    let searchQuery = "";
    Object.keys(search).map((value, index) => {
      if (search[value]) {
        searchQuery += `&${value}=${search[value]}`;
      }
    });

    const response =
      params.brand !== "search"
        ? await axios.get(`/api/products?brand=${params.brand}${searchQuery}`)
        : await axios.get(`/api/products?${searchQuery}`);
    if (response?.data?.products) {
      setProducts(response.data.products);
    }
  };

  useEffect(() => {
    setSearch({
      limit: null,
      sort: "-discount",
      search: params.brand === "search" ? search.search : "",
    });
    getAllProductsOfBrand();
  }, [params]);
  useEffect(() => {
    getAllProductsOfBrand();
  }, [search]);
  return (
    <Layout title="Homepage">
      <div className="container mt-4 g-0 homepage-wrapper">
        <FilterBar />
        <div className="row mt-3 container-fluid block-content">
          {params.brand !== "search" ? (
            <h2>Điện thoại {params.brand}</h2>
          ) : (
            <h2>Kết quả tìm kiếm với {search.search}</h2>
          )}
          {products.map((product, index) => {
            return (
              <div
                key={index}
                className="col-lg-3 col-md-4 col-sm-6 col-12 no-gutter"
              >
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default ProductBrand;
