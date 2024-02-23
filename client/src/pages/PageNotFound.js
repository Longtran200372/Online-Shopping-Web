import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

function PageNotFount() {
  return (
    <Layout title="page not found">
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <p className="pnf-message">Page not found</p>
        <Link to="/" className="pnf-button">
          Go back
        </Link>
      </div>
    </Layout>
  );
}

export default PageNotFount;
