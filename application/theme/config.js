import React from 'react';
import {
    Platform,
    Dimensions,
} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';

import AntIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MatIcons from 'react-native-vector-icons/MaterialIcons';
import { _gotoAPAnalytics, _gotoAPApproveTasks, _gotoAPExportInvoices, _gotoAPInvoicePayments, _gotoAPInvoicesTab, _gotoAPNewInvoiceStack, _gotoAPNotificationsTab, _gotoAPReviewTasks, _gotoAPVendor360, _gotoInvoiceAging } from '../navigation/NavigationService';

//CONSTANTS USED IN APP
export const APP_NAME = 'InvoiceMate';
export const PLATFORM = Platform.OS;
export const WP = widthPercentageToDP;
export const HP = heightPercentageToDP;
export const MOBILE_WIDTH = Dimensions.get('window').width;
export const MOBILE_HEIGHT = Dimensions.get('window').height;
export const RADIUS = 3;
export const SPACING = 12;
export const SPINNER_SIZE = 32;
export const FONT = 'TenorSans';
export const BUTTON_HEIGHT = 5;
export const INPUT_HEIGHT = 6;
export const SCREEN_ICON_SIZE = 6;
export const HOME_TAB_ICON_SIZE = 6;
export const TAB_ICON_SIZE = 6;
export const WOC_URL = 'https://test.whatsonchain.com/tx/';
export const BASE64 = {_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=BASE64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
//COLORS USED IN APPLICATION
export const COLORS = {
    primaryColor: '#5A2C66',
    primaryRGB: 'rgba(83,30,220,',
    secondaryColor: '#763A87',
    territoryColor: '#9D4DB3',
    primaryColor2: '#9E2654',
    secondaryColor2: '#BC2E65',
    territoryColor2: '#D34D80',
    lightGrey: '#8C8A9A',
    grey: '#cccccc',
    blackColor: '#000',
    whiteColor: '#ffffff',
    borderColor: '#E7E7E7',
    redColor: '#E6344A',
    greenColor: '#21CE99',
    yellowColor: '#F5BA03',
    circle1: '#9e2654',
    circle2: '#a83c65',
    circle3: '#b15176',
    circle4: '#bb6787',
    circle5: '#c57d98',
    primary_circle1: '#5a2c66',
    primary_circle2: '#6b4175',
    primary_circle3: '#7b5685',
    primary_circle4: '#8c6b94',
};

//FONT SIZES USED IN APP
export const FONT_SIZES = {
    h1: 28,
    h2: 22,
    h3: 18,
    info_1: 16,
    info_2: 14,
};

//FONT SIZES USED IN APP
export const TEXT_SIZES = {
    h1: 7,
    h2: 6,
    h3: 5,
    info_1: 4,
    info_2: 3.5,
};

export const SPACING_PERCENT = 5;

export const TOUCH_ID_CONFIG = {
    title: 'Authentication Required', // Android
    imageColor: COLORS.primaryColor, // Android
    imageErrorColor: COLORS.redColor, // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

export const TOUCH_ID_SUPPORT_CONFIG = {
    unifiedErrors: false,
    passcodeFallback: true
}   

//Invoice Tracking Labels
export const TRACK_LABELS = [
    "Invoice Creation",
    "Initial Review",
    "Account Review",
    "Account Approval",
    "Payment"
];

//MONTHS
export const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Dec',
];

//IMAGES FOR THE APP
export const IMAGES = {
    _splashBg: require('../assets/images/logo/bg.jpg'),
    _white_icon: require('../assets/images/logo/white-icon.png'),
    _original_icon: require('../assets/images/logo/orignal-icon.png'),
    _white_bg: require('../assets/images/logo/white_background.jpg'),
    _original_bg: require('../assets/images/logo/original_background.jpg'),
    _white_appname: require('../assets/images/logo/white-text.png'),
    _original_appname: require('../assets/images/logo/original-text.png'),
    _white_logo: require('../assets/images/logo/white_logo.png'),
    _original_logo: require('../assets/images/logo/original_logo.png'),
    _intro_1: require('../assets/images/intro_1.png'),
    _intro_2: require('../assets/images/intro_2.png'),
    _intro_3: require('../assets/images/intro_3.png'),
    
    pendingIcon: require('../assets/images/Asset_1.png'),
    receivedIcon: require('../assets/images/Asset_4.png'),
    underReviewIcon: require('../assets/images/Asset_3.png'),
    readyForPaymentIcon: require('../assets/images/Asset_2.png'),
    paidIcon: require('../assets/images/Asset_5.png'),
    rejectedIcon: require('../assets/images/Asset_6.png'),
    completeRejected: require('../assets/images/rejected.png'),
    resubmitIcon: require('../assets/images/resubmit.png'),
    underApproval: require('../assets/images/Asset_9.png'),
    underApproval2: require('../assets/images/underApproval_2.png'),
    initialReviewIcon: require('../assets/images/initialReview.png'),
    initialReviewWhiteIcon: require('../assets/images/initialReviewWhite.png'),

    qr_mark: require('../assets/images/qr_mark.png'),
    searching_illustration: require('../assets/images/searching.png'),

    pendingWhiteIcon: require('../assets/images/Asset_1_white.png'),
    receivedWhiteIcon: require('../assets/images/Asset_4_white.png'),
    underReviewWhiteIcon: require('../assets/images/Asset_3_white.png'),
    readyForPaymentWhiteIcon: require('../assets/images/Asset_2_white.png'),
    paidWhiteIcon: require('../assets/images/Asset_5_white.png'),
    rejectedWhiteIcon: require('../assets/images/Asset_6_white.png'),
    underApprovalWhite: require('../assets/images/Asset_9_white.png'),
    underApprovalWhite2: require('../assets/images/underApprovalWhite_2.png'),

    _no_record: require('../assets/images/no_record.png'),

    onboard_1: require('../assets/images/onboard/1.png'),
    onboard_2: require('../assets/images/onboard/2.png'),
    onboard_3: require('../assets/images/onboard/3.png'),
    login: require('../assets/images/login.png'),
    touchId: require('../assets/images/touch-id.png'),
    barcode: require('../assets/images/barcode-qr.png'),
    defaultImage: require('../assets/images/default.png'),
    bulbIcon: require('../assets/images/bulb.png'),
    groupIcon1: require('../assets/images/Group1.png'),
    groupIcon2: require('../assets/images/Group2.png'),
    groupIcon3: require('../assets/images/Group3.png'),
    groupIcon4: require('../assets/images/Group4.png'),
    groupIcon5: require('../assets/images/Group5.png'),
    groupIcon6: require('../assets/images/Group6.png'),
    sentIcon: require('../assets/images/sent.png'),
    systemIcon: require('../assets/images/setting.png'),
    invoice: require('../assets/images/invoice.jpg'),
    cameraIcon: require('../assets/images/camera.png'),
    galleryIcon: require('../assets/images/gallery.png'),
    documentIcon: require('../assets/images/documents.png'),

    _supplierIcon: require('../assets/images/supIcon.png'),
    _apIcon: require('../assets/images/apIcon.png'),
    _invoices_info: require('../assets/images/info.png'),

    //ap export side
    _exportCheckIcon: require('../assets/images/export/check.png'),
    _exportMIcon: require('../assets/images/export/m.png'),
    _exportWIcon: require('../assets/images/export/w.png'),
    _exportPlusIcon: require('../assets/images/export/plus.png'),
    
};

export const REQUESTER_DROPDOWN = [
    {
        value: 'Mark as Reviewed'

    },
    {
        value: 'Correction Required'

    },
    {
        value: 'Mark as Reject'

    }
];

// INVOICE PRIMARY TYPES
export const INVOICE_PRIMARY_TYPES = [
    {label: 'Pre-Payment', value: 0 },
    {label: 'With Receipt', value: 1 },
    {label: 'Petty Cash', value: 1 }
];

// INVOICE SECONDARY TYPES
export const INVOICE_SECONDARY_TYPES = [
    {label: 'Purchase Order', value: 0 },
    {label: 'Expense', value: 1 },
];

// AP HOME
export const _AP_HOME_TABS = [
    {
        key: '0',
        title: 'Create Invoice',
        icon: 
            <IonIcon 
                name='create-outline' 
                size={WP(HOME_TAB_ICON_SIZE*2.5)}
                color={COLORS.whiteColor}
            />,
        moveTo: (navigation)=>{ _gotoAPNewInvoiceStack(navigation) }
    },
    {
        key: '1',
        title: 'Invoices',
        icon: 
            <FeatherIcon 
                name='list' 
                size={WP(HOME_TAB_ICON_SIZE*2.5)}
                color={COLORS.whiteColor}
            />,
        moveTo: (navigation)=>{ _gotoAPInvoicesTab(navigation) }
    }, 
    {
        key: '2',
        title: 'Invoice Aging',
        icon: 
            <FeatherIcon 
                name='file-text' 
                size={WP(HOME_TAB_ICON_SIZE*2.5)}
                color={COLORS.whiteColor}
            />,
        moveTo: (navigation)=>{ _gotoInvoiceAging(navigation) }
    }, 
    {
        key: '3',
        title: 'Vendor 360',
        icon: 
            <FeatherIcon 
                name='user' 
                size={WP(HOME_TAB_ICON_SIZE*2.5)}
                color={COLORS.whiteColor}
            />,
        moveTo: (navigation)=>{ _gotoAPVendor360(navigation) }
    },
    {
        key: '4',
        title: 'Review Tasks',
        icon: 
            <FontistoIcon 
                name='preview' 
                size={WP(HOME_TAB_ICON_SIZE*2.5)}
                color={COLORS.whiteColor}
            />,
        moveTo: (navigation)=>{ _gotoAPReviewTasks(navigation) }
    },
    {
        key: '5',
        title: 'Approve Tasks',
        icon: 
            <IonIcon 
                name='checkmark-done-circle' 
                size={WP(HOME_TAB_ICON_SIZE*2.5)}
                color={COLORS.whiteColor}
            />,
        moveTo: (navigation)=>{ _gotoAPApproveTasks(navigation) }
    },
    
    {
        key: '6',
        title: 'AP Analytics',
        icon: 
            <MatIcons 
                name='analytics' 
                size={WP(HOME_TAB_ICON_SIZE*2.5)}
                color={COLORS.whiteColor}
            />,
        moveTo: (navigation)=>{ _gotoAPAnalytics(navigation) }
    },
    {
        key: '7',
        title: 'Notifications',
        icon: 
            <MatIcons 
                name='notifications-on' 
                size={WP(HOME_TAB_ICON_SIZE*2.5)}
                color={COLORS.whiteColor}
            />,
        moveTo: (navigation)=>{ _gotoAPNotificationsTab(navigation) }
    }, 
];

// AP HOME for ACTION DESK
export const _AP_ACTION_HOME_TABS = [
    {
        key: '0',
        title: 'Vendor 360',
        icon: 
            <FeatherIcon 
                name='user' 
                size={WP(HOME_TAB_ICON_SIZE*2.5)}
                color={COLORS.whiteColor}
            />,
        moveTo: (navigation)=>{ _gotoAPVendor360(navigation) }
    },
    {
        key: '1',
        title: 'Review Tasks',
        icon: 
            <FontistoIcon 
                name='preview' 
                size={WP(HOME_TAB_ICON_SIZE*2.5)}
                color={COLORS.whiteColor}
            />,
        moveTo: (navigation)=>{ _gotoAPReviewTasks(navigation) }
    },
    {
        key: '2',
        title: 'Approve Tasks',
        icon: 
            <IonIcon 
                name='checkmark-done-circle' 
                size={WP(HOME_TAB_ICON_SIZE*2.5)}
                color={COLORS.whiteColor}
            />,
        moveTo: (navigation)=>{ _gotoAPApproveTasks(navigation) }
    },
    {
        key: '3',
        title: 'Export Invoices',
        icon: 
            <AntIcon 
                name='export' 
                size={WP(HOME_TAB_ICON_SIZE*2.5)}
                color={COLORS.whiteColor}
            />,
        moveTo: (navigation)=>{ _gotoAPExportInvoices(navigation) }
    },
    {
        key: '4',
        title: 'Invoice Payments',
        icon: 
            <FeatherIcon 
                name='dollar-sign' 
                size={WP(HOME_TAB_ICON_SIZE*2.5)}
                color={COLORS.whiteColor}
            />,
        moveTo: (navigation)=>{ _gotoAPInvoicePayments(navigation) }
    },
    
    {
        key: '5',
        title: 'AP Analytics',
        icon: 
            <MatIcons 
                name='analytics' 
                size={WP(HOME_TAB_ICON_SIZE*2.5)}
                color={COLORS.whiteColor}
            />,
        moveTo: (navigation)=>{ _gotoAPAnalytics(navigation) }
    },
    {
        key: '6',
        title: 'Notifications',
        icon: 
            <MatIcons 
                name='notifications-on' 
                size={WP(HOME_TAB_ICON_SIZE*2.5)}
                color={COLORS.whiteColor}
            />,
        moveTo: (navigation)=>{ _gotoAPNotificationsTab(navigation) }
    },  
];

//Home Tabs
export const HOME_TABS = [
    {
        key: '0',
        name: 'Profile',
        icon: 
            <MatComIcon 
                name='face-profile' 
                size={WP(HOME_TAB_ICON_SIZE*1.5)}
                color={COLORS.whiteColor}
            />,
        color: '#361a3d',
        screen: 'accountstack',
    },
    {
        key: '1',
        name: 'Dashboard',
        icon: <MatComIcon 
                name='view-dashboard' 
                size={WP(HOME_TAB_ICON_SIZE*1.5)}
                color={COLORS.whiteColor}
            />,
        color: '#3f1f47',
        screen: 'dashboardstack',
    },
    {
        key: '2',
        name: 'Create Invoice',
        icon: 
            <IonIcon 
                name='create-sharp' 
                size={WP(HOME_TAB_ICON_SIZE*1.5)}
                color={COLORS.whiteColor}
            />,
        color: '#482352',
        screen: 'newinvoice',
    },
    {
        key: '3',
        name: 'Invoice Log',
        icon: 
            <FeatherIcon 
                name='list' 
                size={WP(HOME_TAB_ICON_SIZE*1.5)}
                color={COLORS.whiteColor}
            />,
        color: '#51285c',
        screen: 'invoicestack',
    },
    {
        key: '4',
        name: 'Blockchain Verifier',
        icon: 
            <MatComIcon 
                name='shield-key' 
                size={WP(HOME_TAB_ICON_SIZE*1.5)}
                color={COLORS.whiteColor}
            />,
        color: '#5a2c66',
        screen: 'blockchainveriferstack',
    },
    {
        key: '5',
        name: 'Notifications',
        icon: 
            <MatIcons 
                name='notifications-on' 
                size={WP(HOME_TAB_ICON_SIZE*1.5)}
                color={COLORS.whiteColor}
            />,
        color: '#7b5685',
        screen: 'notificationstack',
    },
    {
        key: '6',
        name: 'Query',
        icon: 
            <MatComIcon 
                name='account-question' 
                size={WP(HOME_TAB_ICON_SIZE*1.5)}
                color={COLORS.whiteColor}
            />,
        color: '#9c80a3',
    },
]

//DISCOUNT DROPDOWN DATA
export const DISCOUNT_DROPDOWN = [
    {
        value: 'No Discount',
    }, 
    {
        value: 'Percentage',
    }, 
    {
        value: 'Flat',
    }
];

//TAX DROPDOWN DATA
export const TAX_DROPDOWN = [
    {
        value: 'No Tax',
    }, 
    {
        value: 'Percentage',
    }, 
    {
        value: 'Flat',
    }
];

//PAYMENT METHODS DROPDOWN DATA
export const PAYMENT_METHODS_DROPDOWN = [
    {
        value: 'Cash',
    }, 
    {
        value: 'Cheque',
    }, 
    {
        value: 'Bank',
    },
    {
        value: 'Credit Card',
    },
    {
        value: 'PayPal',
    },
    {
        value: 'Other',
    }
];

//ONBOARD SCREEN DATA
export const ONBOARD_DATA = [
    {
        key: '0',
        title: 'Welcome to InvoiceMate',
        bullets: 
        [{
            key: '0',
            bullet: 'Create & Maintain Vendor Profile',
        },
        {
            key: '1',
            bullet: 'Create, Submit & Track Invoices',
        },
        {
            key: '2',
            bullet: 'View Insights on Invoicing Operations',
        }],
        image: IMAGES._intro_1,
    },
    {
        key: '1',
        title: 'InvoiceMate is powered with MateBot to help you for',
        bullets: 
        [{
            key: '0',
            bullet: 'Easy, Quick & Accurate Invoice Creation',
        },
        {
            key: '1',
            bullet: 'Correspondence & Tracking during Invoice Process',
        }],
        image: IMAGES._intro_2,
    },
    {
        key: '2',
        title: 'InvoiceMate is powered with Blockchain technology for',
        bullets: 
        [{
            key: '0',
            bullet: 'Secure & Transparent Invoicing Processes',
        }],
        image: IMAGES._intro_3
    }
];

//AP Account Screen Tabs
export const AP_ACCOUNT_TABS = [
    {
        key: '0',
        title: 'My Profile',
        icon: 
            <FeatherIcon 
                name='user' 
                size={WP(SCREEN_ICON_SIZE*3)}
                color={COLORS.primaryColor}
            />,
        screen: 'apmyprofile',
    },
    {
        key: '1',
        title: 'Settings',
        icon: 
            <FeatherIcon 
                name='settings' 
                size={WP(SCREEN_ICON_SIZE*3)}
                color={COLORS.primaryColor}
            />,
        screen: 'apsettings',
    },
    {
        key: '2',
        title: 'Support',
        icon: 
            <MatIcons 
                name='contact-support' 
                size={WP(SCREEN_ICON_SIZE*3)}
                color={COLORS.primaryColor}
            />,
        screen: 'apsupport',
    },
    {
        key: '3',
        title: 'About us',
        icon: 
            <MatIcons 
                name='info' 
                size={WP(SCREEN_ICON_SIZE*3)}
                color={COLORS.primaryColor}
            />,
        screen: 'apaboutus',
    },
];

//Account Screen Tabs
export const ACCOUNT_TABS = [
    {
        key: '0',
        title: 'My Profile',
        icon: 
            <FeatherIcon 
                name='user' 
                size={WP(SCREEN_ICON_SIZE*3)}
                color={COLORS.primaryColor}
            />,
        screen: 'profile',
    },
    {
        key: '1',
        title: 'Settings',
        icon: 
            <FeatherIcon 
                name='settings' 
                size={WP(SCREEN_ICON_SIZE*3)}
                color={COLORS.primaryColor}
            />,
        screen: 'settings',
    },
    {
        key: '2',
        title: 'Support',
        icon: 
            <MatIcons 
                name='contact-support' 
                size={WP(SCREEN_ICON_SIZE*3)}
                color={COLORS.primaryColor}
            />,
        screen: 'support',
    },
    {
        key: '3',
        title: 'About us',
        icon: 
            <MatIcons 
                name='info' 
                size={WP(SCREEN_ICON_SIZE*3)}
                color={COLORS.primaryColor}
            />,
        screen: 'aboutus',
    },
];

//Support Tabs
export const SUPPORT_TABS = [
    {
        key: '0',
        title: 'Rate Us',
        icon: 'thumbs-up',
    },
    {
        key: '1',
        title: 'Share With Friend',
        icon: 'share-alt',
    },
    {
        key: '2',
        title: 'Privacy Policy',
        icon: 'shield',
    },
    {
        key: '3',
        title: 'Term Of Service',
        icon: 'file-text',
    },
]

//Dashboard Actions
export const ACTIONS = [
    {
        key: '0',
        icon: IMAGES.sentIcon,
        title: 'Create Invoice',
        screen: 'newinvoice'
    },
    {
        key: '1',
        icon: IMAGES.sentIcon,
        title: 'Revenues',
        screen: 'revenues'
    },
    {
        key: '2',
        icon: IMAGES.sentIcon,
        title: 'Items',
        screen: 'items'
    },
    {
        key: '3',
        icon: IMAGES.sentIcon,
        title: 'Customers',
        screen: 'customers'
    },
    {
        key: '4',
        icon: IMAGES.sentIcon,
        title: 'Reconciliation',
        screen: 'reconciliation'
    },
];

export const DASHBOARD_TABLES = [
    {
        key:'0',
        title: 'Invoices By Count',
        dataset : {
            labels: ["Overdue", "Unpaid", "Ready To Pay"],
            datasets: [
                {
                    data: [200, 200, 300],
                    colors: [
                        (opacity = 1) => COLORS.circle1,
                        (opacity = 1) => COLORS.circle2,
                        (opacity = 1) => COLORS.circle3,
                    ]
                }
            ]
        }
    },
    {
        key:'1',
        title: 'Invoices By Revenue',
        dataset : {
            labels: ["Overdue", "Unpaid", "Ready To Pay"],
            datasets: [
                {
                    data: [200, 200, 300],
                    colors: [
                        (opacity = 1) => COLORS.circle1,
                        (opacity = 1) => COLORS.circle2,
                        (opacity = 1) => COLORS.circle3,
                    ]
                }
            ]
        }
    },
];

export const QUARTERS = [
    {
        key:'0',
        title: 'Q1',
        dataset : {
            labels: ["Overdue", "Unpaid", "Ready To Pay"],
            datasets: [
                {
                    data: [200, 200, 300],
                    colors: [
                        (opacity = 1) => COLORS.circle1,
                        (opacity = 1) => COLORS.circle2,
                        (opacity = 1) => COLORS.circle3,
                    ]
                }
            ]
        }
    },
    {
        key:'1',
        title: 'Q2',
        dataset : {
            labels: ["Overdue", "Unpaid", "Ready To Pay"],
            datasets: [
                {
                    data: [200, 200, 300],
                    colors: [
                        (opacity = 1) => COLORS.circle1,
                        (opacity = 1) => COLORS.circle2,
                        (opacity = 1) => COLORS.circle3,
                    ]
                }
            ]
        }
    },
    {
        key:'2',
        title: 'Q3',
        dataset : {
            labels: ["Overdue", "Unpaid", "Ready To Pay"],
            datasets: [
                {
                    data: [200, 200, 300],
                    colors: [
                        (opacity = 1) => COLORS.circle1,
                        (opacity = 1) => COLORS.circle2,
                        (opacity = 1) => COLORS.circle3,
                    ]
                }
            ]
        }
    },{
        key:'3',
        title: 'Q4',
        dataset : {
            labels: ["Overdue", "Unpaid", "Ready To Pay"],
            datasets: [
                {
                    data: [200, 200, 300],
                    colors: [
                        (opacity = 1) => COLORS.circle1,
                        (opacity = 1) => COLORS.circle2,
                        (opacity = 1) => COLORS.circle3,
                    ]
                }
            ]
        }
    },
];

//Dummy Array
export const DUMMY = [
    {
        key: '0',
    },
    {
        key: '1',
    },
    {
        key: '2',
    },
    {
        key: '3',
    },
    {
        key: '4',
    },
    {
        key: '5',
    },
    {
        key: '6',
    },
    {
        key: '7',
    },
    {
        key: '8',
    },
    {
        key: '9',
    },
    {
        key: '10',
    },
];

export const MESSAGES = {
    EMPTY_EMAIL : "Email is required",
    INVALID_EMAIL : "Email is invalid. Please use correct Email .e.g. abc@abc.abc",
    EMPTY_PASSWORD : "Password is required",
    PASSWORD_VALIDATION : "Password should contain at least 6 characters",
    LOGIN_ERROR: "Email or Password is incorrect. Please try again with correct details",
    INVALID_URL: "URL is invalid",
    EMPTY_CELL_NUMBER: 'Cell Number is required',
    INVALID_CELL_NUMBER: 'INVALID_CELL_NUMBER',
};

export const PLAY_STORE_LINK = 'https://play.google.com/store/apps/details?id=com.spl.invoicemate';
export const PRIVACY_POLICY_LINK = 'https://sites.google.com/view/invoicemate-privacy-policy/';
export const TERMS_CONDITIONS_LINK = 'https://sites.google.com/view/invoicemate-terms-conditions';

