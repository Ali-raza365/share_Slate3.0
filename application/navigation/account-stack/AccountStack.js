import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
    Account,
} from '../../screens';
import { COLORS, FONT, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';

const Stack = createStackNavigator();

const AccountStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='account'
            screenOptions={{
                headerTitle: '',
                headerTitleAlign: 'left',
                cardStyle: {
                    backgroundColor: COLORS.whiteColor,
                },
                headerTitleStyle: {
                    fontFamily: FONT,
                    fontSize: WP(TEXT_SIZES.info_1),
                },
                headerRightContainerStyle: {
                    marginRight: WP(SPACING_PERCENT),
                },
                headerLeftContainerStyle: {
                    marginLeft: WP(SPACING_PERCENT),
                },
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen
                name='account'
                component={Account}
                options={{
                    headerTitle: 'Account',
                }}
            />
        </Stack.Navigator>
    );
}

export default AccountStack;
