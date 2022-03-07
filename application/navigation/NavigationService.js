/*
    File that will contain all functions related to
    application configurations
*/

/**
 * Function that will go to onboard screen and will reset navigator
 * @param {navigation} navigation 
 */
export const _gotoOnboard = (navigation) => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'onboard' }]
    })
}


/**
 * Function that will go to auth stack and will reset navigator
 * @param {navigation} navigation 
 */
export const _gotoAuthStack = (navigation) => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'auth' }]
    })
}

/**
 * Function that will take user to signup screen
 * @param {navigation} navigation 
 */
export const _gotoSignup = (navigation) => {
    navigation.navigate('signup');
}

/**
 * Function that will take user to reset password screen
 * @param {navigation} navigation 
 */
export const _gotoForgetPassword = (navigation) => {
    navigation.navigate('forgetpassword');
}

/**
 * Function that will take user to view receipt screen screen
 * @param {navigation} navigation 
 */
export const _gotoViewReceipt = (navigation, receiptUrl) => {
    navigation.navigate('apviewreceipt', { receiptUrl: receiptUrl });
}



/**
 * Function that will go to home stack and will reset navigator
 * @param {navigation} navigation 
 */
export const _gotoHomeNavigator = (navigation) => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'homenavigator' }]
    })
}

/**
 * Function that will take user to Account screen
 * @param {navigation} navigation 
 */
export const _gotoAccount = (navigation) => {
    navigation.navigate('accountstack');
}

/**
 * Function that will take user to account tab
 * @param {*} navigation 
 * @param {*} screen 
 */
export const _gotoAccountTab = (navigation, screen) => {
    navigation.navigate(screen);
}

/**
 * Function that will take user to splash screen
 * @param {*} navigation 
 */
export const _gotoSplash = (navigation) => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'splash' }]
    })
}

/**
 * Function that will take user to add bank details screen
 * @param {*} navigation 
 */
export const _gotoAddBankDetails = (navigation, bank, type) => {
    navigation.navigate('addbankdetails', ({ bank: bank, type: type }));
}


/**
 * Function that will take user to add bank details screen
 * @param {*} navigation 
 */
export const _gotoChatstack = (navigation, bank, type) => {
    navigation.navigate('ChatSatck', ({ bank: bank, type: type }));
}

/**
 * Function that will take user to add bank details screen
 * @param {*} navigation 
 */

