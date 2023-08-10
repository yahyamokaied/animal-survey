import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addAnswer,
  getSurveys,
  resetAnswers,
  saveAnswersToServer,
} from '../store/api/apiSlice';
import {
  AppDispatch,
  selectAnswers,
  selectError,
  selectIsLoading,
  selectSurveys,
} from '../store/store';
import {mapAnswersById} from '../utils/helper';

const useSurveys = () => {
  const dispatch: AppDispatch = useDispatch();

  const surveys = useSelector(selectSurveys);
  const answers = useSelector(selectAnswers);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const answersById = mapAnswersById(answers);

  const allQuestionsAnswered = surveys
    ? surveys.every(question => answersById[question.questionId] !== undefined)
    : false;

  const fetchSurveys = () => {
    dispatch(getSurveys());
  };

  const saveAllAnswers = () => {
    dispatch(saveAnswersToServer(answers));
  };

  const handleSaveAnswer = useCallback(
    (questionId: string, answer: string | string[] | number) => {
      dispatch(addAnswer({questionId, answer}));
    },
    [dispatch],
  );

  const showSummary = () => {
    saveAllAnswers();
    setShowConfirmation(true);
  };

  const resetSurvey = () => {
    dispatch(resetAnswers());
    setShowConfirmation(false);
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  return {
    surveys,
    answers,
    loading,
    error,
    showConfirmation,
    allQuestionsAnswered,
    handleSaveAnswer,
    showSummary,
    resetSurvey,
  };
};

export default useSurveys;
