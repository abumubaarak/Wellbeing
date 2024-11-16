import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Basic, Language, Lock, Logout, Trash} from '../../assets/svgs';
import {Avatar, Box, ProfileItem, Screen, Text} from '../../components';
import {useUser} from '../../hooks';
import {StackNavigation} from '../../navigators';
import {moderateScale} from '../../utils';
export const Profile = () => {
  const navigation = useNavigation<StackNavigation>();
  const {fullName} = useUser();
  const signOut = async () => {
    await auth().signOut();
  };
  const changeLanguage = () => {
    navigation.navigate('ChangeLanguage');
  };
  return (
    <Screen useAlignment>
      <Text
        pt="l"
        color="black"
        variant="mSemiBold"
        fontSize={moderateScale(27)}>
        Profile
      </Text>

      <Box mt="ll">
        <Box gap="n" flexDirection="row" alignItems="center">
          <Avatar wnh={65} />
          <Box gap="nn">
            <Text
              variant="mSemiBold"
              letterSpacing={0.2}
              fontSize={moderateScale(15)}
              adjustsFontSizeToFit>
              {fullName}
            </Text>
            <Text color="grey">Patient</Text>
          </Box>
        </Box>

        <Box ml="ii" marginTop="ll">
          <ProfileItem
            bg="primary300"
            icon={<Basic />}
            title="Basic Information"
            onPress={() => {}}
          />
          <ProfileItem
            bg="tomatoLight"
            icon={<Language />}
            title="Change Language"
            onPress={changeLanguage}
          />
          <ProfileItem
            bg="black"
            icon={<Lock />}
            title="Privacy Policy"
            onPress={() => {}}
          />
          <ProfileItem
            bg="error"
            icon={<Trash />}
            title="Delete Account"
            onPress={() => {}}
          />
          <ProfileItem
            bg="blueLight"
            icon={<Logout />}
            title="Logout"
            onPress={signOut}
          />
        </Box>
      </Box>
    </Screen>
  );
};
