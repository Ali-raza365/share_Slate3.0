import React from 'react';
import {
    StyleSheet,
    TextInput,
} from 'react-native';

import { COLORS, FONT, TEXT_SIZES, INPUT_HEIGHT, RADIUS, SPACING_PERCENT, HP, WP } from '../theme/config';

const SimpleInput = ({placeholder, placeholderColor, value, onChangeText, editable, width, style}) => {
    return(
        <TextInput 
            selectionColor={placeholderColor}
            editable={editable}
            placeholder={placeholder}
            placeholderTextColor={COLORS.grey}
            value={value}
            onChangeText={onChangeText}
            style={[Styles._inputStyle, { width: width, color: placeholderColor ? placeholderColor : COLORS.blackColor }, style]}
        />
    );
}

const Styles = StyleSheet.create({
    _inputStyle:{
        height: HP(INPUT_HEIGHT),
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
        borderWidth: 2,
        borderColor: COLORS.borderColor,
        borderRadius: WP(RADIUS),
        paddingHorizontal: WP(SPACING_PERCENT/2),
    },
});

export default SimpleInput;