import styled from "styled-components";

export const RegularDiv = styled.div``;

export const ColumnDiv = styled(RegularDiv)`
  display: flex;
  flex-direction: column;
`;

export const RowDiv = styled(RegularDiv)`
  display: flex;
  flex-direction: row;
`;

export const StatsDiv = styled(ColumnDiv)`
  justify-content: center;
  background: rgb(17, 110, 114);
  background: linear-gradient(
    0deg,
    rgba(17, 110, 114, 0.1) 0%,
    rgba(38, 38, 38, 0.5) 100%
  );
  padding-right: 20px;
  padding-left: 20px;
  border-radius: 15px;
`;

export const StatsContainer = styled(RegularDiv)`
  display: flex;
  justify-content: space-evenly;
  width: 1400px;
`;

export const ActiveusersDiv = styled(RowDiv)`
  justify-content: space-evenly;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 50px;
  background: rgb(17, 110, 114);
  background: linear-gradient(
    0deg,
    rgba(17, 110, 114, 0.1) 0%,
    rgba(38, 38, 38, 0.5) 100%
  );
  width: 400px;
  border-radius: 15px;
`;
