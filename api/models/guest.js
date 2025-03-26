const {GetQuery,AddQuery,UpdateQuery,DeleteQuery,CreateConnect,DestroyConnect}=require("./connect.js");
const bcrypt=require('bcryptjs')

async function SignUp(jsonData){
    try{
        jsonData.password= await bcrypt.hash(jsonData.password,12)
        console.log(jsonData)
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
        result= await GetQuery('users',['id','username','password','per'],jsonData,{});
        if(result.length==1 && await bcrypt.compare(password,result[0].password)){
            result=result[0];
            delete result.password
            return result;
        }
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