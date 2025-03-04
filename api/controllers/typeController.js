const {GetShortList,GetList,GetOne,AddObject,UpdateObject,DeleteObject}=require('../models/type');

async function Short(req,res){
     const result=await GetShortList({"user_id":req.user.id});
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Không tồn tại loại phòng nào! Hãy thêm loại phòng mới!"})
    }
}

async function List(req,res){
    const result=await GetList({"user_id":req.user.id},req.query);
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Không tồn tại loại phòng này!"})
    }
}

async function One(req,res){
    const result=await GetOne({"user_id":req.user.id,"id":req.params.id})
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Không tồn tại loại phòng có sẵn!"})
    }
}

async function Add(req,res){
    delete req.body.id;
    const result=await AddObject({...req.body,"user_id":req.user.id});
    if(result>0){
        return res.status(200).json({"message":"Đã thêm loại phòng thành công!","id":result});
    }
    else{
        return res.status(401).json({"message":"Thêm loại phòng thất bại !"});
    }
}

async function Update(req,res){
    const result = await UpdateObject(req.body,{"user_id":req.user.id,"id":req.params.id});
    if(result){
        return res.status(200).json({"message":"Cập nhật loại phòng thành công! "+result+"loại được sửa!","id":req.params.id});
    }
    else if(result==0){
        return res.status(400).json({"message":"Không tồn tại loại phòng này!"})
    }
    else{
        return res.status(401).json({"message":"Cập nhật loại phòng thất bại !"});
    }
}

async function Delete(req,res){
    const result=await UpdateObject({'is_active':0},{"user_id":req.user.id,"id":req.params.id})
    if(result){
        return res.status(200).json({"message":"Đã xóa loại phòng. "+result+" loại phòng bị xóa!","id":req.params.id});
    }
    else if(result==0){
        return res.status(400).json({"message":"Không tồn tại loại phòng này!"})
    }
    else{
        return res.status(400).json({"message":"Loại phòng chưa được loại bỏ!"})
    }
}
module.exports={Short,List,One,Add,Update,Delete};