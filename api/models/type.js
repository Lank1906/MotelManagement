const {GetQuery,AddQuery,UpdateQuery,DeleteQuery}=require("./connect");

async function GetList(jsonData){
    try{
        const result=await GetQuery('types',['id','type_name','price','electric','water','water_folow'],jsonData)
        return result;
    }catch (err){
        return err
    }
}

async function AddObject(jsonData){
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
module.exports={GetList,AddObject,UpdateObject,DeleteObject};