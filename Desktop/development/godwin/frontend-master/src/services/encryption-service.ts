import * as CryptoJS from 'crypto-js';

const encryptMethod = 'AES-256-CBC'
const encryptMethodLength = parseInt(encryptMethod.match(/\d+/)?.[0] as string)
const encryptKeySize = parseInt(`${encryptMethodLength/8}`)


const encrypt = (string:string, key:string) => {
    const iv = CryptoJS.lib.WordArray.random(16);// the reason to be 16, please read on `encryptMethod` property.

    const salt = CryptoJS.lib.WordArray.random(256);
    const iterations = 999;
    const localEncryptMethodLength = (encryptMethodLength/4);// example: AES number is 256 / 4 = 64
    const hashKey = CryptoJS.PBKDF2(key, salt, {'hasher': CryptoJS.algo.SHA512, 'keySize': (localEncryptMethodLength/8), 'iterations': iterations});

    const encrypted = CryptoJS.AES.encrypt(string, hashKey, {'mode': CryptoJS.mode.CBC, 'iv': iv});
    const encryptedString = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

    const output = {
        'ciphertext': encryptedString,
        'iv': CryptoJS.enc.Hex.stringify(iv),
        'salt': CryptoJS.enc.Hex.stringify(salt),
        'iterations': iterations
    };

    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(output)));
}

const decrypt = (encryptedString:string, key:string) => {
    const json = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encryptedString)));

    const salt = CryptoJS.enc.Hex.parse(json.salt);
    const iv = CryptoJS.enc.Hex.parse(json.iv);

    const encrypted = json.ciphertext;// no need to base64 decode.

    let iterations = parseInt(json.iterations);
    if (iterations <= 0) {
        iterations = 999;
    }
    const localEncryptMethodLength = (encryptMethodLength/4);// example: AES number is 256 / 4 = 64
    const hashKey = CryptoJS.PBKDF2(key, salt, {'hasher': CryptoJS.algo.SHA512, 'keySize': (localEncryptMethodLength/8), 'iterations': iterations});

    const decrypted = CryptoJS.AES.decrypt(encrypted, hashKey, {'mode': CryptoJS.mode.CBC, 'iv': iv});

    return decrypted.toString(CryptoJS.enc.Utf8);
}
export default {
    encrypt,
    decrypt
}