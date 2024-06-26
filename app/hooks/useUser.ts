import auth from '@react-native-firebase/auth';

export const useUser = () => {
  const uid = auth()?.currentUser?.uid;
  const fullName = auth()?.currentUser?.displayName;
  const email = auth()?.currentUser?.email;
  return {uid, email, fullName};
};
