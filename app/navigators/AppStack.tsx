import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ChangeLanguage, OnboardingScreen} from '../screens/';
import {AppStackParamList} from './AppStackParamList';

export const AppStack = () => {
  const Stack = createNativeStackNavigator<AppStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Group
        screenOptions={{
          presentation: 'fullScreenModal',
        }}>
        <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
