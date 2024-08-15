const {Get,Add,Update,Delete}=require('../models/room');

async function GetCon(req,res){
    const result=await Get({...req.query,"rooms.user_id":req.user.id});
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Không tồn tại dữ liệu có sẵn"})
    }
}

async function AddCon(req,res){
    const result=await Add({...req.body,"user_id":req.user.id});
    if(result>0){
        return res.status(200).json({"message":"Đã thêm dữ liệu thành công!"});
    }
    else{
        return res.status(401).json({"message":"Thêm dữ liệu thất bại !"});
    }
}

async function UpdateCon(req,res){
    const result = await Update(req.body,{"user_id":req.user.id,"id":req.params.id});
    if(result==1){
        return res.status(200).json({"message":"Cập nhật thành công!"});
    }
    else{
        return res.status(401).json({"message":"Cập nhật thất bại !"});
    }
}

async function DeleteCon(req,res){
    const result=await Delete({"user_id":req.user.id,"id":req.params.id})
    if(result){
        return res.status(200).json({"message":"Đã xóa dữ liệu"});
    }
    else{
        return res.status(400).json({"message":"Dữ liệu chưa được loại bỏ"})
    }
}
module.exports={GetCon,AddCon,UpdateCon,DeleteCon};