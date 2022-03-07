/* 
    File that contains all functions related to
    navigation between screens of the application
*/

/**
 * Function that will redirect user to onboard screen
 * and reset the navigator
 * @param {*} navigation 
 */
export const _gotoOnboardReset = (navigation) => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'onboard' }]
    })
};

/**
 * Action that will take user to auth stack
 * @param {*} navigation 
 */
export const _gotoAuthStack = (navigation) => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'auth' }]
    })
}

/**
 * Function that will redirect user to login screen
 * @param {*} navigation 
 */
export const _gotoScreen = (navigation) => {
    navigation.navigate('login');
}

/**
 * Function that will redirect user to dashboard screen
 * and reset the navigator
 * @param {*} navigation 
 */
export const _gotoHomeReset = (navigation) => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'home' }]
    })
}

/**
 * Function that will redirect user to clicked account
 * tab
 * @param {*} navigation 
 * @param {*} screen 
 */
export const _gotoAccountTab = (navigation, screen) => {
    navigation.navigate(screen);
}

/**
 * Function that will redirect user to clicked support
 * tab
 * @param {*} navigation 
 * @param {*} screen 
 */
export const _gotoSupportTab = (navigation, screen) => {
    navigation.navigate(screen);
}

/**
 * Function that will redirect user to clicked action
 * tab
 * @param {*} navigation 
 * @param {*} screen 
 */
export const _gotoActionTab = (navigation, screen) => {
    navigation.navigate(screen);
}

/**
 * Function that will redirect user to Camera Screen
 * @param {*} navigation 
 */
export const _gotoCamera = (navigation) => {
    navigation.navigate('camera');
}

/**
 * Function that will redirect user to Preview Invoice Screen
 * @param {*} navigation 
 */
export const _gotoPreviewinvoice = (navigation) => {
    navigation.navigate('previewinvoice');
}

/**
 * Function that will redirect user to Account Screen
 * @param {*} navigation 
 */
export const _gotoAccountScreen = (navigation) => {
    navigation.navigate('accountscreen');
}

/**
 * Function that will redirect user to Forget password Screen
 * @param {*} navigation 
 */
export const _gotoForgetPassword = (navigation) => {
    navigation.navigate('forgetpassword');
}

/**
 * Function that will redirect user to Customers Screen
 * @param {*} navigation 
 */
export const _gotoAddClient = (navigation) => {
    navigation.navigate('customers');
}

/**
 * Function that will redirect user to Add Item Screen
 * @param {*} navigation 
 */
export const _gotoAddItem = (navigation, item) => {
    navigation.navigate('additem', ({ item: item }));
}

/**
 * Function that will redirect user to Payments Screen
 * @param {*} navigation 
 */
export const _gotoPayments = (navigation) => {
    navigation.navigate('payments');
}

/**
 * Function that will redirect user to Add payment Screen
 * @param {*} navigation 
 */
export const _gotoAddPayment = (navigation) => {
    navigation.navigate('addpayment');
}

/**
 * Function that will redirect user to Add Photo Screen
 * @param {*} navigation 
 */
export const _gotoAddPhoto = (navigation) => {
    navigation.navigate('addphoto');
}

/**
 * Function that will redirect user to profile screen
 * @param {*} navigation 
 */
export const _gotoProfile = (navigation) => {
    navigation.navigate('myprofile');
}

/**
 * Function that will redirect user to revenues screen
 * @param {*} navigation 
 */
export const _gotoRevenues = (navigation) => {
    navigation.navigate('revenues');
}

/**
 * Function that will redirect user to items screen
 * @param {*} navigation 
 */
export const _gotoItems = (navigation) => {
    navigation.navigate('items');
}

/**
 * Function that will take user to create invoice screen
 * @param {*} navigation 
 */
export const _gotoCreateInvoice = (navigation) => {
    navigation.navigate('newinvoice');
}

/**
 * Function that will take user to customer details
 * @param {*} navigation 
 */
export const _gotoCustomerDetails = (navigation) => {
    navigation.navigate('customerDetails');
}

/**
 * Function that will take user to add attachment screen
 * @param {*} navigation 
 */
export const _gotoAddAttachment = (navigation) => {
    navigation.navigate('addattachment');
}

/**
 * Function that will take user to add bank details screen
 * @param {*} navigation 
 */
export const _gotoAddBankDetails = (navigation, bank) => {
    navigation.navigate('addbankdetails', ({ bank: bank }));
}

