const express=require("express");
const {List,Bill,BillByDate,Pay}=require("../controllers/calculateController");
const router=express.Router()

router.route("/:id").get(List);
router.route("/:id").post(Bill);
router.route('/:date/:id').get(BillByDate)
router.route("/:id").put(Pay);

module.exports=router;