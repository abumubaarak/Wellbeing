import {NavigationProp} from '@react-navigation/native';
import {AnalyseResponse} from '../services/api';

export type AppStackParamList = {
  Onboarding: undefined;
  ChangeLanguage: undefined;
  HomeTab: undefined;
  Permission: undefined;
  Symptoms: undefined;
  FindDoctor: undefined;
  EditSymptoms: {symptoms: string};
  Analyse: {symptoms: string};
  Analysis: {result: AnalyseResponse};
};
export type StackNavigation = NavigationProp<AppStackParamList>;
