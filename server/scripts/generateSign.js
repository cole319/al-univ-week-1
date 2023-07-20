const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");
// const hashMessage = require('./hashMessage');

const PRIVATE_KEY =
  "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

const hashMessage = (message) => {
  const msgBytes = utf8ToBytes(message);
  const msgHash = keccak256(msgBytes);
  return msgHash;
};

async function signMsg(msg) {
  const msgHashed = hashMessage(msg);
  const msgSigned = secp.sign(msgHashed, PRIVATE_KEY, { recovered: true });
  return msgSigned;
}

//modified signMessage
//message is amount to be sent
//amount is INT => to be converted to string

const signMessage = (message) => {
  const messageBytes = utf8ToBytes(message);
  const messageHash = keccak256(messageBytes);
  const messageSigned = secp.sign(messageHash, PRIVATE_KEY, {
    recovered: true,
  });
  return messageSigned;
};
