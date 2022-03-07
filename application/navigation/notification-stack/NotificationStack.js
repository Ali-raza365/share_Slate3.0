import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import {
    Notifications
} from '../../screens';
import { COLORS, FONT, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';

const Stack = createStackNavigator();

const NotificationStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='notifications'
            screenOptions={{
                headerBackTitleVisible: false,
                headerTitle: '',
                headerTitleAlign: 'left',

                headerTitleStyle: {
                    fontFamily: FONT,
                    fontSize: WP(TEXT_SIZES.info_1)
                },
                headerLeftContainerStyle: {
                    marginLeft: WP(SPACING_PERCENT)
                },
                headerRightContainerStyle: {
                    marginRight: WP(SPACING_PERCENT)
                },
                cardStyle: {
                    backgroundColor: COLORS.whiteColor,
                },
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
            }}
        >

            <Stack.Screen
                name='notifications'
                component={Notifications}
                options={{
                    headerTitle: 'Notifications'
                }}
            />

        </Stack.Navigator>
    );
}

export default NotificationStack;