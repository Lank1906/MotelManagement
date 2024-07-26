const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'shop'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    console.log('vua ket noi')
    return;
  }
  console.log('Connected to the MySQL database');
});

function reconnect(){
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to the database:', err);
        console.log('vua ket noi')
        return;
      }
      console.log('Connected to the MySQL database');
    });
}
//setInterval(reconnect,50000)
module.exports = connection;