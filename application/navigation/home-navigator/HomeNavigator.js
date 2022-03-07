import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MatComIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MatIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


import {
    COLORS,
    WP,
    TAB_ICON_SIZE
} from '../../theme/config';
//Screens
import HomeStack from '../home-stack/HomeStack';
import Searchstack from '../search-stack/Searchstack';
import CreatePostStack from '../create-post-stack/CreatePostStack';
import RewardSatck from '../Reward-stack/RewardStack';
import AccountStack from '../account-stack/AccountStack';


const TabStack = createBottomTabNavigator();

const HomeNavigator = () => {
    return (
        <TabStack.Navigator
            initialRouteName='homestack'
            sceneContainerStyle={{
                backgroundColor: COLORS.whiteColor,
            }}
        >
            <TabStack.Screen
                name="homestack"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" color={color} size={WP(TAB_ICON_SIZE)} />
                    )
                }}
            />
            <TabStack.Screen
                name="searchstack"
                component={Searchstack}
                options={{
                    tabBarLabel: 'search',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="search" color={color} size={WP(TAB_ICON_SIZE)} />
                    )
                }}
            />
            <TabStack.Screen
                name="createpoststack"
                component={CreatePostStack}
                options={{
                    tabBarLabel: 'Create',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle-outline" color={color} size={WP(TAB_ICON_SIZE)} />
                    )
                }}
            />
            <TabStack.Screen
                name="rewardstack"
                component={RewardSatck}
                options={{
                    tabBarLabel: 'Reward',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle-outline" color={color} size={WP(TAB_ICON_SIZE)} />
                    )
                }}
            />
            <TabStack.Screen
                name="profile"
                component={AccountStack}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="user" color={color} size={WP(TAB_ICON_SIZE)} />
                    )
                }}
            />
        </TabStack.Navigator>
    )
}

export default HomeNavigator;