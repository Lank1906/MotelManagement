const express=require("express");
const {RoomList,RoomDetail}=require('../controllers/mobileController');
const router=express.Router();

router.route("/").get(RoomList);
router.route("/:id").get(RoomDetail);

module.exports=router;