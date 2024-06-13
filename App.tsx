import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Config from 'react-native-config';

import BootSplash from 'react-native-bootsplash';

function App(): React.JSX.Element {
  useEffect(() => {
    (async () => {})().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>{Config.ENVIRONMENT} 👋🏼</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FBF2',
    flex: 1,
  },
});
export default App;
