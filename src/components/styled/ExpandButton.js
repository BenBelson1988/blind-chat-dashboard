import styled from "styled-components";

export default styled.button`
  font-size: 15px;
  font-weight: bold;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  color: white;
  background-image: linear-gradient(
    135deg,
    rgba(0, 45, 50, 1) 0%,
    rgba(0, 0, 0, 0.865983893557423) 95%
  );
  border: none;
  box-shadow: 0px 0px 0px 1px rgba(126, 124, 124);
  &:hover {
    cursor: pointer;
  }
`;
