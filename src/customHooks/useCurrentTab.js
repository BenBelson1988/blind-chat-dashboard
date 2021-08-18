import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

export default () => {
  const [currentTab, setCurrentTab] = useState("stats");
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    const pathArrey = location.pathname.split("/");
    setCurrentTab(pathArrey[pathArrey.length - 1]);
  }, [location.pathname]);

  return currentTab;
};
