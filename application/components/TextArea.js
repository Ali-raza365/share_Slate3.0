import React from 'react';
import {
    StyleSheet,
    TextInput,
    Text,
    View,
} from 'react-native';
import { COLORS, FONT, INPUT_HEIGHT, RADIUS, SPACING_PERCENT, TEXT_SIZES, WP } from '../theme/config';

const TextArea = ({label, placeholder, value, onChangeText, editable, width, inputStyle, containerStyle, keyboard}) => {
    return(
        <View style={containerStyle}>
            <Text style={Styles._label}>{label}</Text>
            <TextInput 
                selectionColor={COLORS.secondaryColor}
                editable={editable}
                multiline={true}
                numberOfLines={5}
                placeholder={placeholder}
                value={value}
                keyboardType={keyboard == 'default' || keyboard == null || keyboard == undefined ? 'default':'number-pad'}
                onChangeText={onChangeText}
                style={[Styles._inputStyle, { width: width, backgroundColor: editable == false ? COLORS.lightGrey:COLORS.whiteColor, color: editable == false ? COLORS.whiteColor:COLORS.blackColor  }, inputStyle]}
            />
        </View>
    );
}

const Styles = StyleSheet.create({
    _inputStyle:{
        height: WP(INPUT_HEIGHT * 8),
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
        borderWidth: 2,
        borderColor: COLORS.borderColor,
        borderRadius: WP(RADIUS),
        padding: WP(SPACING_PERCENT/2),
        textAlignVertical: 'top',
    },
    _label:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
        color: COLORS.blackColor,
        marginBottom: WP(SPACING_PERCENT/5),
    },
});

export default TextArea;