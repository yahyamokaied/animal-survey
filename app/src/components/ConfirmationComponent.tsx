import {Text, View} from 'react-native';
import {Answer, Question} from '../store/types';
import colors from '../theme/colors';
import commonStyles from '../theme/commonStyles';
import AppButton from './AppButton';

const ConfirmationComponent: React.FC<{
  surveys: Question[];
  answers: Answer[];
  resetSurvey: () => void;
}> = ({surveys, answers, resetSurvey}) => {
  return (
    <View style={[commonStyles.surveyContainer, commonStyles.center]}>
      <Text style={[commonStyles.errorText, commonStyles.center]}>Summary</Text>
      <View style={commonStyles.spacer} />
      {answers.map((answer, index) => (
        <View key={index} style={commonStyles.columnCotainer}>
          <Text style={commonStyles.textPrimary}>
            {
              surveys.find(q => q.questionId === answer.questionId)
                ?.questionText
            }
          </Text>
          <View style={commonStyles.spacer} />
          <Text>{JSON.stringify(answer.answer)}</Text>
        </View>
      ))}
      <View style={commonStyles.centeredRowContainer}>
        <AppButton
          color={colors.error}
          title="Start Over"
          onPress={resetSurvey}
        />
      </View>
    </View>
  );
};

export default ConfirmationComponent;
