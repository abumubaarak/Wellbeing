/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  Calendar,
  CalendarActive,
  ChatActive,
  Chat as ChatIcon,
  HomeActive,
  Home as HomeInActive,
  User,
  UserActive,
} from '../assets/svgs';
import {TabIcon} from '../components';
import {Bookings, EnhancedChat, Home, Profile} from '../screens';
import {colors} from '../theme/colors';
import {TabParamList} from './TabParamList';
import {$tabBar, $tabLabel} from './style';

export const HomeNavigator = () => {
  const Tab = createBottomTabNavigator<TabParamList>();
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary500,
          tabBarInactiveTintColor: colors.black,
          tabBarLabelStyle: $tabLabel,
          tabBarStyle: $tabBar,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon
                activeIcon={<HomeActive />}
                focused={focused}
                icon={<HomeInActive />}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Bookings"
          component={Bookings}
          options={{
            lazy: false,
            tabBarIcon: ({focused}) => (
              <TabIcon
                activeIcon={<CalendarActive />}
                focused={focused}
                icon={<Calendar />}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={EnhancedChat}
          options={{
            unmountOnBlur: true,
            // tabBarBadge: count?.length,
            tabBarIcon: ({focused}) => (
              <TabIcon
                activeIcon={<ChatActive />}
                focused={focused}
                icon={<ChatIcon />}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            lazy: false,

            tabBarIcon: ({focused}) => (
              <TabIcon
                activeIcon={<UserActive />}
                focused={focused}
                icon={<User />}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};
