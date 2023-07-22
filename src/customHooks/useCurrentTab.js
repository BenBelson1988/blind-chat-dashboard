import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

export default () => {
  const [currentTab, setCurrentTab] = useState("stats");
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    const pathArray = location.pathname.split("/");
    setCurrentTab(pathArray[pathArray.length - 1]);
  }, [location.pathname]);

  return currentTab;
};
