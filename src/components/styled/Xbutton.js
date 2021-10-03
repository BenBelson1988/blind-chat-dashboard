import styled from "styled-components";

export default styled.button`
  background-color: Black;
  color: white;
  border-radius: 40px;
  position: absolute;
  left: 100%;
  top: 15%;
  cursor: pointer;
  border-style: double;
  &:hover {
    background-color: white;
    color: black;
  }
`;

export const Clickable = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const Xbutton = styled(Clickable)`
  border-radius: 40px;
  border-style: double;
  background-color: black;
`;
