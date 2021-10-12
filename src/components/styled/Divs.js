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
  width: 1400px;
  position: relative;
`;

export const FixedUpLeftDiv = styled(RegularDiv)`
  position: absolute;
  left: 50px;
  top: 60px;
`;

export const FilterStatsDiv = styled(RowDiv)`
  background: rgb(17, 110, 114);
  background: linear-gradient(
    0deg,
    rgba(17, 110, 114, 0.1) 0%,
    rgba(38, 38, 38, 0.5) 100%
  );
  justify-content: space-evenly;
  align-items: center;
`;
