const express=require("express")
const {ListCurrently,ListDate,Add,Delete}=require('../controllers/roomServiceController');
const router=express.Router();

router.route('/:id').get(ListCurrently);
router.route('/:date/:id').get(ListDate)
router.route('/:id').post(Add);
router.route('/:id').delete(Delete);

module.exports=router;