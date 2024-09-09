import {NavigationProp} from '@react-navigation/native';

export type AppStackParamList = {
  Onboarding: undefined;
  ChangeLanguage: undefined;
  HomeTab: undefined;
  Permission: undefined;
  Symptoms: undefined;
  EditSymptoms: {symptoms: string};
  Analyse: {symptoms: string};
};
export type StackNavigation = NavigationProp<AppStackParamList>;
