const mysql = require('mysql2');

const setupDB={
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'motel_db'
}

function createConnnect(){
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

function getQuery(sql){
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
                console.error('Error:', err);
                reject({message:"failed"});
            }
            else{
                resolve(result);
                connection.end();
            }
        });
    });
}

function destroyConnect(connection){
    connection.ping((err) => {
        if (err) {
            console.log('Connection lost. Attempting to reconnect...');
        } else {
            console.log('Connection active');
            connection.end();
        }
    });
}
//setInterval(reconnect,50000)
module.exports = {getQuery,createConnect,destroyConnect};