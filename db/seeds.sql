
INSERT INTO department (name)
VALUES ('Design'),
       ('Marketing'),
       ('Accounting'),
       ('Corporate Development'),
       ('Operations');

INSERT INTO roles (roletitle, salary, department_id)
VALUES ("Web Designer", 50000, 1),
       ("Marketing Manager", 80000, 2),
       ("Accountant", 100000, 3),
       ("Sales Associate", 60000, 4),
       ("COO", 350000, 5),
       ("Graphic Designer", 40000, 1),
       ("Marketing Associate", 55000, 2),
       ("Auditor", 110000, 3),
       ("Sales VP", 105000, 4),
       ("Operations VP", 150000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Melissa", "Taylor", 3, NULL),
       ("Leo", "Taylor", 1, NULL),
       ("Mister", "Name", 2, NULL),
       ("Misses", "Example", 5, NULL),
       ("Bob", "Person", 4, NULL),
       ("Taylor", "Green", 6, NULL),
       ("Robert", "Human", 7, NULL),
       ("Larry", "Bird", 8, NULL),
       ("Michael", "Jordan", 9, NULL),
       ("Steph", "Curry", 10, NULL);


