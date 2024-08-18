const {GetQuery,AddQuery,UpdateQuery,DeleteQuery,GetJoinQuery}=require('./connect');

async function GetList(jsonCondition){
    try{
        const result=await GetJoinQuery('history_room','room',['history_room.id','rooms.room_id','name','ngay','hanh_dong','luong_tien','so_dien'],'history_room.room_id=rooms.id',jsonCondition);
        return result;
    }catch(err){
        return err;
    }
}

async function GetOne(jsonCondition){
    try{
        const result=await GetJoinQuery('history_room','room',['history_room.id','rooms.room_id','name','ngay','hanh_dong','luong_tien','so_dien'],'history_room.room_id=rooms.id',jsonCondition);
        return result;
    }catch(err){
        return err;
    }
}

async function AddObject(jsonData){
    try{
        const result=await AddQuery('history_room',jsonData);
        return result;
    }
    catch(err){
        return err;
    }
}

async function UpdateObject(jsonChange,jsonCondition){
    try{
        const result=await UpdateQuery('history_room',jsonChange,jsonCondition)
        return result;
    }
    catch(err){
        return err;
    }
}

async function DeleteObject(jsonCondition){
    try{
        const result= await DeleteQuery('rooms',jsonCondition);
        return result
    }
    catch(err){
        return err;
    }
}

module.exports={GetList,GetOne,AddObject,UpdateObject,DeleteObject};