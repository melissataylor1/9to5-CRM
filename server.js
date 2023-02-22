//imports packages  
const inquirer = require('inquirer'); //command line input
const mysql = require('mysql2'); //connects to mySQL db
const consoleTable = require('console.table'); //displays data in table on command line

const connection = require('./db/connect'); //SQL access connection

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
        'View budgets by Department',
        new inquirer.Separator(),
        'Add a department',
        'Add a role',
        'Add an employee',
        new inquirer.Separator(),
        'Update an employee role',
        new inquirer.Separator(),
        'Exit'
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
function addDepartment() {
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
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
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
        const roleChoices = roles.map(({ id, title }) => ({
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