const express=require("express");
const {SignUpCon,LoginCon,UpdateInfoCon}=require('../controllers/guestController');
const authenticateToken=require("../authen");
const router=express.Router();

router.route("/login").post(LoginCon);
router.route("/signup").post(SignUpCon);
router.route("/guest").put(authenticateToken,UpdateInfoCon);

module.exports=router;