import styled from 'styled-components';

export default styled.div`
  text-align: center;
  margin:15px;
  padding-bottom: 15px;
  padding-top: 15px;
  vertical-align: middle;
  line-height: 60px;
  background-image: linear-gradient(#116f723a, #3f3f3f98);
  border-radius: 5px;
  -moz-box-shadow: 2px 2px 2px 2px rgba(47, 47, 47, 0.13);
  -webkit-box-shadow: 2px 2px 2px 2px rgba(47, 47, 47, 0.13);
  box-shadow: 2px 2px 2px 2px rgba(47, 47, 47, 0.13);
  font-size: 25px;
  font-weight: bold;
  &:hover{
      background-image: linear-gradient(#116f720c, #00000098);
      cursor: pointer;
   }
}

    `