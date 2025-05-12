const express=require("express");
const {RoomList,RoomDetail,RoomByLandLord,RequestJoin,RoomRenting,AnnounceForMe,AnnounceByMe,Add,Delete,GetProfile,UpdateProfile,LasestBill,ConfirmBill,LeaveRoom}=require('../controllers/mobileController');
const router=express.Router();

router.route("/").get(RoomList);
router.route("/landlord/:id").get(RoomByLandLord);
router.route("/request-join").post(RequestJoin)
router.route("/renting").get(RoomRenting);
router.route("/bill/confirm/:id").put(ConfirmBill)
router.route("/bill/:id").get(LasestBill);
router.route("/announce/for-me").get(AnnounceForMe);
router.route("/announce/by-me").get(AnnounceByMe);
router.route("/announce/:id").delete(Delete);
router.route("/announce").post(Add);
router.route("/profile").get(GetProfile);
router.route("/profile").put(UpdateProfile);
router.route("/leave").get(LeaveRoom);
router.route("/:id").get(RoomDetail);

module.exports=router;