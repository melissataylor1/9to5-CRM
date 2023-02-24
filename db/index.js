const connection = require("./connect")

class DB{
    constructor(connection){
        this.connection = connection
    }
    //View all employees
    findAllEmployees(){
        return this.connection.promise().query(
            `SELECT employee.id, employee.first_name, employee.last_name, roles.roletitle, department.name as department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee 
            LEFT JOIN roles ON employee.role_id = roles.id 
            LEFT JOIN department ON roles.department_id = department.id 
            LEFT JOIN employee manager ON manager.id = employee.manager_id;`
        );
    }

    //view all departments
    findAllDepartments() {
        return this.connection.promise().query(
            `SELECT id, name 
            FROM department`
        );
    }

    //View all roles
    findAllRoles() {
        return this.connection.promise().query(
            `SELECT roles.id, roles.title, department.name AS department, roles.salary 
            FROM roles
            LEFT JOIN department ON role.department_id = department.id`
        );
    }

    //add new employee
    addEmployee(employee) {
        const { first_name, last_name, role_id, manager_id } = employee;
        return this.connection.promise().query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?)`,
            [first_name, last_name, role_id, manager_id]
        );
    }

    //Find employees by departments
    findAllEmployeesByDepartment(department_id) {
        return this.connection.promise().query(
            `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name as department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee 
            LEFT JOIN roles ON employee.role_id = roles.id 
            LEFT JOIN department ON roles.department_id = department.id 
            LEFT JOIN employee manager ON manager.id = employee.manager_id 
            WHERE department.id = ?`,
            [department_id]
        );
    
    }

    //update employee role
    updateEmployeeRole(employee_id, role_id) {
        return this.connection.promise().query(
            `UPDATE employee 
            SET role_id = ? 
            WHERE id = ?`,
            [role_id, employee_id]
        );
    }
}

module.exports = new DB(connection);