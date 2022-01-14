import styled from "styled-components";

export default styled.div`
  z-index: 1000;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: fixed;
  left: 40vw;
  top: 25vh;
  overflow-y: auto;
  transition: 0.5s;
  box-shadow: 0 3px 10px rgb(0 0 0 /0.2);
  background-image: linear-gradient(
    135deg,
    rgba(0, 45, 50, 1) 0%,
    rgba(0, 0, 0, 0.865983893557423) 95%
  );
  animation: transitionInAll 0.5s;
  @keyframes transitionInAll {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
