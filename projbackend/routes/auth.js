var express = require('express');
var router = express.Router();

const { check } = require('express-validator');

const {signout,signup,signin,isSignIn} = require("../controllers/auth");


router.post("/signup",[
    check("name","Name should be 3 char long").isLength({min: 3}),
    check("email","email should be valid").isEmail()
],signup);

router.post("/signin",[
    check("email","email should be valid").isEmail(),
    check("password","password is required").isLength({min:1})
],signin);

router.get("/signout",signout);

router.get("/testroute",isSignIn,(req,res) => {
    res.json(req.auth)
});


module.exports = router;