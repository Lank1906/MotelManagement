const mysql = require('mysql2');

const setupDB={
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'motel_db'
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

function GetQuery(tableName,columnList){
    const connection = mysql.createConnection(setupDB);
    var sql="SELECT "+columnList.join()+" from "+tableName;
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
                reject({message:"failed"});
            }
            else{
                resolve(result);
            }
            connection.end();
        });
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
module.exports = {getQuery,createConnect,destroyConnect};