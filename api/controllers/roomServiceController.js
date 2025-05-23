const {GetListCurrently,GetListByDate,AddObject,DeleteObject}=require('../models/roomService');

async function ListCurrently(req,res){
    const result=await GetListCurrently({'user_id':req.user.id,'room_id':req.params.id})
    if(result.length>0){
        return res.status(200).json(result);
    }
    return res.status(400).json({"message":"Phòng chưa có dịch vụ nào!"});
}

async function ListDate(req,res){
    const result=await GetListByDate(req.params.date,{'services.user_id':req.user.id,'room_id':req.params.id})
    if(result.length>0){
        return res.status(200).json(result);
    }
    return res.status(400).json({'message':'Không thể truy xuất dịch vụ của tháng này!'})
}

async function Add(req,res){
    const result=await AddObject({...req.body,'room_id':req.params.id,"user_id":req.user.id})
    if(result>0){
        return res.status(200).json({"message":"Đã thêm dịch vụ cho phòng thành công!","id":result});
    }
    else{
        return res.status(401).json({"message":"Thêm dịch vụ của phòng thất bại !"});
    }
}

async function Delete(req,res){
    const result=await DeleteObject({'id':req.params.id});
    if(result>0){
        return res.status(200).json({"message":"Đã xóa dịch vụ phòng này!","id":result});
    }
    else{
        return res.status(400).json({"message":"Dịch vụ phòng chưa được loại bỏ"})
    }
}

module.exports={ListCurrently,ListDate,Add,Delete};