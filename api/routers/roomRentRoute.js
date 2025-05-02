const express=require("express");
const {List,One,Add,Update,Delete,Info,Suggest}=require('../controllers/roomRentController');
const router=express.Router();

router.route("/").get(List);
router.route("/suggest").get(Suggest);
router.route("/:id").get(One)
router.route("/").post(Add);
router.route("/:id").put(Update);
router.route("/:id").delete(Delete);
router.route("/info/:id").get(Info);

module.exports=router;