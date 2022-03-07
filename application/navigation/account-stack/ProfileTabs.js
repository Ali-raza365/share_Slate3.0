import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {
    Profile,
    Attachments,
    BankDetails
} from '../../screens';

import { COLORS, FONT, RADIUS, TEXT_SIZES, WP } from '../../theme/config';

const Tabs = createMaterialTopTabNavigator();

const ProfileTabs = () => {
    return(
        <Tabs.Navigator
            initialRouteName='profile'
            tabBarOptions={{
                pressColor: COLORS.primaryColor,
                activeTintColor: COLORS.primaryColor,
                indicatorStyle:{
                    backgroundColor: COLORS.primaryColor
                },
                labelStyle:{
                    fontFamily: FONT,
                    fontSize: WP(TEXT_SIZES.info_2),
                    color: COLORS.blackColor,
                    textTransform: 'capitalize'
                },
                style:{
                    shadowColor: COLORS.blackColor,
                    shadowOffset: {width: 0, height: 3},
                    shadowOpacity: 0.2,
                    shadowRadius: WP(RADIUS),
                }
            }}
            sceneContainerStyle={{
                backgroundColor: COLORS.whiteColor
            }}
        >
            <Tabs.Screen 
                name='profile'
                component={Profile}
                options={{
                    tabBarLabel: 'Profile'
                }}
            />
            
            <Tabs.Screen 
                name='bankdetails'
                component={BankDetails}
                options={{
                    tabBarLabel: 'Bank Details'
                }}
            />

            <Tabs.Screen 
                name='attachments'
                component={Attachments}
                options={{
                    tabBarLabel: 'Compliance Docs'
                }}
            />
        </Tabs.Navigator>
    );
}

export default ProfileTabs;