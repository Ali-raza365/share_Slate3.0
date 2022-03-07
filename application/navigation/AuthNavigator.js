import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {
    Login,
    ForgetPassword,
} from '../screens';
import { COLORS, SPACING_PERCENT } from '../theme/config';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
    return(
        <AuthStack.Navigator
            initialRouteName='login'
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',
                cardStyle:{
                    backgroundColor: COLORS.whiteColor
                },
                headerBackTitleVisible: false,
                headerLeftContainerStyle:{
                    marginLeft: wp(SPACING_PERCENT/2)
                },
                headerTintColor: COLORS.primaryColor
            }}
        >
            <AuthStack.Screen 
                name='login'
                component={Login}
            />  
            <AuthStack.Screen 
                name='forgetpassword'
                component={ForgetPassword}
            />
        </AuthStack.Navigator>
    );
}

export default AuthNavigator;