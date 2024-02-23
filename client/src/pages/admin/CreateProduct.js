import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import ProductForm from "../../components/Forms/ProductForm";

function CreateProduct() {
  return (
    <Layout>
      <div className="container-fluid row mt-3">
        <div className="col-3">
          <AdminMenu />
        </div>
        <div className="col-9">
          <div className="container">
            <h1>Create new product</h1>
            <ProductForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProduct;
