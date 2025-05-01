const {getRoomList,getDetailRoom,AddAnnounce,getRoomByLandlord}=require("../models/mobile");

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

module.exports={RoomList,RoomDetail,RoomByLandLord};