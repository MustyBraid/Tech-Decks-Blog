const path = require("path");
const express = require("express");
const mysql = require("mysql2");
const routes = require("./controllers");
const session = require("express-session");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const axios = require("axios");
const helpers = require("./utils/helpers");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Don't tell anyone",
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening on port:", PORT));
});
