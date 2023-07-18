import server from "./server";
// const secp = require("ethereum-cryptography/secp256k1");
// const { keccak256 } = require("ethereum-cryptography/keccak");
// const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

const Wallet = ({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) => {
  const onChange = async (evt) => {
    const privateKey = evt.target.value;

    setPrivateKey(privateKey);

    const publicKey = toHex(secp.secp256k1.getPublicKey(privateKey));
    const pubKeyHash = new Uint8Array(keccak256(utf8ToBytes(publicKey)));
    const address = toHex(pubKeyHash.slice(pubKeyHash.length - 20));

    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  };

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input
          placeholder="Enter your private key here"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>
      <div className="address">
        Address: {address.slice(0, 5) + "..." + address.slice(-5)}
      </div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
};

export default Wallet;
