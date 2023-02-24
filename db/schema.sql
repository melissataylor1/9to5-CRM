DROP DATABASE IF EXISTS crm_employee_db;
CREATE DATABASE crm_employee_db;

USE crm_employee_db;

/*department table*/
CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

/*role table*/
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roletitle VARCHAR(30) NOT NULL,
  salary DECIMAL NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE CASCADE
);

/*employee table*/
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    FOREIGN KEY (role_id)
    REFERENCES roles (id)
    ON DELETE CASCADE,
    FOREIGN KEY (manager_id)
    REFERENCES employee (id)
    ON DELETE SET NULL
);