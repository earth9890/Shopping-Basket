require("dotenv").config();
const braintree = require("braintree");
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MerchantID,
  publicKey: process.env.PayPublicKey,
  privateKey: process.env.PayPrivateKey,
});

// var gateway = braintree.connect({
//     environment: braintree.Environment.Sandbox,
//     merchantId: "m44f8hn8g4gvpjws",
//     publicKey: "p5j7tc3p9mgch83d",
//     privateKey: "79c4c6255888a46f26036a8b0792b514",

// })

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;

  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
};
