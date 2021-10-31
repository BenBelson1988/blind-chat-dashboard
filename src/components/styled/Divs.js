import styled from "styled-components";

export const RegularDiv = styled.div``;

export const MarkDiv = styled(RegularDiv)`
  width: 2.5vw;
  height: 1.5vh;
  margin-top: 5px;
  border-radius: 5px;
`;

export const MapDiv = styled(RegularDiv)`
  width: 20vw;
  height: 18vw;
`;
export const BlockDiv = styled(RegularDiv)`
  position: relative;
  width: 12vw;
`;

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
  position: relative;
`;

export const StatsContainer = styled(RegularDiv)`
  display: flex;
  justify-content: space-evenly;
  width: 72vw;
`;

export const ActiveusersDiv = styled(RowDiv)`
  justify-content: space-evenly;
  margin-left: 25px;
  margin-right: 25px;
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

export const FacetsStatsDiv = styled(StatsDiv)`
  margin-bottom: 50px;
`;

export const RowSpaceAroundDiv = styled(RowDiv)`
  justify-content: space-around;
`;

export const StatsHolder = styled(ColumnDiv)`
  width: 90%;
  position: relative;
`;

export const FixedDiv = styled(ColumnDiv)`
  position: fixed;
  height: max-content;
  width: 13vw;
  background: rgb(17, 110, 114);
  background: linear-gradient(
    0deg,
    rgba(17, 110, 114, 0.1) 0%,
    rgba(38, 38, 38, 0.5) 100%
  );
  margin-top: 20px;
  padding-bottom: 20px;
  z-index: 10;
  align-items: center;
`;

export const FilterStatsDiv = styled(RowDiv)`
  justify-content: center;
`;

export const CenteredColumnDiv = styled(ColumnDiv)`
  justify-content: center;
  align-items: center;
`;
