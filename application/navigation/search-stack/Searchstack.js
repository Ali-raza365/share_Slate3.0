import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {
    Search,
} from '../../screens';


import { COLORS, FONT, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();


const Searchstack = () => {

    // const organizations = useSelector(state => state.user.organizations)
    // console.log(organizations)

    return (
        <Stack.Navigator
            initialRouteName='search'
            screenOptions={{
                headerTitleAlign: 'left',
                headerBackTitleVisible: false,
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
            }}
        >
            <Stack.Screen
                name='search'
                component={Search}
                options={{
                    headerTitle: 'Search',
                }}
            />
        </Stack.Navigator>
    );
}

export default Searchstack;