import styled from "styled-components";

export const AutoCompleteList = styled.div`
  position: absolute;
  top: 70%;
  width: 9vw;
  border-radius: 15px;
  max-height: 25vh;
  overflow-y: auto;
  z-index: 100;
`;

export const ListItem = styled.div`
  z-index: 100;
  line-height: 4vh;
  font-weight: bold;
  cursor: pointer;
  background-color: ${(props) => (props.index % 2 === 0 ? "#111111" : "black")};
  color: white;
  &:hover {
    background-color: #768a9d;
  }
`;

export const ListHolder = styled.div`
  position: relative;
`;
