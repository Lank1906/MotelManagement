const express=require("express");
const {List,Add,Update,Delete}=require('../controllers/typeController');
const router=express.Router();

router.route("/").get(List);
router.route("/").post(Add);
router.route("/:id").put(Update);
router.route("/:id").delete(Delete);

module.exports=router;