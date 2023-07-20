const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");

function hashMessage(message) {
  const msgBytes = utf8ToBytes(message);
  const msgHash = keccak256(msgBytes);
  return msgHash;
}

async function recoverKey(message, signature, recoveryBit) {
  let messageHash = hashMessage(message);
  let pubKey = secp.recoverPublicKey(messageHash, signature, recoveryBit);
  return pubKey;
}

// module.exports = recoverKey;
