const express=require("express");
const {GetCon,AddCon,UpdateCon,DeleteCon}=require('../controllers/roomController');
const router=express.Router();

router.route("/").get(GetCon);
router.route("/").post(AddCon);
router.route("/:id").put(UpdateCon);
router.route("/:id").delete(DeleteCon);

module.exports=router;