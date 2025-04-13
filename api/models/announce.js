const {GetQuery,AddQuery,UpdateQuery,DeleteQuery,GetJoinQuery}=require("./connect");

async function GetListByMe(jsonData){
    try{
        const result=await GetQuery('announces',['id','room_id','message','viewed'],jsonData,{})
        return result;
    }
    catch (err){
        return err
    }
}

async function GetListForMe(jsonData){
    try{
        const result=await GetJoinQuery('announces',['rooms'],['id','room_id','message','viewed','name'],['announces.room_id=rooms.id'],jsonData,{})
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
        const result= await DeleteQuery('services',jsonCondition);
        return result
    }
    catch(err){
        return err;
    }
}

module.exports={GetListByMe,GetListForMe,AddObject,DeleteObject}