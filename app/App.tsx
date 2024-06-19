import {ThemeProvider} from '@shopify/restyle';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableFreeze} from 'react-native-screens';
import './i18n';
import {AppNavigator} from './navigators';
import {theme} from './theme';
import {colors} from './theme/colors';

function App(): React.JSX.Element {
  enableFreeze(true);
  useEffect(() => {
    (async () => {})().finally(async () => {
      await BootSplash.hide();
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView>
        <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

export default App;
