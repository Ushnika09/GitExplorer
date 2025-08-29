import { createContext, useEffect, useState } from "react";
import githubGet from "../../utils/Githubapi";

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [val, setVal] = useState("");

  useEffect(() => {
    FetchAllData(val);
  }, [val]);

  const now = new Date();
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const dateStr = yesterday.toISOString().split("T")[0];

  const FetchAllData = (query) => {
    setLoading(true);
    githubGet(`/search/repositories`, {
      q: `created:>${dateStr}`,
      sort: "stars",
      order: "desc",
    }).then((res) => {
      setData(res?.items);
      // console.log(res?.items);
      setLoading(false);
    });
  };

  return (
    <DataContext.Provider value={{ loading, data, val, setVal }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
