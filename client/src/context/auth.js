import { useState, useEffect, useContext, createContext, useRef } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    cart: false,
    token: "",
  });
  const data = useRef(JSON.parse(sessionStorage.getItem("auth")));
  useEffect(() => {
    if (data) {
      setAuth({
        ...auth,
        user: data.current?.user,
        token: data.current?.access_token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
