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
        'View all roles',
        'View all employees',
        new inquirer.Separator(),
        'Add a department',
        'Add a role',
        'Add an employee',
        new inquirer.Separator(),
        'Update an employee role',
        new inquirer.Separator(),
        'EXIT',
        new inquirer.Separator(),
      ]
    })


    .then(answer => {
      switch (answer.options) {

        case 'View all employees':
          viewAllEmployees();
          break;

        case 'View all departments':
          viewAllDepartments();
          break;


        case 'View all roles':
          viewAllRoles();
          break;

        
        case 'Add an employee':
          addEmployee();
          break;

        case 'Add a department':
          addDepartment();
          break;

        case 'Add a role':
          addRole();
          break;

        case 'Update an employee role':
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



//Add Department
function addDepartment(){
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the department?',
      validate: (input) => {
        if (input === '') {
          return 'Department name cannot be empty.';
        }
        return true;
      },
    },
  ]).then((answer) => {
    db.createDepartment(answer)
      .then(() => console.log(`Added ${answer.name} to the database.`))
      .then(() => start());
  });
}


//Add a Role
function addRole() {
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

//Add Employee
const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "What is the new employee's first name?"
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the new employee's last name?"
    }
  ])
    .then(answer => {
      let firstName = answer.firstName
      let lastName = answer.lastName
      db.findAllRoles()
        .then(([rows]) => {
          let roles = rows
          const roleChoices = roles.map(({ id, roletitle }) => ({
            name: roletitle,
            value: id
          }))
          //Add role to employee
          inquirer.prompt({
            type: 'list',
            name: 'roleId',
            message: "What is the employee's role?",
            choices: roleChoices
          })
            .then(answer => {
              let roleId = answer.roleId
              db.findAllEmployees()
                .then(([rows]) => {
                  let employees = rows
                  const managerChoices = roles.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                  }))
                  managerChoices.unshift({ name: 'None', value: NULL })

                  //Add manager to employee
                  inquirer.prompt({
                    type: 'list',
                    name: 'managerId',
                    message: "Who is the employee's manager?",
                    choices: managerChoices
                  })
                    .then(answer => {
                      let newEmployee = {
                        manager_id: answer.managerId,
                        role_id: roleId,
                        first_name: firstName,
                        last_name: lastName
                      }
                      db.createEmployee(newEmployee)
                        .then(() => console.log(`Added ${answer.newEmployee} to the database`))
                    })


                    .then(() => start())
                })
            })
        });
    });
};


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