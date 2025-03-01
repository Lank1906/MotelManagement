const {GetList,GetOne,AddObject,UpdateObject,DeleteObject}=require("../models/renter");

async function List(req,res){
    const result=await GetList({"rooms.user_id":req.user.id},req.query)
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Không tồn tại dữ liệu có sẵn"})
    }
}

async function One(req,res){
    const result=await GetOne({"renters.id":req.params.id,"renters.user_id":req.user.id});
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Không tồn tại dữ liệu có sẵn"})
    }
}

async function Add(req,res){
    req.body.name=req.body.renter_name
    delete req.body.renter_name
    const result=await AddObject({...req.body,"user_id":req.user.id});
    if(result>0){
        return res.status(200).json({"message":"Đã thêm dữ liệu thành công!","id":result});
    }
    else{
        return res.status(401).json({"message":"Thêm dữ liệu thất bại !"});
    }
}

async function Update(req,res){
    delete req.body.room_name
    req.body.name=req.body.renter_name
    delete req.body.renter_name
    const result = await UpdateObject(req.body,{"id":req.params.id});
    if(result>0){
        return res.status(200).json({"message":"Cập nhật thành công!","id":result});
    }
    else{
        return res.status(401).json({"message":"Cập nhật thất bại !"});
    }
}

async function Delete(req,res){
    const result=await DeleteObject({"user_id":req.user.id,"id":req.params.id})
    if(result>0){
        return res.status(200).json({"message":"Đã xóa dữ liệu","id":result});
    }
    else{
        return res.status(400).json({"message":"Dữ liệu chưa được loại bỏ"})
    }
}
module.exports={List,One,Add,Update,Delete};