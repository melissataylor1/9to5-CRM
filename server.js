//imports packages  
const express = require('express');
const fs = require("fs");

const db = require('./db/index');
const inquirer = require('inquirer'); //command line input
require('console.table'); //displays data in table on command line
const connection = require("./db/connect");
const PORT = process.env.PORT || 3000;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


console.log(`
┏━━━┓━━━━━┏┓━━━━━━━━━┏━━━┓━━━━┏━━━┓┏━━━┓┏━┓┏━┓
┃┏━┓┃━━━━┏┛┗┓━━━━━━━━┃┏━━┛━━━━┃┏━┓┃┃┏━┓┃┃┃┗┛┃┃
┃┗━┛┃━━━━┗┓┏┛┏━━┓━━━━┃┗━━┓━━━━┃┃━┗┛┃┗━┛┃┃┏┓┏┓┃
┗━━┓┃━━━━━┃┃━┃┏┓┃━━━━┗━━┓┃━━━━┃┃━┏┓┃┏┓┏┛┃┃┃┃┃┃
┏━━┛┃━━━━━┃┗┓┃┗┛┃━━━━┏━━┛┃━━━━┃┗━┛┃┃┃┃┗┓┃┃┃┃┃┃
┗━━━┛━━━━━┗━┛┗━━┛━━━━┗━━━┛━━━━┗━━━┛┗┛┗━┛┗┛┗┛┗┛
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ `);
start()
// Function to prompt the user for what they would like to do
function start() {
  inquirer.prompt(
    {
      name: 'options',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all role',
        'View all employees',
        'View employees by Department',
        new inquirer.Separator(),
        'Add a department',
        'Add a role',
        'Add an employee',
        new inquirer.Separator(),
        'Update an employee role',
        new inquirer.Separator(),
        'Exit',
        new inquirer.Separator(),
      ]
    })


    .then(answer => {
      switch (answer.options) {

        case 'View all departments':
          viewAllDepartments();
          break;

          case 'View all role':
            viewAllRoles();
            break;
  
        case 'View all employees':
          viewAllEmployees();
          break;

        case 'View employees by Department':
          viewEmployeeByDepartment();
          break;

          case 'Add a department':
            addDepartment();
            break;
  
            case 'Add a role':
              addRole();
              break;
    
        case 'Add an employee':
          addEmployee();
          break;

     
        case 'Update employee role':
          updateEmployeeRole();
          break;

        case 'EXIT':
          console.log("Exiting Application");
          connection.end();
          break;

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
function viewAllRoles() {
  db.findAllRoles()
  .then(([rows]) => {
    const roles = rows;
    console.table(roles);
  })
  .then(() => start());
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
  db.findAllEmployeesByDepartment()
    .then(([rows]) => {
      let departments = rows
      console.table(departments)
    })
    .then(() => start())
}


//Add Department
function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the department?',
      validate: (input) => {
        if (input === '') {
          return 'Please enter a department name. Entry cannot be empty.';
        }
        return true;
      },
    },
  ]).then((answer) => {
    db.createDepartment(answer.name)
      .then(() => console.log(`Added ${answer.name} to the database.`))
      .then(() => start());
  });
}

//Add a Role
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
          name: 'title',
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
        db.createRole(answer)
          .then(() => console.log(`Added ${answer.title} to the database`))
          .then(() => start());
      });
  });
}

//Function to Add an Employee
function addEmployee(){
  db.findAllRoles()
  .then(([rows]) => {
    let roles = rows;
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));

    db.findAllEmployees()
      .then(([rows]) => {
        let employees = rows;
        const managerChoices = employees.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id,
        }));

        inquirer.prompt([
          {
            type: "input",
            name: "first_name",
            message: "Enter the employee's first name:",
          },
          {
            type: "input",
            name: "last_name",
            message: "Enter the employee's last name:",
          },
          {
            type: "list",
            name: "role_id",
            message: "Select the employee's role:",
            choices: roleChoices,
          },
          {
            type: "list",
            name: "manager_id",
            message: "Select the employee's manager:",
            choices: managerChoices,
          },
        ])
        .then((answer) => {
          db.createEmployee(answer)
            .then(() => console.log(`Added ${answer.first_name} ${answer.last_name} to the database`))
            .then(() => start())
            .catch((err) => console.log(err));
        });
      });
  });
}


//Update Employee
function updateEmployeeRole(){
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));

    db.findAllRoles()
      .then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, roletitle }) => ({
          name: roletitle,
          value: id,
      }));
      //input new info
      inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: "Select the employee to update their role",
          choices: employeeChoices,
        },
        {
          type: 'list',
          name: 'roleId',
          message: "Select the employee's new role",
          choices: roleChoices,
        },
      ])
        .then((answers) => {
        //prints new ifo and updates db
          db.updateEmployeeRole(answers.employeeId, answers.roleId)
            .then(() => console.log(`new employee role updated to database`))
            .then(() => start());
        });
    });
});
}


// Response Errors
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`${PORT}`);
});