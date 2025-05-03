const express=require("express");
const {RoomList,RoomDetail,RoomByLandLord,RequestJoin,RoomRenting}=require('../controllers/mobileController');
const router=express.Router();

router.route("/").get(RoomList);
router.route("/landlord/:id").get(RoomByLandLord);
router.route("/request-join").post(RequestJoin)
router.route("/renting").get(RoomRenting)
router.route("/:id").get(RoomDetail);

module.exports=router;