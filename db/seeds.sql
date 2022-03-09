INSERT INTO department (id, name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Legal");

INSERT INTO roles (id, title, department_id, salary)
VALUES (1, "Sales Lead", 1, 100000),
       (2, "Salesperson", 1, 80000),
       (3, "Lead Engineer", 2, 150000),
       (4, "Software Engineer", 2, 120000),
       (5, "Account Manager", 3, 160000),
       (6, "Accountant", 3, 125000),
       (7, "Legal Team Lead", 4, 250000),
       (8, "Lawyer", 4, 190000);
       
INSERT Into employee (id, first_name, last_name, roles_id, manager_id)
VALUES (1, 'Mark', 'Miller', 2, null),
       (2, 'Devin', 'Booker', 1, 1),
       (3, 'Juan', 'Doe', 4, null),
       (4, 'Ashley', 'Jones', 3, 3),
       (5, 'James', 'Moore', 6, null),
       (6, 'lana', 'Truner', 5, 5),
       (7, 'Lewis', 'Singh', 7, null),
       (8,'Kat', 'Blue', 8, 7);

