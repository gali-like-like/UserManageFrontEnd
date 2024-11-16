import {ElMessage} from "element-plus";
import CryptoJS from "crypto-js";
export function open(text,textType) {
    ElMessage({
        type:textType,
        message:text
    })
}
export function encryptMessage(msg) {
    const secretKey = 'galinb'; // 请确保密钥的安全性
    let encryptMsg = CryptoJS.AES.encrypt(msg, secretKey).toString();
    return encryptMsg;
}

