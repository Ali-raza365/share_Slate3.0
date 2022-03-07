import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import {
    Login
} from '../../screens';
import { COLORS } from '../../theme/config';

const Stack = createStackNavigator();

const LoginStack = () => {
    return(
        <Stack.Navigator
            initialRouteName='login'
            screenOptions={{
                cardStyle:{
                    backgroundColor: COLORS.whiteColor,
                },
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            }}
        >
            <Stack.Screen 
                name='login'
                component={Login}
                options={{
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    );
}

export default LoginStack;