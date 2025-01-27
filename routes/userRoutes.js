const express = require("express");
const {
  loginController,
  registerController,
  authCtrl,
  authController
} = require("../controllers/userCtrl");
const authmiddleware = require("../middlewares/authMiddleware")
//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

// auth 
router.post('/getUserdata',authmiddleware,authController)

module.exports = router;