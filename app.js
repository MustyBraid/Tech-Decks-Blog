const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");
const routes = require("./routes");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

//TODO: Rewrite this so we can test building an employee
// function inquirerTest() {
//   inquirer
//     .prompt([
//       {
//         name: "first_name",
//         type: "input",
//         message: "What is the employe's first name?",
//       },
//     ])
//     .then((answers) => {
//       if (answers.first_name) {
//         console.log(answers.first_name);
//       } else {
//         console.log("please provide a first name :(");
//         inquirerTest();
//       }
//     });
// }

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

//FUNCTIONALITY:
// What would you like to do?

//View all employees
// add employee:
// id first_name last_name title department salary manager

// update employee role
//view all roles
//add role:
//name salary which_department

//view all departments
//add department:
//name
//quit
