import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {RectButton} from 'react-native-gesture-handler';
import {Back, Cancel} from '../../assets/svgs';
import {StackNavigation} from '../../navigators';
import {isAndroid} from '../../utils';
import {Box} from '../Box';
import {$button, $container, $widthHeightStyle} from './style';

type DismissProps = {
  wnh?: number;
};
export const Dismiss = ({wnh = 40}: DismissProps) => {
  const navigation = useNavigation<StackNavigation>();

  const onPress = useCallback(() => {
    navigation?.goBack();
  }, [navigation]);

  return (
    <Box style={[$container, $widthHeightStyle(wnh)]}>
      <RectButton
        hitSlop={50}
        onPress={onPress}
        style={[$button, $widthHeightStyle(wnh)]}>
        {!isAndroid ? <Cancel /> : <Back />}
      </RectButton>
    </Box>
  );
};
