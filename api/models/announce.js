const {GetQuery,AddQuery,UpdateQuery,DeleteQuery,GetJoinQuery}=require("./connect");

async function GetListByMe(jsonData){
    try{
        const result=await GetJoinQuery('announces',['users'],['announces.id','for_id','message','viewed','username'],['announces.for_id=users.id'],jsonData,{})
        return result;
    }
    catch (err){
        return err
    }
}

async function GetListForMe(jsonData){
    try{
        const result=await GetJoinQuery('announces',['users'],['announces.id','user_id','message','viewed','username'],['announces.user_id=users.id'],jsonData,{})
        return result;
    }
    catch (err){
        return err
    }
}

async function GetIdsByRoom(jsonCondition){
    try{
        const result=await GetQuery('room_rents',['user_id'],jsonCondition,{})
        return result;
    }
    catch (err){
        return err
    }
}

async function AddObject(jsonData){
    try{
        const result=await AddQuery('announces',jsonData);
        return result;
    }
    catch (err){
        return err;
    }
}

async function DeleteObject(jsonCondition){
    try{
        const result= await DeleteQuery('announces',jsonCondition);
        return result
    }
    catch(err){
        return err;
    }
}

module.exports={GetListByMe,GetListForMe,AddObject,DeleteObject,GetIdsByRoom}