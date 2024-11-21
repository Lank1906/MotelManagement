const {GetQuery,AddQuery,UpdateQuery,DeleteQuery,GetJoinQuery,ExcuteQuery}=require('./connect');

async function GetList(jsonCondition){
    try{
        const result=await GetJoinQuery('history_room',['rooms'],['history_room.id','name','ngay','hanh_dong','luong_tien','mo_ta'],['history_room.room_id=rooms.id'],jsonCondition,{});
        return result;
    }catch(err){
        return err;
    }
}

async function GetOne(jsonCondition){
    try{
        const result=await GetJoinQuery('history_room',['rooms'],['history_room.id','name','ngay','hanh_dong','luong_tien','mo_ta'],['history_room.room_id=rooms.id'],jsonCondition,{});
        return result;
    }catch(err){
        return err;
    }
}

async function GetFill(jsonCondition){
    try{
        const result=await ExcuteQuery('select count(check_in) as Thue,Count(*)-count(check_in) as Trong from rooms where user_id='+jsonCondition.user_id);
        return result;
    }
    catch(err){
        return err
    }
}

async function GetRevenue(jsonCondition){
    try{
        const result=await ExcuteQuery("select SUM(luong_tien) as tong,Date_format(ngay,'%Y-%m') as thang from history_room left join rooms on history_room.room_id=rooms.id where user_id="+jsonCondition.user_id+" group by Date_format(ngay,'%Y-%m') LIMIT 12");
        return result;
    }
    catch (err){
        return err;
    }
}

async function GetRevenueByRoom(jsonCondition){
    try{
        const result=await ExcuteQuery("select luong_tien,Date_format(ngay,'%Y-%m'),mo_ta as thang from history_room left join rooms on history_room.room_id=rooms.id where user_id="+jsonCondition.user_id+" and room_id="+jsonCondition.room_id+" LIMIT 12");
        return result;
    }
    catch (err){
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

module.exports={GetList,GetOne,AddObject,UpdateObject,DeleteObject,GetFill,GetRevenue,GetRevenueByRoom};