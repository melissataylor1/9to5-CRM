//imports packages  
const inquirer = require('inquirer'); //command line input
const mysql = require('mysql2'); //connects to mySQL db
const consoleTable = require('console.table'); //displays data in table on command line

const connection = require('./db/connect'); //SQL access connection

start()
// Function to prompt the user for what they would like to do
function start() {
    inquirer.prompt(
      {name: 'options',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]})
    .then(answer => {
      switch (answer.toDo) {
        case 'View all employees':
          viewAllEmp();
          break;
        case 'View all departments':
          viewAllDepart();
          break;
        case 'View all employees by Department':
          viewEmpByDepart();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'Add employee':
          addEmployee();
          break;
        case 'Add department':
          addDepartment();
          break;
        case 'Add role':
          addRole();
          break;
        case 'Update employee role':
          updateEmpRole();
          break;
        case 'EXIT':
          exitApp();
          break;
      }
    });
};
    }