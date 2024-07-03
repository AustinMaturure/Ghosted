import { AES } from "crypto-js/aes";
import { enc } from "crypto-js/enc-base64";
const secretKey =
    "4*,-jbWg<NJZo0,XF*AAdS3F`;Z_fy&8" +
    "qOFYH58oA8/!i8Y#;to4Z~o[w(`R<rtd" +
    "3k3a7dwN88BBkj71JTSndYbPQht66yML";

export const encryptString = (plainText) => {
    const cipherText = AES.encrypt(plainText, secretKey).toString();
    return cipherText;
};

export const decryptString = (cipherText) => {
    const bytes = AES.decrypt(cipherText, secretKey);
    const plainText = bytes.toString(enc.Utf8);
    return plainText;
};

export const calculateCartTotal = (items) => {
    let itemTotals = items.map((item) => item.total);
    let total = itemTotals.reduce((partialSum, a) => partialSum + a, 0);

    return total;
};
