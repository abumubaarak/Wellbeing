import appleAuth from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export async function googleSignIn() {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth()
    .signInWithCredential(googleCredential)
    .then(() => createUser('google'));
}

export async function appleSignIn() {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  });
  if (!appleAuthRequestResponse.identityToken) {
    throw new Error('Apple Sign-In failed - no identify token returned');
  }
  const {identityToken, nonce, fullName} = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce,
  );
  const displayName = `${fullName?.givenName} ${fullName?.familyName}`;
  return auth()
    .signInWithCredential(appleCredential)
    .then(() => createUser('apple', displayName));
}

export const createUser = async (type: string, name?: string) => {
  const {currentUser} = auth();
  const document = firestore().collection(USERS).doc(currentUser?.uid);
  const user = await document.get();
  if (!user.exists) {
    document.set({
      fullName: type === 'google' ? currentUser?.displayName : name,
      email: currentUser?.email,
      uid: currentUser?.uid,
      userType: PATIENT,
      dob: null,
      gender: '',
      deviceID: '',
    });
  }
};

export const PROPERTY = 'Property';
export const USERS = 'Users';
export const REQUEST = 'Request';
export const WISHLISTS = 'Wishlists';
export const PATIENT = 'patient';
export const DOCTOR = 'doctor';
