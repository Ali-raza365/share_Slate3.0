import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import {
    Chat,
    Reward
} from '../../screens';
import { COLORS, FONT, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';

const Stack = createStackNavigator();

const ChatSatck = () => {
    return (
        <Stack.Navigator
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
                name='Chat'
                component={Chat}
                options={{
                    headerTitle: 'Chat'
                }}
            />
        </Stack.Navigator>
    );
}

export default ChatSatck;