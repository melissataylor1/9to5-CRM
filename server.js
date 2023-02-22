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
        new inquirer.Separator(),
        'Exit'
      ]})


    .then(answer => {
      switch (answer.options) {

        case 'View all employees':
          viewAllEmployees();
          break;

        case 'View all departments':
          viewAllDepartments();
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

//View All Employees
  const viewAllEmployees = () => {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows
      console.table(employees)
    })
    .then(() => start())
}

//View All Roles
const viewAllRoles = () => {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows
      console.table(roles)
    })
    .then(() => start())
}

//View All Departments
const viewAllDepartments = () => {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows
      console.table(departments)
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

//View Budget by Department
const viewBudgetByDepartment = () => {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows
      console.table(departments)
    })
    .then(() => start())
}




//Add Department
function addDepartment(){
  inquirer.prompt([
    {
      type: 'input',
      name: 'newdepartment',
      message: 'What is the name of the department?',
      validate: (input) => {
        if (input === '') {
          return 'Please enter a department name. Entry cannot be empty.';
        }
        return true;
      },
    },
  ]).then((answer) => {
    db.createDepartment(answer.newdepartment)
      .then(() => console.log(`Added ${answer.newdepartment} to the database.`))
      .then(() => start());
  });
}


//Function to Add a Role
function addRole(){
  db.findAllDepartments()
  .then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          name: 'roletitle',
          type: 'input',
          message: 'What is the title of the role?',
        },
        {
          name: 'salary',
          type: 'number',
          message: 'What is the salary of the role?',
        },
        {
          name: 'department_id',
          type: 'list',
          message: 'Which department does the role belong to?',
          choices: departmentChoices,
        },
      ])
      .then((answer) => {
        db.createRole(answer.roletitle)
          .then(() => console.log(`Added ${answer.roletitle} to the database`))
          .then(() => start());
      });
  });
}
