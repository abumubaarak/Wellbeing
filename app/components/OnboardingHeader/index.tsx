import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {BorderlessButton} from 'react-native-gesture-handler';
import {Translate} from '../../assets/svgs';
import {StackNavigation} from '../../navigators';
import {Box} from '../Box';
import {ProgressBar} from '../ProgressBar';
import {$container, $icon} from './style';

type OnboardingHeader = {
  width: number;
};

export const OnboardingHeader = ({width}: OnboardingHeader) => {
  const navigation = useNavigation<StackNavigation>();
  const onPress = () => {
    navigation.navigate('ChangeLanguage');
  };
  return (
    <Box flexGrow={0.03} style={$container}>
      <ProgressBar
        containerHeight={5}
        widthSize={width}
        backgroundColor={'primary500'}
        containerBackgroundColor={'primary200'}
      />
      <Box alignItems="flex-end" style={$icon}>
        <BorderlessButton hitSlop={50} onPress={onPress}>
          <Translate />
        </BorderlessButton>
      </Box>
    </Box>
  );
};
