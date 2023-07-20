const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "1c1415ce6fcfa9e1fdf7cfa9f5fdcba6773d999c": 110, //person A
  "978905b17e30da3603a72903e836a5908cad7f97": 50, //person B
  "38528b83341c8f4fc6bf6d634427644ff3b58474": 75, //person C
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  //Todo: get a signature from the client side app
  //recover the address from the signature
  //set the address as the sender
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

const setInitialBalance = (address) => {
  if (!balances[address]) {
    balances[address] = 0;
  }
};
