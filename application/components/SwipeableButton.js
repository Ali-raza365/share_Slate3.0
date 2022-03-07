import React from 'react';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SwipeButton from 'rn-swipe-button';
import { BUTTON_HEIGHT, FONT, TEXT_SIZES } from '../theme/config';

const SwipeableButton = ({width, title, titleColor, onSwipeSuccess, backgroundColor, thumbColor}) => {
    
    return(
        <SwipeButton
            shouldResetAfterSuccess={true}
            thumbIconBackgroundColor={thumbColor}
            thumbIconBorderColor={thumbColor}
            railBackgroundColor={backgroundColor}
            railFillBackgroundColor={backgroundColor}
            railBorderColor={backgroundColor}
            railFillBorderColor={backgroundColor}
            title={title}
            titleColor={titleColor}
            titleFontSize={wp(TEXT_SIZES.info_1)}
            titleStyles={{
                fontFamily: FONT,
            }}
            onSwipeSuccess={onSwipeSuccess}
            height={hp(BUTTON_HEIGHT)}
            width={width}
        />
    );
}

export default SwipeableButton;