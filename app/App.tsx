import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Q } from '@nozbe/watermelondb';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableFreeze } from 'react-native-screens';
import {
  addChannel,
  channelCollection,
  sendMessage,
  updateAllDeliveryStatus,
  updateDeliveryStatus,
} from './db/helper';
import { useFirestore, useUser } from './hooks';
import './i18n';
import { AppStack } from './navigators/AppStack';
import socket from './services/socket';
import { colors, theme } from './theme';

function App(): React.JSX.Element {
  enableFreeze(true);
  const {uid: UID} = useUser();
  const {getUser} = useFirestore();
  const navigationRef = createNavigationContainerRef<any>();

  //const navigation = useNavigation<StackNavigation>();
  useEffect(() => {
    (async () => {})().finally(async () => {
      await BootSplash.hide();
    });
  }, []);

  useEffect(() => {
    async function onConnect() {
      //fetch pending messages
      //emit them all
      //update delivery time
    }

    function onDisconnect() {
      console.log('Disconnected');
    }

    //Later on the status will be moved to messages screen. New Status by then will be ==>>> [pending,sent,delivered, read]
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
          }).catch(e => console.log(e));
          if (addChannelDetails) {
            callback({
              deliveryStatus: 'delivered',
            });
          }
        });
        //console.log(findChannel);
      } else {
        //received message is automatically read
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
      const {deliveryStatus: status, doctor, messageID, type} = response;
      //emit delivered if successful
      if (type === 'single') {
        await updateDeliveryStatus(status, messageID);
      } else {
        await updateAllDeliveryStatus(status, doctor);
      }
    }

    const handleIncomingCallOffer = async (data, callback) => {
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
