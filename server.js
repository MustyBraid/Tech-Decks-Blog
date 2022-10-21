const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");
const routes = require("./routes");
const sequelize = require("./config/connection");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

function mainMenu() {
  inquirer
    .prompt([
      {
        name: "whatDo",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.whatDo) {
        case "View All Employees":
          employeeViewer();
          break;
        case "Add Employee":
          createEmployeeQuestions();
          break;
        case "Update Employee Role":
          employeeGrabber();
          break;
        case "View All Roles":
          roleViewer();
          break;
        case "Add Role":
          roleMaker();
          break;
        case "View All Departments":
          departmentViewer();
          break;
        case "Add Department":
          departmentMaker();
          break;
        default:
          console.log("Quitting now!");
          break;
      }
    });
}

function employeeViewer() {
  axios({
    method: "get",
    url: "http://localhost:3001/api/employee/all",
  }).then((response) => {
    console.table(response.data);
    mainMenu();
  });
}

function createEmployeeQuestions() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employe's first name?",
      },
      {
        name: "last_name",
        type: "input",
        message: "How about their last name?",
      },
      {
        name: "role",
        type: "input",
        message: "What is their role",
      },
      {
        name: "manager",
        type: "input",
        message: "What is their manager's name?",
      },
    ])
    .then((answers) => {
      if (answers.first_name) {
        employeeMaker(answers);
      } else {
        console.log("please provide at least a first name :(");
        createEmployeeQuestions();
      }
    });
}

function employeeMaker(answers) {
  axios({
    method: "post",
    url: "http://localhost:3001/api/employee/",
    data: {
      first_name: answers.first_name,
      last_name: answers.last_name,
      role_title: answers.role,
      manager_name: answers.manager,
    },
  })
    .then(
      axios({
        method: "post",
        url: "http://localhost:3001/api/role",
        data: {
          title: answers.role,
        },
      })
    )
    .then(mainMenu());
}

function employeeGrabber() {
  axios
    .get("http://localhost:3001/api/employee/all", {})
    .then((response) => {
      let employeeList = [];
      for (let i = 0; i < response.data.length; i++) {
        employeeList.push(response.data[i].first_name);
      }
      return employeeList;
    })
    .then((employeeList) => {
      inquirer
        .prompt([
          {
            name: "Who",
            type: "list",
            message: "Which employee's role would you like to update?",
            choices: employeeList,
          },
        ])
        .then((answers) => {
          employeeRoleUpdater(answers.Who);
        });
    });
}

function employeeRoleUpdater(employee) {
  axios
    .get("http://localhost:3001/api/role/all", {})
    .then((response) => {
      let roleList = [];
      for (let i = 0; i < response.data.length; i++) {
        roleList.push(response.data[i].title);
      }
      return roleList;
    })
    .then((roleList) => {
      inquirer
        .prompt([
          {
            name: "newRole",
            type: "list",
            message: "What will their new role be?",
            choices: roleList,
          },
        ])
        .then((answers) => {
          axios
            .put(`http://localhost:3001/api/employee/role/${employee}`, {
              newTitle: answers.newRole,
            })
            .then(mainMenu());
        });
    });
}

function roleViewer() {}

function roleMaker() {}

function departmentMaker() {}

function departmentViewer() {}

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log("Now listening on port: " + PORT));
  })
  .then(mainMenu());
