import {CheckBox, Icon, Slider} from '@rneui/base';
import {Keyboard, Text, TextInput, View} from 'react-native';
import {QuestionType, ScaledQuestion} from '../store/types';
import colors from '../theme/colors';
import commonStyles from '../theme/commonStyles';
import {QuestionProps} from './types';

export const SliderQuestion: React.FC<QuestionProps> = ({
  question,
  answer,
  onAnswerChange,
}) => (
  <View style={commonStyles.questionContainer}>
    <Text style={commonStyles.textPrimary}>{question.questionText}</Text>
    <Slider
      value={answer as number}
      onValueChange={(value: number) =>
        onAnswerChange(question.questionId, value)
      }
      minimumValue={(question as ScaledQuestion).scaleMinValue || 1}
      maximumValue={(question as ScaledQuestion).scaleMaxValue || 3}
      step={1}
      style={{width: '90%', alignSelf: 'center', margin: 6}}
      thumbStyle={{height: 10, width: 10}}
      thumbProps={{
        children: (
          <Icon
            name="play"
            type="font-awesome"
            size={15}
            reverse
            containerStyle={{bottom: 20, right: 15}}
            color={colors.primary}
          />
        ),
      }}
      thumbTouchSize={{width: 20, height: 20}}
      trackStyle={{height: 10, borderRadius: 10}}
    />
  </View>
);

export const RadioQuestion: React.FC<QuestionProps> = ({
  question,
  answer,
  onAnswerChange,
}) => {
  if (question.questionType !== QuestionType.MultipleChoice) return null;

  return (
    <View style={commonStyles.questionContainer}>
      <Text style={commonStyles.textPrimary}>{question.questionText}</Text>
      {question.answerOptions.map((option, index) => (
        <View key={index} style={commonStyles.rowContainer}>
          <CheckBox
            key={index}
            checked={answer === option}
            onPress={() => onAnswerChange(question.questionId, option)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
          />
          <Text>{option}</Text>
        </View>
      ))}
    </View>
  );
};

export const CkeckboxQuestion: React.FC<QuestionProps> = ({
  question,
  answer,
  onAnswerChange,
}) => {
  if (question.questionType !== QuestionType.Checkbox) return null;

  return (
    <View style={commonStyles.questionContainer}>
      <Text style={commonStyles.textPrimary}>{question.questionText}</Text>
      {question.answerOptions.map((option, index) => (
        <View key={index} style={commonStyles.rowContainer}>
          <CheckBox
            key={index}
            checked={Array.isArray(answer) ? answer.includes(option) : false}
            onPress={() => {
              const newAnswer = Array.isArray(answer)
                ? answer.includes(option)
                  ? answer.filter(a => a !== option)
                  : [...answer, option]
                : [option];
              onAnswerChange(question.questionId, newAnswer);
            }}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={'checkbox-blank-outline'}
            style={{padding: 0}}
          />
          <Text>{option}</Text>
        </View>
      ))}
    </View>
  );
};

export const TextInputQuestion: React.FC<QuestionProps> = ({
  question,
  answer,
  onAnswerChange,
}) => (
  <View style={commonStyles.questionContainer} key={question.questionId}>
    <Text style={commonStyles.textPrimary}>{question.questionText}</Text>
    <TextInput
      style={commonStyles.input}
      onChangeText={text => onAnswerChange(question.questionId, text)}
      value={answer as string}
      removeClippedSubviews={false}
      autoCapitalize="sentences"
      returnKeyType="done"
      onSubmitEditing={() => Keyboard.dismiss()}
    />
  </View>
);
