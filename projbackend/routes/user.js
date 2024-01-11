const express = require("express")
const router = express.Router();

const {
    getUserById,
    getUser,
    updateUser,
    userPurchaseList
    } = require("../controllers/user")
const {isSignIn,isAuthenticated,isAdmin} = require("../controllers/auth")

router.param("userID",getUserById);

router.get("/user/:userID", isSignIn,isAuthenticated, getUser);

router.get("/orders/user/:userID", isSignIn,isAuthenticated,userPurchaseList);

router.put("/user/:userID",isSignIn,isAuthenticated,updateUser);


module.exports = router;