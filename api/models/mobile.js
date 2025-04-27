const {GetQuery,AddQuery,UpdateQuery,DeleteQuery}=require("./connect");

async function getRoomList(jsonData){
    try {
        const result=await GetQuery('rooms',['id','name','check_in','image_room','user_id'],{'check_in':null},{});
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