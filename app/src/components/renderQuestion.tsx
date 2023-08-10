import {Question} from '../store/types';
import QuestionItem from './QuestionItem';

export const renderQuestion = ({
  answers: answersMap,
  item: question,
  handleAnswerChange,
}: {
  answers: {[key: string]: string | number | string[]};
  item: Question;
  handleAnswerChange: (
    questionId: string,
    answer: string | number | string[],
  ) => void;
}) => {
  const answer = answersMap[question.questionId];

  return (
    <QuestionItem
      question={question}
      answer={answer}
      onAnswerChange={handleAnswerChange}
    />
  );
};
