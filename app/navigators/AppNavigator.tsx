import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AppStack} from './AppStack';

export const AppNavigator = ({ref}: {ref: any}) => {
  return (
    <NavigationContainer ref={ref}>
      <BottomSheetModalProvider>
        <AppStack />
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};
