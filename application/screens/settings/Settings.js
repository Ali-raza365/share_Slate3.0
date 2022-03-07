import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Switch
} from 'react-native';

// Redux
import { useSelector, useDispatch } from 'react-redux';

import Modal from 'react-native-modal';
import TouchID from 'react-native-touch-id';
import { COLORS, FONT, HP, RADIUS, SPACING_PERCENT, TEXT_SIZES, TOUCH_ID_CONFIG, TOUCH_ID_SUPPORT_CONFIG, WP } from '../../theme/config';
import { AppBar, Button, Loader, PasswordInput } from '../../components';
import { _getItem, _setItem } from '../../utils/async';
import axios from 'axios';
import { CHANGE_PASSWORD_API } from '../../api/apis';

const Settings = () => {

    const token = useSelector(state => state.user.token);

    const [isEnabled, setIsEnabled] = useState(false);
    
    const [showCurrPass, setShowCurrPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordModal, setPasswordModal] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);

    // Toggle Current password
    const _toggleCurrentPassword = () => {
        if(showCurrPass)
            setShowCurrPass(false);
        else
            setShowCurrPass(true);
    }

    // Toggle New password
    const _toggleNewPassword = () => {
        if(showNewPass)
            setShowNewPass(false);
        else
            setShowNewPass(true);
    }

    // Toggle Password modal
    const _togglePasswordModal = () => {
        if(passwordModal)
            setPasswordModal(false);
        else
            setPasswordModal(true);
    }

    // Toggle Finger Print Switch
    const _toggleFingerPrintSwitch = async () => {
        if(isEnabled){
            await _setItem('suptouchid','0')
            .then(()=>{
                setIsEnabled(false);
            })
            .catch(error => {
                alert("Something is going wrong while saving touch ID value");
            });
        }
        else{
            TouchID.isSupported(TOUCH_ID_SUPPORT_CONFIG)
            .then((biometryType)=>{
                TouchID.authenticate('Use your finger print to login quickly and securely ', TOUCH_ID_CONFIG)
                .then(async(success) => {
                    await _setItem('suptouchid','1')
                    .then(()=>{
                        setIsEnabled(true);
                    })
                    .catch(error => {
                        alert("Something is going wrong while saving touch ID value");
                    });
                })
                .catch(error => {
                    if(PLATFORM === 'ios'){
                        if(error.name == 'LAErrorUserCancel')
                            console.log('User cancel the process');
                        else{
                            alert("Touch ID is not supported or enrolled till yet");
                        }
                    }
                    else{
                        if(error.code == 'AUTHENTICATION_CANCELED')
                            console.log('User cancel the process');
                        else{
                            alert("Touch ID is not supported or enrolled till yet");
                        }
                    }
                });
            })
            .catch((err)=>{
                alert("Touch ID is not supported or enrolled till yet");
            });
        }
    }

    // Checking finger print current state
    const _checkFingerprintCurrentValue = async () => {
        await _getItem('suptouchid')
        .then((value)=>{
            if(value == '1')
                setIsEnabled(true);
            else
                setIsEnabled(false);
        })
        .catch((err)=>{
            alert(err);
        })
    }

    const _onSavePassword = () => {
        if(currentPassword.trim().length == 0)
            alert("Current Password is required");
        else if(currentPassword.trim().length < 6)
            alert("Current Password should contain at least 6 characters");
        else if(newPassword.trim().length == 0)
            alert("New Password is required");
        else if(currentPassword.trim().length < 6)
            alert("New Password should contain at least 6 characters");
        else{
            setPasswordLoading(true);

            let data = {
                oldPassword: currentPassword.trim(),
                newPassword: newPassword.trim()
            };

            axios({
                method: "PUT",
                url: CHANGE_PASSWORD_API,
                data: data,
                headers:{
                    cooljwt: token,
                }
            })
            .then(()=>{
                setPasswordLoading(false);
                setCurrentPassword('');
                setNewPassword('');
                _togglePasswordModal();
                setTimeout(() => {
                    alert("Password has been changed");
                }, 100);
            })
            .catch((err)=>{
                setPasswordLoading(false);
                setTimeout(() => {
                    if (err.response) {
                        if(err.response.status == 413)
                            alert('Attachment size should be less than 1MB');
                        else
                            alert('Something is going wrong while changing password. Please try again');
                    } 
                    else if (err.request) {
                        alert('Server is not responding. Please try again');
                    } 
                    else {
                        alert(err);
                    }
                    console.log(err);
                }, 100);
            });
        }
    }

    useEffect(()=>{
        _checkFingerprintCurrentValue();
    },[])

    return(
        <View style={Styles._mainContainer}>
            <AppBar 
                type='light'
                backgroundColor={COLORS.primaryColor2}
            />

            {/* Password Change Modal */}
            <Modal
                onBackButtonPress={_togglePasswordModal}
                onBackdropPress={_togglePasswordModal}
                isVisible={passwordModal}
            >
                {/* Loadder */}
                <Loader 
                    isVisible={passwordLoading}
                    label={'Changing password...'}
                />
                <View style={Styles._modalMainView}>
                    <View style={Styles._modalHeadingView}>
                        <Text style={Styles._modalHeading}>Change Password</Text>
                    </View>
                    <View style={Styles._modalInputView}>
                        <PasswordInput 
                            placeholder='Current Password'
                            onIconPress={()=>{ _toggleCurrentPassword() }}
                            viewPass={showCurrPass}
                            value={currentPassword}
                            onChangeText={(text)=>{ setCurrentPassword(text) }}
                        />
                        <PasswordInput 
                            placeholder='New Password'
                            onIconPress={()=>{ _toggleNewPassword() }}
                            viewPass={showNewPass}
                            value={newPassword}
                            onChangeText={(text)=>{ setNewPassword(text) }}
                            style={{ marginTop: HP(SPACING_PERCENT/2) }}
                        />
                    </View>
                    <Button 
                        onPress={_onSavePassword}
                        title='Submit'
                        titleColor={COLORS.whiteColor}
                        backgroundColor={COLORS.primaryColor}
                    />
                    <Button 
                        onPress={_togglePasswordModal}
                        title='Close'
                        titleColor={COLORS.grey}
                        style={{ marginTop: HP(SPACING_PERCENT/5) }}
                    />
                </View>
            </Modal>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Styles._scrollContainer}
            >

                <View style={Styles._row}>
                    <Text style={Styles._label}>Fingerprint Login</Text>
                    <Switch
                        trackColor={{ false: COLORS.lightGrey, true: COLORS.primaryColor }}
                        thumbColor={isEnabled ? COLORS.primaryColor2 : "#f4f3f4"}
                        ios_backgroundColor={COLORS.lightGrey}
                        onValueChange={_toggleFingerPrintSwitch}
                        value={isEnabled}
                    />
                </View>

                <Button 
                    onPress={_togglePasswordModal}
                    title='Change Password'
                    titleColor={COLORS.whiteColor}
                    backgroundColor={COLORS.primaryColor}
                    style={{ marginTop: HP(SPACING_PERCENT/2) }}
                />

            </ScrollView>
        </View> 
    );
}

const Styles = StyleSheet.create({
    _mainContainer:{
        flex: 1,
    },
    _scrollContainer:{
        padding: WP(SPACING_PERCENT)
    },
    _row:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    _label:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
    },
    _modalMainView:{
        backgroundColor: COLORS.whiteColor,
        borderRadius: WP(RADIUS),
        padding: WP(SPACING_PERCENT),
    },
    _modalHeadingView:{
        alignItems: 'center',
        borderBottomColor: COLORS.borderColor,
        borderBottomWidth: 1,
        paddingBottom: HP(SPACING_PERCENT/5),
    },
    _modalHeading:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
    },
    _modalInputView:{
        marginVertical: HP(SPACING_PERCENT/2),
    },
});

export default Settings;