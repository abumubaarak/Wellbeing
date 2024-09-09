import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';
import {useMMKVString} from 'react-native-mmkv';
import {check} from 'react-native-permissions';
import {Brain} from '../../assets/svgs';
import {Box, Screen} from '../../components';
import {$button, $widthHeightStyle} from '../../components/Dismiss/style';
import {StackNavigation} from '../../navigators';
import {MICROPHONE_PERMISSION, moderateScale} from '../../utils';

export const Home = () => {
  const navigation = useNavigation<StackNavigation>();
  const [_, setSymptomsPref] = useMMKVString('symptoms');

  const handleOnPress = async () => {
    //handle other case later.Insha Allah
    const result = await check(MICROPHONE_PERMISSION);
    if (result === 'granted') {
      navigation.navigate('Symptoms');
    } else {
      navigation.navigate('Permission');
    }
  };

  useEffect(() => {
    setSymptomsPref('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen useAlignment>
      <Box alignItems="flex-end">
        <Box
          borderRadius={moderateScale(100)}
          backgroundColor="primary400"
          alignItems="center"
          justifyContent="center">
          <RectButton
            style={[$button, $widthHeightStyle(40)]}
            onPress={handleOnPress}>
            <Brain width={25} height={25} />
          </RectButton>
        </Box>
      </Box>
    </Screen>
  );
};
