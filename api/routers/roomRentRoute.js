const express=require("express");
const {List,One,Add,Update,Delete}=require('../controllers/roomRentController');
const router=express.Router();

router.route("/").get(List);
router.route("/:id").get(One)
router.route("/").post(Add);
router.route("/:id").put(Update);
router.route("/:id").delete(Delete);

module.exports=router;