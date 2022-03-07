import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    _onResetPasswordChange,
    _onResetConfirmPasswordChange,
    _settingNewPassword
} from '../../redux/reducers/user/user_actions';

import { AppBar, Button, Loader, PasswordInput } from '../../components';
import { COLORS, FONT, HP, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';
import { _getItem } from '../../utils/async';
import { _gotoAuthStack } from '../../navigation/NavigationService';

const SetResetPassword = ({navigation}) => {

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
        if(state.reset_password.trim().length == 0)
            alert('New Password is required');
        else if(state.reset_password.trim().length < 6)
            alert('New Password should contain at least 6 characters');
        else if(state.reset_confirmpassword.trim().length == 0)
            alert('Confirm Password is required');
        else if(state.reset_confirmpassword.trim().length < 6)
            alert('Confirm Password should contain at least 6 characters');
        else if(state.reset_password.trim() != state.reset_confirmpassword.trim())
            alert('Password and Confirm Password are not same. Please check them again');
        else{
            let details = {
                email: state.reset_email.trim().toLowerCase(),
                password: state.reset_password.trim(),
            }
            dispatch(_settingNewPassword(details, navigation));
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
                label='Resetting Password...'
                isVisible={state.reset_passwordloading}
            />
            
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Styles._ScrollContainer}
            >
                <Text style={Styles._heading}>Please set new password</Text>
                
                <PasswordInput 
                    placeholder='New Password *'
                    value={state.reset_password}
                    onIconPress={_togglePasswordVisibility}
                    viewPass={showPassword}
                    onChangeText={text => dispatch(_onResetPasswordChange(text))}
                    style={{ marginTop: WP(SPACING_PERCENT) }}
                />
                <PasswordInput 
                    placeholder='Confirm Password *'
                    value={state.reset_confirmpassword}
                    onIconPress={_toggleConfirmPasswordVisibility}
                    viewPass={showConfirmPassword}
                    onChangeText={text => dispatch(_onResetConfirmPasswordChange(text))}
                    style={{ marginTop: WP(SPACING_PERCENT/2) }}
                />
                <Button 
                    onPress={_onGetStartedClick}
                    title="Let's Get Started"
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
    _ScrollContainer:{
        flex: 1,
        padding: WP(SPACING_PERCENT),
        paddingBottom: WP('10%'),
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

export default SetResetPassword;