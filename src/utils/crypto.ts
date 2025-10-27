import CryptoJS from "crypto-js";

export const encryptUserData = (encryptedValue: string) => {
    return encryptedValue ? CryptoJS.AES.encrypt(encryptedValue, process.env.SECRET_KEY || "").toString() : "";
};

export const decryptUserData = (decryptedValue: string) => {
    return decryptedValue ? CryptoJS.AES.decrypt(decryptedValue, process.env.SECRET_KEY || "").toString(CryptoJS.enc.Utf8) : "";
};