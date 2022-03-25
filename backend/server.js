
const res = require('dotenv').config()
// console.log(res)

const express = require("express");
const app = express();

const server = require('http').Server(app)
// socket io is required for successful connection between peers
const io = require('socket.io')(server)

const mongoose = require("mongoose"); // mongo DB used to save users's account info
const cors = require("cors");
const passport = require("passport"); // passport-local used for user authentication
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("express-flash");


const dbURI = "mongodb://127.0.0.1/sih-database"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log("Mongoose Is Connected");
        server.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));
    })
    .catch(err => console.log(err));


app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

////cors is used to allow cross-origin request

app.use(
  	cors({
	    origin: "http://localhost:3000", 
    	methods: [ "GET", "POST" ],
    	credentials: true,
  	})
);

app.use(
    session({
      	secret: "secretcode",
      	resave: true,
      	saveUninitialized: true,
    })
);

app.use(cookieParser("secretcode"));

////Initializing local-passport for user authentication
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport-config")(passport);

const loginRoute = require('./routes/login')                        //Login route
app.use(loginRoute)

const createStudent = require('./routes/createStudent')                        //Login route
app.use(createStudent)

const campusTiming = require('./routes/campusTiming')                        //Login route
app.use(campusTiming)

const hostelTiming = require('./routes/hostelTiming')                        //Login route
app.use(hostelTiming)

