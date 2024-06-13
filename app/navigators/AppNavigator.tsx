import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AppStack} from './AppStack';

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};
