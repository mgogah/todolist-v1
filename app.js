//jshint eversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname + "/date.js");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", function (req, res) {

    // res.send("Hello");

    
    //    if(currentDay === 6 || currentDay === 0){
    //     //res.write("<h1>Yay! it's weekend :)</h1>");
    //     //res.write(today.getDate());
    //     day = "Weekend";
    //    // res.sendFile(__dirname + "/index.html");

    //    }
    //    else{
    //     day = "Weekday";
    //     //res.write("<h1>Boo! I have to work :( </h1>");
    //     //res.sendFile(__dirname + "/index.html");

    //    }
    // switch (currentDay) {
    //     case 0: day = "Sunday"; break;
    //     case 1: day = "Monday"; break;
    //     case 2: day = "Tuesday"; break;
    //     case 3: day = "Wednesday"; break;
    //     case 4: day = "Thursday"; break;
    //     case 5: day = "Friday Weekend"; break;
    //     case 6: day = "Saturday Weekend"; break;
    //     default: console.log("Error unrequnized day!! with value: " + currentDay);
    // }

    const day = date.getDate();
    res.render("list", { listTitle: day, newListItems: items });

    // res.send();
});

app.post("/", function(req, res){
   const newItem = req.body.newItem;
   console.log(req.body);
   if(req.body.list === "Work"){
    workItems.push(newItem);
    res.redirect("/work");
   }
   else{
    items.push(newItem);
    res.redirect("/");
   }
   
});

app.get("/work", function(req, res){
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function(req, res){
    let newItem = req.body.newItem;
    workItems.push(newItem);
    res.redirect("/work");
});

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(3000, function () {
    console.log("server listen to port no. 3000");
});