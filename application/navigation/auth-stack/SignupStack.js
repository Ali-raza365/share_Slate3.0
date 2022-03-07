import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import {
    Signup,
    OTPScreen,
    SetPassword,
} from '../../screens';
import { COLORS, FONT, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';

const Stack = createStackNavigator();

const SignupStack = () => {
    return(
        <Stack.Navigator
            initialRouteName='signup'
            screenOptions={{
                headerBackTitleVisible: false,
                headerTitle: '',
                headerTransparent: true,
                headerLeftContainerStyle:{
                    marginLeft: WP(SPACING_PERCENT),
                },
                headerTintColor: COLORS.primaryColor,
                headerRightContainerStyle:{
                    marginRight: WP(SPACING_PERCENT),
                },
                headerTitleStyle:{
                    fontFamily: FONT,
                    fontSize: WP(TEXT_SIZES.info_1)
                },
                cardStyle:{
                    backgroundColor: COLORS.whiteColor,
                },
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            }}
        >
            <Stack.Screen 
                name='signup'
                component={Signup}
                options={{
                    headerTitle: 'Sign Up',
                    headerTransparent: false,
                    headerStyle:{
                        backgroundColor: COLORS.whiteColor,
                        shadowColor: COLORS.whiteColor,
                        elevation: 0
                    },
                }}
            />

            <Stack.Screen 
                name='otp'
                component={OTPScreen}
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
                name='setpassword'
                component={SetPassword}
                options={{
                    headerTitle: 'Set Password',
                    headerTransparent: false,
                    headerStyle:{
                        backgroundColor: COLORS.whiteColor,
                        shadowColor: COLORS.whiteColor,
                        elevation: 0
                    },
                }}
            />

        </Stack.Navigator>
    );
}

export default SignupStack;