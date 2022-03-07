/*
    File that contains actions related to login page
*/

import {
    ON_LOGIN_EMAIL_CHANGE,
    ON_LOGIN_PASSWORD_CHANGE,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGIN_LOADING,
    ON_BANK_NAME_CHANGE,
    ON_BANK_IBAN_CHANGE,
    ON_BANK_ACCOUNT_CHANGE,
    ON_BANK_ADDRESS_CHANGE,
    ADD_BANK_LOADING,
    ADD_BANK_SUCCESS,
    REMOVE_BANK_LOADING,
    REMOVE_BANK_SUCCESS,
    ADD_BANK_FAILED,
    REMOVE_BANK_FAILED,
    ON_BANK_CODE_CHANGE,
    UPDATE_BANK_LOADING,
    CHECK_USER_LOADING,
    CHECK_USER_SUCCESS,
    CHECK_USER_FAILED,
    LOGOUT,
    ON_DOC_TITLE_CHANGE,
    ON_DOC_DESCRIPTION_CHANGE,
    ON_DOC_FILE_UPLOAD,
    ON_DOC_FILE_REMOVE,
    ADD_DOC_LOADING,
    ADD_DOC_SUCCESS,
    ADD_DOC_FAILED,
    UPDATE_DOC_LOADING,
    UPDATE_DOC_SUCCESS,
    UPDATE_DOC_FAILED,
    REMOVE_DOC_LOADING,
    REMOVE_DOC_SUCCESS,
    REMOVE_DOC_FAILED,
    ON_VENDOR_NAME_CHANGE,
    ON_DISPLAY_NAME_CHANGE,
    ON_LICENSE_NUMBER_CHANGE,
    ON_CELL_NUMBER_CHANGE,
    ON_EMAIL_CHANGE,
    ON_REMARKS_CHANGE,
    UPDATE_PROFILE_LOADING,
    UPDATE_PROFILE_FAILED,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_BANK_FAILED,
    UPDATE_BANK_SUCCESS,
    ON_SIGNUP_VENDOR_NAME_CHANGE,
    ON_SIGNUP_DISPLAY_NAME_CHANGE,
    ON_SIGNUP_CELL_NUMBER_CHANGE,
    ON_SIGNUP_EMAIL_CHANGE,
    ON_SIGNUP_OTP_CHANGE,
    ON_SIGNUP_PASSWORD_CHANGE,
    ON_SIGNUP_CONFIRM_PASSWORD_CHANGE,
    SIGNUP_INFO_LOADING,
    SIGNUP_INFO_FAILED,
    SIGNUP_INFO_SUCCESS,
    SIGNUP_OTP_LOADING,
    SIGNUP_OTP_FAILED,
    SIGNUP_OTP_SUCCESS,
    SIGNUP_SET_PASS_LOADING,
    SIGNUP_SET_PASS_FAILED,
    SIGNUP_SET_PASS_SUCCESS,
    ON_RESET_EMAIL_CHANGE,
    RESET_LOADING,
    RESET_SUCCESS,
    RESET_FAILED,
    ON_RESET_OTP_CHANGE,
    RESET_OTP_LOADING,
    RESET_OTP_SUCCESS,
    RESET_OTP_FAILED,
    ON_RESET_PASSWORD_CHANGE,
    ON_RESET_CONFIRM_PASSWORD_CHANGE,
    RESET_PASSWORD_LOADING,
    RESET_PASSWORD_FAILED,
    RESET_PASSOWRD_SUCCESS,
    RESEND_OTP_LOADING,
    RESEND_OTP_FAILED,
    RESEND_OTP_SUCCESS,
    ON_SIGNUP_VENDOR_SITE_CHANGE,
    ON_VENDOR_SITE_CHANGE,
    ON_PROFILE_LOGO_UPLOAD,
    LOGO_UPLOAD_LOADING,
    LOGO_REMOVE_LOADING,
    ON_PROFILE_LOGO_REMOVE,
    ON_LOGO_CHANGE,
    FETCH_NOTIFICATION_LOADING,
    FETCH_NOTIFICATION_FAILED,
    FETCH_NOTIFICATION_SUCCESS,
    SET_FCM_FAILED,
    SET_FCM_SUCCESS
} from "./user_types";

import {
    ADD_BANK_API,
    LOGIN_API,
    UPDATE_PROFILE_API,
    REMOVE_BANK_API,
    UPDATE_BANK_API,
    ADD_DOC_API,
    UPDATE_DOC_API,
    REMOVE_DOC_API,
    CHECK_USER_API,
    SIGN_UP_API,
    OTP_VALIDATION_API,
    SET_PASSWORD_API,
    RESET_PASSWORD_API,
    RESEND_OTP_API,
    NOTIFICATION_API,
    UPLOAD_LOGO_API,
    REMOVE_LOGO_API,
    SET_FCM_API,
    DELETE_FCM,
} from '../../../api/apis';
import axios from "axios";
import { _gotoAuthStack, _gotoHomeNavigator, _gotoLogin, _gotoOTP, _gotoResetOTP, _gotoSetPassword, _gotoSetResetPassword, _gotoSplash } from "../../../navigation/NavigationService";
import { PLATFORM } from "../../../theme/config";
import { _getItem, _setItem } from "../../../utils/async";
// import { _fetchCustomers } from "../customers/customer_actions";
// import { _fetchAllInvoices } from "../invoices/invoices_actions";

/**
 * Action for email input handler
 * @param {*} email 
 */
export const _onEmailTextChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_LOGIN_EMAIL_CHANGE,
            text: text
        })
    });
};

/**
 * Action for password input handler
 * @param {*} password 
 */
export const _onPasswordTextChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_LOGIN_PASSWORD_CHANGE,
            text: text
        })
    });
};

/**
 * Doing Login
 * @param {Object} details 
 * @param {Object} fcmDetails
 * @param {Object} navigation
 */
export const _doingLogin = (details, fcmDetails, navigation) => {
    return (async (dispatch) => {

        dispatch({
            type: LOGIN_LOADING,
        });

        await axios({
            method: 'POST',
            url: LOGIN_API,
            data: details,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {

                // dispatch(_fetchCustomers(response.data.token));
                // dispatch(_fetchAllInvoices(response.data.token));

                axios({
                    method: 'GET',
                    url: NOTIFICATION_API + response.data.isVendor.level1.email,
                    headers: {
                        cooljwt: response.data.token,
                    }
                })
                    .then(async (notifResponse) => {

                        await _setItem('type', 'supplier')
                            .then(async () => {
                                await _setItem('logout', '0')
                                    .then(async () => {
                                        await _setItem('supemail', details.email)
                                            .then(async () => {
                                                await _setItem('suppassword', details.password)
                                                    .then(async () => {
                                                        await _setItem('token', response.data.token)
                                                            .then(async () => {

                                                                console.log(response.data.token);

                                                                await axios({
                                                                    method: 'POST',
                                                                    url: SET_FCM_API,
                                                                    data: fcmDetails,
                                                                    headers: {
                                                                        cooljwt: response.data.token
                                                                    }
                                                                })
                                                                    .then(async (profileDetails) => {

                                                                        await _getItem('email')
                                                                            .then(async (value) => {
                                                                                if (value && value != details.email) {
                                                                                    await _setItem('suptouchid', '0')
                                                                                        .then(() => { })
                                                                                        .catch((err) => {
                                                                                            dispatch({
                                                                                                type: LOGIN_FAILED,
                                                                                            });
                                                                                            alert(err);
                                                                                        })
                                                                                }
                                                                            })
                                                                            .catch((err) => {
                                                                                dispatch({
                                                                                    type: LOGIN_FAILED,
                                                                                });
                                                                                alert(err);
                                                                            })

                                                                        const userObj = Object.assign({}, response.data);
                                                                        userObj.isVendor.level1 = profileDetails.data.level1;

                                                                        dispatch({
                                                                            type: LOGIN_SUCCESS,
                                                                            token: response.data.token,
                                                                            user: userObj,
                                                                            banks: response.data.isVendor.level3.bankDetails,
                                                                            docs: response.data.isVendor.level2.attachments,
                                                                            profile: response.data.isVendor.level1,
                                                                            notifications: notifResponse.data.reverse(),
                                                                        });

                                                                        setTimeout(() => {
                                                                            _gotoHomeNavigator(navigation);
                                                                        }, 100);
                                                                    })
                                                                    .catch((err) => {
                                                                        dispatch({
                                                                            type: LOGIN_FAILED,
                                                                        });
                                                                        setTimeout(() => {
                                                                            if (err.response) {
                                                                                if (err.response.status == 413)
                                                                                    alert('Attachment size should be less than 1MB');
                                                                                else
                                                                                    alert('Something is going wrong while updating FCM. Please try again');
                                                                            }
                                                                            else if (err.request) {
                                                                                alert('Server is not responding. Please try again');
                                                                            }
                                                                            else {
                                                                                alert(err);
                                                                            }
                                                                        }, 100);
                                                                    })
                                                            })
                                                            .catch((err) => {
                                                                dispatch({
                                                                    type: LOGIN_FAILED,
                                                                });
                                                                setTimeout(() => {
                                                                    alert(err);
                                                                }, 100);
                                                            });
                                                    })
                                                    .catch((err) => {
                                                        dispatch({
                                                            type: LOGIN_FAILED,
                                                        });
                                                        setTimeout(() => {
                                                            alert(err);
                                                        }, 100);
                                                    })
                                            })
                                            .catch((err) => {
                                                dispatch({
                                                    type: LOGIN_FAILED,
                                                });
                                                setTimeout(() => {
                                                    alert(err);
                                                }, 100);
                                            })
                                    })
                                    .catch((err) => {
                                        dispatch({
                                            type: LOGIN_FAILED,
                                        });
                                        setTimeout(() => {
                                            alert(err);
                                        }, 100);
                                    })
                            })
                            .catch((err) => {
                                dispatch({
                                    type: LOGIN_FAILED,
                                });
                                alert(err);
                            })

                    })
                    .catch((err) => {
                        dispatch({
                            type: LOGIN_FAILED,
                        });
                        setTimeout(() => {
                            if (err.response) {
                                if (err.response.status == 413)
                                    alert('Attachment size should be less than 1MB');
                                else
                                    alert('Something is going wrong while fetching notifications. Please try again');
                            }
                            else if (err.request) {
                                alert('Server is not responding. Please try again');
                            }
                            else {
                                alert(err);
                            }
                        }, 100);
                    });
            })
            .catch((err) => {
                dispatch({
                    type: LOGIN_FAILED,
                });
                setTimeout(() => {
                    if (err.response) {
                        if (err.response.status == 413)
                            alert('Attachment size should be less than 1MB');
                        else if (err.response.data)
                            alert(err.response.data);
                        else
                            alert("Please check your given details and try again");
                    }
                    else if (err.request) {
                        alert('Server is not responding. Please try again');
                    }
                    else {
                        alert(err);
                    }
                }, 100);
            });
    });
}

/**
 * Action that will check user logged in status
 * @param {string} token 
 * @param {navigation} navigation
 */
export const _checkUser = (details, fcmDetails, navigation) => {
    return (async (dispatch) => {
        dispatch({
            type: CHECK_USER_LOADING,
        });

        await axios({
            method: 'POST',
            url: LOGIN_API,
            data: details,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {

                // dispatch(_fetchCustomers(response.data.token));
                // dispatch(_fetchAllInvoices(response.data.token));

                axios({
                    method: 'GET',
                    url: NOTIFICATION_API + response.data.isVendor.level1.email,
                    headers: {
                        cooljwt: response.data.token,
                    }
                })
                    .then((notifResponse) => {

                        axios({
                            method: 'POST',
                            url: SET_FCM_API,
                            headers: {
                                cooljwt: response.data.token,
                            },
                            data: fcmDetails,
                        })
                            .then(async (profileDetails) => {

                                const userObj = Object.assign({}, response.data);
                                userObj.isVendor.level1 = profileDetails.data.level1;

                                await _setItem('logout', '0')
                                    .then(async () => {
                                        await _setItem('type', 'supplier')
                                            .then(() => {
                                                dispatch({
                                                    type: CHECK_USER_SUCCESS,
                                                    token: response.data.token,
                                                    user: userObj,
                                                    banks: response.data.isVendor.level3.bankDetails,
                                                    docs: response.data.isVendor.level2.attachments,
                                                    profile: response.data.isVendor.level1,
                                                    notifications: notifResponse.data.reverse(),
                                                });

                                                if (navigation != null) {
                                                    setTimeout(() => {
                                                        _gotoHomeNavigator(navigation);
                                                    }, 100);
                                                }
                                            })
                                            .catch((err) => {
                                                dispatch({
                                                    type: CHECK_USER_FAILED,
                                                });
                                                alert(err);
                                            })
                                    })
                                    .catch((err) => {
                                        dispatch({
                                            type: CHECK_USER_FAILED,
                                        });
                                        alert(err);
                                    })
                            })
                            .catch((err) => {
                                dispatch({
                                    type: CHECK_USER_FAILED,
                                });
                                setTimeout(() => {
                                    if (err.response) {
                                        if (err.response.status == 413)
                                            alert('Attachment size should be less than 1MB');
                                        else
                                            alert('Something is going wrong while updating FCM. Please try again');
                                    }
                                    else if (err.request) {
                                        alert('Server is not responding. Please try again');
                                    }
                                    else {
                                        alert(err);
                                    }
                                }, 100);
                            });
                    })
                    .catch((err) => {
                        dispatch({
                            type: CHECK_USER_FAILED,
                        });
                        setTimeout(() => {
                            if (err.response) {
                                if (err.response.status == 413)
                                    alert('Attachment size should be less than 1MB');
                                else
                                    alert('Something is going wrong while fetching notifications. Please try again');
                            }
                            else if (err.request) {
                                alert('Server is not responding. Please try again');
                            }
                            else {
                                alert(err);
                            }
                        }, 100);
                    });
            })
            .catch((err) => {
                dispatch({
                    type: CHECK_USER_FAILED,
                });
                setTimeout(() => {
                    if (err.response) {
                        if (err.response.status == 413)
                            alert('Attachment size should be less than 1MB');
                        else
                            alert('Something is going wrong while relogin. Please try again');
                    }
                    else if (err.request) {
                        alert('Server is not responding. Please try again');
                    }
                    else {
                        alert(err);
                    }
                    console.log(err.response);
                }, 100);
            })
    });
}

/**
 * Action that will log out user
 */
export const _loggingOut = (details, token, navigation) => {
    return (async (dispatch) => {

        await _setItem('logout', '1')
            .then(async () => {
                dispatch({
                    type: LOGOUT
                });

                setTimeout(() => {
                    _gotoSplash(navigation);
                }, 100);
            })
            .catch((err) => {
                alert(err);
            });
        // axios({
        //     method: 'DELETE',
        //     url: DELETE_FCM,
        //     data: details,
        //     headers:{
        //         cooljwt: token,
        //     }
        // })
        // .then(async()=>{

        // })
        // .catch((err)=>{
        //     setTimeout(() => {
        //         if (err.response) {
        //             if(err.response.status == 413)
        //                 alert('Attachment size should be less than 1MB');
        //             else if(err.response.data)
        //                 alert(err.response.data);
        //             else
        //                 alert('Something is going wrong while relogin. Please try again');
        //         } 
        //         else if (err.request) {
        //             alert('Server is not responding. Please try again');
        //         } 
        //         else {
        //             alert(err);
        //         }
        //         console.log(err.response);
        //     }, 100);
        // })
    })
}

/****************** BANK DETAILS STARTS ******************/
/**
 * Action for bank name input handler
 * @param {string} text 
 */
export const _onBankNameChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_BANK_NAME_CHANGE,
            text: text,
        })
    })
}
/**
 * Action for bank IBAN input handler
 * @param {string} text 
 */
export const _onBankIBANChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_BANK_IBAN_CHANGE,
            text: text,
        })
    })
}
/**
 * Action for bank Account # input handler
 * @param {string} text 
 */
export const _onBankAccountChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_BANK_ACCOUNT_CHANGE,
            text: text,
        })
    })
}
/**
 * Action for bank Code input handler
 * @param {string} text 
 */
export const _onBankCodeChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_BANK_CODE_CHANGE,
            text: text,
        })
    })
}
/**
 * Action for bank address input handler
 * @param {string} text 
 */
export const _onBankAddressChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_BANK_ADDRESS_CHANGE,
            text: text,
        })
    })
}

/**
 * Action that will add bank
 * @param {Object} details 
 * @param {String} token 
 * @param {Object} user
 * @param {navigation} navigation 
 */
export const _addBank = (details, token, user, navigation, type) => {
    return ((dispatch) => {
        dispatch({
            type: ADD_BANK_LOADING
        });

        axios({
            method: 'POST',
            url: "https://lite.invoicemate.net/api//users/paymentinfo",
            headers: {
                authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWUxYjFhYzExNjY0Njc5MTA1YTA4MjYiLCJlbWFpbCI6Im1pYW5oYWlkZXI4MjgzQGdtYWlsLmNvbSIsIm5hbWUiOiJBbGkgSGFpZGVyIiwiaXNBZG1pbiI6ZmFsc2UsImlkIjoiNjFlMWIxYWMxMTY2NDY3OTEwNWEwODI2IiwidXNlcm5hbWUiOiJBbGkiLCJpc0xvZ2luIjpmYWxzZSwiaWF0IjoxNjQyMjQ5ODU2fQ.r0zMdBsHhrLRWoWUeaCAcBw7yYdeST2jsXDHBA2cncs"
            },
            data: details
        })
            .then((response) => {
                console.log({ response })
                // let banks = response.data.result;
                // let userCopy = Object.assign({}, user);

                //Reversing Banks
                // banks = banks.reverse();

                //Updating Local User Object
                // userCopy.isVendor.level3.bankDetails = banks;

                dispatch({
                    type: ADD_BANK_SUCCESS,
                    banks: [],
                    // user: userCopy,
                })

                navigation.goBack();

                setTimeout(() => {
                    alert(type + ' Account has been added');
                }, 100);

            })
            .catch((err) => {
                dispatch({
                    type: ADD_BANK_FAILED,
                });
                setTimeout(() => {
                    console.log(err.message)
                    if (err.response) {
                        if (err.response.status == 413)
                            alert('Attachment size should be less than 1MB');
                        else if (err.response.status == 400)
                            alert(err.response.data.msg);
                        else
                            alert('Something is going wrong while adding bank. Please try again');
                    }
                    else if (err.request) {
                        alert('Server is not responding. Please try again');
                    }
                    else {
                        alert(err);
                    }
                }, 100);
            })
    });
}

/**
 * Action that will update bank
 * @param {Object} details 
 * @param {String} token 
 * @param {Object} user
 * @param {navigation} navigation 
 */
export const _updateBank = (details, token, user, navigation) => {
    return ((dispatch) => {
        dispatch({
            type: UPDATE_BANK_LOADING
        });

        axios({
            method: 'PUT',
            url: UPDATE_BANK_API,
            headers: {
                cooljwt: token,
            },
            data: details
        })
            .then((response) => {

                let banks = response.data.result[0].level3.bankDetails;
                let userCopy = Object.assign({}, user);

                //Reversing Banks
                banks = banks.reverse();

                userCopy.isVendor.level3 = response.data.result[0].level3;
                userCopy.isVendor.level3.bankDetails = banks;

                dispatch({
                    type: UPDATE_BANK_SUCCESS,
                    banks: banks,
                    user: userCopy,
                });

                navigation.goBack();

                setTimeout(() => {
                    alert("Bank has been updated");
                }, 100);

            })
            .catch((err) => {
                dispatch({
                    type: UPDATE_BANK_FAILED,
                });
                setTimeout(() => {
                    if (err.response) {
                        if (err.response.status == 413)
                            alert('Attachment size should be less than 1MB');
                        else
                            alert('Something is going wrong while updating Bank. Please try again');
                    }
                    else if (err.request) {
                        alert('Server is not responding. Please try again');
                    }
                    else {
                        alert(err);
                    }
                }, 100);
            })

    });
}

/**
 * Action that will remove bank
 * @param {Object} details 
 * @param {Array} banks 
 */
export const _removeBank = (details, user, token) => {
    return ((dispatch) => {
        dispatch({
            type: REMOVE_BANK_LOADING
        });

        axios({
            method: 'DELETE',
            url: REMOVE_BANK_API,
            headers: {
                cooljwt: token,
            },
            data: details
        })
            .then((response) => {

                let banks = response.data.isUser.level3.bankDetails;
                let userCopy = Object.assign({}, user);

                //Reversing Banks
                banks = banks.reverse();

                //Updating Local User Object
                userCopy.isVendor.level3 = response.data.isUser.level3;
                userCopy.isVendor.level3.bankDetails = banks;

                dispatch({
                    type: REMOVE_BANK_SUCCESS,
                    banks: banks,
                    user: userCopy,
                })

                setTimeout(() => {
                    alert('Bank has been deleted');
                }, 100);

            })
            .catch((err) => {
                dispatch({
                    type: REMOVE_BANK_FAILED,
                });
                setTimeout(() => {
                    if (err.response) {
                        if (err.response.status == 413)
                            alert('Attachment size should be less than 1MB');
                        else
                            alert('Something is going wrong while removing Bank. Please try again');
                    }
                    else if (err.request) {
                        alert('Server is not responding. Please try again');
                    }
                    else {
                        alert(err);
                    }
                }, 100);
                console.log(err.response);
            })
    });
}
/****************** BANK DETAILS ENDS ******************/


/****************** DOCS DETAILS STARTS ******************/

/**
 * Action for doc title input handler
 * @param {string} text 
 */
export const _onDocTitleChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_DOC_TITLE_CHANGE,
            text: text
        })
    });
}
/**
 * Action for doc description input handler
 * @param {string} text 
 */
export const _onDocDescriptionChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_DOC_DESCRIPTION_CHANGE,
            text: text
        })
    });
}
/**
 * Action for doc file upload
 * @param {string} file 
 * @param {string} filename 
 */
export const _onDocFileUpload = (file, filename) => {
    return ((dispatch) => {
        dispatch({
            type: ON_DOC_FILE_UPLOAD,
            file: file,
            filename: filename,
        })
    });
}
/**
 * Action for doc file remove
 */
export const _onDocFileRemove = () => {
    return ((dispatch) => {
        dispatch({
            type: ON_DOC_FILE_REMOVE,
        })
    });
}

/**
 * Action that will add document
 * @param {Object} details 
 * @param {String} token 
 * @param {Object} user
 * @param {Object} navigation 
 */
export const _addDoc = (details, token, user, navigation) => {
    return ((dispatch) => {

        dispatch({
            type: ADD_DOC_LOADING
        });


        let detailsCopy = Object.assign({}, details);
        const uploadUri = PLATFORM === 'ios' ? detailsCopy.attachment.replace('file://', '') : detailsCopy.attachment;
        detailsCopy.attachment = uploadUri;

        let form = new FormData();
        form.append('attachmentTitle', detailsCopy.attachmentTitle);
        form.append('discription', detailsCopy.discription);
        form.append('attachment', {
            uri: detailsCopy.attachment,
            name: detailsCopy.filename,
            type: '*/*'
        })

        axios({
            method: 'POST',
            url: ADD_DOC_API,
            headers: {
                cooljwt: token,
            },

            data: form,
        })
            .then((response) => {

                let docs = response.data.result;
                let userCopy = Object.assign({}, user);

                //Reversing Docs
                docs = docs.reverse();

                userCopy.isVendor.level2.attachments = docs;

                dispatch({
                    type: ADD_DOC_SUCCESS,
                    docs: docs,
                    user: userCopy,
                });

                navigation.goBack();

                setTimeout(() => {
                    alert("Dcoument has been added");
                }, (100));

            })
            .catch((err) => {
                dispatch({
                    type: ADD_DOC_FAILED,
                });
                setTimeout(() => {
                    if (err.response) {
                        if (err.response.status == 413)
                            alert('Attachment size should be less than 1MB');
                        else
                            alert('Please check your given details and try again');
                    }
                    else if (err.request) {
                        alert('Server is not responding. Please try again');
                    }
                    else {
                        alert(err);
                    }
                }, 100);
            })
    });
}

/**
 * Action that will update document
 * @param {Object} details 
 * @param {Array} docs 
 * @param {navigation} navigation 
 */
export const _updateDoc = (details, token, user, navigation) => {
    return ((dispatch) => {

        dispatch({
            type: UPDATE_DOC_LOADING
        });

        axios({
            method: 'PUT',
            url: UPDATE_DOC_API,
            headers: {
                cooljwt: token,
            },
            data: details,
        })
            .then((response) => {

                let level2 = response.data.result.level2;
                let docs = response.data.result.level2.attachments;
                let userCopy = Object.assign({}, user);

                //Reversing Docs
                docs = docs.reverse();

                userCopy.isVendor.level2 = level2;
                userCopy.isVendor.level2.attachments = docs;

                dispatch({
                    type: UPDATE_DOC_SUCCESS,
                    docs: docs,
                    user: userCopy,
                });

                navigation.goBack();

                setTimeout(() => {
                    alert("Dcoument has been updated");
                }, (100));
            })
            .catch((err) => {
                dispatch({
                    type: UPDATE_DOC_FAILED,
                });
                setTimeout(() => {
                    if (err.response) {
                        if (err.response.status == 413)
                            alert('Attachment size should be less than 1MB');
                        else
                            alert('Please check your given details and try again');
                    }
                    else if (err.request) {
                        alert('Server is not responding. Please try again');
                    }
                    else {
                        alert(err);
                    }
                }, 100);
                console.log(err.response);
            })
    });
}

/**
 * Action that will remove doc
 * @param {Object} details 
 * @param {Object} user 
 * @param {String} token
 */
export const _removeDoc = (details, user, token) => {
    return ((dispatch) => {
        dispatch({
            type: REMOVE_DOC_LOADING
        });

        axios({
            method: 'DELETE',
            url: REMOVE_DOC_API,
            headers: {
                cooljwt: token,
            },
            data: details
        })
            .then((response) => {
                let level2 = response.data.isUser.level2;
                let docs = level2.attachments;

                let userCopy = Object.assign({}, user);

                //Reversing Docs
                docs = docs.reverse();

                userCopy.isVendor.level2 = level2;
                userCopy.isVendor.level2.attachments = docs;

                dispatch({
                    type: REMOVE_DOC_SUCCESS,
                    docs: docs,
                    user: userCopy,
                });

                setTimeout(() => {
                    alert('Document has been deleted');
                }, 100);

            })
            .catch((err) => {
                dispatch({
                    type: REMOVE_DOC_FAILED,
                });
                setTimeout(() => {
                    alert(err);
                }, 100);
            })
    });
}

/****************** DOCS DETAILS ENDS ******************/

/****************** PROFILE DETAILS STARTS ******************/
/**
 * Action for vendor name
 * @param {string} text 
 */
export const _onVendorNameChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_VENDOR_NAME_CHANGE,
            text: text
        });
    })
}
/**
 * Action for display name
 * @param {string} text 
 */
export const _onDisplayNameChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_DISPLAY_NAME_CHANGE,
            text: text
        });
    })
}

/**
 * Action for license number
 * @param {string} text 
 */
export const _onLicenseNumberChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_LICENSE_NUMBER_CHANGE,
            text: text
        });
    })
}

/**
 * Action for cell number
 * @param {string} text 
 */
export const _onCellNumberChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_CELL_NUMBER_CHANGE,
            text: text
        });
    })
}

/**
 * Action for vendor site
 * @param {string} text 
 */
export const _onVendorSiteChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_VENDOR_SITE_CHANGE,
            text: text
        });
    })
}

/**
 * Action for email
 * @param {string} text 
 */
export const _onEmailChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_EMAIL_CHANGE,
            text: text
        });
    })
}

/**
 * Action for remarks
 * @param {string} text 
 */
export const _onRemarksChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_REMARKS_CHANGE,
            text: text
        });
    })
}

/**
 * Action to update profile
 * @param {Object} details 
 * @param {Object} user 
 * @param {String} token 
 */
export const _updateProfile = (details, user, token) => {
    return ((dispatch) => {
        dispatch({
            type: UPDATE_PROFILE_LOADING
        });

        axios({
            method: 'PUT',
            url: UPDATE_PROFILE_API,
            data: details,
            headers: {
                cooljwt: token
            }
        })
            .then((response) => {

                let copyUser = Object.assign({}, user);

                copyUser.isVendor.level1 = response.data.result;

                dispatch({
                    type: UPDATE_PROFILE_SUCCESS,
                    user: copyUser,
                    profile: response.data.result,
                });

                setTimeout(() => {
                    alert('Profile has been updated');
                }, 100);
            })
            .catch((err) => {
                dispatch({
                    type: UPDATE_PROFILE_FAILED,
                });
                setTimeout(() => {
                    if (err.response) {
                        if (err.response.status == 413)
                            alert('Attachment size should be less than 1MB');
                        else
                            alert('Please check your given details and try again');
                    }
                    else if (err.request) {
                        alert('Server is not responding. Please try again');
                    }
                    else {
                        alert(err);
                    }
                }, 100);
            })

    });
}

/****************** PROFILE DETAILS ENDS ******************/

/****************** SIGNUP INFO STARTS ******************/
/**
 * Action for signup vendor name input
 * @param {String} text 
 */
export const _onSignupVendorNameChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_SIGNUP_VENDOR_NAME_CHANGE,
            text: text
        })
    })
}

/**
 * Action for signup display name input
 * @param {String} text 
 */
export const _onSignupDisplayNameChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_SIGNUP_DISPLAY_NAME_CHANGE,
            text: text
        })
    })
}

/**
 * Action for signup cell number input
 * @param {String} text 
 */
export const _onSignupCellNumberChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_SIGNUP_CELL_NUMBER_CHANGE,
            text: text
        })
    })
}

/**
 * Action for signup vendor site input
 * @param {String} text 
 */
export const _onSignupVendorSiteChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_SIGNUP_VENDOR_SITE_CHANGE,
            text: text
        })
    })
}

/**
 * Action for signup email input
 * @param {String} text 
 */
export const _onSignupEmailChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_SIGNUP_EMAIL_CHANGE,
            text: text
        })
    })
}

/**
 * Action that will send OTP and navigate to OTP screen
 * @param {Object} details 
 * @param {Object} navigation 
 */
export const _onInfoSigningUp = (details, navigation) => {
    return ((dispatch) => {
        dispatch({
            type: SIGNUP_INFO_LOADING,
        });

        axios({
            method: 'POST',
            url: SIGN_UP_API,
            data: details,
        })
            .then(async (response) => {

                await _setItem('signup_activation', '0')
                    .then(async () => {
                        await _setItem('signup_email', details.email)
                            .then(async () => {
                                await _setItem('signup_screen', 'otp')
                                    .then(() => {
                                        dispatch({
                                            type: SIGNUP_INFO_SUCCESS,
                                            response: response.data,
                                        });

                                        _gotoOTP(navigation);
                                    })
                                    .catch((err) => {
                                        dispatch({
                                            type: SIGNUP_INFO_FAILED,
                                        });
                                        setTimeout(() => {
                                            alert(err);
                                        }, 100);
                                    })
                            })
                            .catch((err) => {
                                dispatch({
                                    type: SIGNUP_INFO_FAILED,
                                });
                                setTimeout(() => {
                                    alert(err);
                                }, 100);
                            })
                    })
                    .catch((err) => {
                        dispatch({
                            type: SIGNUP_INFO_FAILED,
                        });
                        setTimeout(() => {
                            alert(err);
                        }, 100);
                    })
            })
            .catch((err) => {
                dispatch({
                    type: SIGNUP_INFO_FAILED,
                });
                console.log(err);
                setTimeout(() => {
                    if (err.response) {
                        if (err.response.status == 413)
                            alert('Attachment size should be less than 1MB');
                        else if (err.response.data)
                            alert(err.response.data.error);
                        else
                            alert('Something is going wrong while Signing Up. Please try again');
                    }
                    else if (err.request) {
                        alert('Server is not responding. Please try again');
                    }
                    else {
                        alert(err);
                    }
                }, 100);
            })
    })
}
/****************** SIGNUP INFO ENDS ******************/

/****************** SIGNUP OTP STARTS ******************/
/**
 * Action for signup OTP input
 * @param {String} text 
 */
export const _onSignupOTPChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_SIGNUP_OTP_CHANGE,
            text: text
        })
    })
}

/**
 * Action that will validate Vendor OTP
 * @param {Object} details 
 * @param {Object} navigation 
 */
export const _validatingSignupOTP = (details, navigation) => {
    return ((dispatch) => {
        dispatch({
            type: SIGNUP_OTP_LOADING,
        });

        axios({
            method: 'POST',
            url: OTP_VALIDATION_API,
            data: details,
        })
            .then(async (response) => {

                await _setItem('signup_screen', 'setpassword')
                    .then(() => {
                        dispatch({
                            type: SIGNUP_OTP_SUCCESS,
                            response: response.data,
                        });

                        _gotoSetPassword(navigation);
                    })
                    .catch((err) => {
                        dispatch({
                            type: SIGNUP_OTP_FAILED,
                        });
                        setTimeout(() => {
                            alert(err);
                        }, 100);
                    })
            })
            .catch((err) => {
                dispatch({
                    type: SIGNUP_OTP_FAILED,
                });
                setTimeout(() => {
                    if (err.response) {
                        if (err.response.status == 413)
                            alert('Attachment size should be less than 1MB');
                        else
                            alert('OTP is invalid');
                    }
                    else if (err.request) {
                        alert('Server is not responding. Please try again');
                    }
                    else {
                        alert(err);
                    }
                }, 100);
            })

    })
}
/****************** SIGNUP OTP ENDS ******************/

/****************** SIGNUP SET PASSWORD STARTS ******************/
/**
 * Action for signup password input
 * @param {String} text 
 */
export const _onSignupPasswordChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_SIGNUP_PASSWORD_CHANGE,
            text: text
        })
    })
}

/**
 * Action for signup confirm password input
 * @param {String} text 
 */
export const _onSignupConfirmPasswordChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_SIGNUP_CONFIRM_PASSWORD_CHANGE,
            text: text
        })
    })
}

/**
 * Action that will set password and complete signup process
 * @param {Object} details 
 * @param {Object} navigation 
 */
export const _settingSignupPassword = (details, navigation) => {
    return ((dispatch) => {
        dispatch({
            type: SIGNUP_SET_PASS_LOADING,
        });

        axios({
            method: 'POST',
            url: SET_PASSWORD_API,
            data: details,
        })
            .then(async (response) => {

                await _setItem('signup_activation', '')
                    .then(async () => {
                        await _setItem('signup_email', '')
                            .then(async () => {
                                await _setItem('signup_screen', '')
                                    .then(() => {
                                        let userObj = {
                                            isVendor: response.data.result
                                        }
                                        dispatch({
                                            type: SIGNUP_SET_PASS_SUCCESS,
                                            user: userObj,
                                            token: response.data.token,
                                            profile: response.data.result.level1,
                                            banks: response.data.result.level3.bankDetails,
                                            docs: response.data.result.level2.attachments,
                                        })

                                        _gotoLogin(navigation);
                                        setTimeout(() => {
                                            alert("Your account has been created. Please login");
                                        }, 100);
                                    })
                                    .catch((err) => {
                                        dispatch({
                                            type: SIGNUP_SET_PASS_FAILED,
                                        })
                                        setTimeout(() => {
                                            alert(err);
                                        }, 100);
                                    })
                            })
                            .catch((err) => {
                                dispatch({
                                    type: SIGNUP_SET_PASS_FAILED,
                                })
                                setTimeout(() => {
                                    alert(err);
                                }, 100);
                            })
                    })
                    .catch((err) => {
                        dispatch({
                            type: SIGNUP_SET_PASS_FAILED,
                        })
                        setTimeout(() => {
                            alert(err);
                        }, 100);
                    })
            })
            .catch((err) => {
                dispatch({
                    type: SIGNUP_SET_PASS_FAILED,
                })
                setTimeout(() => {
                    if (err.response) {
                        if (err.response.status == 413)
                            alert('Attachment size should be less than 1MB');
                        else
                            alert('Something is going wrong while Signing Up. Please try again');
                    }
                    else if (err.request) {
                        alert('Server is not responding. Please try again');
                    }
                    else {
                        alert(err);
                    }
                }, 100);
            })
    });
}
/****************** SIGNUP SET PASSWORD ENDS ******************/

/****************** RESET INFO STARTS ******************/

/**
 * Action for reset email input
 * @param {String} text 
 */
export const _onResetEmailChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_RESET_EMAIL_CHANGE,
            text: text
        })
    })
}

/**
 * Action that will send reset code to vendor
 * @param {Object} details 
 * @param {Object} navigation 
 */
export const _sendingResetCode = (details, navigation) => {
    return ((dispatch) => {
        dispatch({
            type: RESET_LOADING,
        });

        axios({
            method: 'POST',
            url: RESET_PASSWORD_API,
            data: details,
        })
            .then((response) => {
                dispatch({
                    type: RESET_SUCCESS,
                    response: response.data,
                });

                setTimeout(() => {
                    _gotoResetOTP(navigation);
                }, 100);

            })
            .catch((err) => {
                dispatch({
                    type: RESET_FAILED,
                });
                setTimeout(() => {
                    if (err.response) {
                        if (err.response.status == 413)
                            alert('Attachment size should be less than 1MB');
                        else
                            alert('Something is going wrong while sending OTP. Please try again');
                    }
                    else if (err.request) {
                        alert('Server is not responding. Please try again');
                    }
                    else {
                        alert(err);
                    }
                }, 100);
                console.log(err.response);
            });
    })
}
/****************** RESET INFO ENDS ******************/

/****************** RESET OTP STARTS ******************/
/**
 * Action for reset otp
 * @param {String} text 
 */
export const _onResetOTPChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_RESET_OTP_CHANGE,
            text: text
        })
    })
}

/**
 * Action that will send OTP again
 * @param {Object} details 
 */
export const _resendOTP = (details) => {
    return ((dispatch) => {
        dispatch({
            type: RESEND_OTP_LOADING
        });

        axios({
            method: 'POST',
            url: RESEND_OTP_API,
            data: details,
        })
            .then((response) => {
                dispatch({
                    type: RESEND_OTP_SUCCESS,
                });
            })
            .catch((err) => {
                dispatch({
                    type: RESEND_OTP_FAILED,
                });
                setTimeout(() => {
                    if (err.response) {
                        if (err.response.status == 413)
                            alert('Attachment size should be less than 1MB');
                        else
                            alert('Something is going wrong while resending OTP. Please try again');
                    }
                    else if (err.request) {
                        alert('Server is not responding. Please try again');
                    }
                    else {
                        alert(err);
                    }
                }, 100);
            })

    })
}

/**
 * Action that will validate reset OTP
 * @param {Object} details 
 * @param {Object} navigation 
 */
export const _validatingResetOTP = (details, navigation) => {
    return ((dispatch) => {
        dispatch({
            type: RESET_OTP_LOADING,
        });

        axios({
            method: 'POST',
            url: OTP_VALIDATION_API,
            data: details,
        })
            .then((response) => {
                dispatch({
                    type: RESET_OTP_SUCCESS,
                    response: response.data,
                })

                setTimeout(() => {
                    _gotoSetResetPassword(navigation);
                }, 100);
            })
            .catch((err) => {
                dispatch({
                    type: RESET_OTP_FAILED,
                });
                setTimeout(() => {
                    if (err.response) {
                        if (err.response.status == 413)
                            alert('Attachment size should be less than 1MB');
                        else
                            alert('OTP is invalid');
                    }
                    else if (err.request) {
                        alert('Server is not responding. Please try again');
                    }
                    else {
                        alert(err);
                    }
                }, 100);
            })
    })
}
/****************** RESET OTP ENDS ******************/

/****************** RESET PASSWORD STARTS ******************/
/**
 * Action for reset password input
 * @param {String} text 
 */
export const _onResetPasswordChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_RESET_PASSWORD_CHANGE,
            text: text,
        })
    })
}
/**
 * Action for reset confirm password input
 * @param {String} text 
 */
export const _onResetConfirmPasswordChange = (text) => {
    return ((dispatch) => {
        dispatch({
            type: ON_RESET_CONFIRM_PASSWORD_CHANGE,
            text: text,
        })
    })
}

/**
 * Action that will set new password
 * @param {Object} details 
 * @param {Object} navigation 
 */
export const _settingNewPassword = (details, navigation) => {
    return ((dispatch) => {
        dispatch({
            type: RESET_PASSWORD_LOADING
        });

        axios({
            method: 'POST',
            url: SET_PASSWORD_API,
            data: details,
        })
            .then((response) => {
                dispatch({
                    type: RESET_PASSOWRD_SUCCESS,
                    response: response.data,
                });

                _gotoAuthStack(navigation);

                setTimeout(() => {
                    alert('Your Password is reset successfully. Please use your new password to login again. Thank you');
                }, 500);
            })
            .catch((err) => {
                dispatch({
                    type: RESET_PASSWORD_FAILED,
                });
                setTimeout(() => {
                    if (err.response) {
                        if (err.response.status == 413)
                            alert('Attachment size should be less than 1MB');
                        else
                            alert('Please check your given details and try again');
                    }
                    else if (err.request) {
                        alert('Server is not responding. Please try again');
                    }
                    else {
                        alert(err);
                    }
                }, 100);
            })

    })
}
/****************** RESET PASSWORD ENDS ******************/

/****************** LOGO STARTS ******************/
/**
 * Action for logo change
 * @param {*} logo 
 * @returns 
 */
export const _onLogoChange = (logo) => {
    return ((dispatch) => {
        dispatch({
            type: ON_LOGO_CHANGE,
            logo: logo
        })
    });
}

/**
 * Action that will select logo
 * @param {Object} logo 
 * @param {Object} user 
 * @param {Object} profile 
 * @param {String} token 
 * @returns 
 */
export const _onLogoSelect = (logo, user, profile, token) => {
    return ((dispatch) => {

        dispatch({
            type: LOGO_UPLOAD_LOADING,
        });

        let userCopy = Object.assign({}, user);
        let profileCopy = Object.assign({}, profile);

        let form = new FormData();

        const uploadUri = PLATFORM === 'ios' && logo != null ? logo.uri.replace('file://', '') : logo.uri;

        form.append('logo', {
            uri: uploadUri,
            name: logo.fileName,
            type: logo.type
        })

        axios({
            method: 'POST',
            url: UPLOAD_LOGO_API,
            headers: {
                cooljwt: token,
            },
            data: form,
        })
            .then((response) => {

                userCopy.isVendor.level1 = response.data.level1;
                profileCopy = response.data.level1;

                dispatch({
                    type: ON_PROFILE_LOGO_UPLOAD,
                    logo: { uri: response.data.level1.logoUrl },
                    user: userCopy,
                    profile: profileCopy,
                })
            })
            .catch((err) => {
                setTimeout(() => {
                    if (err.response) {
                        if (err.response.status == 413)
                            alert('Logo size should be less than 1MB');
                        else
                            alert('Only .PNG files are allowed');
                    }
                    else if (err.request) {
                        alert('Server is not responding. Please try again');
                    }
                    else {
                        alert(err);
                    }
                }, 500);
            })
    });
}
/**
 * Action that will remove logo
 * @returns 
 */
export const _onLogoRemove = (user, profile, token) => {
    return ((dispatch) => {
        dispatch({
            type: LOGO_REMOVE_LOADING,
        });

        let userCopy = Object.assign({}, user);
        let profileCopy = Object.assign({}, profile);

        axios({
            method: 'DELETE',
            url: REMOVE_LOGO_API,
            headers: {
                cooljwt: token,
            },
        })
            .then((response) => {
                userCopy.isVendor.level1 = response.data.level1;
                profileCopy = response.data.level1;

                dispatch({
                    type: ON_PROFILE_LOGO_REMOVE,
                    logo: null,
                    user: userCopy,
                    profile: profileCopy,
                });

            })
            .catch((err) => {
                setTimeout(() => {
                    alert(err);
                    console.log(err.response);
                }, 500);
            })
    })
}
/****************** LOGO ENDS ******************/

/****************** NOTIFICATION STARTS ******************/
/**
 * Action to fetch notifications for vendor
 * @param {String} email 
 * @returns 
 */
export const _fetchNotifications = (email, token) => {
    return ((dispatch) => {

        dispatch({
            type: FETCH_NOTIFICATION_LOADING
        });

        axios({
            method: 'GET',
            url: NOTIFICATION_API + email,
            headers: {
                cooljwt: token,
            },
        })
            .then((response) => {
                let notifications = response.data;
                notifications = notifications.reverse();
                dispatch({
                    type: FETCH_NOTIFICATION_SUCCESS,
                    notifications: notifications,
                })
            })
            .catch((err) => {
                dispatch({
                    type: FETCH_NOTIFICATION_FAILED
                });
                setTimeout(() => {
                    if (err.response) {
                        if (err.response.status == 413)
                            alert('Attachment size should be less than 1MB');
                        else if (err.response.data)
                            alert(err.response.data);
                        else
                            alert('Something is getting wrong while fetching notifications');
                    }
                    else if (err.request) {
                        alert('Server is not responding. Please try again');
                    }
                    else {
                        alert(err);
                    }
                }, 100);
            })

    })
}
/****************** NOTIFICATION ENDS  ******************/
export const _updateFCMToken = (token, fcmDetails, user) => {
    return ((dispatch) => {
        axios({
            method: 'POST',
            url: SET_FCM_API,
            data: fcmDetails,
            headers: {
                cooljwt: token,
            }
        })
            .then((response) => {

                let userObj = Object.assign({}, user);
                userObj.isVendor.level1 = response.data.level1;

                dispatch({
                    type: SET_FCM_SUCCESS,
                    user: user,
                    profile: response.data.level1,
                });

            })
            .catch((err) => {
                dispatch({
                    type: SET_FCM_FAILED,
                });
                setTimeout(() => {
                    if (err.response) {
                        if (err.response.status == 413)
                            alert('Attachment size should be less than 1MB');
                        else
                            alert('Something is going wrong while updating FCM');
                    }
                    else if (err.request) {
                        alert('Server is not responding. Please try again');
                    }
                    else {
                        alert(err);
                    }
                }, 100);
            })
    });
}