/**
 * @format
 */

import database from '@react-native-firebase/database';

import 'intl-pluralrules';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './app/App';

database().setPersistenceEnabled(true);

AppRegistry.registerComponent(appName, () => App);
