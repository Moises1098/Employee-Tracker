INSERT INTO department (name)
VALUES ( "Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO roles (title, department_id, salary)
VALUES ("Sales Lead", 1, 100000),
       ("Salesperson", 1, 80000),
       ("Lead Engineer", 2, 150000),
       ("Software Engineer", 2, 120000),
       ("Account Manager", 3, 160000),
       ("Accountant", 3, 125000),
       ("Legal Team Lead", 4, 250000),
       ("Lawyer", 4, 190000);
       
INSERT Into employee (first_name, last_name, roles_id, manager_id)
VALUES ('Mark', 'Miller', 2, null),
       ('Devin', 'Booker', 1, 1),
       ('Juan', 'Doe', 4, null),
       ('Ashley', 'Jones', 3, 3),
       ('James', 'Moore', 6, null),
       ('lana', 'Truner', 5, 5),
       ('Lewis', 'Singh', 7, null),
       ('Kat', 'Blue', 8, 7);

