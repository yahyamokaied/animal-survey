import {SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import {GestureResponderEvent} from 'react-native';
import {Question, QuestionType} from '../store/types';
import {
  CkeckboxQuestion,
  RadioQuestion,
  SliderQuestion,
  TextInputQuestion,
} from './QuestionTypes';

export const QUESTION_COMPONENTS: {
  [key in QuestionType]: React.FC<QuestionProps>;
} = {
  [QuestionType.Scaled]: SliderQuestion,
  [QuestionType.MultipleChoice]: RadioQuestion,
  [QuestionType.Checkbox]: CkeckboxQuestion,
  [QuestionType.FreeText]: TextInputQuestion,
};

export interface QuestionProps {
  question: Question;
  answer: string | string[] | number;
  onAnswerChange: (
    questionId: string,
    answer: string | number | string[],
  ) => void;
}

export type ErrorType = FetchBaseQueryError | SerializedError | string;

export interface AppButtonProps {
  color: string;
  onPress: (event: GestureResponderEvent) => void;
  title: string;
}
