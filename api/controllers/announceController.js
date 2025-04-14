const {GetListByMe,GetListForMe,AddObject,DeleteObject,GetIdsByRoom}=require('../models/announce');

async function ListByMe(req,res){
    const result=await GetListByMe({"user_id":req.user.id});
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Không có thông báo mới nào!"})
    }
}

async function ListForMe(req,res){
    const result=await GetListForMe({"for_id":req.user.id});
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Không có thông báo mới nào!"})
    }
}

async function Add(req,res){
    const result=await AddObject({...req.body,'user_id':req.user.id});
    if(result>0){
        return res.status(200).json({"message":"Đã gửi thông báo thành công!","id":result});
    }
    else{
        return res.status(400).json({"message":"Không thể thêm được thông báo!"})
    }
}

async function AddByRoom(req,res){
    if(!req.params.id){
        return res.status(400).json({"message":"Bạn chưa chọn phòng muốn thông báo!"})
    }
    const ids=await GetIdsByRoom({'room_id':req.params.id,'is_active':1});
    if(ids.length==0){
        return res.status(400).json({"message":"Phòng này chưa có người thuê nào cả!"})
    }
    let result;
    let idsent=[];
    for (const item of ids) {
        const result = await AddObject({...req.body,user_id: req.user.id, for_id: item.user_id});
        idsent.push(result);
    }
    if(idsent.length>0){
        return res.status(200).json({"message":"Đã gửi thông báo thành công!","id":idsent});
    }
    else{
        return res.status(400).json({"message":"Không thể thêm được thông báo!"})
    }
}

async function Delete(req,res){
    const result=await DeleteObject({'id':req.params.id,'user_id':req.user.id});
    if(result>0){
        return res.status(200).json({"message":"Xóa thông báo thành công!"});
    }
    else{
        return res.status(400).json({"message":"Xóa thông báo thất bại!"});
    }
}

module.exports={ListByMe,ListForMe,Add,AddByRoom,Delete};