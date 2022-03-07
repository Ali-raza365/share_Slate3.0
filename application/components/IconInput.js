import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { FONT, WP, HP, COLORS, TEXT_SIZES, INPUT_HEIGHT, SCREEN_ICON_SIZE, RADIUS, SPACING_PERCENT } from '../theme/config';

const IconInput = ({searchBar, onSearchIconClick, inputWidth, inputContainerWidth, placeholder, iconname, value, onChangeText, containerStyle, inputStyle, keyboard, enabled}) => {
    if(searchBar == true){
        return(
            <View style={[Styles._mainContainer, { width: inputContainerWidth }, containerStyle ]}>
                <Icon name={iconname} size={WP(SCREEN_ICON_SIZE)} color={COLORS.primaryColor} />
                <TextInput 
                    editable={enabled}
                    selectionColor={COLORS.blackColor}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.grey}
                    value={value}
                    multiline={false}
                    keyboardType={keyboard == 'default' || keyboard == null || keyboard == undefined ? 'default':'number-pad'}
                    onChangeText={onChangeText}
                    style={[Styles._input, { width: inputWidth, marginRight: WP('2%') }, inputStyle ]}
                />
                {
                    value ? (
                        <Icon onPress={onSearchIconClick} name='remove' size={WP(SCREEN_ICON_SIZE)} color={COLORS.grey} />
                    ):(
                        null
                    )
                }
            </View>
        );
    }
    else{
        return(
            <View style={[Styles._mainContainer, { width: inputContainerWidth }, containerStyle ]}>
                <Icon name={iconname} size={WP(SCREEN_ICON_SIZE)} color={COLORS.primaryColor} />
                <TextInput 
                    editable={enabled}
                    selectionColor={COLORS.blackColor}
                    placeholder={placeholder}
                    value={value}
                    multiline={false}
                    keyboardType={keyboard == 'default' || keyboard == null || keyboard == undefined ? 'default':'number-pad'}
                    onChangeText={onChangeText}
                    style={[Styles._input, { width: inputWidth }, inputStyle ]}
                />
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    _mainContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        height: HP(INPUT_HEIGHT),
        borderRadius: WP(RADIUS),
        borderWidth: 2,
        borderColor: COLORS.borderColor,
        paddingHorizontal: WP(SPACING_PERCENT/2),
    },
    _input:{
        width: '100%',
        fontFamily: FONT,
        height: HP(INPUT_HEIGHT),
        fontSize: WP(TEXT_SIZES.info_1),
        color: COLORS.blackColor,
        marginLeft: WP(SPACING_PERCENT/2),
    },
})

export default IconInput;