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
        //console.log(result)
        return result;
    }
    catch (err){
        return err;
    }
}

async function Calculate(jsonData){
    let electric_number=jsonData.electric_number
    delete jsonData.electric_number
    let water_number=jsonData.water_number||0
    delete jsonData.water_number
    let type=jsonData.type
    delete jsonData.type
    let result={};
    try{
        let roomDetail=await GetJoinQuery('rooms',['types','renters'],['rooms.id','rooms.name','types.name as type_name','types.water','types.water_follow','types.electric','rooms.electric_number','rooms.water_number','types.price','check_in','count(renters.id) as CountPeople'],['rooms.type=types.id','rooms.id=renters.room_id'],jsonData,{},'rooms.id')
        const roomService=await GetJoinQuery('room_services',['services'],['room_services.id as id','service_id','name','times','follow','services.price'],['room_services.service_id=services.id'],{"room_id":jsonData["rooms.id"]},{})
        
        roomDetail=roomDetail[0]
        let arr=[]
        
        if(type==1){
            arr.push({"category":"Tien phong","price":roomDetail.price,"times":1,"sum":roomDetail.price})
            roomDetail.water_follow?arr.push({"category":"Tien nuoc","price":roomDetail.water,"times":water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number,"sum":roomDetail.water*(water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number)})
                                :arr.push({"category":"Tien nuoc","price":roomDetail.water,"times":roomDetail.CountPeople,"sum":roomDetail.water*roomDetail.CountPeople})
            arr.push({"category":"Tien dien","price":roomDetail.electric,"times":electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number,"sum":roomDetail.electric*(electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number)})
        
            roomService.forEach(item=>{
                arr.push({"category":item.name,"price":item.price,"times":item.times,"sum":item.price*item.times})
            })
        }
        else if(type==0){
            arr.push({"category":"Tien phong","price":roomDetail.price,"times":1,"sum":roomDetail.price})
        }
        else if(type==2){
            roomDetail.water_follow?arr.push({"category":"Tien nuoc","price":roomDetail.water,"times":water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number,"sum":roomDetail.water*(water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number)})
                                :arr.push({"category":"Tien nuoc","price":roomDetail.water,"times":roomDetail.CountPeople,"sum":roomDetail.water*roomDetail.CountPeople})
            arr.push({"category":"Tien dien","price":roomDetail.electric,"times":electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number,"sum":roomDetail.electric*(electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number)})
        
            roomService.forEach(item=>{
                arr.push({"category":item.name,"price":item.price,"times":item.times,"sum":item.price*item.times})
            })
        }
        result={
                "id":roomDetail.id,
                "name":roomDetail.name,
                "check_in":roomDetail.check_in,
                "data":arr
            };
        return result;
    }
    catch (err){
        return err;
    }
}

async function History(jsonData){
    let electric_number=jsonData.electric_number
    delete jsonData.electric_number
    let water_number=jsonData.water_number||0
    delete jsonData.water_number
    let type=jsonData.type
    delete jsonData.type
    let sum=0
    try{
        let roomDetail=await GetJoinQuery('rooms',['types','renters'],['rooms.id','rooms.name','types.name as type_name','types.water','types.water_follow','types.electric','rooms.electric_number','rooms.water_number','types.price','check_in','count(renters.id) as CountPeople'],['rooms.type=types.id','rooms.id=renters.room_id'],jsonData,{},'rooms.id')
        const roomService=await GetJoinQuery('room_services',['services'],['room_services.id as id','service_id','name','times','follow','services.price'],['room_services.service_id=services.id'],{"room_id":jsonData["rooms.id"]},{})
        
        roomDetail=roomDetail[0]
        let arr=[]
        
        if(type==1){
            arr.push({"category":"Tien phong","price":roomDetail.price,"times":1,"sum":roomDetail.price})
            roomDetail.water_follow?arr.push({"category":"Tien nuoc","price":roomDetail.water,"times":water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number,"sum":roomDetail.water*(water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number)})
                                :arr.push({"category":"Tien nuoc","price":roomDetail.water,"times":roomDetail.CountPeople,"sum":roomDetail.water*roomDetail.CountPeople})
            arr.push({"category":"Tien dien","price":roomDetail.electric,"times":electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number,"sum":roomDetail.electric*(electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number)})
        
            roomService.forEach(item=>{
                arr.push({"category":item.name,"price":item.price,"times":item.times,"sum":item.price*item.times})
            })
        }
        else if(type==0){
            arr.push({"category":"Tien phong","price":roomDetail.price,"times":1,"sum":roomDetail.price})
        }
        else if(type==2){
            roomDetail.water_follow?arr.push({"category":"Tien nuoc","price":roomDetail.water,"times":water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number,"sum":roomDetail.water*(water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number)})
                                :arr.push({"category":"Tien nuoc","price":roomDetail.water,"times":roomDetail.CountPeople,"sum":roomDetail.water*roomDetail.CountPeople})
            arr.push({"category":"Tien dien","price":roomDetail.electric,"times":electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number,"sum":roomDetail.electric*(electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number)})
        
            roomService.forEach(item=>{
                arr.push({"category":item.name,"price":item.price,"times":item.times,"sum":item.price*item.times})
            })
        }
        
        let result={
            "room_id":roomDetail.id,
            "ngay":new Date().toISOString().split('T')[0],
            "hanh_dong":type,
            "luong_tien":sum,
            "mo_ta":JSON.stringify(arr)
        };
        
        let re=AddQuery('history_room',result)
        re = DeleteQuery('room_services',{"room_id":roomDetail.id})
        re = UpdateQuery('rooms',{'electric_number':electric_number,'water_number':water_number},{"id":roomDetail.id})
        console.log("here")
        if(type==1){
        }
        else if(type==0){
            re=UpdateQuery('rooms',{'check_in':new Date().toLocaleDateString('en-CA')},{"id":roomDetail.id});    
        }
        else if(type==2){
            re=UpdateQuery('rooms',{'check_in':null},{"id":roomDetail.id});
            re=DeleteQuery('renters',{"room_id":roomDetail.id});
        }
        
        return re;
    }
    catch (err){
        return err;
    }
}

module.exports={GetList,Calculate,History}