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

export const answerQuestion = /* GraphQL */ `
  mutation answerQuestion($answerId: ID!, $questionId: ID!) {
    answerQuestion(input: { answerId: $answerId, questionId: $questionId })
  }
`;
