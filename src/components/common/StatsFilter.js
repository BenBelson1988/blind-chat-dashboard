import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { fetchStats } from "../../stores/slices/statsSlicer";
import { FilterStatsDiv } from "../styled/Divs";
import { H4Blue, H4Pink } from "../styled/Heading";
import { DotsButtonInterests } from "../styled/Xbutton";

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isGeneder, setGeneder] = useState({
    male: "",
    female: "",
  });

  useEffect(() => {
    if (isGeneder.male === "✓") {
      dispatch(fetchStats("?gender=Male"));
      history.push({
        search: "?gender=Male",
      });
    }
    if (isGeneder.female === "✓") {
      dispatch(fetchStats("?gender=Female"));
      history.push({
        search: "?gender=Female",
      });
    }
  }, [isGeneder]);

  const menHandle = () => {
    if (isGeneder.male) {
      setGeneder({
        male: "",
        female: "",
      });
      dispatch(fetchStats());
      history.push();
    } else {
      setGeneder({
        male: "✓",
        female: "",
      });
    }
  };
  const femaleHandle = () => {
    if (isGeneder.female) {
      setGeneder({ male: "", female: "" });
      dispatch(fetchStats());
      history.push();
    } else setGeneder({ male: "", female: "✓" });
  };

  return (
    <FilterStatsDiv>
      <DotsButtonInterests onClick={() => menHandle()}>
        {isGeneder.male}
      </DotsButtonInterests>
      <H4Blue>Male</H4Blue>
      <DotsButtonInterests onClick={() => femaleHandle()}>
        {isGeneder.female}
      </DotsButtonInterests>
      <H4Pink>Female</H4Pink>
    </FilterStatsDiv>
  );
};
