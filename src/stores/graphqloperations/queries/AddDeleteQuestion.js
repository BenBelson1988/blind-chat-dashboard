export const addQuestion = /* GraphQL */ `
  mutation createQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      id
    }
  }
`;

export const deleteQuestion = /* GraphQL */ `
  mutation deleteQuestion($id: ID!) {
    deleteQuestion(id: $id) {
      id
    }
  }
`;
