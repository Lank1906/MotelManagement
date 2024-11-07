const {GetList}=require('../models/calculate');

async function List(req,res){
    const result=await GetList({"rooms.user_id":req.user.id,"rooms.id":req.params.id});
    if(result.length>0)
        return res.status(200).json(result)
    else
        return res.status(400).json({"message":"Tính toán thất bại"})
}

module.exports={List}