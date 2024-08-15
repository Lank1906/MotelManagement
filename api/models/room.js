const {GetQuery,AddQuery,UpdateQuery,DeleteQuery,GetJoinQuery}=require("./connect.js");

async function Get(jsonData){
    try{
        const result=await GetJoinQuery('rooms','types',['rooms.id','name','type_name','person_limit','electric_number','check_in','img_room'],'rooms.type=types.id',jsonData)
        return result;
    }catch (err){
        return err
    }
}

async function Add(jsonData){
    try{
        const result=await AddQuery('rooms',jsonData);
        return result;
    }
    catch (err){
        return err;
    }
}

async function Update(jsonChange,jsonCondition){
    try{
        const result=await UpdateQuery('rooms',jsonChange,jsonCondition)
        return result;
    }
    catch(err){
        return err;
    }
}

async function Delete(jsonCondition){
    try{
        const result= await DeleteQuery('rooms',jsonCondition);
        return result
    }
    catch(err){
        return err;
    }
}

module.exports={Get,Add,Update,Delete};