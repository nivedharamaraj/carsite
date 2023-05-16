var express =require('express') ;
var mysql = require('mysql');
var session= require('express-session');
var flash=require('connect-flash');
var router = express.Router();
var path = require('path');
const bcrypt = require("bcrypt");
const doenv = require("dotenv");
var cookieParser = require('cookie-parser');


const app = express();
doenv.config({
  path: "./.env",
});
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set ("view engine","ejs")
app.set("views", path.join(__dirname, "views"));
app.use(
    session({
      secret: 'car',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 6000  },
    })
  );
app.use(flash());

const login = require('./routes/login');
const register = require('./routes/register');
const home = require('./routes/home');
const contact = require('./routes/contact');
app.use('/contact',contact);
app.use('/',home);
app.use('/register',register);
app.use('/login',login);



app.listen (3000);

console.log("Running at Port 3000");