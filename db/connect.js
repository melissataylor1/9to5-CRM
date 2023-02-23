 const mysql = require('mysql2');

// Connecting to SQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'frankie464',
        database: 'CRM_employee_db'
    },
    console.log(`Connected to your CRM database.`)

);

db.connect(function(err){
    if(err) throw err
  })

  module.exports=db

  