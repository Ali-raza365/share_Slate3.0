import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
} from 'react-native';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    _onResetEmailChange,
    _sendingResetCode,
} from '../../redux/reducers/user/user_actions';

import { AppBar, Button, Loader, SimpleInput } from '../../components';
import { _gotoResetOTP } from '../../navigation/NavigationService';
import { COLORS, FONT, FONT_SIZES, MESSAGES, PLATFORM, SPACING } from '../../theme/config';

const ForgetPassword = ({ navigation }) => {

    // const dispatch = useDispatch();
    // const state = useSelector(state => state.user);

    //On Send Button Click
    // const _onSendButtonClick = () => {
    //     let email = state.reset_email.trim().toLowerCase();
    //     if(email.length == 0)
    //         alert(MESSAGES.EMPTY_EMAIL);
    //     else if(email.includes('@') == false || email.includes('.') == false)
    //         alert(MESSAGES.INVALID_EMAIL);
    //     else{
    //         let details = {
    //             email: email,
    //         };

    //         dispatch(_sendingResetCode(details, navigation));
    //     }
    // }

    return (
        <View style={Styles._mainContainer}>
            <AppBar
                type='dark'
                backgroundColor={COLORS.whiteColor}
            />
            {/* Loaders */}
            <Loader
                label='Sending reset code...'
                isVisible={state.reset_infoloading}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={Styles._scrollContainer}
            >
                <Text style={Styles._info}>Please enter your registered email address. You will receive a code which you will use for resetting password</Text>
                <SimpleInput
                    placeholder='Email *'
                    value={state.reset_email}
                    // onChangeText={text => dispatch(_onResetEmailChange(text))}
                    style={{ marginTop: SPACING }}
                />
                <Button
                    //onPress={()=>{ _gotoResetOTP(navigation) }}
                    // onPress={_onSendButtonClick}
                    title='SEND CODE'
                    titleColor={COLORS.whiteColor}
                    backgroundColor={COLORS.primaryColor}
                    style={{ marginTop: SPACING }}
                />
            </ScrollView>
        </View>
    );
}

const Styles = StyleSheet.create({
    _mainContainer: {
        flex: 1,
    },
    _heading: {
        fontFamily: FONT,
        fontSize: FONT_SIZES.h1,
        fontWeight: 'bold',
        color: COLORS.secondaryColor,
        marginLeft: SPACING * 2,
        marginTop: PLATFORM === 'ios' ? '25%' : '15%'
    },
    _info: {
        fontFamily: FONT,
        fontSize: FONT_SIZES.info_1,
        color: COLORS.lightGrey,
    },
    _scrollContainer: {
        paddingHorizontal: SPACING * 2,
        paddingTop: SPACING / 2,
        paddingBottom: 100
    },
});

export default ForgetPassword;