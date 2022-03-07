import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    RefreshControl,
    Image,
    Text,
    PermissionsAndroid,
    Pressable
} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import { useSelector, useDispatch } from 'react-redux';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {
    _onVendorNameChange,
    _onDisplayNameChange,
    _onLicenseNumberChange,
    _onCellNumberChange,
    _onVendorSiteChange,
    _onEmailChange,
    _onRemarksChange,
    _updateProfile,
    _checkUser,
    _onLogoSelect,
    _onLogoRemove,
    _onLogoChange,
    _doingLogin
} from '../../redux/reducers/user/user_actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ViewImageModal, AppBar, Button, LabelInput, Loader, PickerModal, TextArea } from '../../components';
import { COLORS, FONT, IMAGES, MESSAGES, PLATFORM, SCREEN_ICON_SIZE, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';
import { _getItem } from '../../utils/async';
import { BASE_URL } from '../../api/apis';

const Profile = ({navigation}) => {

    const [showPicker, setShowPicker] = useState(false);
    const [viewModal, setViewModal] = useState(false);

    const dispatch = useDispatch();
    const state = useSelector(state => state.user);
    const token = useSelector (state => state.user.token);
    const loading = useSelector (state => state.user.checkuser_loading);

    const _onUpdateClick = () => {
        if(state.vendor_name.trim().length == 0)
            alert("Vendor Name is required");
        else if(state.display_name.trim().length == 0)
            alert("Display Name is required");
        else if(state.license_number.trim().length == 0)
            alert("License Number is required");
        else if(state.cell_number.trim().length == 0)
            alert(MESSAGES.EMPTY_CELL_NUMBER);
        // else if(state.vendor_site.trim().length == 0)
        //     alert('Vendor Site is required');
        else {
            let details = {
                vendorName: state.vendor_name.trim(),
                licenseNumber: state.license_number.trim(),
                displayName: state.display_name.trim(),
                contactNumber: state.cell_number.trim(),
                vendorsite: '',
                reMarks: '',
            }

            console.log(details);
            //alert('API needs to be updated due to vendor site');
            dispatch(_updateProfile(details,state.user,token));
        }
    }

    //Toggle Picker
    const _togglePicker = () => {
        if(showPicker)
            setShowPicker(false);
        else
            setShowPicker(true);
    }

    //Toggle View Modal
    const _toggleViewModal = () => {
        if(viewModal)
            setViewModal(false);
        else
            setViewModal(true);
    }

    //On Gallery Click
    const _onGalleryClick = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5,
            includeBase64: true,
            maxWidth: 300,
            maxHeight: 300,
        },(response)=>{
            if(response.didCancel){
                console.log("User cancell the operation");
            }
            else if(response.errorCode){
                alert(response.errorMessage);
            }
            else{
                _togglePicker();
                setTimeout(() => {
                    if(response.type == 'image/png')
                        dispatch(_onLogoSelect(response,state.user,state.profile,token));
                    else
                        alert('Only .PNG Images are allowed');
                }, 500);
                
            }
        });
    }

    //On Camera Click
    const _onCameraClick = async () => {
        if(PLATFORM === 'android'){
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "Camera Permission",
                        message:
                            "InvoiceMate wants camera access so that you can easily capture invoice image",
                        buttonNegative: "Cancel",
                        buttonPositive: "Allow"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    launchCamera({
                        mediaType: 'photo',
                        quality: 0.5,
                        includeBase64: true,
                        maxWidth: 300,
                        maxHeight: 300,
                    },(response)=>{
                        if(response.didCancel){
                            console.log("User cancel the operation");
                        }
                        else if(response.errorCode){
                            alert('Camera is not available. Please check camera permission');
                        }
                        else{
                            _togglePicker();
                            setTimeout(() => {
                                if(response.type == 'image/png')
                                    dispatch(_onLogoSelect(response,state.user,state.profile,token));
                                else
                                    alert('Only .PNG Images are allowed');
                            }, 500);
                        }
                    });
                } 
                else {
                    console.log("Camera permission denied");
                }
            } 
            catch (err) {
                console.warn(err);
            }
        }
        else{
            launchCamera({
                mediaType: 'photo',
                quality: 0.5,
                includeBase64: true,
                maxWidth: 300,
                maxHeight: 300,
            },(response)=>{
                if(response.didCancel){
                    console.log("User cancel the operation");
                }
                else if(response.errorCode){
                    alert('Camera is not available. Please check camera permission');
                }
                else{
                    _togglePicker();
                    setTimeout(() => {
                        if(response.type == 'image/png')
                            dispatch(_onLogoSelect(response,state.user,state.profile,token));
                        else
                            alert('Only .PNG Images are allowed');
                    }, 500);
                }
            });
        }
        
    }

    const _removeLogo = () => {
        dispatch(_onLogoRemove(state.user,state.profile,token));
    }

    //Refreshing
    const _handleRefresh = async () => {

        await _getItem('supemail')
        .then(async(userEmail)=>{
            await _getItem('suppassword')
            .then(async(userPassword)=>{
                //Requesting Permission
                if(PLATFORM === 'ios'){
                    const authStatus = await messaging().requestPermission();
                    const enabled =
                        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
                    if (enabled) {
                        const token = await messaging().getToken();
                        const macAddress = await DeviceInfo.getMacAddress();

                        let fcmDetails = {
                            osType : PLATFORM,
                            fcmToken: token,
                            deviceId: macAddress,
                        };

                        let details = {
                            email: userEmail,
                            password: userPassword,
                        };

                        dispatch(_checkUser(details, fcmDetails, null));

                    }
                }
                else {
                    const token = await messaging().getToken();
                    const macAddress = await DeviceInfo.getMacAddress();

                    let fcmDetails = {
                        osType : PLATFORM,
                        fcmToken: token,
                        deviceId: macAddress,
                    } 

                    let details = {
                        email: userEmail,
                        password: userPassword,
                    };

                    dispatch(_checkUser(details, fcmDetails, null));
                }
            })
            .catch((err)=>{
                alert("Something is going wrong while refreshing");
            })
        })
        .catch((err)=>{
            alert("Something is going wrong while refreshing");
        })
    }

    useEffect(()=>{
        dispatch(_onLogoChange(state.profile.logoUrl ? {uri:state.profile.logoUrl} : null));
        dispatch(_onVendorNameChange(state.profile.vendorName));
        dispatch(_onDisplayNameChange(state.profile.displayName));
        dispatch(_onLicenseNumberChange(state.profile.licenseNumber));
        dispatch(_onCellNumberChange(state.profile.contactNumber));
        dispatch(_onEmailChange(state.profile.email));
        dispatch(_onRemarksChange(''));
    },[]);

    return(
        <View style={Styles._mainContainer}>
            <AppBar 
                type='light'
                backgroundColor={COLORS.primaryColor2}
            />
            
            <Loader 
                label='Updating Profile...'
                isVisible={state.update_profile_loading}
            />

            <Loader 
                label='Uploading Logo...'
                isVisible={state.logo_uploadloading}
            />
            <Loader 
                label='Removing Logo...'
                isVisible={state.logo_removeloading}
            />

            <ViewImageModal 
                image={state.logo ? state.logo.uri : null}
                isVisible={viewModal}
                onPress={_toggleViewModal}
            />

            <PickerModal
                isVisible={showPicker}
                onCloseClick={_togglePicker}
                onCameraClick={_onCameraClick}
                onGalleryClick={_onGalleryClick}
            />
            
            <ScrollView
                refreshControl={
                    <RefreshControl 
                        refreshing={loading}
                        onRefresh={_handleRefresh}
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Styles._scrollContainer}
            >

                <View style={Styles._imgContainer}>
                    {
                        state.logo != null ? (
                            <Pressable
                                onPress={_toggleViewModal}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: WP('15%'),
                                }}
                            >
                                <Image 
                                    source={{ uri: BASE_URL + state.logo.uri }}
                                    style={Styles._vendorLogo}
                                />
                            </Pressable>
                        ):(
                            <Icon 
                                name='user'
                                size={WP(SCREEN_ICON_SIZE*3)}
                                color={COLORS.grey}
                            />
                        ) 
                    }
                </View>

                <View style={Styles._imageBtnContainer}>
                    {
                        state.logo != null ? (
                            <>
                                <Text onPress={_togglePicker} style={Styles._updateLogo}>Update Logo</Text>
                                <Text onPress={_removeLogo} style={Styles._removeLogo}>Remove Logo</Text>
                            </>
                        ):(
                            <Text onPress={_togglePicker} style={Styles._uploadLogo}>Upload Logo</Text>
                        )
                    }
                </View>

                <LabelInput 
                    label='Vendor Name *'
                    placeholder='e.g John Doe'
                    value={state.vendor_name}
                    onChangeText={text => dispatch(_onVendorNameChange(text))}
                />
                <LabelInput 
                    label='Display Name *'
                    placeholder='e.g JD'
                    value={state.display_name}
                    onChangeText={text => dispatch(_onDisplayNameChange(text))}
                    containerStyle={{ marginTop: WP(SPACING_PERCENT/2) }}
                />
                <LabelInput 
                    label='License Number *'
                    placeholder='e.g ABC-1234'
                    value={state.license_number}
                    onChangeText={text => dispatch(_onLicenseNumberChange(text))}
                    containerStyle={{ marginTop: WP(SPACING_PERCENT/2) }}
                />
                <LabelInput 
                    label='Cell Number *'
                    placeholder='e.g 0092335123456'
                    value={state.cell_number}
                    onChangeText={text => dispatch(_onCellNumberChange(text))}
                    containerStyle={{ marginTop: WP(SPACING_PERCENT/2) }}
                />
                {/* <LabelInput 
                    label='Vendor Site *'
                    placeholder='e.g Street, City, Country'
                    value={state.vendor_site}
                    onChangeText={text => dispatch(_onVendorSiteChange(text))}
                    containerStyle={{ marginTop: WP(SPACING_PERCENT/2) }}
                /> */}
                <LabelInput 
                    editable={false}
                    label='Email/User ID *'
                    placeholder='e.g johndoe@gmail.com'
                    onChangeText={text => dispatch(_onEmailChange(text))}
                    value={state.email}
                    containerStyle={{ marginTop: WP(SPACING_PERCENT/2) }}
                />
                <TextArea 
                    editable={false}
                    label='Remarks'
                    placeholder='Remarks'
                    value={state.remarks}
                    onChangeText={text => dispatch(_onRemarksChange(text))}
                    containerStyle={{ marginTop: WP(SPACING_PERCENT/2) }}
                />
                <Button 
                    onPress={()=>{ _onUpdateClick() }}
                    title='Update Profile'
                    titleColor={COLORS.whiteColor}
                    backgroundColor={COLORS.primaryColor}
                    style={{ marginTop: WP(SPACING_PERCENT) }}
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
        paddingHorizontal: WP(SPACING_PERCENT),
        paddingTop: WP(SPACING_PERCENT),
    },
    _imgContainer:{
        width: WP('30%'),
        height: WP('30%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: WP('15%'),
        alignSelf: 'center',
        padding: WP(SPACING_PERCENT/5),
        borderWidth: 1,
        borderColor: COLORS.primaryColor,
        marginBottom: WP(SPACING_PERCENT/2)
    },
    _vendorLogo:{
        width: '100%',
        height: '100%',
        borderRadius: WP('15%'),
    },
    _imageBtnContainer:{
        alignItems: 'center',
    },
    _uploadLogo:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_2),
        textDecorationLine: 'underline',
        marginBottom: WP(SPACING_PERCENT)
    },
    _updateLogo:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_2),
        textDecorationLine: 'underline',
        marginBottom: WP(SPACING_PERCENT/5)
    },
    _removeLogo:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_2),
        textDecorationLine: 'underline',
        color: COLORS.redColor,
        marginBottom: WP(SPACING_PERCENT)
    },
});

export default Profile;