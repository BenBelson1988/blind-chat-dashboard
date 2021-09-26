export const addQuestion = /* GraphQL */ `
  mutation createQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      id
    }
  }
`;

// mutation MyMutation {
//     createQuestion(input: {answers: {body: "", count: 10, effects: {feature: "", value: 1.5}, iceBreaker: "", id: ""}, body: "", domain: Openness, feature: "", type: basic, id: ""}) {
//       body
//     }
//   }

export const deleteQuestion = /* GraphQL */ `
mutatation deleteQuestion()
`;
