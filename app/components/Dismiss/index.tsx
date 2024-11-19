import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {RectButton} from 'react-native-gesture-handler';
import {ArrowLeft, Back, Cancel} from '../../assets/svgs';
import {StackNavigation} from '../../navigators';
import {isAndroid, moderateScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';
import {$button, $container, $widthHeightStyle} from './style';

type DismissProps = {
  wnh?: number;
  title?: string;
  isModal?: boolean;
  modalOnPress?: () => void;
};
export const Dismiss = ({
  wnh = 40,
  title,
  isModal = false,
  modalOnPress,
}: DismissProps) => {
  const navigation = useNavigation<StackNavigation>();

  const onPress = useCallback(() => {
    navigation?.goBack();
  }, [navigation]);

  return (
    <Box flexDirection="row" justifyContent="center" alignItems="center">
      <Box style={[$container, $widthHeightStyle(wnh)]}>
        <RectButton
          hitSlop={50}
          onPress={isModal ? modalOnPress : onPress}
          style={[$button, $widthHeightStyle(wnh)]}>
          {isModal ? <Cancel /> : !isAndroid ? <ArrowLeft /> : <Back />}
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
