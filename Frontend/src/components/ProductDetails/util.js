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

export const generateInvoice = (cart) => {
    let invoice = "Hello there. I would like to place an order for:\n\n";

    cart.items.map(
        (item) =>
            (invoice += `${cart.items.indexOf(item) + 1}. Product ID: ${
                item.currentProduct.id
            } - ${item.currentProduct.name} - Price: R${
                item.currentProduct.price
            } - Quantity: ${item.quantity} - Size: ${
                item.userOptions.chosenSize
            } - Colour: ${item.userOptions.chosenColour} - Item Sub Total: R${
                item.total
            }\n`)
    );

    invoice += `\nCart Sub Total(Excluding Delivery): R${cart.subtotal}`;

    return invoice;
};
