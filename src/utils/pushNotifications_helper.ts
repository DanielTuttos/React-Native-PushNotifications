import messaging from '@react-native-firebase/messaging';
import app, { ReactNativeFirebase } from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import notifee from '@notifee/react-native';

export const requestUserPermission = async () => {
  // messaging.NotificationAndroidVisibility;
  // messaging.NotificationAndroidPriority.PRIORITY_HIGH;
  // app.messaging().onTokenRefresh(newToken => console.log(newToken));
  // ReactNativeFirebase.FirebaseModule
  console.log('asdasd', messaging.AuthorizationStatus);
  const authStatus = await messaging().requestPermission();
  await notifee.requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
};

const getFCMToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('obteniendo token de storage ', fcmToken);
  if (!fcmToken) {
    try {
      let fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        await AsyncStorage.setItem('fcmToken', fcmtoken);
      } else {
      }
    } catch (error) {
      console.log('error: ', { error });
    }
  } else {
    await AsyncStorage.setItem('fcmToken', '');
  }
};

export const NotificationListener = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
    });
    // navigation.navigate(remoteMessage.data.type);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      //   setLoading(false);
    });

  messaging().onMessage(async remoteMessage => {
    console.log('notification on froground state....', remoteMessage);
    // Alert.alert('algo llego perro: ', JSON.stringify(remoteMessage, null, 4));
    // onDisplayNotification();
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
    });
  });
};

async function onDisplayNotification() {
  // Request permissions (required for iOS)
  // Create a channel (required for Android)
  // const channelId = await notifee.createChannel({
  //   id: 'default',
  //   name: 'Default Channel',
  // });
  // Display a notification
}
