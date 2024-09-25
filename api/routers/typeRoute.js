const express=require("express");
const {Short,List,Add,Update,Delete}=require('../controllers/typeController');
const router=express.Router();

router.route("/short").get(Short)
router.route("/").get(List);
router.route("/").post(Add);
router.route("/:id").put(Update);
router.route("/:id").delete(Delete);

module.exports=router;