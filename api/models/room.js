const {GetQuery,AddQuery,UpdateQuery,DeleteQuery,GetJoinQuery}=require("./connect.js");

async function GetShortList(jsonData){
    try{
        jsonData.is_active=1
        const result=await GetQuery('rooms',['rooms.id','name'],jsonData,{})
        return result;
    }catch (err){
        return err;
    }
}

async function GetList(jsonEqual,jsonLike){
    try{
        jsonEqual.is_active=1
        const result=await GetJoinQuery('rooms',['types'],['rooms.id','rooms.name','types.name as type_name','check_in','img_room'],['rooms.type=types.id'],jsonEqual,jsonLike)
        return result;
    }catch (err){
        return err;
    }
}

async function GetOne(jsonData){
    try{
        jsonData.is_active=1
        const result=await GetJoinQuery('rooms',['types'],['rooms.id','rooms.name','types.name as type_name','person_limit','electric_number','check_in','img_room','type'],['rooms.type=types.id'],jsonData,{})
        return result;
    }catch (err){
        return err
    }
}

async function AddObject(jsonData){
    try{
        const result=await AddQuery('rooms',jsonData);
        return result;
    }
    catch (err){
        return err;
    }
}

async function UpdateObject(jsonChange,jsonCondition){
    try{
        const result=await UpdateQuery('rooms',jsonChange,jsonCondition)
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

module.exports={GetShortList,GetList,GetOne,AddObject,UpdateObject,DeleteObject};