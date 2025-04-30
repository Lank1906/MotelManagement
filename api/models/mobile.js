const {GetQuery,GetJoinQuery,AddQuery,UpdateQuery,DeleteQuery}=require("./connect");

async function getRoomList(){
    try {
        const result=await GetJoinQuery('rooms',['users','types'],['rooms.id','users.username','check_in','img_room','rooms.user_id','types.priceFM','users.address'],['rooms.user_id=users.id','rooms.type=types.id'],{'check_in':null},{});
        return result;
    }
    catch(err){
        return err;
    }
}

async function getRoomByLandlord(jsonData){
    try {
        const result=await GetQuery('rooms',['id','name','check_in','image_room','user_id'],jsonData,{});
        return result;
    }
    catch(err){
        return err;
    }
}

async function getDetailRoom(id){
    try{
        const result=await GetJoinQuery('rooms',['users','types','room_rents'],['rooms.id','users.username','check_in','img_room','rooms.user_id','types.priceFM','users.address','water_number','person_limit','electric_number','count(room_rents.user_id) as CountPeople'],['rooms.user_id=users.id','rooms.type=types.id','rooms.id=room_rents.room_id'],{'rooms.id':id},{},undefined,'rooms.id');
        return result;
    }
    catch(err){
        return err;
    }
}

async function getDetailRoomRented(jsonData){
    
}

async function GetAnnounceForMe(){
    
}

async function GetAnnounceByMe(){
    
}

async function AddAnnounce(){
    
}

async function DeleteAnnounce(){
    
}

async function Calculate(){
    
}

async function UpdateProfile(){
    
}
module.exports={getRoomList,getDetailRoom}