const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const privateKey = secp.secp256k1.utils.randomPrivateKey();

console.log("private key : ", toHex(privateKey));

const publicKey = toHex(secp.secp256k1.getPublicKey(privateKey));

console.log(typeof publicKey);

console.log("public key : ", publicKey);

const pubKeyHash = new Uint8Array(keccak256(utf8ToBytes(publicKey)));

console.log(pubKeyHash);

console.log(toHex(pubKeyHash));

const address = pubKeyHash.slice(pubKeyHash.length - 20);

console.log("address : ", toHex(address));
