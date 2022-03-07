import {
    Linking
} from 'react-native';
import { MESSAGES } from '../theme/config';

/**
 * Function that will open link
 * @param {string} url 
 */
export const _openLink = (url) => {
    Linking.openURL(url)
    .then(()=>{})
    .catch((err)=>{
        alert(MESSAGES.INVALID_URL);
    })
}

/**
 * Function that will open default Email app with already entered email and subject
 * @param {*} email 
 * @param {*} subject 
 */
export const _sendEmail = (email, subject) => {
    Linking.openURL('mailto:' + email + '?subject=' + subject + ' Us&body=')
    .catch((err)=>{
        alert('Email is invalid or This is not available on Simulator/Emulator');
    });
}

/**
 * Functiont that will open default phone app with already number inputted
 * @param {*} number 
 */
export const _doCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
        phoneNumber = 'tel:' + number;
    }
    else {
        phoneNumber = 'telprompt:' + number;
    }

    Linking.openURL(phoneNumber)
    .catch((err)=>{
        alert('Mobile Number is invalid or This is not available on Emulator/Simulator');
    });
}

/**
 * Functiont that will open maps according to the given location
 * @param {*} mapUrl 
 */
export const _openMaps = (mapUrl) => {
    Linking.openURL(mapUrl)
    .catch((err)=>{
        alert("Map URL is invalid");
    });
}