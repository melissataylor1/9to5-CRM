const connection = require("./connection")

class DB{
    constructor(connection){
        this.connection = connection
    }
    findAllEmployees(){
        return this.connection.promise().query(
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee 
            LEFT JOIN role ON employee.role_id = role.id 
            LEFT JOIN department ON role.department_id = department.id 
            LEFT JOIN employee manager ON manager.id = employee.manager_id;`
        );
    }
    findAllDepartments() {
        return this.connection.promise().query(
            `SELECT id, name 
            FROM department`
        );
    }

    findAllRoles() {
        return this.connection.promise().query(
            `SELECT role.id, role.title, department.name AS department, role.salary 
            FROM role 
            LEFT JOIN department ON role.department_id = department.id`
        );
    }
    addEmployee(employee) {
        const { first_name, last_name, role_id, manager_id } = employee;
        return this.connection.promise().query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?)`,
            [first_name, last_name, role_id, manager_id]
        );
    }
    findAllEmployeesByDepartment(department_id) {
        return this.connection.promise().query(
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee 
            LEFT JOIN role ON employee.role_id = role.id 
            LEFT JOIN department ON role.department_id = department.id 
            LEFT JOIN employee manager ON manager.id = employee.manager_id 
            WHERE department.id = ?`,
            [department_id]
        );
    
    }
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