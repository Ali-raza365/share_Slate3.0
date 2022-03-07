import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Pdf from 'react-native-pdf';
import Modal from 'react-native-modal';
import { WP, MOBILE_WIDTH, SCREEN_ICON_SIZE, COLORS, SPACING_PERCENT, PLATFORM } from '../theme/config';

const ViewDocModal = ({isVisible, source, onPress}) => {

    const url = 'file://' + source;

    return(
        <Modal
            onBackButtonPress={onPress}
            onBackdropPress={onPress}
            isVisible={isVisible}
            style={{ margin: 0 }}
        >
            <View style={Styles._mainContainer} >
                <Icon 
                    onPress={onPress}
                    name='close'
                    size={WP(SCREEN_ICON_SIZE)}
                    color={COLORS.blackColor}
                    style={Styles._icon}
                />
                <Pdf
                    source={{uri:url}}
                    
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    onPressLink={(uri)=>{
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={Styles._pdf}
                />
            </View>
        </Modal>
    );
}

const Styles = StyleSheet.create({
    _mainContainer:{
        flex: 1,
        backgroundColor: COLORS.whiteColor
    },
    _pdf:{
        flex: 1,
        width: WP(MOBILE_WIDTH),
        height: WP(MOBILE_WIDTH),
    },
    _icon:{
        position: 'absolute',
        right: WP(SPACING_PERCENT),
        top: WP(SPACING_PERCENT*3),
        zIndex: 1,
    },
});

export default ViewDocModal;