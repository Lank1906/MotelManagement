const express=require("express");
const {RoomList}=require('../controllers/mobileController');
const router=express.Router();

router.route("/").get(RoomList);

module.exports=router;