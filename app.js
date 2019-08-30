//SETUP 
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOveride = require("method-override");
const expressSanitizer = require("express-sanitizer");

//require Models
const Exercies = require("./model/exercise");
const Workout = require("./model/workout");

//require routes
const workoutRoutes = require("./routes/workout");
const exerciseRoutes = require("./routes/exercise");
const indexRoutes = require("./routes/index");

//APP CONFIG

//Database setup
mongoose.connect("mongodb+srv://admin:admin1234@cluster0-qzbm1.mongodb.net/test?retryWrites=true&w=majority", { //connect to mongodb atlas database
   useNewUrlParser: true, 
   useFindAndModify: false
}).then(() => {
   console.log("connected to DB");
   
}).catch(err => {
   console.log("ERROR:", err.message);
   
}); 

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //use custome stylesheet
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOveride("_method")); //for UPDATE methods

app.use(function(req, res, next){ //called on every route
   res.locals.currentUser = req.user; //'currentUser' available to every templete
   next();
});


//server SETUP
app.listen(3000, function(){
   console.log("app server running");
   
});