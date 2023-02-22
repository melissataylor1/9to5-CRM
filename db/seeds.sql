INSERT INTO department (name)
VALUES ('sales'),
       ('marketing'),
       ('engineering'),
       ('finance');

INSERT INTO roles (title, salary, department_id)
VALUES ("account exec.", 50000, 1),
       ("marketing manager", 80000, 2),
       ("software engineer", 1000000, 3),
       ("accountant", 90000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Nav", "Aulakh", 3, NULL),
       ("John", "Doe", 1, NULL),
       ("Jane", "Doe", 2, NULL),
       ("Josh", "Kent", 4, NULL);