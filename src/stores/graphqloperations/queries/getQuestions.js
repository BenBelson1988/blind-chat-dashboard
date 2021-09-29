export const getQuestionsByType = /* GraphQL */ `
  query getQuestionsByType($type: QuestionType!) {
    getQuestionsByType(type: $type, limit: 25) {
      items {
        body
        domain
        feature
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
    }
  }
`;

export const putQuestion = /* GraphQL */ `
  mutation UpdateQuestion($input: UpdateQuestionInput!) {
    updateQuestion(input: $input) {
      id
    }
  }
`;
