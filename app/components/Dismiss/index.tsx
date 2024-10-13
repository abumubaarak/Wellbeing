import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {RectButton} from 'react-native-gesture-handler';
import {ArrowLeft, Back} from '../../assets/svgs';
import {StackNavigation} from '../../navigators';
import {isAndroid, moderateScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';
import {$border, $button, $container, $widthHeightStyle} from './style';

type DismissProps = {
  wnh?: number;
  title?: string;
};
export const Dismiss = ({wnh = 40, title}: DismissProps) => {
  const navigation = useNavigation<StackNavigation>();

  const onPress = useCallback(() => {
    navigation?.goBack();
  }, [navigation]);

  return (
    <Box flexDirection="row" justifyContent="center" alignItems="center">
      <Box style={[$container, $widthHeightStyle(wnh), title && $border]}>
        <RectButton
          hitSlop={50}
          onPress={onPress}
          style={[$button, $widthHeightStyle(wnh)]}>
          {!isAndroid ? <ArrowLeft /> : <Back />}
        </RectButton>
      </Box>
      <Box flex={1} alignItems="center">
        <Text variant="medium" fontSize={moderateScale(18)}>
          {title}
        </Text>
      </Box>
      <Box flex={0.1} />
    </Box>
  );
};
