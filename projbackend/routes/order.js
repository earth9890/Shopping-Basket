const express = require("express");
const router = express.Router();

const {isSignIn , isAuthenticated , isAdmin} = require("../controllers/auth")
const {getUserById, pushOrderInPurchaseList} = require("../controllers/user")
const {updateStock} = require("../controllers/product");

const {getOrderById , createOrder , getAllOrders,getOrderStatus,updateStatus} = require("../controllers/order")

//params
router.param("userID" , getUserById);
router.param("orderID" , getOrderById);

//Actual Routes

//create
router.post("/order/create/:userID", isSignIn , isAuthenticated , pushOrderInPurchaseList , updateStock , createOrder);

//read
router.get("/order/all/:userID", isSignIn, isAuthenticated, isAdmin, getAllOrders);

//status of Order
router.get("/order/status/:userID", isSignIn,isAuthenticated, isAdmin,getOrderStatus)
router.put("/order/:orderID/status/:userID", isSignIn,isAuthenticated, isAdmin,updateStatus);

module.exports = router;