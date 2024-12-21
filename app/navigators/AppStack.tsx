import auth from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {useMMKVString} from 'react-native-mmkv';
import {
  BookingStatus,
  CalendarRange,
  ChangeLanguage,
  CompleteProfile,
  DoctorDetails,
  EnhancedMessages,
  OnboardingScreen,
  Permission,
  SpecialistDoctor,
  VideoCall,
} from '../screens/';
import {Symptoms} from '../screens/AI';
import {Analyse} from '../screens/Analyse';
import {Analysis} from '../screens/Analysis';
import {EditSymptoms} from '../screens/EditSymptoms';
import {FindDoctor} from '../screens/FindDoctor';
import {isAndroid} from '../utils';
import {AppStackParamList} from './AppStackParamList';
import {HomeNavigator} from './HomeNavigator';
// import SplashScreen from 'react-native-splash-screen';
export const AppStack = () => {
  const Stack = createNativeStackNavigator<AppStackParamList>();
  const [__, setAuthUser] = useState();
  const [initializing, setInitializing] = useState(true);
  const [user, _] = useMMKVString('user');

  const userObject = user && JSON.parse(user!);

  function onAuthStateChanged(users: any) {
    setAuthUser(users);
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
      screenOptions={{
        headerShown: false,
        animation: isAndroid ? 'none' : 'ios',
      }}>
      {userObject ? (
        <>
          {userObject?.verify ? (
            <>
              <Stack.Screen name="HomeTab" component={HomeNavigator} />
              <Stack.Screen name="Messages" component={EnhancedMessages} />
              <Stack.Screen name="Symptoms" component={Symptoms} />
              <Stack.Screen name="Analyse" component={Analyse} />
              <Stack.Screen name="Analysis" component={Analysis} />
              <Stack.Screen name="BookingStatus" component={BookingStatus} />
              <Stack.Screen name="FindDoctor" component={FindDoctor} />
              <Stack.Screen
                name="SpecialistDoctor"
                component={SpecialistDoctor}
              />
              <Stack.Screen name="DoctorDetails" component={DoctorDetails} />
              <Stack.Screen name="VideoCall" component={VideoCall} />

              <Stack.Group
                screenOptions={{
                  presentation: 'fullScreenModal',
                }}>
                <Stack.Screen name="Permission" component={Permission} />
                <Stack.Screen name="EditSymptoms" component={EditSymptoms} />
                <Stack.Screen name="CalendarRange" component={CalendarRange} />
              </Stack.Group>
            </>
          ) : (
            <>
              <Stack.Screen
                name="CompleteProfile"
                component={CompleteProfile}
              />
            </>
          )}
        </>
      ) : (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        </>
      )}
      <Stack.Group
        screenOptions={{
          presentation: 'fullScreenModal',
        }}>
        <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
