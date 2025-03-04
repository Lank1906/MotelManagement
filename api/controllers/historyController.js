const {GetList,GetOne,AddObject,UpdateObject,DeleteObject,GetFill,GetRevenue,GetRevenueByRoom}=require('../models/history');

async function List(req,res){
    const result= await GetList({...req.query,"rooms.user_id":req.user.id});
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Không tồn tại dữ liệu có sẵn"})
    }
}

async function One(req,res){
    const result=await GetOne({...req.query,"rooms.user_id":req.user.id,"history_room.id":req.params.id});
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Không tồn tại dữ liệu có sẵn"})
    }
}

async function Fill(req,res){
    const result=await GetFill({"user_id":req.user.id});
    if(result.length>0)
        return res.status(200).json(result[0])
    else
        return res.status(400).json({"message":"Không tồn tại dữ liệu có sẵn"})
}

async function Revenue(req,res){
    const result=await GetRevenue({"user_id":req.user.id});
    if(result.length>0)
        return res.status(200).json(result)
    else
        return res.status(400).json({"message":"Không tồn tại dữ liệu có sẵn"})
}

async function RevenueByRoom(req,res){
    const result=await GetRevenueByRoom({"user_id":req.user.id,"room_id":req.params.id});
    if(result.length>0)
        return res.status(200).json(result)
    else
        return res.status(400).json({"message":"Không tồn tại dữ liệu có sẵn"})
}

async function Add(req,res){
    const result=await AddObject({...req.body,"user_id":req.user.id});
    if(result>0){
        return res.status(200).json({"message":"Đã thêm dữ liệu thành công!"});
    }
    else{
        return res.status(401).json({"message":"Thêm dữ liệu thất bại !"});
    }
}

async function Update(req,res){
    const result = await UpdateObject(req.body,{"user_id":req.user.id,"id":req.params.id});
    if(result==1){
        return res.status(200).json({"message":"Cập nhật thành công!"});
    }
    else{
        return res.status(401).json({"message":"Cập nhật thất bại !"});
    }
}

async function Delete(req,res){
    const result=await DeleteObject({"user_id":req.user.id,"id":req.params.id})
    if(result){
        return res.status(200).json({"message":"Đã xóa dữ liệu"});
    }
    else{
        return res.status(400).json({"message":"Dữ liệu chưa được loại bỏ"})
    }
}
module.exports={List,One,Add,Update,Delete,Fill,Revenue,RevenueByRoom};