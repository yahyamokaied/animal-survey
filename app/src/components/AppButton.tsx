import {Text, TouchableOpacity} from 'react-native';
import colors from '../theme/colors';
import commonStyles from '../theme/commonStyles';
import {AppButtonProps} from './types';

const AppButton: React.FC<AppButtonProps & {disabled?: boolean}> = ({
  color,
  onPress,
  title,
  disabled,
}) => (
  <TouchableOpacity
    onPress={disabled ? undefined : onPress}
    style={[
      commonStyles.buttonContainer,
      {backgroundColor: disabled ? colors.lightGrey : color},
    ]}
    disabled={disabled}>
    <Text style={commonStyles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default AppButton;
