const express = require('express')
const router = express.Router()

const { isSignIn, isAuthenticated } = require("../controllers/auth")
const { getToken, processPayment } = require('../controllers/paymentB');
const { getUserById } = require('../controllers/user');
router.param("userID", getUserById);

router.get("/payment/gettoken/:userID", isSignIn, isAuthenticated, getToken)

router.post("/payment/braintree/:userID", isSignIn, isAuthenticated, processPayment)





module.exports = router