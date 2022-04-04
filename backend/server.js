
const res = require('dotenv').config()
// console.log(res)

const express = require("express");
const app = express();
const twilio = require('twilio'); 
//twilio requirements -- Texting API 
const accountSid = 'AC9ad0084bd398862b8f5348c7787d440e';
const authToken = 'ee2954277e1e6eb64816ec2edd4203fa'; 
const client = new twilio(accountSid, authToken);
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

function sms(){
	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes()
	if(time==="20:00"){
		client.messages.create({
			body: 'Hello',
			to: '+919123600426',  // Text this number
			from: '+19528003874' // From a valid Twilio number
		}).then((message) => console.log(message.body));
	}
	setTimeout(sms, 1000*60*60*24);
  }
  sms()



const loginRoute = require('./routes/login')                        //Login route
app.use(loginRoute)

const createStudent = require('./routes/createStudent')                        //Login route
app.use(createStudent)

const campusTiming = require('./routes/campusTiming')                        //Login route
app.use(campusTiming)

const hostelTiming = require('./routes/hostelTiming')                        //Login route
app.use(hostelTiming)

const vacationTiming = require('./routes/vacationTiming')                        //Login route
app.use(vacationTiming)

const getRecord = require('./routes/getRecord')                        //Login route
app.use(getRecord)

// const sendText = require('./routes/sendMessage')                        //Login route
// app.use(sendText)