const {GetQuery,AddQuery,UpdateQuery,DeleteQuery,GetJoinQuery}=require("./connect.js");

async function GetListCurrently(jsonData){
    try{
        checkIn=await GetQuery('rooms',['check_in'],{"user_id":jsonData.user_id,'id':jsonData.room_id},{})
        checkIn=checkIn[0].check_in.split('-')[2]
        now=(new Date()).getDate()
        extendCon=[checkIn<now ?"room_services.day > STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-',MONTH(CURDATE()),'-', DAY(rooms.check_in)),'%Y-%m-%d')":"room_services.day > STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)), '-', DAY(rooms.check_in)),'%Y-%m-%d')",
                    checkIn<now?"room_services.day < STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(DATE_ADD(CURDATE(), INTERVAL 1 MONTH)), '-', DAY(rooms.check_in)),'%Y-%m-%d')":"room_services.day < STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-',MONTH(CURDATE()),'-', DAY(rooms.check_in)),'%Y-%m-%d')"]
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

async function GetListByDate(date,jsonData){
    try{
        const result=GetJoinQuery('room_services',
                                    ['services'],
                                    ['room_services.id as id','room_id','service_id','services.name','day','times'],
                                    ['room_services.service_id=services.id'],
                                    jsonData,{},
                                    ["room_services.day>DATE_SUB('"+date+"',INTERVAL 1 MONTH)","room_services.day<DATE_ADD('"+date+"',INTERVAL 1 MONTH)"])
        return result
    }
    catch(err){
        return err
    }
}

async function AddObject(jsonData){
    try{
        checkIn=await GetQuery('rooms',['check_in'],{"user_id":jsonData.user_id,'id':jsonData.room_id},{})
        checkIn=checkIn[0].check_in.split('-')[2]
        now=(new Date()).getDate()
        extendCon=[checkIn<now ?"room_services.day > STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-',MONTH(CURDATE()),'-', DAY(rooms.check_in)),'%Y-%m-%d')":"room_services.day > STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)), '-', DAY(rooms.check_in)),'%Y-%m-%d')",
                    checkIn<now?"room_services.day < STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(DATE_ADD(CURDATE(), INTERVAL 1 MONTH)), '-', DAY(rooms.check_in)),'%Y-%m-%d')":"room_services.day < STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-',MONTH(CURDATE()),'-', DAY(rooms.check_in)),'%Y-%m-%d')"]
        const list=await GetJoinQuery('room_services',
                                        ['services','rooms'],
                                        ['room_services.id as id','room_id','service_id','services.name','day','times','follow'],
                                        ['room_services.service_id=services.id','room_services.room_id=rooms.id'],
                                        {"room_id":jsonData.room_id,"rooms.user_id":jsonData.user_id},
                                        {},
                                        extendCon);
        let element=list.filter(item=>item.service_id===jsonData.service_id)
        //console.log(element)
        let result=''
        if(element.length==0){
            //console.log('add')
            delete jsonData.user_id;
            result=await AddQuery('room_services',jsonData)
            return result
        }
        else if(element.length==1 && !element[0].follow){
            //console.log('cannot add')
            return 0;
        }
        else if(element.length==1 && element[0].follow && element[0].day===jsonData.day){
            //console.log('update 0 element')
            result=await UpdateQuery('room_services',{'times':element[0].times+1},{'id':element[0].id});
            return element[0].id;
        }
        else if(element.length==1 && element[0].follow && element[0].day!==jsonData.day){
            //console.log('add 2')
            delete jsonData.user_id;
            result=await AddQuery('room_services',jsonData)
            return result
        }
        else if(element.length>1){
            let ele=element.find(item=>item.day==jsonData.day)
            if(ele){
                //console.log('update 0 element')
                result=await UpdateQuery('room_services',{'times':ele.times+1},{'id':ele.id});
                return ele.id;
            }
            else{
                //console.log('add 2')
                delete jsonData.user_id;
                result=await AddQuery('room_services',jsonData)
                return result
            }
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