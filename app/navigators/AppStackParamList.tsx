import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {NavigationProp} from '@react-navigation/native';
import {AnalyseResponse} from '../services/api';

export type AppStackParamList = {
  Onboarding: undefined;
  ChangeLanguage: undefined;
  CompleteProfile: undefined;
  HomeTab: undefined;
  Permission: undefined;
  BookingStatus: {doctorName: string};
  Messages: {doctorID: string; channelName: string; channelSelfie: string};
  Symptoms: undefined;
  FindDoctor: undefined;
  VideoCall: {
    incomingCall: boolean;
    doctorName: string;
    doctorID: string;
    offer?: any;
    specialty?: string;
    avatar: string;
  };
  DoctorDetails: {doctor: FirebaseFirestoreTypes.DocumentData};
  SpecialistDoctor: {area: string};
  EditSymptoms: {symptoms: string};
  CalendarRange: {
    dateRangeType?:
      | 'custom'
      | 'Weekdays Only'
      | 'Weekends Only'
      | 'Entire Week';
    range: string;
    doctorsName: string;
    selectedDate: (date: string) => void;
  };
  Analyse: {symptoms: string};
  Analysis: {result: AnalyseResponse};
};
export type StackNavigation = NavigationProp<AppStackParamList>;
