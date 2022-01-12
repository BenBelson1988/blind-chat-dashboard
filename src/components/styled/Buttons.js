import styled from "styled-components";
import searchLogo from "./pictures/searchIcon.png";

export const FullCityListButton = styled.div`
  font-size: 15px;
  font-weight: bold;
  border-radius: 10px;
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  padding: 10px;
  color: white;
  background-image: linear-gradient(
    135deg,
    rgba(0, 45, 50, 1) 0%,
    rgba(0, 0, 0, 0.865983893557423) 95%
  );
  border: none;
  transition: 0.5s;
  box-shadow: 0px 0px 0px 1px rgba(126, 124, 124);
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const SearchButton = styled.svg`
  cursor: pointer;
  background-color: #768a9d;
  border-radius: 10px;
  margin-left: 5px;
  margin-top: 1vh;
  background-image: url(${searchLogo});
  background-color: gray;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 2vmin;
  width: 2vw;
  height: 3vh;
  transition: 0.3s;
  &:hover {
    transform: scale(1.1);
    background-color: white;
  }
`;
