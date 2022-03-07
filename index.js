/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { Store } from './application/redux/Store';
// import { SET_BACKGROUND_NOTIFICATION } from './application/redux/reducers/notification/notification_types';
console.disableYellowBox = true;

// Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('BACKGROUND HANDLER', remoteMessage);
// });

// messaging().onNotificationOpenedApp((remoteNotification)=>{
//     Store.dispatch({
//         type: SET_BACKGROUND_NOTIFICATION,
//         notification: remoteNotification
//     });
//     console.log('ON NOTIFICATION HANDLER');
// });

// messaging().getInitialNotification().then((remoteNotification)=>{
//     Store.dispatch({
//         type: SET_BACKGROUND_NOTIFICATION,
//         notification: remoteNotification
//     });
//     console.log('INITIAL HANDLER');
// })
// .catch((err)=>{
//     alert(err);
// })


AppRegistry.registerComponent(appName, () => App);
