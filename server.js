/*********
* BTI325– Test3
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy. No part * of this assignment has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: _Nahal Mousavi__ Student ID: 133828178_ Date: _23 November 2022_
*
* Your app’s URL (from Cyclic) : ______
*
*********/
var data_prep = require("./data_prep.js");
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path")
const {engine} = require("express-handlebars");
app.engine(".hbs", engine({
    extname:".hbs" ,
    defaultLayout: "main"
}));
app.set("view engine", ".hbs");

app.get("/", (req, res) => {
    res.render("home")
});

// app.get("/", (req, res) => {
//     let resText = " <h2>I acknowledge the College's academic integrity policy – and my own integrity – remain in effect whether my work is done remotely or onsite. Any test or assignment is an act of trust between me and my instructor, and especially with my classmates.…. even when no one is watching. I declare I will not break that trust. <h2/><br><h2>Name:<b style='background-color: yellow;'>Nahal Mousavi</b><br>Student Number:<b style='background-color: yellow;'>133828178</b></h2>";
//     resText += "<a href='/CPA'>Click to visit CPA Students</a></br></br>";
//     resText += "<a href='/highGPA'>Click to see who has the higest GPA</a>";
//     res.send(resText);
// });
// app.get("/CPA", (req, res) => {

//     data_prep.getCPA().then((data) => {
//         res.json(data);
//     }).catch((err) => {
//         res.json(err);
//     })

// });
app.get("/highGPA", (req, res) => {
    data_prep.highGPA().then(function(data_prep){
        res.render("student", {student: data_prep})
    }).catch(function(errMsg){
        res.send(errMsg)
    })
});



app.get("/allStudents", (req, res) => {
    data_prep.allStudents().then(function(data_prep){
        res.render("students", {studentsData: data_prep})
    }).catch(function(errMsg){
        res.render("students", {studentsData: errMsg})
    })
});

app.get("/bsdstudents", (req, res) => {
    data_prep.bsdStudents().then(function(data_prep){
        res.render("students", {studentsData: data_prep})
    }).catch(function(errMsg){
        res.render("students", {studentsData: errMsg})
    })
});

app.use(function (req, res) {
    res.status(404).send("Page Not Found");
});

data_prep.prepare().then(() => {
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err) => {
    console.log(err);
});
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}