const express = require("express");

const router = express.Router();

// Controller
const {
  addUsers,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const {
  getTransactions,
  addTransaction,
} = require("../controllers/transaction");
const {
  getCategories,
  addCategory,
  updateCategory,
  getCategory,
  deleteCategory,
} = require("../controllers/category");
const { getProfile , updateProfile, getProfiles} = require("../controllers/profile");
const { register, login, checkAuth } = require("../controllers/auth");

// Middleware
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");


// Route
router.post("/user", addUsers);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.delete("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

router.get("/profiles", auth, getProfiles);
router.get("/profile/:id", auth, getProfile);
router.patch("/profile/:id", auth, uploadFile("image"), updateProfile)

router.get("/products", auth, getProducts);
router.get("/product/:id", auth, getProduct);
router.post("/product", auth, uploadFile("image"), addProduct);
router.patch("/product/:id", auth, uploadFile("image"), updateProduct);
router.delete("/product/:id", auth, deleteProduct);

router.get("/transactions", auth, getTransactions);
router.post("/transaction", auth, addTransaction);

router.get("/categories", getCategories);
router.get("/category/:id", getCategory);
router.post("/category", addCategory);
router.patch("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

module.exports = router;
