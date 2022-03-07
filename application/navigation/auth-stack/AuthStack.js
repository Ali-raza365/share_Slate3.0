import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import {
    LoginStack,
    SignupStack,
    ForgetPasswordStack
} from './';
import {
    Welcome
} from '../../screens';

import { COLORS, SPACING_PERCENT, WP } from '../../theme/config';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='login'
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',
                headerBackTitleVisible: false,
                headerTintColor: COLORS.blackColor,
                headerLeftContainerStyle: {
                    marginLeft: WP(SPACING_PERCENT / 2),
                },
                cardStyle: {
                    backgroundColor: COLORS.whiteColor,
                },
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen
                name='welcome'
                component={Welcome}
            />
            <Stack.Screen
                name='login'
                component={LoginStack}
            />
            <Stack.Screen
                name='signup'
                component={SignupStack}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='forgetpassword'
                component={ForgetPasswordStack}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

export default AuthStack;