export const getQuestionsByType = /* GraphQL */ `
  query getQuestions($type: QuestionType!) {
    getQuestions(type: $type) {
      items {
        id
        imageUrl
        domain
        body
        answers {
          id
          body
        }
      }
    }
  }
`;


export const answerQuestion = /* GraphQL */ `
  mutation answerQuestion($answerId: ID!, $questionId: ID!) {
    answerQuestion(
      input: { answerId: $answerId, questionId: $questionId}
    )
  }
`;