const Question = `{
        body
        domain
        feature
        category
        id
        imageUrl
        answers {
          body
          effects {
            feature
            value
          }
          iceBreaker
          id
          count
        }
      }
      `

export const getQuestionsByType = /* GraphQL */ `
  query getQuestionsByType($type: QuestionType!) {
    getQuestionsByType(type: $type, limit: 25) {
      items ${Question}
    }
  }
`;

export const putQuestion = /* GraphQL */ `
  mutation UpdateQuestion($input: UpdateQuestionInput!) {
    updateQuestion(input: $input) ${Question}
  }
`;


export const addQuestion = /* GraphQL */ `
  mutation createQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) ${Question}
  }
`;

export const deleteQuestion = /* GraphQL */ `
  mutation deleteQuestion($id: ID!) {
    deleteQuestion(id: $id) {
      id
    }
  }
`;
