const express=require("express");
const {ListByMe,ListForMe,Add,AddByRoom,Delete}=require('../controllers/announceController');
const router=express.Router();

router.route("/by-me").get(ListByMe)
router.route("/for-me").get(ListForMe);
router.route("/").post(Add);
router.route("/:id").post(AddByRoom);
router.route("/:id").delete(Delete);

module.exports=router;