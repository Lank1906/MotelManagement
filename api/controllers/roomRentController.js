const {GetList,GetOne,AddObject,UpdateObject,DeleteObject,ListRoomId,RequestInfo,GetSuggest}=require("../models/roomRent");

async function List(req,res){
    const result=await GetList({"rooms.user_id":req.user.id},req.query)
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Không tồn tại người thuê có sẵn"})
    }
}

async function One(req,res){
    const result=await GetOne({"room_rents.id":req.params.id,"rooms.user_id":req.user.id});
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Không tồn tại người thuê có sẵn"})
    }
}

async function Suggest(req,res){
    const result=await GetSuggest({"for_id":req.user.id});
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Không tồn tại người thuê có sẵn"})
    }
}

async function Add(req,res){
    const result=await AddObject({...req.body,"is_active":1},{'user_id':req.user.id});
    if(result>0){
        return res.status(200).json({"message":"Đã thuê phòng thành công!","id":result});
    }
    else{
        return res.status(401).json({"message":"Thuê phòng thất bại !"});
    }
}

async function Update(req,res){
    delete req.body.room_name
    const result = await UpdateObject(req.body,{"id":req.params.id});
    if(result>0){
        return res.status(200).json({"message":"Cập nhật dữ liệu người thuê thành công!","id":result});
    }
    else if(result==0){
        return res.status(400).json({"message":"Không tồn tại dữ liệu người thuê này!"})
    }
    else if(result.includes("Duplicate entry")){
        return res.status(200).json({"message":"Số CCCD bị trùng lặp!","name":req.body.name});
    }
    else{
        return res.status(401).json({"message":"Cập nhật dữ liệu người thuê thất bại !"});
    }
}

async function Delete(req,res){
    const result=await DeleteObject({"is_active":0,"room_id":null},{"id":req.params.id})
    if(result>0){
        return res.status(200).json({"message":"Xác nhận chuyển đi thành công","id":result});
    }
    else if(result==0){
        return res.status(400).json({"message":"Bạn chưa thuê phòng nào hết!"})
    }
    else{
        return res.status(400).json({"message":"Dữ liệu người thuê chưa được loại bỏ"})
    }
}

async function Info(req,res){
    const result=await RequestInfo({'user_id':req.user.id,'for_id':req.params.id,'message':'Bạn cần phải cập nhật thông tin cá nhân để có thể đăng tạm trú một cách nhanh chóng!'});
    if(result>0){
        return res.status(200).json({"message":"Đã gửi yêu cầu thành công!","id":result});
    }
    else{
        return res.status(401).json({"message":"Yêu cầu thất bại !"});
    }
}
module.exports={List,One,Add,Update,Delete,Info,Suggest};