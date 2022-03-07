/*
    File that will contains api related to ap zone
*/

import axios from "axios";

export const BASE_URL = 'https://et/';
export const WORKFLOW_BASE_URL = 'https:/.net/';
export const BLOCKCHAIN_BASE_URL = 'https:api/';

/**
 * Login API for ap user
 * @param {Object} details 
 * @returns 
 */
export const _LOGIN_API = (details) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + 'user/userLogin',
                method: 'POST',
                data: details,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)
                })
        } catch (error) {
            reject(error);
        }
    })
}
