const {GetQuery,AddQuery,UpdateQuery,DeleteQuery,GetJoinQuery}=require("./connect.js");

async function ListRoomId(userId){
    try{
        const result=await GetQuery('rooms',["id"],{"is_active":1,"user_id":userId},{})
        return result
    }
    catch(err){
        return err
    }
}

async function GetList(jsonEqual,jsonLike){
    try{
        jsonEqual["renters.is_active"]=1
        const result=await GetJoinQuery('renters',['rooms'],['renters.id','rooms.name as room_name','renters.name as renter_name','trang_thai'],['renters.room_id=rooms.id'],jsonEqual,jsonLike);
        return result;
    }catch (err){
        return err;
    }
}

async function GetOne(jsonData){
    try{
        jsonData["renters.is_active"]=1
        const result=await GetJoinQuery('renters',['rooms'],['renters.id','rooms.name as room_name','renters.room_id','renters.name as renter_name','cccd','que_quan','sdt','img_font','img_back','tctv','trang_thai'],['renters.room_id=rooms.id'],jsonData,{});
        return result;
    }catch (err){
        return err;
    }
}

async function AddObject(jsonData){
    try{
        const result=await AddQuery('renters',jsonData);
        return result;
    }
    catch (err){
        return err;
    }
}

async function UpdateObject(jsonChange,jsonCondition){
    try{
        const result=await UpdateQuery('renters',jsonChange,jsonCondition)
        return result;
    }
    catch(err){
        return err;
    }
}

async function DeleteObject(jsonCondition){
    try{
        const result= await DeleteQuery('renters',jsonCondition);
        return result
    }
    catch(err){
        return err;
    }
}
module.exports={GetList,GetOne,AddObject,UpdateObject,DeleteObject,ListRoomId};