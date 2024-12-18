import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useMMKVString} from 'react-native-mmkv';
import {Basic, Language, Lock, Logout, Trash} from '../../assets/svgs';
import {Avatar, Box, Header, ProfileItem, Screen, Text} from '../../components';
import {storage} from '../../data';
import {StackNavigation} from '../../navigators';
import {moderateScale} from '../../utils';
export const Profile = () => {
  const navigation = useNavigation<StackNavigation>();
  const [userObject, _] = useMMKVString('user');
  const user = userObject && JSON.parse(userObject!);

  const [loading, setLoading] = useState<boolean>(false);
  const signOut = async () => {
    setLoading(true);
    storage.set('user', '');
    await auth().signOut();
  };
  const changeLanguage = () => {
    navigation.navigate('ChangeLanguage');
  };
  return (
    <Screen useAlignment isLoading={loading}>
      <Box mt="l">
        <Header useDefault={false} summaryKey={'Profile'} titleKey={''} />
      </Box>

      <Box mt="s">
        <Box gap="n" flexDirection="row" alignItems="center">
          <Avatar wnh={65} uri={user.pic} />
          <Box gap="nn">
            <Text
              variant="mSemiBold"
              letterSpacing={0.2}
              fontSize={moderateScale(15)}
              adjustsFontSizeToFit>
              {user.fullName}
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
