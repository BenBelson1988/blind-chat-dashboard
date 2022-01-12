import { useState } from "react";
import { AutoCompleteList, ListHolder, ListItem } from "../styled/AutoComplete";
import { SearchButton } from "../styled/Buttons";
import { FilterStatsDiv } from "../styled/Divs";
import { ErrorMsg } from "../styled/Heading";
import { SearchCityInput } from "../styled/Inputs";
import PopUp from "../styled/PopUp";

export default (props) => {
  const [citySuggest, setCitySuggest] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const autoCopmlite = (e) => {
    if (!e) {
      setCitySuggest([]);
      setText("");
      return;
    }
    setText(e);
    let list = Object.keys(props.cityList);
    let matches = list.filter((items) => {
      const regex = new RegExp(`^${e}`, "gi");
      return items.match(regex);
    });
    setCitySuggest(matches);
  };

  const errorApear = () => {
    setError(
      "No such city " + `${text}` + " or no users found, Pelase Try again."
    );
    setTimeout(() => {
      setError("");
    }, 4000);
  };

  const onClickList = (city) => {
    if (!Object.keys(props.cityList).includes(city)) {
      errorApear();
      return;
    }
  };

  return (
    <ListHolder>
      {error && (
        <PopUp width={"20vw"} height={"20vh"}>
          <ErrorMsg>{error}</ErrorMsg>
        </PopUp>
      )}
      <FilterStatsDiv>
        <SearchCityInput
          onChange={(e) => autoCopmlite(e.target.value)}
          placeholder="Search for city"
          value={text}
        ></SearchCityInput>
        <SearchButton
          onClick={() => {
            onClickList(text);
          }}
        />
      </FilterStatsDiv>
      <AutoCompleteList>
        {citySuggest &&
          citySuggest.map((suggest, i) => {
            return (
              <ListItem
                key={i}
                index={i}
                // onClick={() => {
                //     onClickList(suggest);
                // }}
              >
                {suggest}
              </ListItem>
            );
          })}
      </AutoCompleteList>
    </ListHolder>
  );
};
