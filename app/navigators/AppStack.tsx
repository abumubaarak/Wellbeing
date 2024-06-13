import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {OnboardingScreen} from '../screens/';
import {AppStackParamList} from './AppStackParamList';

export const AppStack = () => {
  const Stack = createNativeStackNavigator<AppStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    </Stack.Navigator>
  );
};
