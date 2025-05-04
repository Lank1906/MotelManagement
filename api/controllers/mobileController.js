const {getRoomList,getDetailRoom,getRoomByLandlord,getDetailRoomRenting,GetAnnounceByMe,GetAnnounceForMe,AddAnnounce,DeleteAnnounce}=require("../models/mobile");

async function RoomList(req,res){
    const result=await getRoomList();
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Chưa có phòng nào trông trên hệ thống!"})
    }
}

async function RoomDetail(req,res){
    const result=await getDetailRoom(req.params.id,req.user.id);
    if(result){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Phòng này không có trên hệ thống!"})
    }
}

async function RoomByLandLord(req,res){
    const result=await getRoomByLandlord({'rooms.user_id':req.params.id});
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Chủ này chưa có phòng nào trông trên hệ thống!"})
    }
}

async function RequestJoin(req,res){
    const result=await AddAnnounce({...req.body,'user_id':req.user.id})
    if(result>0){
        return res.status(200).json({"message":"Đã gửi thông báo cho chủ sở hữu! Vui lòng đợi phê duyệt!","id":result});
    }
    else{
        return res.status(400).json({"message":"Opp! Không thể gửi được thông báo!"})
    }
}

async function RoomRenting(req,res){
    const result=await getDetailRoomRenting({'room_rents.user_id':req.user.id,'users.is_active':1});
    if(result){
        return res.status(200).json(result[0]);
    }
    else{
        return res.status(400).json({"message":"Phòng này không có trên hệ thống!"})
    }
}

async function AnnounceByMe(req,res){
    const result=await GetAnnounceByMe({"user_id":req.user.id});
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Không có thông báo mới nào!"})
    }
}

async function AnnounceForMe(req,res){
    const result=await GetAnnounceForMe({"for_id":req.user.id});
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Không có thông báo mới nào!"})
    }
}

async function Add(req,res){
    const result=await AddAnnounce({...req.body,'user_id':req.user.id});
    if(result>0){
        return res.status(200).json({"message":"Đã gửi thông báo thành công!","id":result});
    }
    else{
        return res.status(400).json({"message":"Không thể thêm được thông báo!"})
    }
}

async function Delete(req,res){
    const result=await DeleteAnnounce({'id':req.params.id,'user_id':req.user.id});
    if(result>0){
        return res.status(200).json({"message":"Xóa thông báo thành công!"});
    }
    else{
        return res.status(400).json({"message":"Xóa thông báo thất bại!"});
    }
}

module.exports={RoomList,RoomDetail,RoomByLandLord,RequestJoin,RoomRenting,AnnounceForMe,AnnounceByMe,Add,Delete};