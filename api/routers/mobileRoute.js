const express=require("express");
const {RoomList,RoomDetail,RoomByLandLord,RequestJoin,RoomRenting,AnnounceForMe,AnnounceByMe,Add,Delete,GetProfile,UpdateProfile}=require('../controllers/mobileController');
const router=express.Router();

router.route("/").get(RoomList);
router.route("/landlord/:id").get(RoomByLandLord);
router.route("/request-join").post(RequestJoin)
router.route("/renting").get(RoomRenting)
router.route("/announce/for-me").get(AnnounceForMe);
router.route("/announce/by-me").get(AnnounceByMe);
router.route("/announce/:id").delete(Delete);
router.route("/announce").post(Add);
router.route("/profile").get(GetProfile);
router.route("/profile").put(UpdateProfile);
router.route("/:id").get(RoomDetail);

module.exports=router;