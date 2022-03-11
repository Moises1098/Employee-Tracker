// import mysql2
const mysql = require('mysql2')
// import inquirer 
const inquirer = require('inquirer');

const cTable = require('console.table');


// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'root',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`),
    console.log("***********************************"),
    console.log("*                                 *"),
    console.log("*        EMPLOYEE MANAGER         *"),
    console.log("*                                 *"),
    console.log("***********************************")

);


// inquirer prompt for first action
const promptUser = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: ['View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'No Action'
            ]
        }
    ])
        .then((answers) => {
            const { choices } = answers;

            if (choices === "View All Employees") {
                showEmployees();
            }

            if (choices === "Add Employee") {
                addEmployee();
            }

            if (choices === "Update Employee Role") {
                updateEmployee();
            }

            if (choices === "View All Roles") {
                viewRoles();
            }

            if (choices === "Add Role") {
                addRole();
            }

            if (choices === "View All Departments") {
                viewDepartments();
            }

            if (choices === "Add Department") {
                addDepartment();
            }

            if (choices === "No Action") {
                db.end()
            };
        });
};

// function to show all employees 
showEmployees = () => {
    console.log('Showing all employees...\n');
    const sql = `SELECT employee.id, 
                        employee.first_name, 
                        employee.last_name, 
                        roles.title, 
                        department.name AS department,
                        roles.salary, 
                        CONCAT (manager.first_name, " ", manager.last_name) AS manager
                 FROM employee
                        LEFT JOIN roles ON employee.roles_id = roles.id
                        LEFT JOIN department ON roles.department_id = department.id
                        LEFT JOIN employee manager ON employee.manager_id = manager.id`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows)
        promptUser();
    });
};

// function to add an employee 
addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
            validate: addFirst => {
                if (addFirst) {
                    return true;
                } else {
                    console.log('Please enter a first name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
            validate: addLast => {
                if (addLast) {
                    return true;
                } else {
                    console.log('Please enter a last name');
                    return false;
                }
            }
        }
    ])
        .then(answer => {
            const params = [answer.firstName, answer.lastName]

            // grab roles from roles table
            const roleSql = `SELECT roles.id, roles.title FROM roles`;

            db.query(roleSql, (err, data) => {
                if (err) throw err;

                const roles = data.map(({ id, title }) => ({ name: title, value: id }));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: "What is the employee's role?",
                        choices: roles
                    }
                ])
                    .then(roleChoice => {
                        const roles = roleChoice.role;
                        params.push(roles);

                        const managerSql = `SELECT * FROM employee`;

                        db.query(managerSql, (err, data) => {
                            if (err) throw err;

                            const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

                            // console.log(managers);

                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'manager',
                                    message: "Who is the employee's manager?",
                                    choices: managers
                                }
                            ])
                                .then(managerChoice => {
                                    const manager = managerChoice.manager;
                                    params.push(manager);

                                    const sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)`;
                                    

                                    db.query(sql, params, (err, result) => {
                                        if (err) throw err;
                                        console.log("Employee has been added!")
                                        showEmployees();
                                    });
                                });
                        });
                    });
            });
        });
};


//function to update employee role
updateEmployee = () => {
    const emplSql = `SELECT employee.id, employee.last_name FROM employee`;
    const roleSql = `SELECT roles.id, roles.title FROM roles`;
    db.query(emplSql, (err, data) => {
        if (err) throw err;

        const employees = data.map(({ id, last_name }) => ({ name: last_name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: "What is the employee's name?",
                choices: employees
            }
        ]).then(({employee}) => {
            db.query(roleSql, (err, data) => {
                if (err) throw err;
        
                const roles = data.map(({ id, title }) => ({ name: title, value: id }));
        
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: "What is the employee's role?",
                        choices: roles
                    }
                ]).then(({role}) => {
                    db.query(`UPDATE employee SET roles_id = ? WHERE id = ?`, [role, employee], (err, data) => {
                        if (err) throw err;
                        console.log('Updated Employee Succesfully!...\n')
                        showEmployees();
                    })
                })
        
            })
        })
    })
}       


//function to view all roles
viewRoles = () => {
    console.log('Showing all roles...\n');
  
    const sql = `SELECT roles.id, roles.title, roles.salary, department.name AS department
                 FROM roles
                 INNER JOIN department ON roles.department_id = department.id`;
    
    db.query(sql, (err, rows) => {
      if (err) throw err; 
      console.table(rows); 
      promptUser();
    })
};

//function to add a role
addRole = () => {
    inquirer.prompt([
      {
        type: 'input', 
        name: 'role',
        message: "What role do you want to add?",
        validate: addRole => {
          if (addRole) {
              return true;
          } else {
              console.log('Please enter a role');
              return false;
          }
        }
      },
      {
        type: 'input', 
        name: 'salary',
        message: "What is the salary of this role?",
        validate: addSalary => {
          if ((addSalary)) {
              return true;
          } else {
              console.log('Please enter a salary');
              return false;
          }
        }
      }
    ])
      .then(answer => {
        const params = [answer.role, answer.salary];
  
        // grab dept from department table
        const roleSql = `SELECT name, id FROM department`; 
  
        db.query(roleSql, (err, data) => {
          if (err) throw err; 
      
          const dept = data.map(({ name, id }) => ({ name: name, value: id }));
  
          inquirer.prompt([
          {
            type: 'list', 
            name: 'dept',
            message: "What department is this role in?",
            choices: dept
          }
          ])
            .then(deptChoice => {
              const dept = deptChoice.dept;
              params.push(dept);
  
              const sql = `INSERT INTO roles (title, salary, department_id)
                          VALUES (?, ?, ?)`;
  
              db.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log('Added ' + answer.role + " to roles!"); 
  
                viewRoles();
            });
        });
        });
    });
};

//function to view departments
viewDepartments = () => {
    console.log('Showing all departments...\n');
    const sql = `SELECT department.id AS id, department.name AS department FROM department`; 
              
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
    });
};
              


//function to add departments
addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: "What is the name of the department?",
            validate: addFirst => {
                if (addFirst) {
                    return true;
                } else {
                    console.log('Please enter a department name');
                    return false;
                }
            }
        },
    ])
    .then(answer => {
                    
        const depSql = `INSERT INTO department (name)
        VALUES (?)`;
            db.query(depSql, answer.addDept, (err, result) => {
                if (err) throw err;
                console.log('Added ' + answer.departmentName + " to departments!"); 
      
             viewDepartments();
        });
    });
};

promptUser()