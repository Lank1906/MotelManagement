const {getRoomList}=require("../models/mobile");

async function RoomList(){
    const result=await getRoomList();
    if(result.length>0){
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json({"message":"Chưa có phòng nào trông trên hệ thống!"})
    }
}

module.exports={RoomList};