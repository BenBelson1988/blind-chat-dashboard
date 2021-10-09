import { useSelector } from "react-redux";
import GenderChart from "../common/GenderChart";

export default () => {
  const facets = useSelector(({ stats }) => {
    return stats.facets;
  });
  const facetsStats = useSelector(({ stats }) => {
    return stats.facetsStats;
  });
  console.log("facets", facets);
  console.log("facetsStats", facetsStats);
  const loading = Object.keys(facets).length === 0;
  let gender = facets.gender || "";

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "1200px" }}>
      {!loading && <GenderChart Gender={gender} />}
      {!loading && <GenderChart Gender={gender} />}
    </div>
  );
};
