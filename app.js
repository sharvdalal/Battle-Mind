const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use("/public",express.static(__dirname+"/public"));

app.get("/",function(req,res){
    res.render("home.ejs");
});
app.post("/",function(req,res){

    res.render("main.ejs");
});

app.listen(PORT,function(){
    console.log("server started on port 5000");
});