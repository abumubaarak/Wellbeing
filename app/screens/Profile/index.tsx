import auth from '@react-native-firebase/auth';
import React from 'react';
import {Pressable} from 'react-native';
import {Screen, Text} from '../../components';
import {useUser} from '../../hooks';
export const Profile = () => {
  const {fullName} = useUser();
  const signOut = async () => {
    await auth().signOut();
  };
  return (
    <Screen useAlignment>
      <Text>Profile</Text>
      <Text>Welcome {fullName}</Text>
      <Pressable onPress={signOut}>
        <Text>Sign Out</Text>
      </Pressable>
    </Screen>
  );
};
