const {GetQuery,AddQuery,UpdateQuery,DeleteQuery,GetJoinQuery,ExcuteQuery}=require('./connect');

function calculateMonthly(data){
    let temp=[]
    data.forEach(entry=>{
        const month=entry.ngay.slice(0,7)
        entry.mo_ta.forEach(item=>{
            if(!temp[month])
                temp[month]={}
            if(!temp[month][item.category])
                temp[month][item.category]=0
            temp[month][item.category]+=item.sum
        })
    })
    return temp;
}

function getLast12Months(data) {
  const result = [];
  const now = new Date();
  
  for (let i = 12; i >= 1; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = date.toISOString().slice(0, 7);

    result.push({x:monthKey,y:0})
  }

  return result;
}

async function GetList(jsonCondition){
    try{
        let get12month=getLast12Months();
        let list=await GetJoinQuery('history_room',['rooms'],['ngay','mo_ta'],['history_room.room_id=rooms.id'],jsonCondition,{},['(ngay between DATE_SUB(CURRENT_DATE, INTERVAL 12 MONTH) and DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH))']);
        list = list.map(item=>{
            if(item.mo_ta!=""){
                item.mo_ta=JSON.parse(item.mo_ta)
            }
            return item
        })
        let result=await GetQuery('services',['name'],{'user_id':jsonCondition['rooms.user_id']},{});
        result=result.map(item=>{
            return {'id':item.name,'data':JSON.parse(JSON.stringify(get12month))}
        })
        result.push({'id':'Tiền phòng','data':JSON.parse(JSON.stringify(get12month))})
        result.push({'id':'Tiền nước','data':JSON.parse(JSON.stringify(get12month))})
        result.push({'id':'Tiền điện','data':JSON.parse(JSON.stringify(get12month))})
        
        list=calculateMonthly(list)
        
        result.forEach(item=>{ //id,data
            item.data.forEach(i=>{ // x,y
                i.y += list[i.x] ? list[i.x][item.id] ? list[i.x][item.id]:0:0;
            })
        })
        
        return result;
    }catch(err){
        return err;
    }
}

async function GetOne(jsonCondition){
    try{
        const result=await GetJoinQuery('history_room',['rooms'],['history_room.id','name','ngay','hanh_dong','luong_tien','mo_ta'],['history_room.room_id=rooms.id'],jsonCondition,{});
        return result;
    }catch(err){
        return err;
    }
}

async function GetFill(jsonCondition){
    try{
        const result=await ExcuteQuery('select count(check_in) as Thue,Count(*)-count(check_in) as Trong from rooms where user_id='+jsonCondition.user_id);
        return result;
    }
    catch(err){
        return err
    }
}

async function GetRevenue(jsonCondition){
    try{
        const result=await ExcuteQuery(`SELECT 
                                            l12.thang,
                                            IFNULL(SUM(hr.luong_tien), 0) AS tong
                                        FROM (
                                            SELECT DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH), '%Y-%m') as thang
                                            UNION ALL SELECT DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH), '%Y-%m')
                                            UNION ALL SELECT DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH), '%Y-%m')
                                            UNION ALL SELECT DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 4 MONTH), '%Y-%m')
                                            UNION ALL SELECT DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 5 MONTH), '%Y-%m')
                                            UNION ALL SELECT DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH), '%Y-%m')
                                            UNION ALL SELECT DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 7 MONTH), '%Y-%m')
                                            UNION ALL SELECT DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 8 MONTH), '%Y-%m')
                                            UNION ALL SELECT DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 9 MONTH), '%Y-%m')
                                            UNION ALL SELECT DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 10 MONTH), '%Y-%m')
                                            UNION ALL SELECT DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 11 MONTH), '%Y-%m')
                                            UNION ALL SELECT DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 12 MONTH), '%Y-%m')
                                        ) AS l12
                                        LEFT JOIN 
                                            history_room hr
                                            ON DATE_FORMAT(hr.ngay, '%Y-%m') = l12.thang
                                        LEFT JOIN 
                                            rooms r
                                            ON hr.room_id = r.id AND r.user_id = ${jsonCondition.user_id}
                                        GROUP BY 
                                            l12.thang
                                        ORDER BY 
                                            l12.thang ASC;
                                        `);
        return result;
    }
    catch (err){
        return err;
    }
}

async function GetRevenueByRoom(jsonCondition){
    try{
        const result=await ExcuteQuery("select luong_tien,Date_format(ngay,'%Y-%m') as thang,mo_ta as thang from history_room left join rooms on history_room.room_id=rooms.id where user_id="+jsonCondition.user_id+" and room_id="+jsonCondition.room_id+" LIMIT 12");
        return result;
    }
    catch (err){
        return err;
    }
}

async function AddObject(jsonData){
    try{
        const result=await AddQuery('history_room',jsonData);
        return result;
    }
    catch(err){
        return err;
    }
}

async function UpdateObject(jsonChange,jsonCondition){
    try{
        const result=await UpdateQuery('history_room',jsonChange,jsonCondition)
        return result;
    }
    catch(err){
        return err;
    }
}

async function DeleteObject(jsonCondition){
    try{
        const result= await DeleteQuery('rooms',jsonCondition);
        return result
    }
    catch(err){
        return err;
    }
}

module.exports={GetList,GetOne,AddObject,UpdateObject,DeleteObject,GetFill,GetRevenue,GetRevenueByRoom};