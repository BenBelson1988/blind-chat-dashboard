import styled from "styled-components";

export const Clickable = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const Xbutton = styled(Clickable)`
  border-radius: 40px;
  border-style: solid;
  border-width: 1px;
  background-color: black;
`;

export const XbuttonInterest = styled(Xbutton)`
  color: white;
  &:hover {
    background-color: white;
    color: black;
  }
  width: 20px;
  line-height: 20px;
  margin-left: 5px;
`;

export const DotsButtonInterests = styled(Xbutton)`
  color: white;
  width: 20px;
  &:hover {
    background-color: white;
    color: black;
  }
`;

export const PlusButtonInterest = styled(Xbutton)`
  color: white;
  &:hover {
    background-color: white;
    color: black;
  }
  width: 20px;
  margin-bottom: 15px;
`;
