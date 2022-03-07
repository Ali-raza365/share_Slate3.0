import React, { useState, useEffect } from 'react';
import { CommonActions } from "@react-navigation/native";
import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    Pressable,
} from 'react-native';

import TouchID from 'react-native-touch-id';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    _doingLogin,
    _onEmailTextChange,
    _onPasswordTextChange
} from '../../redux/reducers/user/user_actions';

import {
    AppBar,
    PasswordInput,
    SimpleInput,
    Loader,
    SwipeableButton
} from '../../components';

import {
    _gotoSignup,
    _gotoForgetPassword,
    _gotoHomeNavigator
} from '../../navigation/NavigationService';
import {
    COLORS,
    FONT,
    HP,
    IMAGES,
    MESSAGES,
    PLATFORM,
    RADIUS,
    SPACING_PERCENT,
    TEXT_SIZES,
    TOUCH_ID_CONFIG,
    TOUCH_ID_SUPPORT_CONFIG,
    WP
} from '../../theme/config';
import { _getItem, _setItem } from '../../utils/async';

const Login = ({ navigation }) => {

    const [viewPass, setViewPass] = useState(false);
    const dispatch = useDispatch();
    const [pendingSignup, setPendingSignup] = useState(false);
    const [pendingScreen, setPendingScreen] = useState('');

    const email = useSelector(state => state.user.login_email);
    const password = useSelector(state => state.user.login_password);
    const loading = useSelector(state => state.user.login_loading);

    //Toggle Password
    const _togglePassword = () => {
        if (viewPass)
            setViewPass(false);
        else
            setViewPass(true);
    }

    //On Login Button Click
    const _onLoginButtonClick = async () => {
        if (email.trim().length == 0)
            alert(MESSAGES.EMPTY_EMAIL);
        else if (email.trim().includes("@") == false || email.trim().includes(".") == false)
            alert(MESSAGES.INVALID_EMAIL);
        else if (password.trim().length == 0)
            alert(MESSAGES.EMPTY_PASSWORD);
        // else if(password.trim().length < 4)
        //     alert(MESSAGES.PASSWORD_VALIDATION);
        else {
            //Requesting Permission
            if (PLATFORM === 'ios') {
                const authStatus = await messaging().requestPermission();
                const enabled =
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
                if (enabled) {

                    const token = await messaging().getToken();
                    const macAddress = await DeviceInfo.getMacAddress();

                    let details = {
                        email: email.trim().toLowerCase(),
                        password: password.trim(),
                    };

                    let fcmDetails = {
                        osType: PLATFORM,
                        fcmToken: token,
                        deviceId: macAddress,
                    }
                    //console.log(fcmDetails);           
                    dispatch(_doingLogin(details, fcmDetails, navigation));
                }
            }
            else {
                const token = await messaging().getToken();
                const macAddress = await DeviceInfo.getMacAddress();

                let details = {
                    email: email.trim().toLowerCase(),
                    password: password.trim(),
                };

                let fcmDetails = {
                    osType: PLATFORM,
                    fcmToken: token,
                    deviceId: macAddress,
                }
                //console.log(fcmDetails); 
                dispatch(_doingLogin(details, fcmDetails, navigation));
            }
        }
    }

    //Check Pending Signup
    const _checkPendingSignup = async () => {
        await _getItem('signup_activation')
            .then(async (activation) => {
                if (activation == '0') {
                    setPendingSignup(true);
                    await _getItem('signup_screen')
                        .then((screen) => {
                            setPendingScreen(screen);
                        })
                        .catch((err) => {
                            alert(err);
                        })
                }
            })
            .catch((err) => {
                alert(err);
            })
    }

    //On Pending Request Click
    const _onPendingClick = () => {
        navigation.dispatch({
            ...CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: "signup",
                        state: {
                            routes: [
                                {
                                    name: pendingScreen,
                                }
                            ]
                        }
                    }
                ]
            })
        });
    }

    // On finger print click
    const _onFingerPrintClick = async () => {

        await _getItem('suptouchid')
            .then((value) => {
                if (value == '1') {
                    TouchID.isSupported(TOUCH_ID_SUPPORT_CONFIG)
                        .then((biometryType) => {
                            TouchID.authenticate('Use your finger print to login quickly and securely ', TOUCH_ID_CONFIG)
                                .then(async (success) => {
                                    await _getItem('supemail')
                                        .then(async (userEmail) => {
                                            await _getItem('suppassword')
                                                .then(async (userPassword) => {
                                                    if (userEmail && userEmail != undefined && userEmail != null) {
                                                        //Requesting Permission
                                                        if (PLATFORM === 'ios') {
                                                            const authStatus = await messaging().requestPermission();
                                                            const enabled =
                                                                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                                                                authStatus === messaging.AuthorizationStatus.PROVISIONAL;
                                                            if (enabled) {

                                                                const token = await messaging().getToken();
                                                                const macAddress = await DeviceInfo.getMacAddress();

                                                                let details = {
                                                                    email: userEmail,
                                                                    password: userPassword,
                                                                };

                                                                let fcmDetails = {
                                                                    osType: PLATFORM,
                                                                    fcmToken: token,
                                                                    deviceId: macAddress,
                                                                }
                                                                //console.log(fcmDetails);           
                                                                dispatch(_doingLogin(details, fcmDetails, navigation));
                                                            }
                                                        }
                                                        else {
                                                            const token = await messaging().getToken();
                                                            const macAddress = await DeviceInfo.getMacAddress();

                                                            let details = {
                                                                email: userEmail,
                                                                password: userPassword,
                                                            };

                                                            let fcmDetails = {
                                                                osType: PLATFORM,
                                                                fcmToken: token,
                                                                deviceId: macAddress,
                                                            }
                                                            //console.log(fcmDetails); 
                                                            dispatch(_doingLogin(details, fcmDetails, navigation));
                                                        }
                                                    }
                                                    else {
                                                        alert("Something is going wrong in your mobile cache. Please clear it and then try");
                                                    }
                                                })
                                                .catch((err) => {
                                                    alert(err);
                                                })
                                        })
                                        .catch((err) => {
                                            alert(err);
                                        })
                                })
                                .catch(error => {
                                    if (PLATFORM === 'ios') {
                                        if (error.name == 'LAErrorUserCancel')
                                            console.log('User cancel the process');
                                        else {
                                            alert("Touch ID is not supported or enrolled till yet");
                                        }
                                    }
                                    else {
                                        if (error.code == 'AUTHENTICATION_CANCELED')
                                            console.log('User cancel the process');
                                        else {
                                            alert("Touch ID is not supported or enrolled till yet");
                                        }
                                    }
                                });
                        })
                        .catch((err) => {
                            alert("Touch ID is not supported or enrolled till yet");
                            // if(PLATFORM === 'ios'){
                            //     if(err.name == 'LAErrorAuthenticationFailed')
                            //         alert("Authentication is Failed");
                            //     else if(err.name == 'LAErrorUserCancel')
                            //         alert('User cancelled the operation');
                            //     else if(err.name == 'LAErrorUserFallback')
                            //         alert('Authentication is required');
                            //     else if(err.name == 'LAErrorSystemCancel')
                            //         alert('Authentication is required');
                            //     else if(err.name == 'LAErrorPasscodeNotSet')
                            //         alert('Authentication is required');
                            //     else if(err.name == 'LAErrorTouchIDNotAvailable')
                            //         alert('Authentication is required');
                            //     else if(err.name == 'LAErrorTouchIDNotEnrolled')
                            //         alert('Authentication is required');
                            //     else if(err.name == 'RCTTouchIDUnknownError')
                            //         alert('Authentication is required');
                            //     else if(err.name == 'RCTTouchIDNotSupported')
                            //         alert('Authentication is required');
                            //     else
                            //         alert(err);
                            // }
                            // else{
                            //     if(err.code == 'NOT_SUPPORTED')
                            //         alert("Touch ID is not supported");
                            //     else if(err.name == 'NOT_AVAILABLE')
                            //         alert('Touch ID is not available');
                            //     else if(err.name == 'NOT_PRESENT')
                            //         alert('Touch ID is not present');
                            //     else if(err.name == 'NOT_ENROLLED')
                            //         alert('Touch ID is not enrolled');
                            //     else
                            //         alert(err);
                            // }
                        });
                }
                else {
                    alert("Please login through Email and then enable it from settings to use it");
                }
            })
            .catch((err) => {
                alert("Something is going wrong while getting touchID current value");
            })


    }

    // Get User Email from Cache
    const _checkPreviousEmail = async () => {
        await _getItem('supemail')
            .then((userEmail) => {
                if (userEmail)
                    dispatch(_onEmailTextChange(userEmail));
            })
            .catch((err) => {
                alert(err);
            })
    }

    useEffect(() => {
        _checkPreviousEmail();
        const sub = _checkPendingSignup();
        return () => sub;
    }, [])

    return (
        <View style={Styles._mainContainer}>

            <AppBar
                type='dark'
                backgroundColor={COLORS.whiteColor}
            />

            <Loader
                label='Logging In...'
                isVisible={loading}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: WP(SPACING_PERCENT),
                    paddingBottom: WP('10%')
                }}
            >

                {/* <Image source={IMAGES._original_logo} style={Styles._image} /> */}
                <View style={Styles._inputView}>
                    <SimpleInput
                        placeholder='Email'
                        value={email}
                        onChangeText={(text) => { dispatch(_onEmailTextChange(text)) }}
                    />
                    <PasswordInput
                        placeholder='Password'
                        onIconPress={() => { _togglePassword() }}
                        viewPass={viewPass}
                        style={{ marginTop: WP(SPACING_PERCENT / 2) }}
                        value={password}
                        onChangeText={(text) => { dispatch(_onPasswordTextChange(text)) }}
                    />
                    <Text onPress={() => { _gotoForgetPassword(navigation) }} style={Styles._forgotPass}>Forgot password?</Text>
                    <View style={Styles._btnView}>
                        <SwipeableButton
                            width={WP('65%')}
                            title='Slide to Login'
                            titleColor={COLORS.whiteColor}
                            backgroundColor={COLORS.primaryColor}
                            thumbColor={COLORS.primaryColor2}
                            onSwipeSuccess={() => { _gotoHomeNavigator(navigation) }}
                        // onSwipeSuccess={()=>{ _onLoginButtonClick() }}
                        />
                        <Pressable
                            onPress={_onFingerPrintClick}
                            style={Styles._touchImage}
                        >
                            <Image
                                source={IMAGES.touchId}
                            />
                        </Pressable>
                    </View>
                </View>

                {
                    pendingSignup ? (
                        <Text style={Styles._pendingText}>You have a pending signup request. <Text style={Styles._pendingMainText} onPress={() => { _onPendingClick() }}>Click here to complete</Text></Text>
                    ) : (
                        null
                    )
                }
                <Text onPress={() => { _gotoSignup(navigation) }} style={Styles._bottomText}>Don't have an account? <Text style={Styles._bottomMainText}>Sign Up</Text></Text>
            </ScrollView>
        </View>
    );
}

const Styles = StyleSheet.create({
    _mainContainer: {
        flex: 1,
    },
    _image: {
        width: WP('90%'),
        height: HP('25%'),
        resizeMode: 'contain',
    },
    _inputView: {
        width: WP('90%'),
        padding: WP(SPACING_PERCENT),
        backgroundColor: COLORS.whiteColor,
        shadowColor: COLORS.blackColor,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: WP(RADIUS),
        elevation: 10,
        borderRadius: WP(RADIUS),
        marginVertical: HP(SPACING_PERCENT),
    },
    _forgotPass: {
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_2),
        textDecorationLine: 'underline',
        color: COLORS.primaryColor,
        alignSelf: 'flex-end',
        marginTop: HP(SPACING_PERCENT / 5)
    },
    _btnView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: HP(SPACING_PERCENT / 2),
    },
    _touchImage: {
        position: 'absolute',
        right: 0,
    },
    _bottomText: {
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
        color: COLORS.blackColor,
        alignSelf: 'center',
        position: 'absolute',
        bottom: HP(SPACING_PERCENT * 2),
    },
    _bottomMainText: {
        color: COLORS.primaryColor,
        textDecorationLine: 'underline',
    },
    _pendingText: {
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_2),
        color: COLORS.blackColor,
    },
    _pendingMainText: {
        color: COLORS.primaryColor,
        textDecorationLine: 'underline',
    },
});

export default Login;