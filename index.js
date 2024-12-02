const express = require("express"); 
const passport = require("passport"); 
const localStrategy = require("./passport.js"); 
const connectDB = require("./db"); 
const session = require("express-session"); 
const ejs = require("ejs"); 
const bodyParser = require("body-parser");  
const User = require("./models.js"); 
const controllers = require("./controllers.js");
const routes = require("./pages.js");
require('dotenv').config()

const app = express(); 
connectDB(); 

app.use( 
	session({ 
		secret: process.env.SECRET, 
		resave: false, 
		saveUninitialized: false, 
	}) 
); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(passport.initialize()); 
app.use(passport.session()); 
app.set("view engine", "ejs"); 

passport.serializeUser((user, done) => done(null, user.id)); 
passport.deserializeUser((id, done) => { 
	User.findById(id, (err, user) => done(err, user)); 
}); 

app.use("/api/", controllers);
app.use("/", routes); 

const port = 8000;
app.listen(port, () => { 
	console.log(`Server started on port ${port}`); 
}); 
