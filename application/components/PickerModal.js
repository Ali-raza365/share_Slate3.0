import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

import Modal from 'react-native-modal';
import { COLORS, FONT, FONT_SIZES, HP, IMAGES, MOBILE_HEIGHT, MOBILE_WIDTH, RADIUS, SPACING, SPACING_PERCENT, TEXT_SIZES, WP } from '../theme/config';

const PickerModal = ({isVisible, onGalleryClick, onCameraClick, onDocClick, onCloseClick}) => {
    return(
        <Modal
            onBackButtonPress={onCloseClick}
            onBackdropPress={onCloseClick}
            isVisible={isVisible}
            style={{ margin: 0 }}
        >
            <View style={Styles._mainContainer}>
                <Text style={Styles._heading}>Select Option</Text>
                <View style={Styles._optionMainView}>
                    {
                        onCameraClick ? (
                            <TouchableOpacity 
                                onPress={onCameraClick}
                                style={Styles._optionView}
                            >
                                <Image source={IMAGES.cameraIcon} style={Styles._optionIcon} />
                                <Text style={Styles._optionText}>Camera</Text>
                            </TouchableOpacity>
                        ):(
                            null
                        )
                    }
                    {
                        onGalleryClick ? (
                            <TouchableOpacity
                                onPress={onGalleryClick} 
                                style={Styles._optionView}
                            >
                                <Image source={IMAGES.galleryIcon} style={Styles._optionIcon} />
                                <Text style={Styles._optionText}>Gallery</Text>
                            </TouchableOpacity>
                        ):(
                            null
                        )
                    }
                    {
                        onDocClick ? (
                            <TouchableOpacity 
                                onPress={onDocClick}
                                style={Styles._optionView}
                            >
                                <Image source={IMAGES.documentIcon} style={Styles._optionIcon} />
                                <Text style={Styles._optionText}>Document</Text>
                            </TouchableOpacity>
                        ):(
                            null
                        )
                    }
                </View>
            </View>
        </Modal>
    );
}

const Styles = StyleSheet.create({
    _mainContainer:{
        width: WP('100%'),
        height: HP('30%'),
        backgroundColor: COLORS.primaryColor,
        borderTopLeftRadius: WP(RADIUS * 3),
        borderTopRightRadius: WP(RADIUS * 3),
        position: 'absolute',
        bottom: 0,
        padding: WP(SPACING_PERCENT)
    },
    _heading:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.h3),
        color: COLORS.whiteColor,
    },
    _optionMainView:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: WP(SPACING_PERCENT)
    },
    _optionIcon:{
        width: WP('15%'),
        height: WP('15%'),
        resizeMode: 'cover'
    },
    _optionView:{
        alignItems: 'center',
        marginRight: WP(SPACING_PERCENT)
    },
    _optionText:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
        color: COLORS.whiteColor,
        marginTop: WP(SPACING_PERCENT/2)
    },
});

export default PickerModal;