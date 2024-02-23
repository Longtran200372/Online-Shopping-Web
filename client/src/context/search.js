import { useState, useEffect, useContext, createContext, useRef } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({
    limit: null,
    sort: "-discount",
  });
  useEffect(() => {
    // set search something
  }, []);

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
};

// hook custom to get [search, setSearch]
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
