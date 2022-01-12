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
