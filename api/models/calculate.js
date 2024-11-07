const {GetQuery,AddQuery,UpdateQuery,DeleteQuery,GetJoinQuery}=require("./connect.js");

async function GetList(jsonData){
    try{
        const roomDetail=await GetJoinQuery('rooms',['types','renters'],['rooms.id','rooms.name','types.name as type_name','types.water','types.water_follow','types.electric','rooms.electric_number','rooms.water_number','types.price','check_in','count(renters.id) as CountPeople'],['rooms.type=types.id','rooms.id=renters.room_id'],jsonData,{},'rooms.id')
        const roomService=await GetJoinQuery('room_services',['services'],['room_services.id as id','service_id','name','times','services.price'],['room_services.service_id=services.id'],jsonData,{})
        return result;
    }
    catch (err){
        return err;
    }
}

module.exports={GetList}