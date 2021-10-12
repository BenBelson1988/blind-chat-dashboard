import { useState } from "react";
import { FilterStatsDiv } from "../styled/Divs";
import { H4Blue, H4Pink } from "../styled/Heading";
import { DotsButtonInterests } from "../styled/Xbutton";

export default (props) => {
  const [isGeneder, setGeneder] = useState({
    male: "",
    female: "",
  });

  const menHandle = () => {
    isGeneder.male
      ? setGeneder({
          male: "",
          female: "",
        })
      : setGeneder({
          male: "✓",
          female: "",
        });
  };
  const femaleHandle = () => {
    isGeneder.female
      ? setGeneder({ male: "", female: "" })
      : setGeneder({ male: "", female: "✓" });
  };

  console.log(isGeneder);
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
