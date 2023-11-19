import CryptoJS from "crypto-js"
import EncryptRsa from 'encrypt-rsa';
import { customPublic,customPrivate } from "./keys";


const keysize = 256; // 256 bits
const generateKeyPair  = () => {
	const  key = CryptoJS.lib.WordArray.random(keysize / 32);
	const keyString = CryptoJS.enc.Base64.stringify(key);
	const privateKey = CryptoJS.AES.encrypt(keyString, keyString).toString();
	const publicKey = CryptoJS.AES.encrypt(keyString, privateKey).toString();
	console.log(`Private key is ${privateKey}`)
	console.log(`Public key is ${publicKey}`)
	return {privateKey,publicKey}
}


export const encryptData = (data : string,key : string) => {
	const encryptRsa = new EncryptRsa();
	const encryptedText = encryptRsa.encryptStringWithRsaPublicKey({ 
		text: data,   
		publicKey : key,
	  });
	return encryptedText;
}

export const decryptData  = (data : string,key : string) => {
	const encryptRsa = new EncryptRsa();
	const decryptedText = encryptRsa.decryptStringWithRsaPrivateKey({ 
		text: data, 
		privateKey :  key
	  });

	return decryptedText;
	
}

const main = () => {
	const encryptRsa = new EncryptRsa();
	//const  {privateKey,publicKey} = generateKeyPair();
	const { privateKey, publicKey } = encryptRsa.createPrivateAndPublicKeys(2046);
	console.log(privateKey)
	console.log(publicKey)
	const message = "hello world"
	
	  
}

main()