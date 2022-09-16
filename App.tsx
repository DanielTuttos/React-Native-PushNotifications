/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';

import {
  requestUserPermission,
  NotificationListener,
} from './src/utils/pushNotifications_helper';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    NotificationListener();
    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );

      // navigation.navigate(remoteMessage.data.type);
    });
  }, []);

  return (
    <SafeAreaView>
      <Text>hello</Text>
    </SafeAreaView>
  );
};
export default App;
