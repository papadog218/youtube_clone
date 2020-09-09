// import msSql from "mssql";
const msSql = require("mssql");
const morgan = require("morgan");
const express = require("express");

const app = express();

app.use(morgan("dev"));

console.log(process.env.MS_DB_USER);

const config = {
  user: process.env.MS_DB_USER,
  password: process.env.MS_DB_PWD,
  server: "insa",
  database: process.env.MS_DB_NAME,
  options: {
    encrypt: true,
  },
};

msSql.connect(config, (err) => {
  if (err) {
    console.log(err);
    // throw err;
  } else {
    new msSql.Request().query(
      "select * from tblMember where Mbr_nam = '김용환'",
      (err, result) => {
        console.dir(result);
      }
    );
  }
  // console.log("Connection Success");
});
