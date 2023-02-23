INSERT INTO department (name)
VALUES ('Design'),
       ('Marketing'),
       ('Accounting'),
       ('Corporate Development'),
       ('Operations');

INSERT INTO roles (title, salary, department_id)
VALUES ("Web Designer", 50000, 1),
       ("Marketing Manager", 80000, 2),
       ("Accountant", 100000, 3),
       ("Sales Associate", 60000, 4),
       ("COO", 350000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Melissa", "Taylor", 3, NULL),
       ("Leo", "Taylor", 1, NULL),
       ("Mister", "Name", 2, NULL),
       ("Misses", "Example", 5, NULL),
       ("Bob", "Person", 4, NULL);

       