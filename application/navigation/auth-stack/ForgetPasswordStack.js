import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import {
    ForgetPassword,
    ResetOTP,
    SetResetPassword
} from '../../screens';
import { COLORS, FONT, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';

const Stack = createStackNavigator();

const ForgetPasswordStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='forgetpassword'
            screenOptions={{
                headerBackTitleVisible: false,
                headerTitle: '',
                headerTransparent: true,
                headerLeftContainerStyle: {
                    marginLeft: WP(SPACING_PERCENT),
                },
                headerTintColor: COLORS.primaryColor,
                headerRightContainerStyle: {
                    marginRight: WP(SPACING_PERCENT),
                },
                headerTitleStyle: {
                    fontFamily: FONT,
                    fontSize: WP(TEXT_SIZES.info_1)
                },
                headerTitleAlign: 'left',
                cardStyle: {
                    backgroundColor: COLORS.whiteColor,
                },
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            }}
        >
            <Stack.Screen
                name='forgetpassowrd'
                component={ForgetPassword}
                options={{
                    headerTitle: 'Reset Password',
                    headerTransparent: false,
                    headerStyle: {
                        backgroundColor: COLORS.whiteColor,
                        shadowColor: COLORS.whiteColor,
                        elevation: 0
                    },
                }}
            />
            {/* <Stack.Screen 
                name='resetotp'
                component={ResetOTP}
                options={{
                    headerTitle: 'Validate OTP',
                    headerTransparent: false,
                    headerStyle:{
                        backgroundColor: COLORS.whiteColor,
                        shadowColor: COLORS.whiteColor,
                        elevation: 0
                    },
                }}
            />
            <Stack.Screen 
                name='setresetpassword'
                component={SetResetPassword}
                options={{
                    headerTitle: 'Set New Password',
                    headerTransparent: false,
                    headerStyle:{
                        backgroundColor: COLORS.whiteColor,
                        shadowColor: COLORS.whiteColor,
                        elevation: 0
                    },
                }}
            /> */}

        </Stack.Navigator>
    );
}

export default ForgetPasswordStack;