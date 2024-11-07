const express=require("express");
const {List}=require("../controllers/calculateController");
const router=express.Router()

router.route("/:id").get(List);

module.exports=router;