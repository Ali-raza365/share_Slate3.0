import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { BUTTON_HEIGHT, FONT, MOBILE_WIDTH, TEXT_SIZES } from '../theme/config';

const Button = ({title, titleColor, backgroundColor, width, onPress, style}) => {
    return(
        <TouchableOpacity
            onPress={onPress}
            style={[Styles._mainContainer, {width: width, backgroundColor: backgroundColor}, style]}>
                <Text style={[Styles._title, {color:titleColor}]}>{title}</Text>
        </TouchableOpacity>
    );
}

const Styles = StyleSheet.create({
    _mainContainer:{
        height: hp(BUTTON_HEIGHT),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: hp(MOBILE_WIDTH)
    },
    _title:{
        fontFamily: FONT,
        fontSize: wp(TEXT_SIZES.info_1),
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
});

export default Button;