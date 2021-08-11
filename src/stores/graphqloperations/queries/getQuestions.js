const type = "swippable";

export const getQuestions = /*GraphQL*/ `
query MyQuery {
    getQuestions(type: swippable) {
      items {
        body
        answers {
          body
        }
      }
    }
  }  
`;
