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
        password=jsonData.password;
        jsonData.is_active=1;
        delete jsonData.password;
        const result= await GetQuery('users',['id','username','password'],jsonData,{});
        if(result.length==1 && result[0].password==password)
            return result[0].id;
        else if(result.length==1)
            return -1;
        return 0;
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