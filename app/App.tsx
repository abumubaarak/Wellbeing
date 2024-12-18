import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Q} from '@nozbe/watermelondb';
import {useNetInfo} from '@react-native-community/netinfo';

import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import React, {useEffect} from 'react';
import {LogBox, StatusBar} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableFreeze} from 'react-native-screens';
import {
  addChannel,
  channelCollection,
  offlineMessages,
  sendMessage,
  updateAllDeliveryStatus,
  updateDeliveryStatus,
} from './db/helper';

import {useFirestore, useUser} from './hooks';
import './i18n';
import {AppStack} from './navigators/AppStack';
import socket from './services/socket';
import {colors, theme} from './theme';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
function App(): React.JSX.Element {
  enableFreeze(true);

  const {uid: UID} = useUser();
  const {getUser} = useFirestore();
  const {isConnected} = useNetInfo();
  const navigationRef = createNavigationContainerRef<any>();

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, []);
  //const navigation = useNavigation<StackNavigation>();

  useEffect(() => {
    if (isConnected && !socket.connected) {
      socket.connect();
      socket.emit('join', UID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  useEffect(() => {
    async function onConnect() {
      const messages = await offlineMessages();

      messages.map(item => {
        socket.emit(
          'message',
          {
            doctor: item.doctor,
            messageID: item.id,
            message: item.message,
            patient: UID,
            sender: UID,
            deliveryStatus: 'sent',
          },
          async (response: any) => {
            const {deliveryStatus, messageID} = response;
            await updateDeliveryStatus(deliveryStatus, messageID);
          },
        );
      });

      socket.emit(
        'sync',
        {
          uid: UID,
          role: 'patient',
        },
        async () => {},
      );
    }

    function onDisconnect() {}

    async function receiveMessage(data: any, callback) {
      const {doctor, message, sender, patient} = data;

      const findChannel = await channelCollection.query(
        Q.where('doctor', doctor),
      ).count;

      if (findChannel === 0) {
        await getUser(doctor).then(async user => {
          const addChannelDetails = await addChannel({
            channelName: user?.fullName,
            channelSelfie: user?.selfie,
            deliveryStatus: 'delivered',
            doctor,
            lastMessage: message,
            patient,
            sender,
          });
          if (addChannelDetails) {
            callback({
              deliveryStatus: 'delivered',
            });
          }
        });
      } else {
        const sendMsg = await sendMessage({
          deliveryStatus: 'delivered',
          doctor,
          message,
          patient,
          sender,
        });

        if (sendMsg) {
          callback({
            deliveryStatus: 'delivered',
          });
        }
      }
    }

    async function updateStatus(response: any) {
      const {deliveryStatus: status, patient, messageID, type} = response;
      if (type === 'single') {
        await updateDeliveryStatus(status, messageID);
      } else {
        await updateAllDeliveryStatus('read', patient, 'sender');
      }
    }

    const handleIncomingCallOffer = async (data: any, callback: any) => {
      const {offer, doctor, offerType} = data;

      if (navigationRef.isReady()) {
        navigationRef.navigate('VideoCall', {
          incomingCall: true,
          doctorName: doctor.name,
          doctorID: doctor.id,
          type: offerType,
          offer,
          specialty: doctor.specialty,
          avatar: doctor.avatar,
        });
      }

      callback({
        callStatus: 'Ringing',
      });
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receive', receiveMessage);
    socket.on('read', updateStatus);
    socket.emit('join', UID);
    socket.on('incomingCallOffer', handleIncomingCallOffer);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receive', receiveMessage);
      socket.off('read', updateStatus);
      socket.off('incomingCallOffer', handleIncomingCallOffer);

      socket.emit('left', UID);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView>
        <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />

        <StatusBar />
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <BottomSheetModalProvider>
              <AppStack />
            </BottomSheetModalProvider>
          </NavigationContainer>
          {/* <AppNavigator ref={navigationRef} /> */}
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

export default App;
