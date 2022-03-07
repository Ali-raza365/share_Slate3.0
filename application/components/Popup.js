import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import MatIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import { COLORS, FONT, RADIUS, SCREEN_ICON_SIZE, SPACING_PERCENT, TEXT_SIZES, WP } from '../theme/config';

const Popup = ({visibility, title, message, onPress}) => {
    return (
        <Modal
            animationIn={'bounceInDown'}
            animationOut={'bounceOutUp'}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropOpacity={0}
            isVisible={visibility}
        >

            <TouchableOpacity 
                onPress={onPress}
                style={Styles._mainContainer}
            >
                <MatIcons 
                    name='notifications-on'
                    size={WP(SCREEN_ICON_SIZE*1.2)}
                    color={COLORS.primaryColor}
                />
                <View style={{
                    width: WP('70%'),
                    marginLeft: WP(SPACING_PERCENT/2)
                }}>
                    <Text numberOfLines={1} style={Styles._title}>{title}</Text>
                    <Text numberOfLines={1} style={Styles._message}>{message}</Text>
                </View>
                
            </TouchableOpacity>

        </Modal>
    );
}

const Styles = StyleSheet.create({
    _mainContainer: {
        flex: 1,
    },
    _mainContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.whiteColor,
        borderRadius: WP(RADIUS),
        width: '100%',
        height: WP('20%'),
        padding: WP(SPACING_PERCENT),
        position: 'absolute',
        top: WP(SPACING_PERCENT),
        zIndex: 2,
        shadowColor: COLORS.blackColor,
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: WP(RADIUS),
        elevation: 10,
    },
    _title:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
        color: COLORS.primaryColor,
    },
    _message:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_2),
        color: COLORS.blackColor,
        marginTop: WP(SPACING_PERCENT/5)
    }
});

export default Popup;
