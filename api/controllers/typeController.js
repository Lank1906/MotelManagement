const {GetShortList,GetList,GetOne,AddObject,UpdateObject,DeleteObject}=require('../models/type');

async function Short(req,res){
     const result=await GetShortList({"user_id":req.user.id});
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"KKhông tồn tại dữ liệu có sẵn"})
    }
}

async function List(req,res){
    const result=await GetList({"user_id":req.user.id},req.query);
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"KKhông tồn tại dữ liệu có sẵn"})
    }
}

async function One(req,res){
    const result=await GetOne({"user_id":req.user.id,"id":req.params.id})
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"KKhông tồn tại dữ liệu có sẵn"})
    }
}

async function Add(req,res){
    delete req.body.id;
    const result=await AddObject({...req.body,"user_id":req.user.id});
    if(result>0){
        return res.status(200).json({"message":"Đã thêm dữ liệu thành công!","id":result});
    }
    else{
        return res.status(401).json({"message":"Thêm dữ liệu thất bại !"});
    }
}

async function Update(req,res){
    const result = await UpdateObject(req.body,{"user_id":req.user.id,"id":req.params.id});
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
module.exports={Short,List,One,Add,Update,Delete};