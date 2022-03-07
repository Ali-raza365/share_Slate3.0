import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    _checkUser,
    _removeDoc
} from '../../redux/reducers/user/user_actions';

import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import { AppBar, Loader } from '../../components';
import { _gotoAddAttachment, _gotoViewAttachment } from '../../navigation/NavigationService';
import { COLORS, FONT, IMAGES, PLATFORM, RADIUS, SCREEN_ICON_SIZE, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';
import { BASE_URL } from '../../api/apis';
import { _getItem } from '../../utils/async';

const Attachments = ({navigation}) => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.user);
    const token = useSelector (state => state.user.token);
    const loading = useSelector (state => state.user.checkuser_loading);

    //On Remove Doc Click
    const _onRemoveClick = (doc) => {
        let details = {
            _id: doc._id
        };
        dispatch(_removeDoc(details, state.user, state.token));
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

    return(
        <View style={Styles._mainContainer}>
            <AppBar 
                type='light'
                backgroundColor={COLORS.primaryColor2}
            />
            {/* Loaders */}
            <Loader 
                isVisible={state.removedoc_loading}
                label='Removing Document...'
            />
            
            {
                state.docs.length ? (
                    <FlatList 
                        refreshing={loading}
                        onRefresh={_handleRefresh}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={Styles._scrollContainer}
                        data={state.docs}
                        keyExtractor={item => item.id}
                        renderItem={({item, index})=>{
                            return(
                                <TouchableOpacity 
                                    onPress={()=>{
                                        _gotoAddAttachment(navigation, item)
                                    }}
                                    style={Styles._itemContainer}
                                >
                                    <Text style={Styles._title}>{item.attachmentTitle}</Text>
                                    <Text style={Styles._description}>{item.description}</Text>
                                    <View style={Styles._iconView}>
                                        <Icon 
                                            onPress={()=>{ _onRemoveClick(item) }}
                                            name='trash'
                                            size={WP(SCREEN_ICON_SIZE)}
                                            color={COLORS.primaryColor}
                                        />
                                        <Icon 
                                            onPress={()=>{ _gotoViewAttachment(navigation, item.eAttachmentURL) }}
                                            name='eye'
                                            size={WP(SCREEN_ICON_SIZE)}
                                            color={COLORS.primaryColor}
                                        />
                                    </View>
                                    
                                </TouchableOpacity>
                            );
                        }}
                    />
                ):(
                    <FlatList 
                        showsVerticalScrollIndicator={false}
                        refreshing={loading}
                        onRefresh={_handleRefresh}
                        contentContainerStyle={{
                            flex: 1,
                            padding: WP(SPACING_PERCENT),
                            alignItems: 'center', 
                            justifyContent: 'center', 
                        }}
                        data={[{
                            key: '0'
                        }]}
                        renderItem={({item, index})=>{
                            return(
                                <View 
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Image 
                                        source={IMAGES._no_record}
                                        style={{
                                            width: WP('90%'),
                                            height: WP('50%'),
                                            resizeMode: 'contain',
                                            zIndex: 0,
                                        }}
                                    />
                                    <Text style={{ 
                                            fontFamily: FONT, 
                                            fontSize: WP(TEXT_SIZES.info_1), 
                                            color: COLORS.blackColor,
                                            marginTop: WP(SPACING_PERCENT)
                                        }}
                                    >
                                        No records found!
                                    </Text>
                                    
                                </View>
                            );
                        }}
                    />
                )
            }
            

            <ActionButton 
                onPress={()=>{ _gotoAddAttachment(navigation, null) }}
                buttonColor={COLORS.primaryColor2}
            />
        </View>
    );
}

const Styles = StyleSheet.create({
    _mainContainer: {
        flex: 1,
    },
    _scrollContainer:{
        padding: WP(SPACING_PERCENT),
        paddingBottom: 150,
    },
    _itemContainer:{
        width: '100%',
        borderRadius: WP(RADIUS),
        backgroundColor: COLORS.whiteColor,
        shadowColor: COLORS.blackColor,
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: WP(RADIUS),
        elevation: 10,
        padding: WP(SPACING_PERCENT),
        marginBottom: WP(SPACING_PERCENT/2)
    },
    _title:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.h3),
        color: COLORS.blackColor,
    },
    _description:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
        color: COLORS.blackColor,
    },
    _iconView:{
        alignSelf: 'flex-end',
        width: WP('15%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default Attachments;