const express=require("express");
const {Short,List,One,Add,Update,Delete}=require('../controllers/roomController');
const router=express.Router();

router.route("/short").get(Short);
router.route("/").get(List);
router.route("/:id").get(One);
router.route("/").post(Add);
router.route("/:id").put(Update);
router.route("/:id").delete(Delete);

module.exports=router;