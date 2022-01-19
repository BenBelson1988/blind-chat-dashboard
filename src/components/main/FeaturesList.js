import { useSelector } from "react-redux";
import { FeatureLineDiv, FeaturesDiv } from "../styled/Divs";
import { PageHeading } from "../styled/Heading";
import Feature from "./Feature";

export default () => {
  const features = useSelector(({ features }) => {
    return features.features;
  });
  return (
    <FeaturesDiv>
      <PageHeading>Features List</PageHeading>
      <FeatureLineDiv>
        {features.map((feature, index) => {
          return <Feature key={index} {...feature.domain} />;
        })}
      </FeatureLineDiv>
    </FeaturesDiv>
  );
};
