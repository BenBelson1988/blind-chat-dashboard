import styled from "styled-components";

export default styled.div`
  z-index: 10;
  min-width: 500px;
  min-height: 250px;
  position: fixed;
  left: 50%;
  top: 30%;
  transform: translate(-50%, 0);
  box-shadow: 0 3px 10px rgb(0 0 0 /0.2);
  background-image: linear-gradient(
    135deg,
    rgba(0, 45, 50, 1) 0%,
    rgba(0, 0, 0, 0.865983893557423) 95%
  );
`;
