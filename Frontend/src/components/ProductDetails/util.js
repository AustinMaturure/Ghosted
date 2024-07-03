import CryptoJS from "crypto-js";

export const encryptString = (plainText, secretKey) => {
    const cipherText = CryptoJS.AES.encrypt(plainText, secretKey).toString();
    return cipherText;
};

export const decryptString = (cipherText, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText;
};

export const calculateCartTotal = (items) => {
    let itemTotals = items.map((item) => item.total);
    let total = itemTotals.reduce((partialSum, a) => partialSum + a, 0);

    return total;
};
