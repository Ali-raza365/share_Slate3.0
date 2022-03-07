import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import Modal from 'react-native-modal';
import { Dropdown } from 'react-native-material-dropdown';
import { COLORS, FONT, RADIUS, SPACING_PERCENT, TEXT_SIZES, WP } from '../theme/config';
import { Button, SimpleInput } from '.';

const StatusModal = ({heading, visibility, statuses, onStatusChange, currentStatus, comment, onCommentChange, onSubmitClick, onCloseClick, validationError, markButtonTitle}) => {
    return(
        <Modal
            onBackButtonPress={onCloseClick}
            onBackdropPress={onCloseClick}
            isVisible={visibility}
        >
            <View style={Styles._mainContainer}>
                <View style={Styles._modalHeaderView}>
                    <Text style={Styles._modalHeading}>{heading}</Text>
                </View>
                <View style={Styles._inputContainer}>
                    <Dropdown
                        useNativeDriver={true}
                        label='Select Action'
                        data={statuses}
                        value={currentStatus}
                        fontSize={WP(TEXT_SIZES.info_1)}
                        labelFontSize={WP(TEXT_SIZES.info_1)}
                        selectedItemColor={COLORS.primaryColor}
                        onChangeText={onStatusChange}
                        itemTextStyle={{
                            fontFamily: FONT,
                            fontSize: WP(TEXT_SIZES.info_1),
                            color: COLORS.blackColor
                        }}
                    />
                    <SimpleInput 
                        placeholder='Comment'
                        value={comment}
                        onChangeText={onCommentChange}
                        style={{ marginTop: WP(SPACING_PERCENT/2) }}
                    />
                    <View style={Styles._btnView}>
                        <Button 
                            width={'45%'}
                            onPress={onCloseClick}
                            title='Close'
                            titleColor={COLORS.whiteColor}
                            backgroundColor={COLORS.lightGrey}
                        />
                        <Button 
                            width={'45%'}
                            onPress={onSubmitClick}
                            title={markButtonTitle ? markButtonTitle : 'Mark'}
                            titleColor={COLORS.whiteColor}
                            backgroundColor={COLORS.primaryColor}
                        />
                    </View>
                    {
                        validationError ? (
                            <Text style={Styles._validationError}>{validationError}</Text>
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
    _mainContainer: {
        borderRadius: WP(RADIUS),
        padding: WP(SPACING_PERCENT/2),
        backgroundColor: COLORS.whiteColor,
    },
    _modalHeaderView:{
        borderRadius: WP(RADIUS),
        backgroundColor: COLORS.primaryColor,
        padding: WP(SPACING_PERCENT),
        position: 'absolute',
        top: -WP('7%'),
        left: WP('4%'),
    },
    _modalHeading:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
        color: COLORS.whiteColor,
    },
    _inputContainer:{
        padding: WP(SPACING_PERCENT/2),
        marginTop: WP(SPACING_PERCENT)
    },
    _btnView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: WP(SPACING_PERCENT)
    },
    _validationError:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
        color: COLORS.yellowColor,
        marginTop: WP(SPACING_PERCENT/2),
    },
})

export default StatusModal;