import React, {useCallback} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppButton from '../components/AppButton';
import ConfirmationComponent from '../components/ConfirmationComponent';
import {getErrorMessage} from '../components/getErrorMessage';
import {renderQuestion} from '../components/renderQuestion';
import useSurveys from '../hooks/useSurveys';
import {Question} from '../store/types';
import colors from '../theme/colors';
import commonStyles from '../theme/commonStyles';
import {mapAnswersById} from '../utils/helper';
import {AppDispatch} from '../store/store';
import {useDispatch} from 'react-redux';
import {getSurveys} from '../store/api/apiSlice';

const SurveyScreen: React.FC = () => {
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

  const dispatch: AppDispatch = useDispatch();

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
    return (
      <View style={commonStyles.emtpyScreen}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={commonStyles.emtpyScreen}>
        <Text style={commonStyles.errorText}>{getErrorMessage(error)}</Text>
        <AppButton
          title="Reload"
          onPress={() => dispatch(getSurveys())}
          color={colors.error}
        />
      </View>
    );
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

export default SurveyScreen;
