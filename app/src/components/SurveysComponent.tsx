import React, {useCallback} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useSurveys from '../hooks/useSurveys';
import {Question} from '../store/types';
import colors from '../theme/colors';
import commonStyles from '../theme/commonStyles';
import {mapAnswersById} from '../utils/helper';
import AppButton from './AppButton';
import ConfirmationComponent from './ConfirmationComponent';
import {getErrorMessage} from './getErrorMessage';
import {renderQuestion} from './renderQuestion';

const SurveysComponent: React.FC = () => {
  const {
    surveys,
    answers,
    loading,
    error,
    showConfirmation,
    allQuestionsAnswered,
    handleSaveAnswer,
    showSummary,
    resetSurvey,
  } = useSurveys();

  const answersById = mapAnswersById(answers);

  const renderItem = useCallback(
    (itemInfo: {item: Question}) =>
      renderQuestion({
        answers: answersById,
        item: itemInfo.item,
        handleAnswerChange: handleSaveAnswer,
      }),
    [answersById, handleSaveAnswer],
  );

  if (showConfirmation) {
    return (
      <ConfirmationComponent
        surveys={surveys}
        answers={answers}
        resetSurvey={resetSurvey}
      />
    );
  }

  if (loading) {
    return <ActivityIndicator size="large" color={colors.secondary} />;
  }

  if (error) {
    return <Text style={commonStyles.errorText}>{getErrorMessage(error)}</Text>;
  }

  return (
    <KeyboardAwareScrollView style={commonStyles.surveyContainer}>
      {surveys.map((survey, index) => (
        <React.Fragment key={index}>
          {renderItem({item: survey})}
        </React.Fragment>
      ))}

      <View style={commonStyles.centeredRowContainer}>
        <AppButton
          color={colors.primary}
          title="Save Answers"
          onPress={showSummary}
          disabled={!allQuestionsAnswered}
        />
        <AppButton color={colors.error} title="Reset" onPress={resetSurvey} />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SurveysComponent;
