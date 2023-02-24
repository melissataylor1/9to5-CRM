 const mysql = require('mysql2');

// Connecting to SQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'frankie464',
    database: 'crm_employee_db'
});
  
db.connect(function(err){
    if(err) throw err;
    console.log(`Connected to your CRM database.`);    
}); 
  
module.exports=db; 

  