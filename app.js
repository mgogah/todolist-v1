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

    const day = date.getDate();
    res.render("list", { listTitle: day, newListItems: items });

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