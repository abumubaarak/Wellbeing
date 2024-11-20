import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {check} from 'react-native-permissions';
import {StackNavigation} from '../../navigators';
import {colors} from '../../theme';
import {MICROPHONE_PERMISSION, moderateScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';
import {$container} from './styles';

export const InsightCard = () => {
  const navigation = useNavigation<StackNavigation>();

  const handleOnPress = async () => {
    //handle other case later.Insha Allah
    const result = await check(MICROPHONE_PERMISSION);
    if (result === 'granted') {
      navigation.navigate('Symptoms');
    } else {
      navigation.navigate('Permission');
    }
  };

  return (
    <Pressable onPress={handleOnPress}>
      <LinearGradient
        style={$container}
        useAngle={true}
        angle={-190}
        angleCenter={{x: 1, y: 0.66}}
        colors={[colors.primary300, colors.primary]}>
        <Box paddingHorizontal="n" paddingVertical="m" gap="m">
          <Text
            variant="mSemiBold"
            lineHeight={moderateScale(27)}
            fontSize={moderateScale(20)}>
            {'Experiencing Strange\nSymptoms'}
          </Text>
          <Text textAlign="left" lineHeight={moderateScale(22)}>
            Try our AI-powered symptom analysis tool to get quick insights and
            identify potential medical conditions. Fast, easy, and personalized
            just for you!
          </Text>

          <Box
            width={113}
            height={44}
            alignItems="center"
            justifyContent="center"
            backgroundColor="white"
            borderRadius={moderateScale(100)}>
            <Text variant="buttonLabel" textAlign="center">
              Get Insights
            </Text>
          </Box>
        </Box>
      </LinearGradient>
    </Pressable>
  );
};
