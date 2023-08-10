import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from './store';

export enum QuestionType {
  MultipleChoice = 'multipleChoice',
  Checkbox = 'checkbox',
  Scaled = 'scaled',
  FreeText = 'freeText',
}

interface BaseQuestion {
  questionId: string;
  questionType: QuestionType;
  questionText: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  questionType: QuestionType.MultipleChoice;
  answerOptions: string[];
}

export interface CheckboxQuestion extends BaseQuestion {
  questionType: QuestionType.Checkbox;
  answerOptions: string[];
}

export interface ScaledQuestion extends BaseQuestion {
  questionType: QuestionType.Scaled;
  scaleMinValue: number;
  scaleMaxValue: number;
}

export interface FreeTextQuestion extends BaseQuestion {
  questionType: QuestionType.FreeText;
}

export type Question =
  | MultipleChoiceQuestion
  | CheckboxQuestion
  | ScaledQuestion
  | FreeTextQuestion;

export interface Answer {
  questionId: string;
  answer: string | string[] | number;
}

export interface ApiState {
  surveys: Question[];
  answers: Answer[];
  loading: boolean;
  error: string | null | undefined;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
