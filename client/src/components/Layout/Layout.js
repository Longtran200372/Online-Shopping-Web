import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesUp, faArrowUp } from "@fortawesome/free-solid-svg-icons";
function Layout({ children, title, description, keywords, author }) {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 200) {
      setVisible(true);
    } else if (scrolled <= 200) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <div>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main
        className="container responsive-container"
        style={{ minHeight: "70vh" }}
      >
        <Toaster />
        {children}
      </main>
      {visible && (
        <button
          onClick={scrollToTop}
          style={{ zIndex: "99999" }}
          className="button-to-top"
        >
          <FontAwesomeIcon icon={faAnglesUp} />
        </button>
      )}
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Mobile shop",
  description: "Mobile shop - project 2 in HUST",
  keywords: "mern, react, node, mongodb",
  author: "PROJECT2",
};

export default Layout;
