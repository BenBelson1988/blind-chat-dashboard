import { useSelector } from "react-redux";
import CustomLoader from "../sliced/auth/common/CustomLoader";
import { FeatureLineDiv, FeaturesDiv } from "../styled/Divs";
import { PageHeading } from "../styled/Heading";
import Feature from "./Feature";

export default () => {
  const features = useSelector(({ features }) => {
    return features.features;
  });
  const isLoading = useSelector(({ features }) => {
    return features.isLoading;
  });
  return (
    <FeaturesDiv>
      <PageHeading>Features List</PageHeading>
      {isLoading && <CustomLoader title={"Fecthing domains..."} />}
      {!isLoading && (
        <FeatureLineDiv>
          {features.map((feature, index) => {
            return <Feature key={index} {...feature.domain} />;
          })}
        </FeatureLineDiv>
      )}
    </FeaturesDiv>
  );
};
