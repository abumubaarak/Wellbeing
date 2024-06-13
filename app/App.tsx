import React, {useEffect} from 'react';

import BootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator} from './navigators';

function App(): React.JSX.Element {
  useEffect(() => {
    (async () => {})().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
