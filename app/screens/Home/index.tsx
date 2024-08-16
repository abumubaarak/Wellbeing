import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';
import {Brain} from '../../assets/svgs';
import {Box, Screen} from '../../components';
import {$button, $widthHeightStyle} from '../../components/Dismiss/style';
import {StackNavigation} from '../../navigators';
import {moderateScale} from '../../utils';

export const Home = () => {
  const navigation = useNavigation<StackNavigation>();

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
            onPress={() => navigation.navigate('AI')}>
            <Brain width={25} height={25} />
          </RectButton>
        </Box>
      </Box>
    </Screen>
  );
};
