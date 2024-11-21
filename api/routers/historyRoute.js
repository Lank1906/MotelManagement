const express=require("express");
const {List,One,Add,Update,Delete,Fill,Revenue,RevenueByRoom}=require('../controllers/historyController');
const router=express.Router();

router.route("/").get(List);
router.route("/fill").get(Fill);
router.route("/revenue").get(Revenue);
router.route("/revenuebyroom/:id").get(RevenueByRoom);
router.route("/").post(Add);
router.route("/:id").put(Update);
router.route("/:id").delete(Delete);

module.exports=router;