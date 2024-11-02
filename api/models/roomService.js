const {GetQuery,AddQuery,UpdateQuery,DeleteQuery,GetJoinQuery}=require("./connect.js");

async function GetList(jsonData){
    try{
        const result=await GetJoinQuery('room_services','services',['room_services.id as id','room_id','service_id','name','day','times'],'room_services.service_id=services.id',jsonData,{})
        return result
    }
    catch(err){
        return err
    }
}

async function AddObject(jsonData){
    try{
        const list=await GetJoinQuery('room_services','services',['room_services.id as id','room_id','service_id','day','times','follow'],'room_services.service_id=services.id',{"room_id":jsonData.room_id,"user_id":jsonData.user_id},{});
        let element=list.find(item=>item.service_id==jsonData.service_id)
        let result=''
        if(element===undefined){
            delete jsonData.user_id;
            result=await AddQuery('room_services',jsonData)
            return result
        }
        else if(!element.follow && element.day.split(',').includes(new Date().getDate().toString())){
            console.log("you are here")
            return 0;
        }
        else{
            result=await UpdateQuery('room_services',{'day':element.day+',' + new Date().getDate().toString(),'times':element.times+1},{'id':element.id});
            return result;
        }
    }
    catch(err){
        return err;
    }
}

async function DeleteObject(jsonCondition){
    try{
        const result= await DeleteQuery('room_services',jsonCondition);
        return result
    }
    catch(err){
        return err
    }
}

module.exports={GetList,AddObject,DeleteObject};