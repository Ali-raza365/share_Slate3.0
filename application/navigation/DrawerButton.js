import React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SCREEN_ICON_SIZE } from '../theme/config';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DrawerButton = ({ style }) => {

    const navigation = useNavigation();

    return (
        <Icon
            onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
            name='menu'
            size={wp(SCREEN_ICON_SIZE)}
            color={COLORS.blackColor}
            style={style}
        />
    );
}

export default DrawerButton;