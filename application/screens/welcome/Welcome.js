import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { AppBar, Button } from '../../components';
import { _gotoAPAuthStack, _gotoLogin } from '../../navigation/NavigationService';
import { COLORS, FONT, HP, IMAGES, RADIUS, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';

const Welcome = ({ navigation }) => {
    return (
        <View style={Styles._mainContainer}>
            <AppBar
                backgroundColor={COLORS.primaryColor}
                type='light'
            />

            <Image
                source={IMAGES._white_logo}
                style={Styles._logo}
            />
            <Text style={Styles._welcome}>Welcome to InvoiceMate</Text>

            <View style={Styles._btnContainer}>
                <TouchableOpacity
                    onPress={() => { _gotoLogin(navigation) }}
                    style={Styles._btnView}
                >
                    <Image
                        source={IMAGES._supplierIcon}
                        style={Styles._btnImage}
                    />
                    <Text style={Styles._btnTitle}>Supplier Zone</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    _mainContainer: {
        flex: 1,
        padding: WP(SPACING_PERCENT),
        backgroundColor: COLORS.primaryColor,
    },
    _logo: {
        width: WP('80%'),
        height: HP('25%'),
        resizeMode: 'contain',
        marginTop: HP(SPACING_PERCENT * 2.5),
        alignSelf: 'center',
    },
    _welcome: {
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.h3),
        color: COLORS.whiteColor,
        marginTop: HP(SPACING_PERCENT * 1.5),
        alignSelf: 'center',
    },
    _btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: HP(SPACING_PERCENT),
    },
    _btnView: {
        width: WP('43%'),
        height: WP('43%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: WP(RADIUS),
        backgroundColor: COLORS.whiteColor,
    },
    _btnImage: {
        width: WP('23%'),
        height: WP('23%'),
        resizeMode: 'contain',
    },
    _btnTitle: {
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
        color: COLORS.primaryColor,
        textTransform: 'uppercase',
        marginTop: WP('3%'),
    },
});

export default Welcome;