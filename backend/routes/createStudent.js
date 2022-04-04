const router = require('express').Router()
const passport = require('passport')
const flash = require('express-flash')
const User = require('../models/user.models')
const bcrypt = require('bcryptjs')
const { checkAuthenticated, checkNotAuthenticated } = require('../config/auth')
router.use(flash())

router.post("/createStudent",checkAuthenticated, async (req, res, next) => { // req is request, res is response

        const username=req.body.username
        const password=req.body.password
        const user = await User.findOne({
            username: username
        })       
        if(user && (user.username!=undefined)) {
            var redir = { redirect: "/campus" , message:"student already exists" , userName:req.user.username , user: user};	
			return res.json(redir);
        }else{
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
        	const newUser = new User({
          		username: req.body.username,
          		password: hashedPassword,
                type:"Student",
                department:"Student"
        	});
        	await newUser.save();
        	var redir = { redirect: "/campus", message:"New student Created", user: newUser};
        	return res.json(redir);
        } 	
});



module.exports = router