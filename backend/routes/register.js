const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user.models')
const flash = require('express-flash')

router.use(flash())

////When a new user tries to register to our website
router.post("/register",  (req, res) => { 
    ////checking if another user with same username already exists
    // console.log('req rec');
	User.findOne({ username: req.body.username }, async (err, doc) => {
      	if (err) throw err;
      	if (doc){ 
	        var redir = {  redirect: "/register", message:"User Already Exists"};
        	return res.json(redir);
    	}
      	if (!doc) {
        	////username and password is required during creation of an account
        	if(req.body.username.length==0){
          		var redir = {  redirect: "/register", message:"Username cannot be empty"};
          		return res.json(redir);  
        	}
        	if(req.body.password.length==0){
          		var redir = {  redirect: "/register", message:"Password cannot be empty"};
          		return res.json(redir);  
        	}

        	////encryption of password using bcrypt
        	const hashedPassword = await bcrypt.hash(req.body.password, 10);
        	const newUser = new User({
          		username: req.body.username,
          		password: hashedPassword,
        	});
        	await newUser.save();
        	var redir = { redirect: "/login", message:"User Created", user: newUser, CHAT_ENGINE_PRIVATE_KEY: process.env.CHAT_ENGINE_PRIVATE_KEY};
        	return res.json(redir);
    	}
    });
});

////Checking if user is already logged in or not
router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
        var redir = { redirect: "/", message:'Already Logged In' };
        return res.json(redir);
    }
    else{
      	var redir = { redirect: "/register" , message:'Register Now'};
        return res.json(redir);
    }
});

module.exports = router