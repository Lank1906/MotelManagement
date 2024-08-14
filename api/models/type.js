const {GetQuery,AddQuery,UpdateQuery,DeleteQuery}=require("./connect");

async function Get(jsonData){
    try{
        const result=await GetQuery('types',['id','type_name','price','electric','water','water_folow'],jsonData)
        return result;
    }catch (err){
        return err
    }
}

async function Add(jsonData){
    try{
        const result=await AddQuery('types',jsonData);
        return result;
    }
    catch (err){
        return err;
    }
}

async function Update(jsonChange,jsonCondition){
    try{
        const result=await UpdateQuery('types',jsonChange,jsonCondition)
        return result;
    }
    catch(err){
        return err;
    }
}

async function Delete(jsonCondition){
    try{
        const result= await DeleteQuery('types',jsonCondition);
        return result
    }
    catch(err){
        return err;
    }
}
module.exports={Get,Add,Update,Delete};