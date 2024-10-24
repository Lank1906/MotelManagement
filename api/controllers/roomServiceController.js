const {GetList,AddObject,DeleteObject}=require('../models/roomService');

async function List(req,res){
    const result=await GetList({'user_id':req.user.id,'room_id':req.params.id})
    if(result.length>0){
        return res.status(200).json(result);
    }
}

async function Add(req,res){
    const result=await AddObject({...req.body,'room_id':req.params.id,"user_id":req.user.id})
    if(result>0){
        return res.status(200).json({"message":"Đã thêm dữ liệu thành công!"});
    }
    else{
        return res.status(401).json({"message":"Thêm dữ liệu thất bại !"});
    }
}

async function Delete(req,res){
    const result=await DeleteObject({'id':req.params.id});
    if(result){
        return res.status(200).json({"message":"Đã xóa dữ liệu"});
    }
    else{
        return res.status(400).json({"message":"Dữ liệu chưa được loại bỏ"})
    }
}

module.exports={List,Add,Delete};