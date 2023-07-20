import { useState } from "react";
import server from "./server";

import * as secp from "ethereum-cryptography/secp256k1";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

const Transfer = ({ address, setBalance, privateKey }) => {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  // const [sign, setSign] = useState(""); //modified
  // const PRIVATE_KEY = privateKey; //modified

  const setValue = (setter) => (evt) => setter(evt.target.value);

  // const onChange = (setter) => (evt) => setter(evt.target.value); //modified
  // split the onChange function into two different functions one for setReciepient
  // another for setSign

  // const signData = async (data) => {
  //   const dataBytes = utf8ToBytes(JSON.stringify(data));
  //   const dataHash = keccak256(dataBytes);
  //   // const PRIVATE_KEY = utf8ToBytes(privateKey);

  //   const dataSigned = secp.secp256k1.sign(dataHash, privateKey, {
  //     recovered: true,
  //   });

  //   return dataSigned;
  // };

  const transfer = async (evt) => {
    evt.preventDefault();

    // const data = { sender: address, recipient, amount: parseInt(sendAmount) };
    // const signature = await signData(data);
    // // const signature = signData(data);

    // console.log(typeof signature);
    // var signatureToArr = Array.from(signature[0]);
    const data = { sender: address, recipient, amount: parseInt(sendAmount) };
    const bytes = utf8ToBytes(JSON.stringify(data));
    const hash = keccak256(bytes);

    // const PRIVATE_KEY = new Uint8Array(privateKey);

    const signature = await secp.sign(hash, privateKey, {
      recovered: true,
    });

    // console.log(signature);
    // console.log(toHex(signature));

    // console.log(signature);
    // // console.log(typeof signature);
    // console.log(signature[0]);
    // // console.log(typeof signature[0]);
    let sig = Array.from(signature[0]);
    // console.log(sig);
    // // console.log(typeof sig);
    // console.log(signature[1]);

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        ...data,
        signature: toHex(sig),
        recovery: 1,
      });

      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  };

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..." //enter amount here
          value={sendAmount} //amount is set to transfer
          // value={sign} //modified
          onChange={setValue(setSendAmount)}
          // onChange={onChange(setSendAmount)} //modified
          // onChange={onChange(setSign)} //modified 2
          // onChange={setSign} //modified
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2" //enter address here
          value={recipient} //recipient is set to be transfered
          onChange={setValue(setRecipient)}
          // onChange={onChange(setRecipient)} //modified
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
};

export default Transfer;
