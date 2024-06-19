import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ViewStyle} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {Translate} from '../../assets/svgs';
import {StackNavigation} from '../../navigators';
import {Box} from '../Box';
import {ProgressBar} from '../ProgressBar';
import {$container, $icon} from './style';

type OnboardingHeader = {
  widthStyle: ViewStyle;
};

export const OnboardingHeader = ({widthStyle}: OnboardingHeader) => {
  const navigation = useNavigation<StackNavigation>();
  const onPress = () => {
    navigation.navigate('ChangeLanguage');
  };
  return (
    <Box flexGrow={0.03} style={$container}>
      <ProgressBar widthStyle={widthStyle} />
      <Box alignItems="flex-end" style={$icon}>
        <BorderlessButton hitSlop={50} onPress={onPress}>
          <Translate />
        </BorderlessButton>
      </Box>
    </Box>
  );
};
