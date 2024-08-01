const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'sql204.infinityfree.com',
  user: 'if0_37017440',
  password: '181881181188h',
  database: 'if0_37017440_test'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
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