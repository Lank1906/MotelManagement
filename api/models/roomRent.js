const {GetQuery,AddQuery,UpdateQuery,DeleteQuery,GetJoinQuery}=require("./connect.js");

async function ListRoomId(){
    try{
        const result=await GetQuery('room_rents',["room_id"],{"is_active":1},{})
        return result
    }
    catch(err){
        return err
    }
}

async function GetList(jsonEqual,jsonLike){
    try{
        jsonEqual["room_rents.is_active"]=1
        const result=await GetJoinQuery('room_rents',['users','rooms'],['room_rents.id','rooms.name as room_name','users.username as renter_name','status','room_rents.user_id'],['room_rents.user_id=users.id','room_rents.room_id=rooms.id'],jsonEqual,jsonLike);
        return result;
    }catch (err){
        return err;
    }
}

async function GetOne(jsonData){
    try{
        jsonData["room_rents.is_active"]=1
        const result=await GetJoinQuery('room_rents',['users','rooms'],['room_rents.id','rooms.name as room_name','room_rents.room_id','room_rents.user_id','users.username as renter_name','users.cccd','users.address','users.email','users.phone','users.img_font','users.img_back','tctv','status'],['room_rents.user_id=users.id','room_rents.room_id=rooms.id'],jsonData,{});
        return result;
    }catch (err){
        return err;
    }
}

async function AddObject(jsonData,jsonCondition){
    try{
        const result=await UpdateQuery('room_rents',jsonData,jsonCondition);
        return result;
    }
    catch (err){
        return err;
    }
}

async function UpdateObject(jsonChange,jsonCondition){
    dataForUser={'phone':jsonChange.phone,'email':jsonChange.email};
    delete jsonChange.phone
    delete jsonChange.email
    try{
        const result0=await UpdateQuery('users',dataForUser,jsonCondition)
        const result=await UpdateQuery('room_rents',jsonChange,jsonCondition)
        return result;
    }
    catch(err){
        return err;
    }
}

async function DeleteObject(jsonChange,jsonCondition){
    try{
        const result=await UpdateQuery('room_rents',jsonChange,jsonCondition);
        return result
    }
    catch(err){
        return err;
    }
}

async function RequestInfo(jsonData){
    try{
        const result=await AddQuery('announces',jsonData);
        return result
    }
    catch(err){
        return err;
    }
}
module.exports={GetList,GetOne,AddObject,UpdateObject,DeleteObject,ListRoomId,RequestInfo};