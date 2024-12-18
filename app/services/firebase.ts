import appleAuth, {
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Config} from 'react-native-config';
import {storage} from '../data';
import {UUID, isAndroid} from '../utils';
export async function googleSignIn() {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  const {data} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(data?.idToken!);
  return auth()
    .signInWithCredential(googleCredential)
    .then(() => createUser('google'));
}

export async function appleSign() {
  return isAndroid ? appleSignInAndroid() : appleSignIniOS();
}

export async function appleSignIniOS() {
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

export async function appleSignInAndroid() {
  const rawNonce = UUID().toString();
  const state = UUID().toString();

  // Configure the request
  appleAuthAndroid.configure({
    // The Service ID you registered with Apple
    clientId: `com.wellbeing.${Config.ENVIRONMENT?.toLowerCase()}`,

    // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
    // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
    redirectUri: 'https://wellbeing-dev-3a169.firebaseapp.com/__/auth/handler',

    // The type of response requested - code, id_token, or both.
    responseType: appleAuthAndroid.ResponseType.ALL,

    // The amount of user information requested from Apple.
    scope: appleAuthAndroid.Scope.ALL,

    // Random nonce value that will be SHA256 hashed before sending to Apple.
    nonce: rawNonce,

    // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
    state,
  });

  // Open the browser window for user sign in
  const response = await appleAuthAndroid.signIn();

  const {id_token, nonce, user} = response;
  const name = user?.name;
  const appleCredential = auth.AppleAuthProvider.credential(id_token!, nonce);

  const displayName = `${name?.lastName} ${name?.firstName}`;

  return auth()
    .signInWithCredential(appleCredential)
    .then(() => createUser('apple', displayName));
}

export const createUser = async (type: string, name?: string) => {
  const {currentUser} = auth();
  const document = firestore().collection(USERS).doc(currentUser?.uid);
  const user = await document.get();
  const userInfo = {
    fullName: type === 'google' ? currentUser?.displayName : name,
    email: currentUser?.email,
    uid: currentUser?.uid,
    userType: PATIENT,
    dob: null,
    authProvider: type,
    gender: '',
    deviceID: '',
  };
  if (!user.exists) {
    document.set(userInfo);
    storage.set('user', JSON.stringify(userInfo));
  } else {
    storage.set('user', JSON.stringify(user.data()));
  }
};

export const USERS = 'Users';
export const PATIENT = 'patient';
export const DOCTOR = 'doctor';
export const APPOINTMENTS = 'Appointments';
