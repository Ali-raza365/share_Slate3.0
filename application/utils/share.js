import Share from 'react-native-share';

import {
    PLAY_STORE_LINK
} from '../theme/config';

/**
 * Function that will share application
 */
export const _shareApplication = () => {
    Share.open({
        title: 'Share application to',
        message: "InvoiceMate Description",
        url: PLAY_STORE_LINK
    })
}