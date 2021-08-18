import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default () => {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    const searchArrey = location.search.substring(1).split("&");
    debugger;
    const params = searchArrey.reduce((acc, str) => {
      const [key, value] = str.split("=");
      return { ...acc, [key]: value };
    }, {});
    setQueryParams(params);
  }, [location.search]);
  return queryParams;
};
