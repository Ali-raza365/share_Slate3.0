import React from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
} from '@react-navigation/drawer';

//Redux
import { useSelector } from 'react-redux';

import MatComIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { PLAY_STORE_LINK, COLORS, FONT, HP, IMAGES, PRIVACY_POLICY_LINK, RADIUS, SCREEN_ICON_SIZE, SPACING_PERCENT, TERMS_CONDITIONS_LINK, TEXT_SIZES, WP } from '../theme/config';

import HomeNavigator from './home-navigator/HomeNavigator';
import {
    _gotoCreateInvoice,
    _gotoAccount,
    _gotoHomeNavigator,
    _gotoCustomers,
    _gotoRevenues,
    _gotoReconciliation,
    _gotoCustomer360,
    _gotoChatstack
} from './NavigationService';
import { _openLink } from '../utils/linking';
import { _shareApplication } from '../utils/share';
import { BASE_URL } from '../api/apis';

const CustomDrawerContent = (props) => {

    const user = useSelector(state => state.user.profile);
    const navigation = useNavigation();

    return (
        <View style={Styles._mainDrawerContainer}>
            <View style={Styles._drawerTopView}>
                <View style={Styles._profileImageContainer}>
                    <Image
                        source={user?.logoUrl ? ({ uri: BASE_URL + user.logoUrl }) : IMAGES.defaultImage}
                        style={Styles._profileimg}
                    />
                </View>
                <View style={Styles._detailsView}>
                    <Text style={Styles._name}>Saad </Text>
                    <Text style={Styles._email}>Irfan</Text>
                </View>
            </View>

            <DrawerContentScrollView
                style={{}}
                contentContainerStyle={{ paddingTop: WP('0%') }}
                {...props}
            >
                <TouchableOpacity
                    // onPress={() => { _gotoHomeNavigator(navigation) }}
                    style={Styles._row}
                >
                    <IonIcons name="add-circle-outline"
                        color={COLORS.lightGrey}
                        size={WP(SCREEN_ICON_SIZE + 3)}
                    />
                    <Text style={Styles._labelStyle}>Create</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { _gotoChatstack(navigation) }}
                    style={Styles._row}
                >
                    <FeatherIcons
                        name='bell'
                        color={COLORS.lightGrey}
                        size={WP(SCREEN_ICON_SIZE + 3)}
                    />
                    <Text style={Styles._labelStyle}>Chat screen</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate('blockchainveriferstack'); }}
                    style={Styles._row}
                >
                    <FeatherIcons
                        name='settings'
                        color={COLORS.lightGrey}
                        size={WP(SCREEN_ICON_SIZE + 3)}
                    />
                    <Text style={Styles._labelStyle}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { _gotoAccount(navigation) }}
                    style={Styles._row}
                >
                    <AntDesign
                        name='logout'
                        color={COLORS.redColor}
                        size={WP(SCREEN_ICON_SIZE + 3)}
                    />
                    <Text style={Styles._labelStyle}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { _gotoAccount(navigation) }}
                    style={Styles._row}
                >
                    <AntDesign
                        name='infocirlceo'
                        color={COLORS.lightGrey}
                        size={WP(SCREEN_ICON_SIZE + 3)}
                    />
                    <Text style={Styles._labelStyle}>information</Text>
                </TouchableOpacity>
            </DrawerContentScrollView>
        </View>
    );
}

const DrawerStack = createDrawerNavigator();
const Drawer = () => {
    return (
        <DrawerStack.Navigator
            drawerContent={(props) => (<CustomDrawerContent {...props} />)}
            initialRouteName='homescreen'
            hideStatusBar={true}
            drawerStyle={{
                width: WP('80%'),
                backgroundColor: COLORS.whiteColor,
            }}
            drawerContentOptions={{
                activeTintColor: COLORS.whiteColor,
                inactiveTintColor: COLORS.blackColor,
                labelStyle: {
                    fontFamily: FONT,
                    fontSize: WP(TEXT_SIZES.info_1),
                    marginLeft: -WP(SPACING_PERCENT)
                },
                itemStyle: {
                    borderRadius: WP(RADIUS),
                    backgroundColor: 'transparent'
                },
            }}
        >
            <DrawerStack.Screen
                name='homescreen'
                component={HomeNavigator}
                options={{
                    drawerLabel: 'Home',
                    drawerIcon: (({ color, size }) => (
                        <Icon
                            name='home'
                            color={color}
                            size={size}
                        />
                    )),
                }}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        if (route.state && route.state.routeNames.length > 0) {
                            navigation.navigate('homescreen');
                        }
                    },
                })}

            />
        </DrawerStack.Navigator>
    );
}

const Styles = StyleSheet.create({
    _mainDrawerContainer: {
        flex: 1,
    },
    _iconStyle: {
        position: 'absolute',
        top: WP('11'),
        right: WP(SPACING_PERCENT),
        zIndex: 1,
    },
    _drawerTopView: {
        height: WP('50%'),
        padding: WP(SPACING_PERCENT),
    },
    _drawerLogo: {
        width: WP('40%'),
        height: HP('15%'),
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: WP('25%'),
    },
    _labelStyle: {
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.h2),
        fontWeight: '900',
        // letterSpacing: 1,
        color: COLORS.blackColor,
        paddingLeft: WP(SPACING_PERCENT / 1.5)
    },
    _drawerSubView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: HP(SPACING_PERCENT / 2),
        borderBottomColor: COLORS.borderColor,
        borderBottomWidth: 1,
        paddingBottom: HP(SPACING_PERCENT / 3)
    },
    _detailsView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: WP(SPACING_PERCENT - 2)
        // justifyContent: 'center',
    },
    _name: {
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.h2),
        color: COLORS.blackColor,
    },
    _email: {
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.h2),
        color: COLORS.blackColor,
        fontWeight: 'bold',
    },
    _profileImageContainer: {
        width: WP('22'),
        height: WP('22'),
        borderRadius: WP('7.5'),
        marginTop: WP(SPACING_PERCENT)
    },
    _profileimg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: WP('7.5'),
    },
    _seperatorView: {
        paddingHorizontal: WP(SPACING_PERCENT),
        paddingVertical: WP(SPACING_PERCENT / 5)
    },
    _seperator: {
        borderBottomColor: COLORS.borderColor,
        borderBottomWidth: 1,
    },
    _row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: WP(SPACING_PERCENT),
        paddingVertical: WP(SPACING_PERCENT / 2)
    },
})

export default Drawer;