import React from 'react';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const OnboardingScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        backgroundColor: '#F8FBF2',
        flex: 1,
        paddingVertical: insets.top,
      }}>
      <Text>OnboardingScreen</Text>
    </View>
  );
};
