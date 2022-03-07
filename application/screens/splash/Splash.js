import React, { useEffect } from 'react';
import {
    StyleSheet,
    ImageBackground,
} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
//Redux
import { useDispatch } from 'react-redux';


import { AppBar, Spinner } from '../../components';
import { COLORS, IMAGES, SPACING_PERCENT, WP, HP, PLATFORM } from '../../theme/config';
import { _getItem } from '../../utils/async';
import { _gotoAuthStack, _gotoOnboard } from '../../navigation/NavigationService';


const Splash = ({ navigation }) => {

    const dispatch = useDispatch();

    //Effect that will take user to next screen
    useEffect(() => {
        // console.log("aafdfaf")
        _gotoAuthStack(navigation);
        // setTimeout(async () => {
        //     await _getItem('logout')
        //         .then(async (value) => {
        //             if (value == '0') {
        //                 await _getItem('type')
        //                     .then(async (userType) => {
        //                         if (userType == 'ap') {
        //                             await _getItem('aptoken')
        //                                 .then(async (aptoken) => {
        //                                     //Requesting Permission
        //                                     if (PLATFORM === 'ios') {
        //                                         const authStatus = await messaging().requestPermission();
        //                                         const enabled =
        //                                             authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        //                                             authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        //                                         if (enabled) {
        //                                             const fcmToken = await messaging().getToken();
        //                                             const macAddress = await DeviceInfo.getMacAddress();

        //                                             let fcmDetails = {
        //                                                 osType: PLATFORM,
        //                                                 fcmToken: fcmToken,
        //                                                 deviceId: macAddress,
        //                                             };

        //                                             // dispatch(_onAPAuthStateChange(aptoken, fcmDetails, navigation));
        //                                         }
        //                                     }
        //                                     else {
        //                                         const fcmToken = await messaging().getToken();
        //                                         const macAddress = await DeviceInfo.getMacAddress();

        //                                         let fcmDetails = {
        //                                             osType: PLATFORM,
        //                                             fcmToken: fcmToken,
        //                                             deviceId: macAddress,
        //                                         }

        //                                         // dispatch(_onAPAuthStateChange(aptoken, fcmDetails, navigation));
        //                                     }
        //                                 })
        //                                 .catch((err) => {
        //                                     alert(err);
        //                                 })
        //                         }
        //                         else {
        //                             await _getItem('supemail')
        //                                 .then(async (userEmail) => {
        //                                     await _getItem('suppassword')
        //                                         .then(async (userPassword) => {
        //                                             await _getItem('token')
        //                                                 .then(async (value) => {
        //                                                     if (userEmail && userEmail != undefined && userEmail != null) {

        //                                                         //Requesting Permission
        //                                                         if (PLATFORM === 'ios') {
        //                                                             const authStatus = await messaging().requestPermission();
        //                                                             const enabled =
        //                                                                 authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        //                                                                 authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        //                                                             if (enabled) {
        //                                                                 const token = await messaging().getToken();
        //                                                                 const macAddress = await DeviceInfo.getMacAddress();

        //                                                                 let fcmDetails = {
        //                                                                     osType: PLATFORM,
        //                                                                     fcmToken: token,
        //                                                                     deviceId: macAddress,
        //                                                                 };

        //                                                                 let details = {
        //                                                                     email: userEmail,
        //                                                                     password: userPassword,
        //                                                                 };

        //                                                                 dispatch(_doingLogin(details, fcmDetails, navigation));

        //                                                             }
        //                                                         }
        //                                                         else {
        //                                                             const token = await messaging().getToken();
        //                                                             const macAddress = await DeviceInfo.getMacAddress();

        //                                                             let fcmDetails = {
        //                                                                 osType: PLATFORM,
        //                                                                 fcmToken: token,
        //                                                                 deviceId: macAddress,
        //                                                             }

        //                                                             let details = {
        //                                                                 email: userEmail,
        //                                                                 password: userPassword,
        //                                                             };

        //                                                             dispatch(_doingLogin(details, fcmDetails, navigation));
        //                                                         }
        //                                                     }
        //                                                     else {
        //                                                         await _getItem('onboard')
        //                                                             .then((value) => {
        //                                                                 if (value == '1')
        //                                                                     _gotoAuthStack(navigation);
        //                                                                 else {
        //                                                                     _gotoOnboard(navigation);
        //                                                                 }
        //                                                             })
        //                                                             .catch((err) => {
        //                                                                 alert(err);
        //                                                             });
        //                                                     }
        //                                                 })
        //                                                 .catch((err) => {
        //                                                     alert(err);
        //                                                 })
        //                                         })
        //                                         .catch((err) => {
        //                                             alert(err);
        //                                         })
        //                                 })
        //                                 .catch((err) => {
        //                                     alert(err);
        //                                 });
        //                         }
        //                     })
        //                     .catch((err) => {
        //                         alert(err);
        //                     })
        //             }
        //             else {
        //                 await _getItem('onboard')
        //                     .then((value) => {
        //                         if (value == '1')
        //                             _gotoAuthStack(navigation);
        //                         else {
        //                             _gotoOnboard(navigation);
        //                         }
        //                     })
        //                     .catch((err) => {
        //                         alert(err);
        //                     });
        //             }
        //         })
        //         .catch((err) => {
        //             alert(err);
        //         });

        // }, 2000);
    }, []);

    return (
        <ImageBackground
            source={IMAGES._splashBg}
            style={Styles._mainContainer}
        >
            <AppBar
                type='light'
                backgroundColor={COLORS.primaryColor2}
            />
            <Spinner
                color={COLORS.whiteColor}
                style={Styles._spinner}
            />
        </ImageBackground>
    );
}

const Styles = StyleSheet.create({
    _mainContainer: {
        width: WP('100%'),
        height: HP('100%'),
        resizeMode: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
    _spinner: {
        position: 'absolute',
        bottom: HP(SPACING_PERCENT),
    },
});

export default Splash;