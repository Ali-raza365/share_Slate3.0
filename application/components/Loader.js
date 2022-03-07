import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet
} from 'react-native';

import Modal from 'react-native-modal';
import { COLORS, FONT, SCREEN_ICON_SIZE, SPACING_PERCENT, TEXT_SIZES, WP } from '../theme/config';

const Loader = ({isVisible, label}) => {
    return(
        <Modal
            isVisible={isVisible}
        >
            <View style={Styles._mainContainer}>
                <Text style={Styles._label}>{label}</Text>
                <ActivityIndicator
                    color={COLORS.whiteColor}
                    size={WP(SCREEN_ICON_SIZE)}
                />
            </View>

        </Modal>
    );
}

const Styles = StyleSheet.create({
    _mainContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    _label:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
        fontWeight: 'bold',
        color: COLORS.whiteColor,
        marginBottom: WP(SPACING_PERCENT),
    }
});

export default Loader;