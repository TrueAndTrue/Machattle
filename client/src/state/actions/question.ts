import { IQuestion } from "../../types";

export const updateQuestion= (question : IQuestion) => ({
  type: "UPDATE",
  payload : question
});