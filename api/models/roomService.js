const {GetQuery,AddQuery,UpdateQuery,DeleteQuery,GetJoinQuery}=require("./connect.js");

async function GetListCurrently(jsonData){
    try{
        checkIn=await GetQuery('rooms',['check_in'],{"user_id":jsonData.user_id,'id':jsonData.room_id},{})
        checkIn=checkIn[0].check_in.split('-')[2]
        now=(new Date()).getDate()
        extendCon=[checkIn<now ?"room_services.day > STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-',MONTH(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)),'-', DAY(rooms.check_in)),'%Y-%m-%d')":"room_services.day > STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(CURDATE()), '-', DAY(rooms.check_in)),'%Y-%m-%d')",
                    checkIn<now?"room_services.day < STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(CURDATE()), '-', DAY(rooms.check_in)),'%Y-%m-%d')":"room_services.day < STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-',MONTH(DATE_ADD(CURDATE(), INTERVAL 1 MONTH)),'-', DAY(rooms.check_in)),'%Y-%m-%d')"]
        jsonData['services.user_id']=jsonData.user_id
        delete jsonData.user_id
        const result=await GetJoinQuery('room_services',
                                        ['services','rooms'],
                                        ['room_services.id as id','room_id','service_id','services.name','day','times'],
                                        ['room_services.service_id=services.id','room_services.room_id=rooms.id'],
                                        jsonData,
                                        {},
                                        extendCon)
        return result
    }
    catch(err){
        return err
    }
}

async function GetListByDate(date){
    try{
        const result=GetJoinQuery('room_services',
                                    ['bill_rooms','services'],
                                    ['room_services.id as id','room_id','service_id','services.name','day','times'],
                                    ['room_services.service_id=services.id','room_services.room_id=bill_rooms.room_id'],
                                    {},{},
                                    [])
        return result
    }
    catch(err){
        return err
    }
}

async function AddObject(jsonData){
    // console.log(jsonData)
    try{
        const list=await GetJoinQuery('room_services',['services'],['room_services.id as id','room_id','service_id','day','times','follow'],['room_services.service_id=services.id'],{"room_id":jsonData.room_id,"user_id":jsonData.user_id},{});
        let element=list.find(item=>item.service_id==jsonData.service_id)
        let result=''
        if(element===undefined){
            delete jsonData.user_id;
            result=await AddQuery('room_services',jsonData)
            return result
        }
        else if(!element.follow && element.day.split(',').includes(new Date().getDate().toString())){
            // console.log("you are here")
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

module.exports={GetListCurrently,GetListByDate,AddObject,DeleteObject};