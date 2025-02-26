const {GetQuery,AddQuery,UpdateQuery,DeleteQuery}=require("./connect");

async function GetShortList(jsonData){
    try{
        const result=await GetQuery('types',['id','name'],jsonData,{})
        return result;
    }catch (err){
        return err
    }
}

async function GetList(jsonEqual,jsonLike){
    try{
        const result=await GetQuery('types',['id','name','price','electric','water','water_follow'],jsonEqual,jsonLike)
        return result;
    }catch (err){
        return err
    }
}

async function GetOne(jsonData){
    try{
        const result= await GetQuery('types',['id','name','price','electric','water','water_follow'],jsonData,{})
        return result;
    }
    catch (err)
     {   return err}
}

async function AddObject(jsonData){
    console.log(jsonData)
    try{
        const result=await AddQuery('types',jsonData);
        return result;
    }
    catch (err){
        return err;
    }
}

async function UpdateObject(jsonChange,jsonCondition){
    try{
        const result=await UpdateQuery('types',jsonChange,jsonCondition)
        return result;
    }
    catch(err){
        return err;
    }
}

async function DeleteObject(jsonCondition){
    try{
        const result= await DeleteQuery('types',jsonCondition);
        return result
    }
    catch(err){
        return err;
    }
}
module.exports={GetShortList,GetList,GetOne,AddObject,UpdateObject,DeleteObject};