import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {RectButton} from 'react-native-gesture-handler';
import {Back, Cancel} from '../../assets/svgs';
import {StackNavigation} from '../../navigators';
import {isAndroid} from '../../utils';
import {Box} from '../Box';
import {$button, $container} from './style';

export const Dismiss = () => {
  const navigation = useNavigation<StackNavigation>();

  const onPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Box style={$container}>
      <RectButton hitSlop={50} onPress={onPress} style={$button}>
        {!isAndroid ? <Cancel /> : <Back />}
      </RectButton>
    </Box>
  );
};
