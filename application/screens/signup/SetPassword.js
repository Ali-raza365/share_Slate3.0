import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    _onSignupPasswordChange,
    _onSignupConfirmPasswordChange,
    _settingSignupPassword
} from '../../redux/reducers/user/user_actions';

import { AppBar, Button, Loader, PasswordInput } from '../../components';
import { COLORS, FONT, HP, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';
import { _getItem } from '../../utils/async';
import { _gotoAuthStack } from '../../navigation/NavigationService';

const SetPassword = ({navigation}) => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.user);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    //Toggle Password
    const _togglePasswordVisibility = () => {
        if(showPassword)
            setShowPassword(false);
        else
            setShowPassword(true);
    }
    //Toggle Confirm Password
    const _toggleConfirmPasswordVisibility = () => {
        if(showConfirmPassword)
            setShowConfirmPassword(false);
        else
            setShowConfirmPassword(true);
    }

    //On Lets Get Started CLick
    const _onGetStartedClick = async () => {
        if(state.signup_password.trim().length == 0)
            alert('Password is required');
        else if(state.signup_password.trim().length < 6)
            alert('Password should contain at least 6 characters');
        else if(state.signup_confirmpassword.trim().length == 0)
            alert('Confirm Password is required');
        else if(state.signup_confirmpassword.trim().length < 6)
            alert('Confirm Password should contain at least 6 characters');
        else if(state.signup_password.trim() != state.signup_confirmpassword.trim())
            alert('Password and Confirm Password are not same. Please check them again');
        else{
            await _getItem('signup_email')
            .then((email)=>{
                let details = {
                    email: email,
                    password: state.signup_password.trim(),
                }
                dispatch(_settingSignupPassword(details, navigation));
            })
            .catch((err)=>{
                alert('Something is going wrong. Please try again');
            })
            
        }
    }

    return(
        <View style={Styles._mainContainer}>
            <AppBar 
                type='dark'
                backgroundColor={COLORS.whiteColor}
            />
            {/* Loaders */}
            <Loader 
                label='Completing Profile...'
                isVisible={state.signup_passloading}
            />
            
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Styles._scrollContainer}
            >
                <Text style={Styles._heading}>Please set your password to get access to your account</Text>
                
                <PasswordInput 
                    placeholder='Password *'
                    value={state.signup_password}
                    onIconPress={_togglePasswordVisibility}
                    viewPass={showPassword}
                    onChangeText={text => dispatch(_onSignupPasswordChange(text))}
                    style={{ marginTop: WP(SPACING_PERCENT) }}
                />
                <PasswordInput 
                    placeholder='Confirm Password *'
                    value={state.signup_confirmpassword}
                    onIconPress={_toggleConfirmPasswordVisibility}
                    viewPass={showConfirmPassword}
                    onChangeText={text => dispatch(_onSignupConfirmPasswordChange(text))}
                    style={{ marginTop: WP(SPACING_PERCENT/2) }}
                />
                <Button 
                    onPress={_onGetStartedClick}
                    title="Let's Get Started"
                    titleColor={COLORS.whiteColor}
                    backgroundColor={COLORS.primaryColor}
                    style={{ marginTop: WP(SPACING_PERCENT) }}
                />
                <Text onPress={()=>{ _gotoAuthStack(navigation) }} style={Styles._bottomText}>Already have an account? <Text style={Styles._bottomMainText}>Login</Text></Text>
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
        paddingBottom: WP('10%')
    },
    _heading:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1)
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
    }
});

export default SetPassword;