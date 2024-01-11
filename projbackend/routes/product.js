const express = require("express");
const router = express.Router();


const {getProductById,createProduct,getProduct,photo,deleteProduct,updateProduct,getAllProducts,getAllUniqueCategories} = require("../controllers/product")
const {isSignIn , isAuthenticated , isAdmin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//all about params
router.param("userID",getUserById);
router.param("productID",getProductById);

//all about routes

//create Routes
router.post("/product/create/:userID", isSignIn , isAuthenticated , isAdmin, createProduct);

//read Routes
router.get("/product/:productID" , getProduct);
router.get("/product/photo/:productID", photo);

//delete Routes
router.delete("/product/:productID/:userID", isSignIn , isAuthenticated , isAdmin , deleteProduct);


//update Routes
router.put("/product/:productID/:userID", isSignIn , isAuthenticated , isAdmin , updateProduct);

//listing routes
router.get("/products", getAllProducts);
router.get("/products/categories", getAllUniqueCategories);



module.exports = router;