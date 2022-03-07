import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {
    New
} from '../../screens';


import { COLORS, FONT, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();


const CreatePostStack = () => {


    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'left',
                headerBackTitleVisible: false,
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
            }}
        >
            <Stack.Screen
                name='Create'
                component={New}
                options={{
                    headerTitle: 'Create',
                }}
            />
        </Stack.Navigator>
    );
}

export default CreatePostStack;