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
  mutation updateQuestion($id: ID!, $body: String) {
    updateQuestion(input: { id: $id, body: $body }) {
      id
    }
  }
`;

/* domain: $domain, answers: $answers*/
/* $domain: Domain
    $answers: [AnswersInput]*/
/*"Validation error of type UnknownType: Unknown type AnswersInput"*/

// export const updateQuestion = /* GraphQL */ `
//   mutation UpdateQuestion($input: UpdateQuestionInput!) {
//     updateQuestion(input: $input) {
//       id
//       body
//       createdAt
//       answers {
//         id
//         body
//         effects {
//           feature
//           value
//         }
//         iceBreaker
//       }
//       updatedAt
//     }
//   }
// `;
