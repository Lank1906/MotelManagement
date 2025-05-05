const {GetQuery,GetJoinQuery,AddQuery,UpdateQuery,DeleteQuery}=require("./connect");
const bcrypt=require('bcryptjs')

async function getRoomList(jsonLike,extendCondition){
    try {
        const result=await GetJoinQuery('rooms',['users','types'],['rooms.name','rooms.id','users.username','check_in','img_room','rooms.user_id','types.priceFM','users.address'],['rooms.user_id=users.id','rooms.type=types.id'],{},jsonLike,extendCondition);
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

async function GetAnnounceForMe(jsonData){
    try{
        const result=await GetJoinQuery('announces',['users'],['announces.id','user_id','message','viewed','username'],['announces.user_id=users.id'],jsonData,{})
        return result;
    }
    catch (err){
        return err
    }
}

async function GetAnnounceByMe(jsonData){
    try{
        const result=await GetJoinQuery('announces',['users'],['announces.id','for_id','message','viewed','username'],['announces.for_id=users.id'],jsonData,{})
        return result;
    }
    catch (err){
        return err
    }
}

async function AddAnnounce(jsonData){
    try{
        const landlord=await GetJoinQuery('room_rents',['rooms'],['rooms.user_id'],['room_rents.room_id=rooms.id'],{'room_rents.user_id':jsonData.user_id},{});
        const result=await AddQuery('announces',{...jsonData,'for_id':landlord[0].user_id});
        return result;
    }
    catch (err){
        return err;
    }
}

async function DeleteAnnounce(jsonCondition){
    try{
        const result= await DeleteQuery('announces',jsonCondition);
        return result
    }
    catch(err){
        return err;
    }
}

async function getProfile(jsonData){
    try{
        const result=await GetQuery('users',['username','phone','email','cccd','address','img_font','img_back'],jsonData,{});
        return result;
    }
    catch(err){
        return err;
    }
}

async function updateProfile(jsonChange,jsonCondition){
    try{
        const result=await UpdateQuery('users',jsonChange,jsonCondition);
        return result;
    }
    catch(err){
        return err;
    }
}

async function SignUp(jsonData){
    jsonData.per=2
    try{
        jsonData.password= await bcrypt.hash(jsonData.password,12)
        const result=await AddQuery('users',jsonData);
        const re=await AddQuery('room_rents',{'user_id':result})
        return result;
    }
    catch (err){
        return err;
    }
}
async function Login(jsonData){
    try{
        password=jsonData.password;
        jsonData.is_active=1;
        jsonData.per=2;
        delete jsonData.password;
        result= await GetQuery('users',['id','username','password','per'],jsonData,{});
        if(result.length==1 && await bcrypt.compare(password,result[0].password)){
            result=result[0];
            delete result.password
            return result;
        }
        else if(result.length==1)
            return -1;
        return 0;
    }
    catch(err){
        return err;
    }
}
module.exports={getRoomList,getDetailRoom,getRoomByLandlord,getDetailRoomRenting,GetAnnounceByMe,GetAnnounceForMe,AddAnnounce,DeleteAnnounce,getProfile,updateProfile,SignUp,Login}