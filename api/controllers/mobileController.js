const {getRoomList,getDetailRoom}=require("../models/mobile");

async function RoomList(){
    const result=await getRoomList();
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Chưa có phòng nào trông trên hệ thống!"})
    }
}

async function RoomDetail(req,res){
    const result=await getDetailRoom(req.params.id);
    if(result.length>0){
        return res.status(200).json(result[0]);
    }
    else{
        return res.status(400).json({"message":"Phòng này không có trên hệ thống!"})
    }
}

module.exports={RoomList,RoomDetail};