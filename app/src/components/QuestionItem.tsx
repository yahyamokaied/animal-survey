import React from 'react';
import {QUESTION_COMPONENTS, QuestionProps} from './types';

const QuestionItem: React.FC<QuestionProps> = props => {
  const QuestionComponent = QUESTION_COMPONENTS[props.question.questionType];

  if (!QuestionComponent) {
    return null;
  }

  return <QuestionComponent {...props} />;
};

export default QuestionItem;
