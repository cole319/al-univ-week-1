import { useState } from "react";
import server from "./server";

const Transfer = ({ address, setBalance, privateKey }) => {
  //the address field is to be omitted, to be derived from private key
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  // const [sign, setSign] = useState(""); //modified
  // const PRIVATE_KEY = privateKey; //modified

  const setValue = (setter) => (evt) => setter(evt.target.value);

  // const onChange = (setter) => (evt) => setter(evt.target.value); //modified
  // split the onChange function into two different functions one for setReciepient
  // another for setSign

  const transfer = async (evt) => {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address, //to be derived from private key,
        amount: parseInt(sendAmount),
        // amount: sign, //modified
        recipient,
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
