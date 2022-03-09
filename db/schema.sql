DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;


CREATE TABLE department (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT
);

CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INT,
  manager_id INT
)
