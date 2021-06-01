//conexión con la base de datos

const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const db = mysql.createPool(database);

db.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('database connection was closed')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('database has to many connections')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('database connection was refused')
    }
  }

  if (connection) connection.release();
  console.log('Database is connected')
  return;
})

//promisify permite usar asyn await
db.query = promisify(db.query);

module.exports = db;