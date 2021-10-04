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
  border-style: solid;
  background-color: black;
`;

export const XbuttonInterest = styled(Xbutton)`
  color: white;
  position: absolute;
  top: 15%;
  left: 100%;
  &:hover {
    background-color: white;
    color: black;
  }
  width: 17px;
  line-height: 17px;
`;
