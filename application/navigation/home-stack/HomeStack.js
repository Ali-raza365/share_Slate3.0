import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {
    Home,
    Revenues,
    Reconciliation,
} from '../../screens';


import { COLORS, FONT, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';

import { useSelector } from 'react-redux';
import DrawerButton from '../DrawerButton';

const Stack = createStackNavigator();


const HomeStack = () => {

    // const organizations = useSelector(state => state.user.organizations)
    // console.log(organizations)

    return (
        <Stack.Navigator
            initialRouteName='home'
            screenOptions={{
                headerTitleAlign: 'left',
                headerBackTitleVisible: false,
                headerLeftContainerStyle: {
                    marginLeft: WP(SPACING_PERCENT),
                },
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
            }}
        >
            <Stack.Screen
                name='home'
                component={Home}
                options={{
                    show: false,
                    headerTitle: 'Home',
                    headerLeft: () => (
                        <DrawerButton />
                    )
                }}
            />
        </Stack.Navigator>
    );
}

export default HomeStack;