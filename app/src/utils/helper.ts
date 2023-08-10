import {Answer} from '../store/types';

export type AnswersMap = {[questionId: string]: string | number | string[]};

export const mapAnswersById = (answers: Answer[]): AnswersMap => {
  return answers.reduce((accumulator, currentAnswer) => {
    accumulator[currentAnswer.questionId] = currentAnswer.answer;
    return accumulator;
  }, {} as AnswersMap);
};
