const {GetQuery,AddQuery,UpdateQuery,DeleteQuery,CreateConnect,DestroyConnect}=require("./connect.js");

async function SignUp(jsonData){
    try{
        const result=await AddQuery('users',jsonData);
        return result;
    }
    catch (err){
        return err;
    }
}
async function Login(jsonData){
    try{
        const result= await GetQuery('users',['id','username','password'],jsonData,{});
        return result;
    }
    catch(err){
        return err;
    }
}

async function UpdateInfo(jsonChange,jsonCondition){
    try{
        const result=await UpdateQuery('users',jsonChange,jsonCondition)
        return result;
    }
    catch(err){
        return err;
    }
}
module.exports={SignUp,Login,UpdateInfo};