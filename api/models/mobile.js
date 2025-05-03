const {GetQuery,GetJoinQuery,AddQuery,UpdateQuery,DeleteQuery}=require("./connect");

async function getRoomList(){
    try {
        const result=await GetJoinQuery('rooms',['users','types'],['rooms.name','rooms.id','users.username','check_in','img_room','rooms.user_id','types.priceFM','users.address'],['rooms.user_id=users.id','rooms.type=types.id'],{},{},['check_in is null']);
        return result;
    }
    catch(err){
        return err;
    }
}

async function getRoomByLandlord(jsonData){
    try {
        const result=await GetJoinQuery('rooms',['users','types'],['rooms.name','rooms.id','users.username','check_in','img_room','rooms.user_id','types.priceFM','users.address'],['rooms.user_id=users.id','rooms.type=types.id'],jsonData,{});
        return result;
    }
    catch(err){
        return err;
    }
}

async function getDetailRoom(id,user_id){
    try{
        const room_now=await GetQuery('room_rents',['room_id'],{'user_id':user_id},{});
        const result=await GetJoinQuery('rooms',['users','types','room_rents'],['rooms.id','users.username','check_in','img_room','rooms.name','rooms.user_id','types.priceFM','users.address','water_number','person_limit','electric_number','count(room_rents.user_id) as CountPeople'],['rooms.user_id=users.id','rooms.type=types.id','rooms.id=room_rents.room_id'],{'rooms.id':id},{},undefined,'rooms.id');
        return { ...result[0], room_now: room_now[0].room_id };
    }
    catch(err){
        return err;
    }
}

async function getDetailRoomRenting(jsonData){
    try {
        const result=await GetJoinQuery('users',['rooms','room_rents'],['users.username','users.phone','users.email','users.address','rooms.name','rooms.person_limit','rooms.electric_number','rooms.water_number','rooms.check_in','rooms.img_room','rooms.bill_at','count(room_rents.user_id) as CountPeople'],['rooms.user_id=users.id','rooms.id=room_rents.room_id'],jsonData,{},undefined,'rooms.id');
        return result;
    }
    catch(err){
        return err;
    }
}

async function getLasestBill(jsonData){
    
}

async function GetAnnounceForMe(){
    
}

async function GetAnnounceByMe(){
    
}

async function AddAnnounce(jsonData){
    try{
        const result=await AddQuery('announces',jsonData);
        return result;
    }
    catch (err){
        return err;
    }
}

async function DeleteAnnounce(){
    try{
        const result= await DeleteQuery('announces',jsonCondition);
        return result
    }
    catch(err){
        return err;
    }
}

async function UpdateProfile(){
    
}
module.exports={getRoomList,getDetailRoom,AddAnnounce,getRoomByLandlord,getDetailRoomRenting}