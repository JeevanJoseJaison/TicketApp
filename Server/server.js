const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const controller = require("./Controller/Task");
const path = require('path');
const app = express();
const port = 4000

app.use(express.json());
app.use(cors());


// app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });


global.connection = mysql.createConnection({
    user: "sql6681691",
    host: "sql6.freesqldatabase.com",
    password: "ySvXL1MT1k",
    database: "sql6681691",
    port: "3306"
})


connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }

    console.log('Connected to the database');
});

app.post("/ticket/register", (req, res) => {
   console.log(req.body);
    //controller.register(req,res);
})

app.post("/ticket/login", (req, res) => {
    console.log(req.body);
   controller.login(req,res)
})

app.get("/ticket/getTask", (req, res) => {
    console.log("hello");
   controller.getTask(req,res)
})

app.get("/ticket/getUsers", (req, res) => {
    controller.getUsers(req,res)
})

app.post("/ticket/addTask", (req, res) => {
  controller.addTask(req,res);
})

app.post("/ticket/deleteTask", (req, res) => {
    controller.deleteTask(req,res);
})

app.post("/ticket/archiveTask", (req, res) => {
    const { id, flag } = req.body;

    if (!flag) {
        controller.archiveTask(id,res);
    }
    else {
        controller.unarchiveTask(id,res);
   }   
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})