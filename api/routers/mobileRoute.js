const express=require("express");
const {RoomList,RoomDetail,RoomByLandLord}=require('../controllers/mobileController');
const router=express.Router();

router.route("/").get(RoomList);
router.route("/landlord/:id").get(RoomByLandLord);
router.route("/:id").get(RoomDetail);

module.exports=router;