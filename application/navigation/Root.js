import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

//Screens
import {
    Splash,
    Onboard,
} from '../screens';
import AuthStack from './auth-stack/AuthStack';
import ChatStack from './chat-stack/ChatStack';
import Drawer from './Drawer';

import { COLORS, SPACING_PERCENT, WP } from '../theme/config';

const RootStack = createStackNavigator();

const RootNavigator = () => (
    <RootStack.Navigator
        initialRouteName='splash'
        screenOptions={{
            gestureEnabled: false,
            headerShown: false,
            headerTitleAlign: 'left',
            headerBackTitleVisible: false,
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            headerLeftContainerStyle: {
                marginLeft: WP(SPACING_PERCENT)
            },
            headerRightContainerStyle: {
                marginLeft: WP(SPACING_PERCENT)
            },
            cardStyle: {
                backgroundColor: COLORS.whiteColor,
            }
        }}>
        <RootStack.Screen
            name='splash'
            component={Splash}
        />
        <RootStack.Screen
            name='onboard'
            component={Onboard}
        />
        <RootStack.Screen
            name='auth'
            component={AuthStack}
        />
        <RootStack.Screen
            name='homenavigator'
            component={Drawer}
        />
        <RootStack.Screen
            name='ChatSatck'
            component={ChatStack}
        />
    </RootStack.Navigator>
)

const RootNavigatorStack = createStackNavigator();

const Root = () => {
    return (
        <RootNavigatorStack.Navigator
            headerMode='none'
        >
            <RootNavigatorStack.Screen
                name='Root'
                component={RootNavigator}
            />
        </RootNavigatorStack.Navigator>
    );
}

export default Root;