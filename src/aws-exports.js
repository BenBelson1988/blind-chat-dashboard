/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.
import { Auth } from "aws-amplify";
const awsmobile = {
  aws_project_region: "us-east-1",
  aws_cognito_region: "us-east-1",
  aws_user_pools_id: "us-east-1_dxJywqGN5",
  aws_user_pools_web_client_id: "16178mmj8usu38tbpo09hp7ch8",
  aws_appsync_graphqlEndpoint:
    "https://jpcd26uj6vdmtnxtiky5hwq7ze.appsync-api.us-east-1.amazonaws.com/graphql",
  aws_appsync_region: "us-east-1",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  Auth: {
    identityPoolRegion: "us-east-1",
    userPoolId: "us-east-1_dxJywqGN5",
    region: "us-east-1",
    userPoolWebClientId: "16178mmj8usu38tbpo09hp7ch8",
  },
  API: {
    endpoints: [
      {
        name: "BlindChatAPIGatewayAPI",
        endpoint: "https://fcc2qksf1b.execute-api.us-east-1.amazonaws.com/prod",
        custom_header: async () => {
          let authorization = `${(await Auth.currentSession())
            .getIdToken()
            .getJwtToken()}`;
          const toSendToOrr = {
            Authorization: authorization,
          };
          return toSendToOrr;
        },
      },
    ],
  },
};

export default awsmobile;
/*
aws BlindChatAPIGatewayAPI update-api --api-id api-id --cors-configuration AllowOrigins="https://www.example.com"
*/
