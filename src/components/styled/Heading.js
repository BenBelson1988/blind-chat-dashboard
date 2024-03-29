import styled from "styled-components";

export const Middl1H1 = styled.h1`
  align-self: center;
`;

export const StatsH2 = styled.h2`
  font-size: 25px;
`;

export const H4Blue = styled.h4`
  color: #116e72;
  padding-right: 20px;
  margin: 0;
  margin-bottom: 10px;
`;

export const H4Pink = styled.h4`
  color: #79334e;
  padding-right: 20px;
  margin: 0;
  margin-bottom: 10px;
`;

export const H5TopBottom = styled.h5`
  margin-top: 10px;
  margin-bottom: 0;
`;

export const H3StatsHeading = styled.h3`
  border-bottom: 1px solid white;
  padding-bottom: 2px;
`;

export const CityList = styled.h4`
  color: white;
  fontsize: 20px;
  border-radius: 15px;
  width: 70%;
  line-height: 4vh;
  height: 4vh;
  margin-bottom: 1vh;
  background: ${(props) => (props.index % 2 === 0 ? "#173233" : "#40212d")};
`;

export const ErrorMsg = styled.h4`
fontsize:2vw
align-self:center;
`;

export const ActiveCity = styled.h5`
  margin: 0;
`;

export const PageHeading = styled.h2`
  font-size: 2vw;
  background: -webkit-linear-gradient(#179fa6, #f46c96);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  flex-wrap: nowrap;
  margin-top: 0;
  marfin-bottom: 2vh;
`;

export const FeatureH4 = styled.h4`
  margin-top: 0;
  margin-bottom: 0.5vh;
`;

export const SubFHead = styled.h5`
  background: ${(props) => (props.active ? "gray" : "black")};
  color: ${(props) => (props.active ? "black" : "white")};
  height: fit-content;
  width: fit-content;
  line-height: 3vh;
  margin-right: 1vw;
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 5px;
  margin-top: 0;
  margin-bottom: 2vh;
`;
