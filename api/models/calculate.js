const {GetQuery,AddQuery,UpdateQuery,DeleteQuery,GetJoinQuery}=require("./connect.js");

async function GetList(jsonData){
    try{
        let roomDetail=await GetJoinQuery('rooms',['types','renters'],['rooms.id','rooms.name','types.name as type_name','types.water','types.water_follow','types.electric','rooms.electric_number','rooms.water_number','types.price','check_in','count(renters.id) as CountPeople'],['rooms.type=types.id','rooms.id=renters.room_id'],jsonData,{},'rooms.id')
        const roomService=await GetJoinQuery('room_services',['services'],['room_services.id as id','service_id','name','times','follow','services.price'],['room_services.service_id=services.id'],{"room_id":jsonData["rooms.id"]},{})
        console.log(roomDetail)
        console.log(roomService)
        roomDetail=roomDetail[0]
        let arr=[]
        arr.push({"category":"Tien phong","price":roomDetail.price,"times":1,"sum":roomDetail.price})
        roomDetail.water_follow?'':arr.push({"category":"Tien nuoc","price":roomDetail.water,"times":roomDetail.CountPeople,"sum":roomDetail.water*roomDetail.CountPeople})
        
        roomService.forEach(item=>{
            arr.push({"category":item.name,"price":item.price,"times":item.times,"sum":item.price*item.times})
        })
        
        let result={
            "id":roomDetail.id,
            "name":roomDetail.name,
            "check_in":roomDetail.check_in,
            "data":arr
        };
        console.log(result)
        return result;
    }
    catch (err){
        return err;
    }
}

async function Calculate(jsonData){
    let electric_number=jsonData.electric_number
    delete jsonData.electric_number
    let water_number=jsonData.water_number
    delete jsonData.water_number
    try{
        let roomDetail=await GetJoinQuery('rooms',['types','renters'],['rooms.id','rooms.name','types.name as type_name','types.water','types.water_follow','types.electric','rooms.electric_number','rooms.water_number','types.price','check_in','count(renters.id) as CountPeople'],['rooms.type=types.id','rooms.id=renters.room_id'],jsonData,{},'rooms.id')
        const roomService=await GetJoinQuery('room_services',['services'],['room_services.id as id','service_id','name','times','follow','services.price'],['room_services.service_id=services.id'],{"room_id":jsonData["rooms.id"]},{})
        
        roomDetail=roomDetail[0]
        let arr=[]
        
        arr.push({"category":"Tien phong","price":roomDetail.price,"times":1,"sum":roomDetail.price})
        roomDetail.water_follow?arr.push({"category":"Tien nuoc","price":roomDetail.water,"times":water_number-roomDetail.water_number,"sum":roomDetail.water*(water-roomDetail.water_number)})
                                :arr.push({"category":"Tien nuoc","price":roomDetail.water,"times":roomDetail.CountPeople,"sum":roomDetail.water*roomDetail.CountPeople})
        arr.push({"category":"Tien dien","price":roomDetail.electric,"times":electric_number-roomDetail.electric_number,"sum":roomDetail.electric*(electric_number-roomDetail.electric_number)})
        
        roomService.forEach(item=>{
            arr.push({"category":item.name,"price":item.price,"times":item.times,"sum":item.price*item.times})
        })
        
        let result={
            "id":roomDetail.id,
            "name":roomDetail.name,
            "check_in":roomDetail.check_in,
            "data":arr
        };
        console.log(result)
        return result;
    }
    catch (err){
        console.log(err)
        return err;
    }
}

async function History(jsonData){
    
}

module.exports={GetList,Calculate,History}