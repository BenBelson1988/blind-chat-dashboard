export const addQuestion = /* GraphQL */ `
  mutation createQuestion(
    $id: ID!
    $body: String
    $domain: Domain
    $feature: String
    $answers: [AnswerInput]
    $type: String
  ) {
    createQuestion(
      input: {
        id: $id
        body: $body
        domain: $domian
        type: $type
        feature: $feature
        answers: $answers
      }
    ) {
      id
    }
  }
`;

// mutation MyMutation {
//     createQuestion(input: {answers: {body: "", count: 10, effects: {feature: "", value: 1.5}, iceBreaker: "", id: ""}, body: "", domain: Openness, feature: "", type: basic, id: ""}) {
//       body
//     }
//   }

export const deleteQuestion = /* GraphQL */ ``;
