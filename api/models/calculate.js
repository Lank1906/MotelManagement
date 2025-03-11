const {GetQuery,AddQuery,UpdateQuery,DeleteQuery,GetJoinQuery}=require("./connect.js");

async function GetList(jsonData){
    try{
        let roomDetail=await GetJoinQuery('rooms',['types','renters'],['rooms.id','rooms.name','types.name as type_name','types.water','types.water_follow','types.electric','rooms.electric_number','rooms.water_number','types.priceFM','types.priceFD','check_in','count(renters.id) as CountPeople'],['rooms.type=types.id','rooms.id=renters.room_id'],jsonData,{},undefined,'rooms.id')
        roomDetail=roomDetail[0]
        now=(new Date()).getDate()
        extendCon=[roomDetail.check_in<now ?"room_services.day > STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-',MONTH(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)),'-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')":"room_services.day > STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(CURDATE()), '-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')",
                    roomDetail.check_in<now?"room_services.day < STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(CURDATE()), '-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')":"room_services.day < STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-',MONTH(DATE_ADD(CURDATE(), INTERVAL 1 MONTH)),'-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')"]
        const roomService=await GetJoinQuery('room_services',['services'],['room_services.id as id','room_services.day','service_id','name','times','follow','services.price'],['room_services.service_id=services.id'],{"room_id":jsonData["rooms.id"]},{},extendCon)

        let arr=[]
        arr.push({"category":"Tiền phòng","price":roomDetail.price,"times":1,"sum":roomDetail.price})
        roomDetail.water_follow?'':arr.push({"category":"Tiền nước","price":roomDetail.water,"times":roomDetail.CountPeople,"sum":roomDetail.water*roomDetail.CountPeople})
        
        roomService.forEach(item=>{
            arr.push({"category":item.name,"price":item.price,"times":item.times,"sum":item.price*item.times,"date":item.day})
        })
        
        let result={
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

async function Calculate(jsonData){
    //1 đóng tiền theo kì 0 chuyển đến 2 chuyển đi 
    let electric_number=jsonData.electric_number
    delete jsonData.electric_number
    let water_number=jsonData.water_number||0
    delete jsonData.water_number
    let type=jsonData.type
    delete jsonData.type
    //console.log(jsonData)
    let result={};
    try{
        let roomDetail=await GetJoinQuery('rooms',['types','renters'],['rooms.id','rooms.name','types.name as type_name','types.water','types.water_follow','types.electric','rooms.electric_number','rooms.water_number','types.priceFM','types.priceFD','check_in','count(renters.id) as CountPeople'],['rooms.type=types.id','rooms.id=renters.room_id'],jsonData,{},undefined,'rooms.id')
        roomDetail=roomDetail[0]
        now=(new Date()).getDate()
        extendCon=[roomDetail.check_in<now ?"room_services.day > STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-',MONTH(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)),'-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')":"room_services.day > STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(CURDATE()), '-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')",
                    roomDetail.check_in<now?"room_services.day < STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(CURDATE()), '-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')":"room_services.day < STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-',MONTH(DATE_ADD(CURDATE(), INTERVAL 1 MONTH)),'-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')"]
        const roomService=await GetJoinQuery('room_services',['services'],['room_services.id as id','room_services.day','service_id','name','times','follow','services.price'],['room_services.service_id=services.id'],{"room_id":jsonData["rooms.id"]},{},extendCon)

        let arr=[]
        
        if(type==1){
            arr.push({"category":"Tiền phòng","price":roomDetail.price,"times":1,"sum":roomDetail.price})
            roomDetail.water_follow?arr.push({"category":"Tiền nước","price":roomDetail.water,"times":water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number,"sum":roomDetail.water*(water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number)})
                                :arr.push({"category":"Tiền nước","price":roomDetail.water,"times":roomDetail.CountPeople,"sum":roomDetail.water*roomDetail.CountPeople})
            arr.push({"category":"Tiền điện","price":roomDetail.electric,"times":electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number,"sum":roomDetail.electric*(electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number)})
        
            roomService.forEach(item=>{
                arr.push({"category":item.name,"price":item.price,"times":item.times,"sum":item.price*item.times,"day":item.day})
            })
        }
        else if(type==0){
            arr.push({"category":"Tiền phòng","price":roomDetail.price,"times":1,"sum":roomDetail.priceFM})
        }
        else if(type==2){
            let day =await GetQuery('bill_rooms',['day'],{"room_id":jsonData['rooms.id']},{},null,null,null,'day DESC',null,1);
            day=getMonthDistance(day[0].day)
            roomDetail.water_follow?arr.push({"category":"Tiền nước","price":roomDetail.water,"times":water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number,"sum":roomDetail.water*(water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number)})
                                :arr.push({"category":"Tiền nước","price":roomDetail.water,"times":roomDetail.CountPeople,"sum":roomDetail.water*roomDetail.CountPeople})
            arr.push({"category":"Tiền điện","price":roomDetail.electric,"times":electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number,"sum":roomDetail.electric*(electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number)})
            day>1?arr.push({"category":"Tiền phòng","price":roomDetail.priceFD,"times":Math.floor((day-1)*30.4375),"sum":roomDetail.priceFD*Math.floor((day-1)*30.4375)}):''
            roomService.forEach(item=>{
                arr.push({"category":item.name,"price":item.price,"times":item.times,"sum":item.price*item.times,"day":item.day})
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

async function AddBill(jsonData){
    let electric_number=jsonData.electric_number
    delete jsonData.electric_number
    let water_number=jsonData.water_number||0
    delete jsonData.water_number
    let type=jsonData.type
    delete jsonData.type
    let sum=0
    try{
        let roomDetail=await GetJoinQuery('rooms',['types','renters'],['rooms.id','rooms.name','types.name as type_name','types.water','types.water_follow','types.electric','rooms.electric_number','rooms.water_number','types.price','check_in','count(renters.id) as CountPeople'],['rooms.type=types.id','rooms.id=renters.room_id'],jsonData,{},undefined,'rooms.id')
        const roomService=await GetJoinQuery('room_services',['services'],['room_services.id as id','service_id','name','times','follow','services.price'],['room_services.service_id=services.id'],{"room_id":jsonData["rooms.id"]},{})
        
        roomDetail=roomDetail[0]
        let arr=[]
        
        if(type==1){
            arr.push({"category":"Tiền phòng","price":roomDetail.price,"times":1,"sum":roomDetail.price})
            roomDetail.water_follow?arr.push({"category":"Tiền nước","price":roomDetail.water,"times":water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number,"sum":roomDetail.water*(water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number)})
                                :arr.push({"category":"Tiền nước","price":roomDetail.water,"times":roomDetail.CountPeople,"sum":roomDetail.water*roomDetail.CountPeople})
            arr.push({"category":"Tiền điện","price":roomDetail.electric,"times":electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number,"sum":roomDetail.electric*(electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number)})
        
            roomService.forEach(item=>{
                arr.push({"category":item.name,"price":item.price,"times":item.times,"sum":item.price*item.times})
            })
        }
        else if(type==0){
            arr.push({"category":"Tiền phòng","price":roomDetail.price,"times":1,"sum":roomDetail.price})
        }
        else if(type==2){
            roomDetail.water_follow?arr.push({"category":"Tiền nước","price":roomDetail.water,"times":water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number,"sum":roomDetail.water*(water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number)})
                                :arr.push({"category":"Tiền nước","price":roomDetail.water,"times":roomDetail.CountPeople,"sum":roomDetail.water*roomDetail.CountPeople})
            arr.push({"category":"Tiền điện","price":roomDetail.electric,"times":electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number,"sum":roomDetail.electric*(electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number)})
        
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

function getMonthDistance(dateStart){
    const start = new Date(dateStart);
    const end =(new Date()).getDate();// new Date('2025-09-20')

    const diffInDays = (end - start) / (1000 * 60 * 60 * 24);
    
    const months = diffInDays / 30.4375;
    return months.toFixed(2); // Giữ 2 số thập phân
}

module.exports={GetList,Calculate,AddBill}