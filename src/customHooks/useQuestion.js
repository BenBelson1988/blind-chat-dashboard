import { useCallback, useReducer, useState } from "react";

const dictionaryReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "ADD_ANSWER": {
      return { ...state, [payload.id]: payload };
    }
    case "REMOVE_ANSWER": {
      const newState = { ...state };
      delete newState[payload.id];
      return newState;
    }
    default:
      return state;
  }
};
export default (question) => {
  const [answers, dispatch] = useReducer(dictionaryReducer, question.answers);

  const putQuestion = useCallback((body, imageUrl) => {}, [
    question.id,
    answers,
  ]);

  const postQuestion = useCallback((body, type, domain, imageUrl) => {}, [
    question.id,
    answers,
  ]);

  return { putQuestion, postQuestion, answers };
};

/*
const question = {
  answers: [
    {
      effects: [
        {
          feature: "Familial",
          value: 0.1,
        },
        {
          feature: "Diligence",
          value: 0.1,
        },
      ],
      body: "Hookup",
      count: 408,
      iceBreaker: "I am here for hookups",
      id: "1",
    },
    {
      effects: [
        {
          feature: "Familial",
          value: 0.15,
        },
      ],
      body: "Making friends",
      count: 384,
      iceBreaker: "Not really into romance",
      id: "2",
    },
    {
      effects: [
        {
          feature: "Familial",
          value: 0.15,
        },
      ],
      body: "Short-term dating",
      count: 355,
      iceBreaker: "Looks like both of you are party people",
      id: "3",
    },
    {
      effects: [
        {
          feature: "Familial",
          value: 1,
        },
        {
          feature: "Diligence",
          value: 1,
        },
      ],
      body: "Long-term dating",
      count: 377,
      iceBreaker: "Looks like both of you are party people",
      id: "4",
    },
  ],
  body: "What Kind of Relationship Are You Looking For?",
  createdAt: "2021-07-10T10:34:11.611Z",
  domain: "Details",
  id: "01EQX08TR7M7VWNG4PDXYJ0W9W",
  imageUrl:
    "https://sls-blind-chat-prod.s3-accelerate.amazonaws.com/questions/images/default.jpg?AWSAccessKeyId=ASIA6AIFCXM7Z2X5H7YS&Expires=1631053442&Signature=QNd4aQ5J9FNY5IrNJaYMfsVTqNw%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEE4aCXVzLWVhc3QtMSJGMEQCIG2WK%2BNehj3vh28tBctH%2Fz4V4Z7VAQP5wmgs%2B7Shkqx4AiANMZZ9GqJaA7pHomd3eSQJRfRrXhlEV2zbWjmk2ESETiqyAgiW%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDk2MjYyMDIwOTk4MyIMkf5ouLMH2NfdoMO5KoYCq4evJ2J3wiQD4OeL9XstWVutnnc5%2BwgfEaDuYVMh%2B9DRbzoRRw6m4%2Bmbfu1GLP61B%2BDromldrtGCdSZf1Rz%2BYMfEm9LDJVNsz9nRwwtP84AN%2BwgiJu9OHmQ55bg6vcq3sotFuphNpXb%2B%2BW1IqBeF99BYgiEojvk3zm9USrzaboEa049YHD%2BnMgjhXAC3pyZpGDyyDaDub%2FRSQUuflyROrxTM3aupu4x5ejuwYKpk9okrNlO%2BTlApnLi4aQd4HhF74bQpVuZrbia64tm9de0gZP2aWQeK2l%2FSg6epKe%2B7NkS7CSLoVUni74gQ8L9dUFDYpmR%2B9N3hAG7%2BJ9liDLaHw%2BcLSV6XdTDlr9%2BJBjqbAWYNLlf26wlKYxpzsEfGysej9HXJ8admR%2BeUm2u71phVuAkqWO%2FvRgA5%2Bac32d3uWrxGe%2FCoLMTgiU4QHlwHAr%2Bkk4M9%2BLllLbb3kjv8%2B%2FAY9W%2Fedne8oC2OUHOSH8ZLRUO6eEjYjljpoWTvpR5DuMUPed%2Bw7onoegOqWbpXZ%2BJj2qTxJQt4mCowrPISgdWphLYsqblQYHovKAk1",
  type: "basic",
};
*/
