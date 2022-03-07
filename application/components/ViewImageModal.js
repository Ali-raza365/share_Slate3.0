import React from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

import Modal from 'react-native-modal';
import { WP, MOBILE_WIDTH } from '../theme/config';

const ViewImageModal = ({isVisible, image, onPress}) => {
    return(
        <Modal
            onBackButtonPress={onPress}
            onBackdropPress={onPress}
            isVisible={isVisible}
            style={{ margin: 0 }}
        >
            <TouchableOpacity
                onPress={onPress}
                style={Styles._mainContainer}
            >
                <Image 
                    source={{uri: image}}
                    style={Styles._image}
                />
            </TouchableOpacity>
        </Modal>
    );
}

const Styles = StyleSheet.create({
    _mainContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    _image:{
        width: WP(MOBILE_WIDTH),
        height: MOBILE_WIDTH,
        resizeMode: 'contain',
    },
});

export default ViewImageModal;