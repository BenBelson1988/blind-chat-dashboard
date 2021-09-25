export const getQuestionsByType = /* GraphQL */ `
  query getQuestions($type: QuestionType!) {
    getQuestions(type: $type, limit: 100) {
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
  mutation updateQuestion(
    $id: ID!
    $body: String
    $feature: String
    $answers: [AnswerInput]
  ) {
    updateQuestion(
      input: { id: $id, body: $body, feature: $feature, answers: $answers }
    ) {
      id
    }
  }
`;
/*  $domain: Domain */
