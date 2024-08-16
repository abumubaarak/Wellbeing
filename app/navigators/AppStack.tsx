import auth from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {AI, ChangeLanguage, OnboardingScreen} from '../screens/';
import {AppStackParamList} from './AppStackParamList';
import {HomeNavigator} from './HomeNavigator';
export const AppStack = () => {
  const Stack = createNativeStackNavigator<AppStackParamList>();
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(users: any) {
    setUser(users);
    if (initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line curly
  if (initializing) return <></>;

  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{headerShown: false}}>
      {user ? (
        <>
          <Stack.Screen name="HomeTab" component={HomeNavigator} />
          <Stack.Group
            screenOptions={{
              presentation: 'fullScreenModal',
            }}>
            <Stack.Screen name="AI" component={AI} />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Group
            screenOptions={{
              presentation: 'fullScreenModal',
            }}>
            <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
};
