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
        }
      }
    }
  }
`;

export const putQuestion = /* GraphQL */ `
  mutation updateQuestion(
    $id: ID!
    $body: String
    $domain: Domain
    $answers: [AnswersInput]
  ) {
    updateQuestion(
      input: { id: $id, body: $body, domain: $domain, answers: $answers }
    )
  }
`;
