const {GetQuery,AddQuery,UpdateQuery,DeleteQuery,GetJoinQuery}=require("./connect.js");

async function GetList(jsonData){
    try{
        let roomDetail=await GetJoinQuery('rooms',['types','room_rents'],['rooms.id','rooms.name','types.name as type_name','types.water','types.water_follow','types.electric','rooms.electric_number','rooms.water_number','types.priceFM','types.priceFD','check_in','count(room_rents.user_id) as CountPeople'],['rooms.type=types.id','rooms.id=room_rents.room_id'],jsonData,{},undefined,'rooms.id')
        roomDetail=roomDetail[0]
        now=(new Date()).getDate()
        extendCon=[roomDetail.check_in<now ?"room_services.day > STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-',MONTH(CURDATE()),'-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')":"room_services.day > STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)), '-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')",
                    roomDetail.check_in<now?"room_services.day < STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(DATE_ADD(CURDATE(), INTERVAL 1 MONTH)), '-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')":"room_services.day < STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-',MONTH(CURDATE()),'-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')"]
        
        const roomService=await GetJoinQuery('room_services',['services'],['service_id','name','follow','services.price','sum(times) as times'],['room_services.service_id=services.id'],{"room_id":jsonData["rooms.id"]},{},extendCon,'service_id,name,follow,services.price')
        
        let arr=[]
        arr.push({"category":"Tiền phòng","price":roomDetail.priceFM,"times":1,"sum":roomDetail.priceFM})
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
        let roomDetail=await GetJoinQuery('rooms',['types','room_rents'],['rooms.id','rooms.name','types.name as type_name','types.water','types.water_follow','types.electric','rooms.electric_number','rooms.water_number','types.priceFM','types.priceFD','check_in','count(room_rents.user_id) as CountPeople'],['rooms.type=types.id','rooms.id=room_rents.room_id'],jsonData,{},undefined,'rooms.id')
        roomDetail=roomDetail[0]
        now=(new Date()).getDate()
        extendCon=[roomDetail.check_in<now ?"room_services.day > STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-',MONTH(CURDATE()),'-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')":"room_services.day > STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)), '-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')",
                    roomDetail.check_in<now?"room_services.day < STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(DATE_ADD(CURDATE(), INTERVAL 1 MONTH)), '-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')":"room_services.day < STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-',MONTH(CURDATE()),'-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')"]
        const roomService=await GetJoinQuery('room_services',['services'],['service_id','name','follow','services.price','sum(times) as times'],['room_services.service_id=services.id'],{"room_id":jsonData["rooms.id"]},{},extendCon,'service_id,name,follow,services.price')

        let arr=[]
        
        if(type==1){
            arr.push({"category":"Tiền phòng","price":roomDetail.priceFM,"times":1,"sum":roomDetail.priceFM})
            roomDetail.water_follow?arr.push({"category":"Tiền nước","price":roomDetail.water,"times":water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number,"sum":roomDetail.water*(water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number)})
                                :arr.push({"category":"Tiền nước","price":roomDetail.water,"times":roomDetail.CountPeople,"sum":roomDetail.water*roomDetail.CountPeople})
            arr.push({"category":"Tiền điện","price":roomDetail.electric,"times":electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number,"sum":roomDetail.electric*(electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number)})
        
            roomService.forEach(item=>{
                arr.push({"category":item.name,"price":item.price,"times":item.times,"sum":item.price*item.times})
            })
        }
        else if(type==0){
            arr.push({"category":"Tiền phòng","price":roomDetail.priceFM,"times":1,"sum":roomDetail.priceFM})
        }
        else if(type==2){
            let day =await GetQuery('rooms',['bill_at'],{"id":jsonData['rooms.id']},{});
            day=getMonthDistance(day[0].bill_at.split(' ')[0])
            roomDetail.water_follow?arr.push({"category":"Tiền nước","price":roomDetail.water,"times":water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number,"sum":roomDetail.water*(water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number)})
                                :arr.push({"category":"Tiền nước","price":roomDetail.water,"times":roomDetail.CountPeople,"sum":roomDetail.water*roomDetail.CountPeople})
            arr.push({"category":"Tiền điện","price":roomDetail.electric,"times":electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number,"sum":roomDetail.electric*(electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number)})
            day>1?arr.push({"category":"Tiền phòng","price":roomDetail.priceFD,"times":Math.floor((day-1)*30.4375),"sum":roomDetail.priceFD*Math.floor((day-1)*30.4375)}):''
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

async function CalculateByDate(date,jsonData){
    try{
        let roomDetail=await GetQuery('rooms',['id','name','check_in'],{"id":jsonData['rooms.id']},{});
        roomDetail=roomDetail[0];
        let bill=await GetQuery('bill_rooms',['id','room_id','day','room_price','electric_number','electric_price','water_number','water_price','service_price','more_price'],{"room_id":jsonData['rooms.id']},{},["day > '"+date+"'"],undefined,undefined,'day DESC',undefined,1)
        bill=bill[0]
        now=(new Date()).getDate()
        extendCon=[roomDetail.check_in<now ?"room_services.day > STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-',MONTH(CURDATE()),'-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')":"room_services.day > STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)), '-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')",
                    roomDetail.check_in<now?"room_services.day < STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(DATE_ADD(CURDATE(), INTERVAL 1 MONTH)), '-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')":"room_services.day < STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-',MONTH(CURDATE()),'-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')"]
        const roomService=await GetJoinQuery('room_services',['services'],['service_id','name','follow','services.price','sum(times) as times'],['room_services.service_id=services.id'],{"room_id":jsonData["rooms.id"]},{},extendCon,'service_id,name,follow,services.price')
        
        let arr = []
        arr.push({"category":"Tiền phòng","price":bill.room_price,"times":"1","sum":bill.room_price})
        arr.push({"category":"Tiền nước","price":bill.water_price/bill.water_number,"times":bill.water_number,"sum":bill.water_price})
        arr.push({"category":"Tiền điện","price":bill.electric_price/bill.electric_number,"times":bill.electric_number,"sum":bill.electric_price})
        roomService.forEach(item=>{
            arr.push({"category":item.name,"price":item.price,"times":item.times,"sum":item.price*item.times})
        })
        result={
                "id":roomDetail.id,
                "name":roomDetail.name,
                "check_in":roomDetail.check_in,
                "data":arr
            };
        return result;
    }
    catch(err){
        return err
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
        const ids=await GetQuery('room_rents',['user_id'],{"room_id":jsonData['rooms.id']},{})
        
        let roomDetail=await GetJoinQuery('rooms',['types','room_rents'],['rooms.id','rooms.name','types.name as type_name','types.water','types.water_follow','types.electric','rooms.electric_number','rooms.water_number','types.priceFM','types.priceFD','check_in','count(room_rents.user_id) as CountPeople'],['rooms.type=types.id','rooms.id=room_rents.room_id'],jsonData,{},undefined,'rooms.id')
        roomDetail=roomDetail[0]
        now=(new Date()).getDate()
        extendCon=[roomDetail.check_in<now ?"room_services.day > STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-',MONTH(CURDATE()),'-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')":"room_services.day > STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)), '-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')",
                    roomDetail.check_in<now?"room_services.day < STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(DATE_ADD(CURDATE(), INTERVAL 1 MONTH)), '-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')":"room_services.day < STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-',MONTH(CURDATE()),'-', DAY('"+roomDetail.check_in+"')),'%Y-%m-%d')"]
        const roomService=await GetJoinQuery('room_services',['services'],['service_id','name','follow','services.price','sum(times) as times'],['room_services.service_id=services.id'],{"room_id":jsonData["rooms.id"]},{},extendCon,'service_id,name,follow,services.price')

        let arr=[]
        
        if(type==1){
            arr.push({"category":"Tiền phòng","price":roomDetail.priceFM,"times":1,"sum":roomDetail.priceFM})
            roomDetail.water_follow?arr.push({"category":"Tiền nước","price":roomDetail.water,"times":water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number,"sum":roomDetail.water*(water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number)})
                                :arr.push({"category":"Tiền nước","price":roomDetail.water,"times":roomDetail.CountPeople,"sum":roomDetail.water*roomDetail.CountPeople})
            arr.push({"category":"Tiền điện","price":roomDetail.electric,"times":electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number,"sum":roomDetail.electric*(electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number)})
        
            roomService.forEach(item=>{
                arr.push({"category":item.name,"price":item.price,"times":item.times,"sum":item.price*item.times})
                sum+=item.price*item.times
            })
        }
        else if(type==0){
            arr.push({"category":"Tiền phòng","price":roomDetail.priceFM,"times":1,"sum":roomDetail.priceFM})
        }
        else if(type==2){
            let day =await GetQuery('rooms',['bill_at'],{"id":jsonData['rooms.id']},{});
            day=getMonthDistance(day[0].bill_at.split(' ')[0])
            roomDetail.water_follow?arr.push({"category":"Tiền nước","price":roomDetail.water,"times":water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number,"sum":roomDetail.water*(water_number<roomDetail.water_number?water_number*10-roomDetail.water_number:water_number-roomDetail.water_number)})
                                :arr.push({"category":"Tiền nước","price":roomDetail.water,"times":roomDetail.CountPeople,"sum":roomDetail.water*roomDetail.CountPeople})
            arr.push({"category":"Tiền điện","price":roomDetail.electric,"times":electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number,"sum":roomDetail.electric*(electric_number<roomDetail.electric_number?electric_number*10-roomDetail.electric_number:electric_number-roomDetail.electric_number)})
            day>1?arr.push({"category":"Tiền phòng","price":roomDetail.priceFD,"times":Math.floor((day-1)*30.4375),"sum":roomDetail.priceFD*Math.floor((day-1)*30.4375)}):''
            roomService.forEach(item=>{
                arr.push({"category":item.name,"price":item.price,"times":item.times,"sum":item.price*item.times})
                sum+=item.price*item.times
            })
        }
        
        const result={
            "room_id":roomDetail.id,
            "room_price":roomDetail.priceFM,
            "day":new Date().toISOString().split('T')[0],
            "electric_number":electric_number-roomDetail.electric_number,
            "water_number":roomDetail.water_follow?water_number-roomDetail.water_number:roomDetail.CountPeople,
            "electric_price":(electric_number-roomDetail.electric_number)*roomDetail.electric,
            "water_price":roomDetail.water_follow?(water_number-roomDetail.water_number)*roomDetail.water:roomDetail.CountPeople*roomDetail.water,
            "service_price":sum,
            "electric_number_final":electric_number,
            //"water_number_final":0,
            "more_price":JSON.stringify({}),
            "img_bill":null,
            "img_sign":null
        };
        let re= await AddQuery('bill_rooms',result);
        re =await UpdateQuery('rooms',{'electric_number':electric_number,'water_number':water_number},{"id":roomDetail.id})
        for (const item of ids) {
                re=await AddQuery('announces',{'user_id':jsonData['rooms.user_id'],'for_id':item.user_id,"message":"Đã đến hạn đóng tiền phòng vui lòng thanh toán hóa đơn của bạn!"});
            }
        if(type==1){//theo han
            
        }
        else if(type==0){//den
            re=await UpdateQuery('room_rents',{"room_id":jsonData['rooms.id'],"is_active":1},{"user_id":ids.map(item => item.user_id).join(',')});
            console.log(re)
            re=await UpdateQuery('rooms',{"check_in":new Intl.DateTimeFormat('en-CA').format(new Date())},{"id":jsonData['rooms.id']});
        }
        else if(type==2){//di
            re=await UpdateQuery('room_rents',{"room_id":null,"is_active":0},{"user_id":ids.map(item => item.user_id).join(',')});
            re=await UpdateQuery('rooms',{"check_in":null},{"id":jsonData['rooms.id']});
        }
        
        return re;
    }
    catch (err){
        return err;
    }
}

function getMonthDistance(dateStart){
    const start = new Date(dateStart);
    const end =(new Date());
    const diffInDays = (end - start) / (1000 * 60 * 60 * 24);
    
    const months = diffInDays / 30.4375;
    return months.toFixed(2);
}

module.exports={GetList,Calculate,CalculateByDate,AddBill}