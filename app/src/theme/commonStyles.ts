import {StyleSheet} from 'react-native';
import colors from './colors';

export const commonStyles = StyleSheet.create({
  fullScreen: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    padding: 10,
  },
  surveyContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: colors.background,
    color: colors.primary,
    borderColor: colors.lightGrey,
    borderWidth: 1,
  },
  emtpyScreen: {
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.primary,
  },
  formStyle: {
    flex: 1,
  },
  questionContainer: {
    borderBottomWidth: 1,
    justifyContent: 'center',
    borderColor: colors.lightGrey,
    padding: 2,
    margin: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  centeredRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
  },
  columnCotainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  spacer: {
    width: '100%',
    height: '5%',
  },
  textTitle: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textPrimary: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  textSecondary: {
    color: colors.textSecondary,
  },
  errorText: {
    color: colors.error,
    fontSize: 18,
    fontWeight: 'bold',
  },
  center: {
    alignSelf: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.secondary,
    alignSelf: 'stretch',
    margin: 16,
    padding: 8,
    borderWidth: 1,
    color: colors.textPrimary,
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
  },
});

export default commonStyles;
