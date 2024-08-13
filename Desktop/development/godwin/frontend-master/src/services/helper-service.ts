import {isPlainObject,get,set} from 'lodash-es';
import Encryption from './encryption-service'
import { format as fnsFormatter } from 'date-fns'
/**
     * @param {*} str 
     * 
     * @return {boolean}
     */
 export const isString = (str:any) => typeof str === "string" || str instanceof String;

/**
* @param {*} arr 
* 
* @return {boolean}
*/
export const isArray = (arr:any) => Array.isArray(arr);

/**
* @param {*} func 
* 
* @return {boolean}
*/
export const isFunction = (func:any) => typeof func === "function";

/**
* @param {*} obj 
* 
* @return {boolean}
*/
//export const isObject = (obj:any) => typeof obj === "object" && obj !== null;
export const isObject = (obj:any) => !!obj && obj.constructor === Object;

/**
 * Capitalize the first character in a string
 *
 * @param string
 * @returns {string}
 */
 export const ucFirst = (string:any) => string[0].toUpperCase() + string.substring(1).toLowerCase();

 /**
 * Check if am Object is empty i.e does not have any property
 *
 * @param obj
 * @returns {boolean|boolean}
 */
export const isEmptyObj = (obj:any) => isPlainObject(obj) && !Object.keys(obj).length;

/**
 * Get object property easily in vue render without errors on null objects
 *
 * @param Object
 * @param path
 * @returns {string|*}
 */
 export const getObjectProperty = (object:object, path:string, defaultValue?:any) => {
  const obj = get(object, path, defaultValue);
  // Somehow, adding default value to loadash does not work
  return obj || defaultValue;
}
/**
 * Get object property easily in vue render without errors on null objects
 *
 * @param Object
 * @param path
 * @returns {string|*}
 */
 export const setObjectProperty = (object:object, path:string, value:any) => set(object, path, value)

/**
 * Generate background color from the string passed (eg user's name)
 *
 * @param string
 * @returns {string}
 */
/* eslint-disable no-bitwise */
export const  getBgColorFromName = (string:string) => {
  let hash = 0;
  string.split('').forEach(char => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  })
  let color = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += value.toString(16).padStart(2, '0')
  }
  return color
}
/* eslint-enable no-bitwise */

/**
 * Generate text color from the string passed (eg user's name)
 *
 * @param string
 * @returns {string}
 */
export const getTextColorFromName = (string:string, lightColor='#FFFFFF', darkColor="#000000")=>{
   const bgColor = getBgColorFromName(string);
   const color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
   const r = parseInt(color.substring(0, 2), 16); // hexToR
   const g = parseInt(color.substring(2, 4), 16); // hexToG
   const b = parseInt(color.substring(4, 6), 16); // hexToB
   const uiColors = [r / 255, g / 255, b / 255];
   const c = uiColors.map((col) => {
     if (col <= 0.03928) {
       return col / 12.92;
     }
     return Math.pow((col + 0.055) / 1.055, 2.4);
   });
   const L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
   return (L > 0.179) ? darkColor : lightColor;
}

export const encrypt = (data:string)=>{
  const key = "base64:XV2miIbbwZCRtM2FHr9iGyBs8W6ulFqSvQNOOgqlxl4="
  return Encryption.encrypt(data,key);
}

export const decrypt = (encryptedString:string)=>{
  const key = "base64:XV2miIbbwZCRtM2FHr9iGyBs8W6ulFqSvQNOOgqlxl4="
  return Encryption.decrypt(encryptedString,key);
}

export const setLocalStorageItem = (key:string, data:any)=>{
  if (process.env.NODE_ENV === 'production') {
    localStorage.setItem(key, encrypt(JSON.stringify(data)));
  }else{
    localStorage.setItem(key, JSON.stringify(data));
  }
}
export const getLocalStorageItem = (key:string)=>{
  if (process.env.NODE_ENV === 'production' && localStorage.getItem(key)) {
    return JSON.parse(decrypt(localStorage.getItem(key) as string))
  }else{
    return JSON.parse(localStorage.getItem(key) as string)
  }
}

export const setSessionStorageItem = (key:string, data:any)=>{
  if (process.env.NODE_ENV === 'production') {
    sessionStorage.setItem(key, encrypt(JSON.stringify(data)));
  }else{
    sessionStorage.setItem(key, JSON.stringify(data));
  }
}
export const getSessionStorageItem = (key:string)=>{
  if (process.env.NODE_ENV === 'production' && sessionStorage.getItem(key)) {
    return JSON.parse(decrypt(sessionStorage.getItem(key) as string))
  }else{
    return JSON.parse(sessionStorage.getItem(key) as string)
  }
}



/**
 * This is a custom password validator
 * 
 * @use HelperService.customPasswordValidator(passwordValue)
 * @param {string} value 
 */
export const customPasswordValidator = (value:string) =>{
  const containsUppercase = /[A-Z]/.test(value)
  const containsLowercase = /[a-z]/.test(value)
  const containsNumber = /[0-9]/.test(value)
  const containsSpecial = /[#?!@$%^&*-]/.test(value)
  return containsUppercase && containsLowercase && containsNumber && containsSpecial
}

/**
 * This function makes sure only number is entered into an input
 * 
 * @use @keypress="HelperService.allowOnlyNumber($event)"
 * @param {*} evt 
 */
 export const allowOnlyNumber = (evt:KeyboardEvent|ClipboardEvent)=> {
  evt = (evt) ? evt : window.event as KeyboardEvent|ClipboardEvent;
  if(evt.type=='paste'){
    const e = evt as ClipboardEvent
    const value = e.clipboardData?.getData('Text');
    return isNaN(value as any) ? e.preventDefault(): true
  }else{
    const e = evt as KeyboardEvent
    const charCode = (e.which) ? e.which : e.keyCode;
    return (charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46 ? e.preventDefault() : true
  }
}

/**
 * This function makes sure allowed decimal places is entered into an input
 * 
 * @use @keypress="HelperService.allowedDecimalPlaces($event,2)"
 * @param {*} evt 
 */
export const allowedDecimalPlaces = (evt:KeyboardEvent|ClipboardEvent,decimalPlaces:number)=> {
  evt = (evt) ? evt : window.event as KeyboardEvent|ClipboardEvent;
  if(evt.type=='paste'){
    const e = evt as ClipboardEvent
    const value = e.clipboardData?.getData('Text') as any;
    const pointIndex = value?.indexOf('.') as any;
    return value.split('.').length > 2 
    || decimalPlaces <= 0 && value.split('.').length === 2 
    || (value.split('.').length === 2 && (pointIndex+1) != (value.length - decimalPlaces)) 
    ? e.preventDefault() : true;
  }else{
    const e = evt as KeyboardEvent
    const charCode = (e.which) ? e.which : e.keyCode;
    if(decimalPlaces <= 0){
      return (['keyup','keydown'].includes(evt.type) && charCode===190) || (e.type=='keypress' && charCode === 46) ? e.preventDefault() : true;
    }else{
        const target = e.target as HTMLInputElement;
        const value = target.value
        const pointIndex = value.indexOf('.');
        return (pointIndex >= 0 && pointIndex < value.length - decimalPlaces) 
              || (charCode === 46 && value.split('.').length === 2)
              ? e.preventDefault() : true;
    }
  }
}


export const imageExists = (url:string, callback?:(exist:boolean)=>any) => {
  const img = new Image();
  img.src = url;
  if (img.complete) {
    (callback!=undefined) ? callback(true) : ''
    return true
  } else {
    img.onload = () => {
      (callback!=undefined) ? callback(true) : ''
      return true
    };
    img.onerror = () => {
      (callback!=undefined) ? callback(false) : ''
      return false
    };
  }
}


/**
 * This formats date object to a given format
 * 
 * @use HelperService.dateFormatter(Date,'')
 * @param {Date} date 
 * @param {string} format 
 * Check date-fns doc for different date formats
 */
 export const dateFormatter = (date:Date, format='dd-MM-yyyy') => {
  return fnsFormatter(new Date(date),format);
 }




 
// currency formatter function restructured
export const formatMoney = (amount: number | string ): string => {
  if (amount !== undefined && amount !== null) {
    // Converting the amount to a string and remove commas
    amount = amount.toString().replace(/,/g, '');

    // Convert the cleaned amount to a number and format it with two decimal places and commas for thousands
    const formattedAmount = Number(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    /* this can be recalled if needed for any purpose

     const currency = window?.userCurrency ? window.userCurrency() : '';
     */

    // mapping currency codes to symbols
    // const currencySymbols: { [key: string]: string } = {
    //   'USD': '$',
    //   'NGN': '₦',
    // };


    // Getting the currency symbol based on the provided currency code
    // const currencySymbol = currencySymbols[currencyCode] || '';
    const currency = window?.userCurrency ? window.userCurrency() : '';

    return `${currency}${formattedAmount}`;
  }
  return '';
};
