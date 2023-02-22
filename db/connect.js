const mysql = require('mysql2');

// Connecting to SQL database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'frankie464',
        database: 'CRM_employee_db'
    },
    console.log(`Connected to your CRM database.`)

);

connection.connect(function(err){
    if(err) throw err
  })

  module.exports=connection