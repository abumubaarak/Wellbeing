import {ThemeProvider} from '@shopify/restyle';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableFreeze} from 'react-native-screens';
import {AppNavigator} from './navigators';
import {theme} from './theme';

function App(): React.JSX.Element {
  enableFreeze(true);
  useEffect(() => {
    (async () => {})().finally(async () => {
      await BootSplash.hide();
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FBF2" />
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;
