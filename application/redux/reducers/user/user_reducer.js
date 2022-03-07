import {
    LOGIN_LOADING,
    ON_LOGIN_EMAIL_CHANGE,
    ON_LOGIN_PASSWORD_CHANGE,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    ADD_BANK_LOADING,
    ON_BANK_NAME_CHANGE,
    ON_BANK_IBAN_CHANGE,
    ON_BANK_ACCOUNT_CHANGE,
    ON_BANK_ADDRESS_CHANGE,
    ADD_BANK_SUCCESS,
    ADD_BANK_FAILED,
    REMOVE_BANK_LOADING,
    REMOVE_BANK_SUCCESS,
    REMOVE_BANK_FAILED,
    ON_BANK_CODE_CHANGE,
    UPDATE_BANK_LOADING,
    UPDATE_BANK_SUCCESS,
    UPDATE_BANK_FAILED,
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
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILED,
    ON_SIGNUP_VENDOR_NAME_CHANGE,
    ON_SIGNUP_DISPLAY_NAME_CHANGE,
    ON_SIGNUP_CELL_NUMBER_CHANGE,
    ON_SIGNUP_EMAIL_CHANGE,
    SIGNUP_INFO_LOADING,
    SIGNUP_INFO_SUCCESS,
    SIGNUP_INFO_FAILED,
    ON_SIGNUP_OTP_CHANGE,
    SIGNUP_OTP_LOADING,
    SIGNUP_OTP_SUCCESS,
    ON_SIGNUP_PASSWORD_CHANGE,
    ON_SIGNUP_CONFIRM_PASSWORD_CHANGE,
    SIGNUP_SET_PASS_LOADING,
    SIGNUP_SET_PASS_SUCCESS,
    ON_RESET_EMAIL_CHANGE,
    RESET_LOADING,
    RESET_SUCCESS,
    RESET_FAILED,
    ON_RESET_OTP_CHANGE,
    RESET_OTP_LOADING,
    RESET_OTP_SUCCESS,
    ON_RESET_PASSWORD_CHANGE,
    ON_RESET_CONFIRM_PASSWORD_CHANGE,
    RESET_PASSWORD_LOADING,
    RESET_PASSOWRD_SUCCESS,
    RESET_PASSWORD_FAILED,
    RESET_OTP_FAILED,
    RESEND_OTP_LOADING,
    RESEND_OTP_SUCCESS,
    RESEND_OTP_FAILED,
    ON_SIGNUP_VENDOR_SITE_CHANGE,
    ON_VENDOR_SITE_CHANGE,
    ON_PROFILE_LOGO_UPLOAD,
    ON_PROFILE_LOGO_REMOVE,
    LOGO_UPLOAD_LOADING,
    LOGO_REMOVE_LOADING,
    ON_LOGO_CHANGE,
    FETCH_NOTIFICATION_LOADING,
    FETCH_NOTIFICATION_SUCCESS,
    FETCH_NOTIFICATION_FAILED,
    SET_FCM_SUCCESS,
    SET_FCM_FAILED,
} from './user_types';

const State = {
    login_loading: false,
    checkuser_loading: false,
    login_email: '',
    login_password: '',
    user: null,
    token: '',
    change_password_loading: false,
    
    //Notifications
    fetch_notification_loading: false,
    notifications: [],

    //Profile Logo
    logo_uploadloading: false,
    logo_removeloading: false,
    logo: null,

    //Profile Bank Details
    banks: [],
    addbank_loading:false,
    updatebank_loading: false,
    removebank_loading: false,
    bank_name: '',
    bank_iban: '',
    bank_account: '',
    bank_code: '',
    bank_address: '',

    //Profile Attachments
    docs: [],
    adddoc_loading:false,
    updatedoc_loading: false,
    removedoc_loading: false,
    doc_title: '',
    doc_description: '',
    doc_file: '',
    doc_filename: '',

    //Profile Info
    update_profile_loading: false,
    profile: null,
    vendor_name: '',
    display_name: '',
    license_number: '',
    cell_number: '',
    vendor_site: '',
    email: '',
    remarks: '',

    //Sign up info
    signup_infoloading: false,
    signup_vendorname: '',
    signup_displayname: '',
    signup_cellnumber: '',
    signup_vendorsite: '',
    signup_email: '',

    //Sign up OTP
    signup_otploading: false,
    signup_otp: '',

    //Sign up Password
    signup_passloading: false,
    signup_password: '',
    signup_confirmpassword: '',

    //Sign up response
    signup_response: null,

    //Reset Info
    reset_infoloading: false,
    reset_email: '',

    //Reset OTP
    reset_otploading: false,
    reset_otp: '',

    //Reset Password
    reset_passwordloading: false,
    reset_password: '',
    reset_confirmpassword: '',

    //Reset Response
    reset_response: null,

    //Resend OTP
    resend_otploading: false,

};

export default User_Reducer = (state = State, action) => {
    switch (action.type) {

        case LOGIN_LOADING:
            return{
                ...state,
                login_loading: true,
            }
        
        case ON_LOGIN_EMAIL_CHANGE:
            return{
                ...state,
                login_email: action.text,
            }
        
        case ON_LOGIN_PASSWORD_CHANGE:
            return{
                ...state,
                login_password: action.text,
            }
        
        case LOGIN_SUCCESS:
            return{
                ...state,
                login_loading: false,
                email: '',
                password: '',
                token: action.token,
                user: action.user,
                banks: action.banks,
                docs: action.docs,
                profile: action.profile,
                notifications: action.notifications,
            }
        
        case LOGIN_FAILED:
            return{
                ...state,
                login_loading: false,
            }

        /************ CHECKING USER *************/
        case CHECK_USER_LOADING:
            return{
                ...state,
                checkuser_loading: true,
            }

        case CHECK_USER_SUCCESS:
            return{
                ...state,
                checkuser_loading: false,
                token: action.token,
                user: action.user,
                banks: action.banks,
                docs: action.docs,
                profile: action.profile,
                notifications: action.notifications
            }

        case CHECK_USER_FAILED:
            return{
                ...state,
                checkuser_loading: false,
            }

        /******* LOGOUT  ********/
        case LOGOUT:
            return{
                ...state,
                login_loading: false,
                checkuser_loading: false,
                login_email: '',
                login_password: '',
                user: {},
                token: '',

                //notifications
                notifications: [],

                //Profile Bank Details
                banks: [],
                addbank_loading:false,
                updatebank_loading: false,
                removebank_loading: false,
                bank_name: '',
                bank_iban: '',
                bank_account: '',
                bank_code: '',
                bank_address: '',

                //Profile Attachments
                docs: [],
                adddoc_loading:false,
                updatedoc_loading: false,
                removedoc_loading: false,
                doc_title: '',
                doc_description: '',
                doc_file: '',
                doc_filename: '',

                //Profile Info
                update_profile_loading: false,
                profile: {},
                vendor_name: '',
                display_name: '',
                license_number: '',
                cell_number: '',
                email: '',
                remarks: '',
            }

        /******* PROFILE BANK DETIALS STARTS  ********/
        case ADD_BANK_LOADING:
            return {
                ...state,
                addbank_loading: true,
            }
        
        case ON_BANK_NAME_CHANGE:
            return{
                ...state,
                bank_name: action.text,
            }

        case ON_BANK_IBAN_CHANGE:
            return{
                ...state,
                bank_iban: action.text,
            }

        case ON_BANK_ACCOUNT_CHANGE:
            return{
                ...state,
                bank_account: action.text,
            }

        case ON_BANK_CODE_CHANGE:
            return {
                ...state,
                bank_code: action.text
            }

        case ON_BANK_ADDRESS_CHANGE:
            return{
                ...state,
                bank_address: action.text,
            }

        case ADD_BANK_SUCCESS:
            return{
                ...state,
                addbank_loading: false,
                bank_name: '',
                bank_iban: '',
                bank_account: '',
                bank_address: '',
                banks: action.banks,
                user: action.user,
            }

        case ADD_BANK_FAILED:
            return {
                ...state,
                addbank_loading: false,
            }

        case UPDATE_BANK_LOADING:
            return {
                ...state,
                updatebank_loading: true,
            }

        case UPDATE_BANK_SUCCESS:
            return {
                ...state,
                updatebank_loading: false,
                bank_name: '',
                bank_iban: '',
                bank_account: '',
                bank_address: '',
                banks: action.banks,
                user: action.user,
            }

        case UPDATE_BANK_FAILED:
            return {
                ...state,
                updatebank_loading: false,
            }

        case REMOVE_BANK_LOADING:
            return {
                ...state,
                removebank_loading: true,
            }

        case REMOVE_BANK_SUCCESS:
            return {
                ...state,
                removebank_loading: false,
                banks: action.banks,
                user: action.user,
            }

        case REMOVE_BANK_FAILED:
            return {
                ...state,
                removebank_loading: false,
            }
        /******* PROFILE BANK DETIALS ENDS ********/
    
        /******* PROFILE DOCS DETIALS STARTS  ********/
        
        case ON_DOC_TITLE_CHANGE:
            return {
                ...state,
                doc_title: action.text,
            }

        case ON_DOC_DESCRIPTION_CHANGE:
            return {
                ...state,
                doc_description: action.text,
            }
        
        case ON_DOC_FILE_UPLOAD:
            return {
                ...state,
                doc_file: action.file,
                doc_filename: action.filename,
            }

        case ON_DOC_FILE_REMOVE:
            return{
                ...state,
                doc_file: '',
                doc_filename: '',
            }

        case ADD_DOC_LOADING:
            return{
                ...state,
                adddoc_loading: true,
            }

        case ADD_DOC_SUCCESS:
            return {
                ...state,
                adddoc_loading: false,
                doc_title: '',
                doc_description: '',
                doc_file: '',
                doc_filename: '',
                docs: action.docs,
                user: action.user,
            }

        case ADD_DOC_FAILED:
            return {
                ...state,
                adddoc_loading: false,
            }

        case UPDATE_DOC_LOADING:
            return {
                ...state,
                updatedoc_loading: true,
            }

        case UPDATE_DOC_SUCCESS:
            return {
                ...state,
                updatedoc_loading: false,
                docs: action.docs,
                doc_title: '',
                doc_description: '',
                doc_file: '',
                doc_filename: '',
                docs: action.docs,
                user: action.user,
            }

        case UPDATE_DOC_FAILED:
            return {
                ...state,
                updatedoc_loading: false,
            }

        case REMOVE_DOC_LOADING:
            return {
                ...state,
                removedoc_loading: true,
            }

        case REMOVE_DOC_SUCCESS:
            return {
                ...state,
                removedoc_loading: false,
                docs: action.docs,
                user: action.user,
            }

        case REMOVE_DOC_FAILED:
            return {
                ...state,
                removedoc_loading: false,
            }

        /***************** Profile Info Update *****************/
        case ON_VENDOR_NAME_CHANGE:
            return {
                ...state,
                vendor_name: action.text,
            }

        case ON_DISPLAY_NAME_CHANGE:
            return {
                ...state,
                display_name: action.text,
            }

        case ON_LICENSE_NUMBER_CHANGE:
            return {
                ...state,
                license_number: action.text,
            }

        case ON_CELL_NUMBER_CHANGE:
            return {
                ...state,
                cell_number: action.text
            }

        case ON_VENDOR_SITE_CHANGE:
            return {
                ...state,
                vendor_site: action.text,
            }

        case ON_EMAIL_CHANGE:
            return {
                ...state,
                email: action.text,
            }

        case ON_REMARKS_CHANGE:
            return {
                ...state,
                remarks: action.text
            }

        case UPDATE_PROFILE_LOADING:
            return {
                ...state,
                update_profile_loading: true,
            }

        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                update_profile_loading: false,
                user: action.user,
                profile: action.profile,
            }
        
        case UPDATE_PROFILE_FAILED:
            return {
                ...state,
                update_profile_loading: false,
            }

        /***************** SIGN UP INFO ******************/
        case ON_SIGNUP_VENDOR_NAME_CHANGE:
            return{
                ...state,
                signup_vendorname: action.text
            }

        case ON_SIGNUP_DISPLAY_NAME_CHANGE:
            return{
                ...state,
                signup_displayname: action.text
            }
        
        case ON_SIGNUP_CELL_NUMBER_CHANGE:
            return{
                ...state,
                signup_cellnumber: action.text
            }

        case ON_SIGNUP_VENDOR_SITE_CHANGE:
            return {
                ...state,
                signup_vendorsite: action.text
            }

        case ON_SIGNUP_EMAIL_CHANGE:
            return{
                ...state,
                signup_email: action.text
            }

        case SIGNUP_INFO_LOADING:
            return {
                ...state,
                signup_infoloading: true,
            }

        case SIGNUP_INFO_SUCCESS:
            return {
                ...state,
                signup_infoloading: false,
                signup_response: action.response,
                signup_vendorname: '',
                signup_displayname: '',
                signup_cellnumber: '',
                signup_email: '',
            }

        case SIGNUP_INFO_FAILED:
            return {
                ...state,
                signup_infoloading: false,
            }

        /***************** SIGN UP OTP ******************/
        case ON_SIGNUP_OTP_CHANGE:
            return {
                ...state,
                signup_otp: action.text,
            }

        case SIGNUP_OTP_LOADING:
            return {
                ...state,
                signup_otploading: true,
            }

        case SIGNUP_OTP_SUCCESS:
            return {
                ...state,
                signup_otploading: false,
                signup_response: action.response,
                signup_otp: '',
            }

        /***************** SIGN UP PASSWORD ******************/
        case ON_SIGNUP_PASSWORD_CHANGE:
            return {
                ...state,
                signup_password: action.text,
            }

        case ON_SIGNUP_CONFIRM_PASSWORD_CHANGE:
            return {
                ...state,
                signup_confirmpassword: action.text,
            }

        case SIGNUP_SET_PASS_LOADING:
            return {
                ...state,
                signup_passloading: true,
            }

        case SIGNUP_SET_PASS_SUCCESS:
            return {
                ...state,
                signup_passloading: false,
                signup_password: '',
                signup_confirmpassword: '',
                user: action.user,
                token: action.token,
                profile: action.profile,
                banks: action.banks,
                docs: action.docs,
            }

        /***************** Reset Info ******************/
        case ON_RESET_EMAIL_CHANGE:
            return {
                ...state,
                reset_email: action.text,
            }

        case RESET_LOADING:
            return {
                ...state,
                reset_infoloading: true,
            }

        case RESET_SUCCESS:
            return {
                ...state,
                reset_infoloading: false,
                reset_response: action.response,
            }
        
        case RESET_FAILED:
            return {
                ...state,
                reset_infoloading: false,
            }

        /***************** Reset OTP ******************/
        case ON_RESET_OTP_CHANGE:
            return {
                ...state,
                reset_otp: action.text,
            }

        case RESET_OTP_LOADING:
            return {
                ...state,
                reset_otploading: true,
            }

        case RESET_OTP_SUCCESS:
            return {
                ...state,
                reset_otploading: false,
                reset_otp: '',
                reset_response: action.response,
            }

        case RESET_OTP_FAILED:
            return {
                ...state,
                reset_otploading: false,
            }

        /***************** Reset Password ******************/
        case ON_RESET_PASSWORD_CHANGE:
            return {
                ...state,
                reset_password: action.text,
            }

        case ON_RESET_CONFIRM_PASSWORD_CHANGE:
            return {
                ...state,
                reset_confirmpassword: action.text,
            }

        case RESET_PASSWORD_LOADING:
            return {
                ...state,
                reset_passwordloading: true,
            }

        case RESET_PASSOWRD_SUCCESS:
            return {
                ...state,
                reset_passwordloading: false,
                reset_email: '',
                reset_response: action.response,
            }

        case RESET_PASSWORD_FAILED:
            return {
                ...state,
                reset_passwordloading: false,
            }

        case RESEND_OTP_LOADING:
            return {
                ...state,
                resend_otploading: true,
            }

        case RESEND_OTP_SUCCESS:
            return {
                ...state,
                resend_otploading: false,
            }

        case RESEND_OTP_FAILED:
            return {
                ...state,
                resend_otploading: false,
            }

        case LOGO_UPLOAD_LOADING:
            return {
                ...state,
                logo_uploadloading: true,
            }

        case ON_PROFILE_LOGO_UPLOAD:
            return {
                ...state,
                logo_uploadloading: false,
                logo: action.logo,
                user:  action.user,
                profile: action.profile,
            }

        case LOGO_REMOVE_LOADING:
            return {
                ...state,
                logo_removeloading: true,
            }

        case ON_PROFILE_LOGO_REMOVE:
            return {
                ...state,
                logo_removeloading: false,
                logo: null,
                user: action.user,
                profile: action.profile,
            }

        case ON_LOGO_CHANGE:
            return {
                ...state,
                logo: action.logo
            }

        case FETCH_NOTIFICATION_LOADING:
            return {
                ...state,
                fetch_notification_loading: true,
            }

        case FETCH_NOTIFICATION_SUCCESS:
            return {
                ...state,
                fetch_notification_loading: false,
                notifications: action.notifications,
            }

        case FETCH_NOTIFICATION_FAILED:
            return {
                ...state,
                fetch_notification_loading: false,
            }

        case SET_FCM_SUCCESS:
            return {
                ...state,
                user: action.user,
                profile: action.profile,
            }
        
        case SET_FCM_FAILED:
            return {
                ...state,
            }


        default:
            return {
                ...state
            }
    }
}