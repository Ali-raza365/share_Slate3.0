import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
} from 'react-native';
import { _gotoAuthStack, _gotoLogin, _gotoOTP } from '../../navigation/NavigationService';
import { 
    COLORS, 
    FONT, 
    HP, 
    MESSAGES, 
    SPACING_PERCENT,
    TEXT_SIZES,
    WP
} from '../../theme/config';

import {
    AppBar,
    LabelInput,
    Loader,
    SwipeableButton
} from '../../components';

import { useDispatch, useSelector } from 'react-redux';
import {
    _onSignupVendorNameChange,
    _onSignupDisplayNameChange,
    _onSignupCellNumberChange,
    _onSignupVendorSiteChange,
    _onSignupEmailChange,
    _onInfoSigningUp,
} from '../../redux/reducers/user/user_actions';


const Signup = ({navigation}) => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.user);

    //On Sliding Signup
    const _onSlidingSignup = () => {
        if(state.signup_vendorname.trim().length == 0)
            alert('Vendor Name is required');
        else if(state.signup_displayname.trim().length == 0)
            alert('Display Name is required');
        else if(state.signup_cellnumber.trim().length == 0)
            alert('Cell Number is required');
        // else if(state.signup_vendorsite.trim().length == 0)
        //     alert('Vendor Site is required');
        else if(state.signup_email.trim().length == 0)
            alert(MESSAGES.EMPTY_EMAIL);
        else if(state.signup_email.trim().includes('@') == false || state.signup_email.trim().includes('.') == false )
            alert(MESSAGES.INVALID_EMAIL);
        else{
            let details = {
                vendorName: state.signup_vendorname.trim(),
                email: state.signup_email.toLowerCase().trim(),
                displayName: state.signup_displayname.trim(),
                contactNumber: state.signup_cellnumber.trim(),
                vendorsite: '',
            };
            console.log(details);
            //alert('API needs to be updated due to vendor site');
            dispatch(_onInfoSigningUp(details, navigation));
        }
    }

    return(
        <View style={Styles._mainContainer}>
            <AppBar 
                backgroundColor={COLORS.whiteColor}
                type='dark'
            />
            {/* Loaders */}
            <Loader 
                label= 'Signing up...'
                isVisible={state.signup_infoloading}
            />
            
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Styles._ScrollContainer}
            >
                <LabelInput 
                    label='Vendor Name *'
                    placeholder='e.g John Doe'
                    value={state.signup_vendorname}
                    onChangeText={text => dispatch(_onSignupVendorNameChange(text))}
                />
                <LabelInput 
                    label='Display Name *'
                    placeholder='e.g JD'
                    value={state.signup_displayname}
                    onChangeText={text => dispatch(_onSignupDisplayNameChange(text))}
                    containerStyle={{ marginTop: WP(SPACING_PERCENT/2) }}
                />
                <LabelInput 
                    label='Cell Number *'
                    placeholder='e.g 0092335123456'
                    value={state.signup_cellnumber}
                    onChangeText={text => dispatch(_onSignupCellNumberChange(text))}
                    containerStyle={{ marginTop: WP(SPACING_PERCENT/2) }}
                />
                {/* <LabelInput 
                    label='Vendor Site *'
                    placeholder='e.g Street, City, Country'
                    value={state.signup_vendorsite}
                    onChangeText={text => dispatch(_onSignupVendorSiteChange(text))}
                    containerStyle={{ marginTop: WP(SPACING_PERCENT/2) }}
                /> */}
                <LabelInput 
                    label='Email/User ID *'
                    placeholder='e.g johndoe@gmail.com'
                    value={state.signup_email}
                    onChangeText={text => dispatch(_onSignupEmailChange(text))}
                    containerStyle={{ marginTop: WP(SPACING_PERCENT/2), marginBottom: WP(SPACING_PERCENT) }}
                />

                <SwipeableButton 
                    width={'100%'}
                    title='Slide to Sign Up'
                    titleColor={COLORS.whiteColor}
                    backgroundColor={COLORS.primaryColor}
                    thumbColor={COLORS.primaryColor2}
                    //onSwipeSuccess={()=>{ _gotoOTP(navigation) }}
                    onSwipeSuccess={()=>{ _onSlidingSignup() }}
                />

                <Text onPress={()=>{ _gotoLogin(navigation) }} style={Styles._bottomText}>Already have an account? <Text style={Styles._bottomMainText}>Login</Text></Text>        
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

export default Signup;