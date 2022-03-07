import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
} from 'react-native';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    _onResetOTPChange,
    _resendOTP,
    _validatingResetOTP
} from '../../redux/reducers/user/user_actions';

import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import OtpInputs from 'react-native-otp-inputs';
import { AppBar, Button, Loader } from '../../components';
import { _gotoAuthStack, _gotoSetResetPassword } from '../../navigation/NavigationService';
import { COLORS, FONT, HP, RADIUS, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';
import { _getItem } from '../../utils/async';

const ResetOTP = ({navigation}) => {

    const [resend, setResend] = useState(false);

    const dispatch = useDispatch();
    const state = useSelector(state => state.user);

    const otpRef = useRef().current;

    //On Validate Click
    const _onValidateClick = async () => {
        let otp = state.reset_otp;
        if(otp.length == 0)
            alert('OTP is required');
        else if(otp.length != 6)
            alert('OTP should contain exact 6 characters');
        else{

            let details = {
                email: state.reset_email.trim().toLowerCase(),
                otp: state.reset_otp,
            };

            //alert(JSON.stringify(details));

            dispatch(_validatingResetOTP(details, navigation))
        }
    }

    //On Resend Click
    const _onResendClick = async () => {
        let details = {
            email: state.reset_email.trim().toLowerCase(),
        }
        dispatch(_resendOTP(details));
        setResend(false);
    }

    useEffect(()=>{

    },[resend])

    return(
        <View style={Styles._mainContainer}>
            <AppBar 
                type='dark'
                backgroundColor={COLORS.whiteColor}
            />
            {/* Loaders */}
            <Loader 
                label='Validating OTP...'
                isVisible={state.reset_otploading}
            />
             {/* Loaders */}
            <Loader 
                label='Resending OTP...'
                isVisible={state.resend_otploading}
            />
            
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Styles._scrollContainer}
            >
                <Text style={Styles._heading}>A code has been sent to your Email. Please enter that code here to validate your Email</Text>
                <OtpInputs
                    ref={otpRef}
                    handleChange={text => dispatch(_onResetOTPChange(text))}
                    numberOfInputs={6}
                    keyboardType='default'
                    style={Styles._otpMainContainer}
                    inputContainerStyles={Styles._inputBox}
                    inputStyles={Styles._otpInputs}
                />

                {
                    resend ? (
                        <Text onPress={()=>{ _onResendClick() }} style={Styles._resendButton}>Resend Code</Text>
                    ):(
                        null
                    )
                    
                }

                {
                    !resend && <CountdownCircleTimer
                        isPlaying
                        duration={60}
                        size={150}
                        onComplete={()=>{
                            setResend(true);
                        }}
                        colors={[
                            [COLORS.primaryColor, 1],
                        ]}
                    >
                        {
                            ({ remainingTime }) => {
                                return(
                                    <Text 
                                        style={{ 
                                            color: COLORS.primaryColor,
                                            fontFamily: FONT,
                                            fontSize: WP(TEXT_SIZES.info_1),
                                            textAlign: 'center',
                                        }}
                                    >
                                        {'Resend in\n' + remainingTime}
                                    </Text>
                                )
                            }
                        }
                    </CountdownCircleTimer>
                }

                <Button 
                    width={'100%'}
                    //onPress={()=>{ _gotoSetResetPassword(navigation) }}
                    onPress={()=>{ _onValidateClick() }}
                    title='Validate'
                    titleColor={COLORS.whiteColor}
                    backgroundColor={COLORS.primaryColor}
                    style={{ marginTop: WP(SPACING_PERCENT) }}
                />
                <Text onPress={()=>{ _gotoAuthStack(navigation) }} style={Styles._bottomText}>Know password of your account? <Text style={Styles._bottomMainText}>Login</Text></Text>
            </ScrollView>
        </View>
    );
}

const Styles = StyleSheet.create({
    _mainContainer:{
        flex: 1,
    },
    _scrollContainer:{
        flex: 1,
        padding: WP(SPACING_PERCENT),
        alignItems: 'center',
        paddingBottom: WP('10%'),
    },
    _heading:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
    },
    _otpMainContainer:{
        width: '100%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-evenly',
        marginVertical: WP(SPACING_PERCENT)
    },
    _inputBox:{
        width: WP('10%'),
        height: WP('12%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.primaryColor,
        borderWidth: 2,
        borderRadius: WP(RADIUS)
    },
    _otpInputs:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.h2),
        color: COLORS.blackColor,
        width: '100%',
        height: '100%',
        textAlignVertical: 'center',
        borderRadius: WP(RADIUS),
        textAlign: 'center',
    },
    _bottomText:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
        color: COLORS.blackColor,
        alignSelf: 'center',
        position: 'absolute',
        bottom: HP(SPACING_PERCENT * 2),
    },
    _bottomText:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
        color: COLORS.blackColor,
        alignSelf: 'center',
        position: 'absolute',
        bottom: HP(SPACING_PERCENT * 2),
    },
    _bottomMainText:{
        color: COLORS.primaryColor,
        textDecorationLine: 'underline',
    },
    _box:{
        width: WP('10%'),
    },
    _resendButton:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.h3),
        textDecorationLine: 'underline',
        color: COLORS.primaryColor,
    },
});

export default ResetOTP;