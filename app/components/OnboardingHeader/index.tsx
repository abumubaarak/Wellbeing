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
    <Box
      pt="m"
      justifyContent="space-between"
      flexDirection="row"
      mb="xl"
      alignItems="center"
      style={$container}>
      <Box flex={1} alignItems="center">
        <ProgressBar
          containerHeight={7}
          widthSize={width}
          containerWidth={'40%'}
          backgroundColor={'primary600'}
          containerBackgroundColor={'primary800'}
        />
      </Box>
      <Box style={$icon}>
        <BorderlessButton hitSlop={50} onPress={onPress}>
          <Translate />
        </BorderlessButton>
      </Box>
    </Box>
  );
};
