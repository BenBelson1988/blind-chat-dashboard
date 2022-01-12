import { CityList } from "../styled/Heading";
import { FullCityListButton } from "../styled/Buttons";
import { useEffect, useRef } from "react";
import { CenteredColumnDiv } from "../styled/Divs";

export default (props) => {
  console.log(props);
  const ref = useRef(null);
  const HandleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      props.setExpandAllCities(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", HandleClickOutside, true);
  });
  return (
    <CenteredColumnDiv ref={ref}>
      <FullCityListButton onClick={() => props.setExpandAllCities(false)}>
        X
      </FullCityListButton>
      {Object.entries(props.city).map((city, index) => {
        return (
          <CityList index={index}>
            {index}. {city[0]} - {city[1]}
          </CityList>
        );
      })}
    </CenteredColumnDiv>
  );
};
