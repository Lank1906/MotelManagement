const {GetShortList,GetList,GetOne,AddObject,UpdateObject,DeleteObject}=require('../models/service');

async function Short(req,res){
     const result=await GetShortList({"user_id":req.user.id});
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Không tồn tại dịch vụ có sẵn vui lòng thêm dịch vụ!"})
    }
}

async function List(req,res){
    const result=await GetList({"user_id":req.user.id},req.query);
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Không tồn tại dịch vụ có sẵn!"})
    }
}

async function One(req,res){
    const result=await GetOne({"user_id":req.user.id,"id":req.params.id})
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Không tồn tại dịch vụ có sẵn!"})
    }
}

async function Add(req,res){
    delete req.body.id;
    const result=await AddObject({...req.body,"user_id":req.user.id});
    if(result>0){
        return res.status(200).json({"message":"Đã thêm dịch vụ thành công!","id":result});
    }
    else if(result.startsWith("Duplicate entry")){
        return res.status(200).json({"message":"Tên dịch vụ bị trùng lặp!","id":result});
    }
    else{
        return res.status(401).json({"message":"Thêm dịch vụ thất bại!"});
    }
}

async function Update(req,res){
    const result = await UpdateObject(req.body,{"user_id":req.user.id,"id":req.params.id});
    if(result>0){
        return res.status(200).json({"message":"Cập nhật dịch vụ thành công!","id":req.params.id});
    }
    else if(result==0){
        return res.status(400).json({"message":"Không tồn tại dịch vụ này!"})
    }
    else if(result.includes("Duplicate entry")){
        return res.status(200).json({"message":"Tên dịch vụ bị trùng lặp!","name":req.body.name});
    }
    else{
        return res.status(401).json({"message":"Cập nhật dịch vụ thất bại !"});
    }
}

async function Delete(req,res){
    const result=await UpdateObject({"is_active":0},{"user_id":req.user.id,"id":req.params.id})
    if(result>0){
        return res.status(200).json({"message":"Đã xóa dịch vụ!","id":req.params.id});
    }
    else if(result==0){
        return res.status(400).json({"message":"Không tồn tại dịch vụ này!"})
    }
    else{
        return res.status(400).json({"message":"Dịch vụ chưa được loại bỏ!"})
    }
}
module.exports={Short,List,One,Add,Update,Delete};