const mysql = require('mysql2');

const setupDB={
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'motel_db',
  dateStrings:true
}

function CreateConnect(){
    const connection = mysql.createConnection(setupDB);
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the MySQL database');
    });
    return connection;
}

function GetQuery(tableName,columnList,jsonEqualCondition,jsonLikeCondition,extendCondition,groupBy,having,orderBy,offset,limit){
    const connection = mysql.createConnection(setupDB);
    let condition='';
    if(Object.keys(jsonEqualCondition).length){
        condition+=(condition?" AND ":'')+Object.entries(jsonEqualCondition).map(([key,value])=>key+"="+mysql.escape(value)).join(' AND ');
    }
    if(Object.keys(jsonLikeCondition).length){
        condition+=(condition?" AND ":'')+Object.entries(jsonLikeCondition).map(([key,value])=>key+" like '%"+value+"%' ").join(' AND ');
    }
    condition+= extendCondition? (condition?' AND ':'')+extendCondition.join(' AND '):'';
    var sql="SELECT "+columnList.join()+" from "+tableName+(condition? ' Where '+condition:'' )+(groupBy?' Group By '+groupBy:'') +(having?' Having '+having:'') + (orderBy?' Order By '+orderBy:'')+(offset?' offset '+offset:'')+ (limit?' Limit '+limit:'');
    // console.log(sql);
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the MySQL database');
    });
    
    return new Promise((resolve,reject)=>{
        connection.query(sql, (err, result) => {
            if (err) {
                console.error('Error:', err);
                reject(err.message);
            }
            else{
                resolve(result);
            }
            connection.end();
        });
    });
}

function GetJoinQuery(mainTable,sideTable,columnList,onCondition,jsonEqualCondition,jsonLikeCondition,extendCondition,groupBy,having,orderBy,offset,limit){
    const connection = mysql.createConnection(setupDB);
    let condition='';
    if(Object.keys(jsonEqualCondition).length){
        condition+=(condition?" AND ":'')+Object.entries(jsonEqualCondition).map(([key,value])=>key+"="+mysql.escape(value)).join(' AND ');
    }
    if(Object.keys(jsonLikeCondition).length){
        condition+=(condition?" AND ":'')+Object.entries(jsonLikeCondition).map(([key,value])=>key+" like '%"+value+"%' ").join(' AND ');
    }
    condition+= extendCondition? (condition?' AND ':'')+extendCondition.join(' AND '):'';
    var sql="SELECT "+columnList.join()+" from "+mainTable;
    
    if(sideTable.length>0 && sideTable.length===onCondition.length){
        for(let i=0;i<sideTable.length;i++){
            sql+=" left join "+sideTable[i]+" on "+onCondition[i]
        }
    }
    
    sql+=(condition?' where '+condition:'')+ (groupBy?' Group By '+groupBy:'') +(having?' Having '+having:'') + (orderBy?' Order By '+orderBy:'')+(offset?' offset '+offset:'')+ (limit?' Limit '+limit:'');
    //console.log(sql)
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the MySQL database');
    });
    
    return new Promise((resolve,reject)=>{
        connection.query(sql, (err, result) => {
            if (err) {
                console.error('Error:', err);
                reject(err.message);
            }
            else{
                resolve(result);
            }
            connection.end();
        });
    });
}

function AddQuery(tableName,jsonData){
    const connection = mysql.createConnection(setupDB);
    var sql="INSERT INTO "+tableName+"("+Object.keys(jsonData).join()+") VALUES("+Object.values(jsonData).map(item=>typeof item=='string'?"'"+item+"'":item==null? "NULL":item).join()+")";
    //console.log(sql);
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the MySQL database');
    });
    
    return new Promise((resolve,reject)=>{
        connection.query(sql, (err, result) => {
            if (err || result.insertId==0) {
                console.error('Error creating:', err.message);
                reject(err.message);
            }
            else{
                resolve(result.insertId);
            }
            connection.end();
        });
    });
}

function UpdateQuery(tableName,jsonChange,jsonCondition){
    const connection = mysql.createConnection(setupDB);
    var sql = "UPDATE "+tableName+" SET "+Object.entries(jsonChange).map(([key,value])=>key+"="+mysql.escape(value)).join(',')+" WHERE "+Object.entries(jsonCondition).map(([key,value])=>key+"="+mysql.escape(value)).join(' AND ');
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the MySQL database');
    });
    //console.log(sql);
    return new Promise((resolve,reject)=>{
        connection.query(sql, (err, result) => {
            if (err) {
                console.error('Error updated:', err);
                reject(err.message);
            }
            else{
                resolve(result.affectedRows);
            }
        });
        connection.end()
    });
}

function DeleteQuery(tableName,jsonCondition){
    const connection = mysql.createConnection(setupDB);
    var sql = "DELETE FROM "+tableName+" WHERE "+Object.entries(jsonCondition).map(([key,value])=>key+"="+mysql.escape(value)).join(' AND ');
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the MySQL database');
    });
    
    return new Promise((resolve,reject)=>{
        connection.query(sql, (err, result) => {
            if (err) {
                console.error('Error deleting:', err);
                reject(err.message);
            }
            else{
                resolve(jsonCondition.id);
            }
        });
        connection.end()
    });
}

function ExcuteQuery(sql){
    const connection = mysql.createConnection(setupDB);
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the MySQL database');
    });
    
    return new Promise((resolve,reject)=>{
        connection.query(sql, (err, result) => {
            if (err) {
                console.error('Error: ', err);
                reject(err.message);
            }
            else{
                resolve(result);
            }
        });
        connection.end()
    });
}

function DestroyConnect(connection){
    connection.ping((err) => {
        if (err) {
            console.log('Connection has already closed');
        } else {
            console.log('Connection is closing => complete');
            connection.end();
        }
    });
}
//setInterval(reconnect,50000)
module.exports = {GetQuery,AddQuery,UpdateQuery,DeleteQuery,GetJoinQuery,CreateConnect,DestroyConnect,ExcuteQuery};