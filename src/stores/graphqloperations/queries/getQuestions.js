export const getQuestionsByType = /* GraphQL */ `
  query getQuestions($type: QuestionType!) {
    getQuestions(type: $type) {
      items {
        body
        domain
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
  mutation updateQuestion($id: ID!, $body: String, $answers: [AnswerInput]) {
    updateQuestion(input: { id: $id, body: $body, answers: $answers }) {
      id
    }
  }
`;
