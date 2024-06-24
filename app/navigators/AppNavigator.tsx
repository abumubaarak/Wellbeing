import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AppStack} from './AppStack';

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <BottomSheetModalProvider>
        <AppStack />
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};
