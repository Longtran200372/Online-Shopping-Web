import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Spiner() {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preCount) => --preCount);
    }, 1000);
    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  });
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1 className="text-center">Redirecting to you in {count} second</h1>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Spiner;
