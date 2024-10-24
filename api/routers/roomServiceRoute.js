const express=require("express")
const {List,Add,Delete}=require('../controllers/roomServiceController');
const router=express.Router();

router.route('/:id').get(List);
router.route('/:id').post(Add);
router.route('/:id').delete(Delete);

module.exports=router;