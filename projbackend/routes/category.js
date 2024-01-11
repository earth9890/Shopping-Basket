const express = require("express");
const router = express.Router();

const { getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory } = require("../controllers/category");
const { isSignIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userID", getUserById);
router.param("categoryID", getCategoryById);

//actual router goes here

//create routes
router.post("/category/create/:userID", isSignIn, isAuthenticated, isAdmin, createCategory)


//read routes 
router.get("/category/:categoryID", getCategory);
router.get("/categories", getAllCategory);


//update routes 
router.put("/category/:categoryID/:userID", isSignIn, isAuthenticated, isAdmin, updateCategory);

//delete routes
router.delete("/category/:categoryID/:userID", isSignIn, isAuthenticated, isAdmin, removeCategory);

module.exports = router;