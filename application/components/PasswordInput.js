import React from 'react';
import {
    StyleSheet,
    TextInput,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS, FONT, TEXT_SIZES, INPUT_HEIGHT, RADIUS, SCREEN_ICON_SIZE, SPACING_PERCENT, WP, HP } from '../theme/config';

const PasswordInput = ({placeholder, value, onChangeText, editable, width, style, viewPass, onIconPress}) => {
    return(
        <View style={[Styles._inputContainer, { width: width }, style]}>
            <TextInput 
                selectionColor={COLORS.blackColor}
                editable={editable}
                secureTextEntry={!viewPass ? true:false}
                placeholder={placeholder}
                placeholderTextColor={COLORS.grey}
                value={value}
                onChangeText={onChangeText}
                style={Styles._inputStyle}
            />
            <Icon 
                onPress={onIconPress}
                name={!viewPass ? 'eye':'eye-slash'}
                size={WP(SCREEN_ICON_SIZE)}
                color={COLORS.secondaryColor}
            />
        </View>
    );
}

const Styles = StyleSheet.create({
    _inputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: HP(INPUT_HEIGHT),
        borderWidth: 2,
        borderColor: COLORS.borderColor,
        borderRadius: WP(RADIUS),
        paddingHorizontal: WP(SPACING_PERCENT/2)
    },
    _inputStyle:{
        width: WP('60%'),
        height: HP('100%'),
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
        color: COLORS.blackColor,
    },
});

export default PasswordInput;