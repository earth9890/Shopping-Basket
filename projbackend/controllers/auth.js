const User = require("../models/user");
const { check, validationResult } = require("express-validator")

var jwt = require('jsonwebtoken');
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      err: errors.array()[0].param
    })
  }


  const user = new User(req.body);
  user.save((err, user) => {

    if (err) {
      console.log(err);
      return res.status(400).json({
        // err: "NOT able to save user in DB"
        err
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};

exports.signin = (req, res) => {

  const errors = validationResult(req);

  const { email, password } = req.body

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      err: errors.array()[0].param
    })
  }

  User.findOne({ email }, (err, user) => {

    if (err || !user) {
      return res.status(400).json({
        error: "USER NOT FOUND"
      })
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        message: "Email or Password is not Correct"
      })
    }

    //Create Token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET)

    //put Token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 })

    //send token to front end
    const { _id, name, email, role } = user
    return res.json({ token, user: { _id, name, email, role } })

  })


  // res.json({
  //   message: "User Signin"
  // })

}

exports.signout = (req, res) => {

  res.clearCookie("token");

  res.json({
    message: "User signout"
  });
};

//protected routes
exports.isSignIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth"
})

//custom middlewares

exports.isAuthenticated = (req, res, next) => {

  let checker = req.profile && req.auth && req.auth._id == req.profile._id
  // console.log(req.profile);
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied"
    })
  }

  next()

};

exports.isAdmin = (req, res, next) => {

  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not an ADMIN, Access Denied"
    })

  }


  next()

};

