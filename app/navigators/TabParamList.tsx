import {NavigationProp} from '@react-navigation/native';

export type TabParamList = {
  Home: undefined;
  Bookings: undefined;
  Chat: undefined;
  Profile: undefined;
};
export type StackTabNavigation = NavigationProp<TabParamList>;
