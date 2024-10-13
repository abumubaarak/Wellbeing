import auth from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {ChangeLanguage, OnboardingScreen, Permission} from '../screens/';
import {Symptoms} from '../screens/AI';
import {Analyse} from '../screens/Analyse';
import {Analysis} from '../screens/Analysis';
import {EditSymptoms} from '../screens/EditSymptoms';
import {FindDoctor} from '../screens/FindDoctor/Index';
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
          <Stack.Screen name="Symptoms" component={Symptoms} />
          <Stack.Screen name="Analyse" component={Analyse} />
          <Stack.Screen name="Analysis" component={Analysis} />
          <Stack.Screen name="FindDoctor" component={FindDoctor} />

          <Stack.Group
            screenOptions={{
              presentation: 'fullScreenModal',
            }}>
            <Stack.Screen name="Permission" component={Permission} />
            <Stack.Screen name="EditSymptoms" component={EditSymptoms} />
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
