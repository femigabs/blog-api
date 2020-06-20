const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require('mongoose'); //import mongoose after installing use for communicating with mongodb database
const db = require("./database");
const blog1 = require("./route"); //the array (local)
const blog2 = require("./dbRoute"); //uses mongodb
const blog3 = require("./dbRoute2");

let app = express();
let port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port, () => {
console.log("Application Listening on Port 4000")
});

app.get('/', (req, res) => {
return res.status(200).json({
message: "welcome to my BlogApi"
});
});
app.use("/api/v1/blog", blog1);
app.use("/api/v2/blog", blog2);
app.use("/api/v3/blog", blog3);

module.exports = app;