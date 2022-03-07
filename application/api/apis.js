/*
    File that contains apis and related data to apis
*/

/* Typless APIs STARTS */
export const TYPLESS_TOKEN = "Token 502d48bcf4d44915b41e2c4c53b30794";
export const EXTRACTION_URL = "https://developers.typless.com/api/document-types/extract-data/";
/* Typless APIs ENDS */

export const BASE_URL = "https://imapi.matesol.net/";

export const LOGIN_API = BASE_URL + "vendor/vendorLogin";
export const CUSTOMER_API = BASE_URL + "vendor/organizationByVender";
export const INVOICE_COUNT_API = BASE_URL + "vendor/getInvoiceCount";
export const GET_CURRENCIES = BASE_URL + "lookup/getLookups/1";
export const CREATE_INVOICE_API = BASE_URL + "invoice/submitInvoice";
export const ALL_INVOICES_API = BASE_URL + "invoice/getInvoiceByVendor";
export const CUSTOMER_APPROVE_API = BASE_URL + "vendor/updateOrgStatus";
export const ADD_ITEM_API = BASE_URL + 'invoice/addItems';
export const FETCH_ITEMS_API = BASE_URL + 'vendor/fetchItems';
export const UPDATE_PROFILE_API = BASE_URL + 'vendor/vendorLvl1Update';
export const ADD_BANK_API = BASE_URL + 'vendor/addBankDetails';
export const REMOVE_BANK_API = BASE_URL + 'vendor/removeBank';
export const UPDATE_BANK_API = BASE_URL + 'vendor/updateBankAccount';

export const ADD_DOC_API = BASE_URL + 'vendor/vendorLvl2Update';
export const UPDATE_DOC_API = BASE_URL + 'vendor/updateDoc';
export const REMOVE_DOC_API = BASE_URL + 'vendor/removeDoc';

export const CHECK_USER_API = BASE_URL + 'vendor/verifyLogin';

export const SIGN_UP_API = BASE_URL + 'vendor/signUpM';

export const OTP_VALIDATION_API = BASE_URL + 'vendor/activateOtpM';
export const SET_PASSWORD_API = BASE_URL + 'vendor/vendorPassM';

export const RESET_PASSWORD_API = BASE_URL + 'vendor/sendOTP';

export const RESEND_OTP_API = BASE_URL + 'vendor/sendOTP';

export const TENANT_CURRENCIES_API = BASE_URL + 'tenant/getCurrency/';

export const NOTIFICATION_API = BASE_URL + 'notify/getSysNotifyTo/';

export const UPLOAD_LOGO_API = BASE_URL + 'vendor/updateLogo';
export const REMOVE_LOGO_API = BASE_URL + 'vendor/deleteLogo';

export const SET_FCM_API = BASE_URL + 'vendor/updateFcm';
export const PO_NUMBERS_API = BASE_URL + 'po/getPoc';

export const FETCH_VERSION_API = BASE_URL + 'invoice/getInvoiceVersions';

export const DELETE_FCM = BASE_URL + 'vendor/deleteFcm';

export const FETCH_DASHBOARD_API = BASE_URL + "invoice/getVendorChartData/";

export const CHANGE_PASSWORD_API = BASE_URL + "vendor/updatePassword";

export const UPDATED_CURRENCIES_API = BASE_URL + "lookup/GetOrgCurrencies/";