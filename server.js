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
        'View budgets by Department',
        new inquirer.Separator(),
        'Add a department',
        'Add a role',
        'Add an employee',
        new inquirer.Separator(),
        'Update an employee role',
        'Exit'
      ]})
    .then(answer => {
      switch (answer.options) {
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'View all departments':
          viewAllDepartment();
          break;
        case 'View employees by Department':
          viewEmployeeByDepartment();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View budgets by Department':
          viewBudgetByDepartment();
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
          updateEmployeeRole();
          break;
        case 'EXIT':
          console.log("Exiting Application");
          process.exit(0);
        
      }
    });
};

//View All Employees Function
  const viewAllEmployees = () => {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows
      console.table(employees)
    })
    .then(() => start())
}

//View Employee by Department

const viewEmployeeByDepartment = () => {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows
      console.table(departments)
    })
    .then(() => start())
}

//View Employee by Manager

const viewBudgetByDepartment = () => {
  db.findAllBudgets()
    .then(([rows]) => {
      let departments = rows
      console.table(departments)
    })
    .then(() => start())
}
