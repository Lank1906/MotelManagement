const {GetQuery,AddQuery,UpdateQuery,DeleteQuery}=require("./connect");

async function GetShortList(jsonData){
    try{
        jsonData.is_active=1
        const result=await GetQuery('services',['id','name'],jsonData,{})
        return result;
    }
    catch (err){
        return err
    }
}

async function GetList(jsonEqual,jsonLike){
    try{
        jsonEqual.is_active=1
        const result=await GetQuery('services',['id','name','follow','price'],jsonEqual,jsonLike)
        return result;
    }catch(err){
        return err
    }
}

async function GetOne(jsonData){
    try{
        jsonData.is_active=1
        const result=await GetQuery('services',['id','name','follow','price'],jsonData,{});
        return result;
    }catch (err){ return err}
}

async function AddObject(jsonData){
    try{
        const result=await AddQuery('services',jsonData);
        return result;
    }
    catch (err){
        return err;
    }
}

async function UpdateObject(jsonChange,jsonCondition){
    try{
        jsonCondition.is_active=1;
        const result=await UpdateQuery('services',jsonChange,jsonCondition)
        return result;
    }
    catch(err){
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

module.exports={GetShortList,GetList,GetOne,AddObject,UpdateObject,DeleteObject};