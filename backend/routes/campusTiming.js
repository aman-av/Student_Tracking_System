const router = require('express').Router()
const passport = require('passport')
const flash = require('express-flash')
const User = require('../models/user.models')
const Attendance = require('../models/campus_timing.models')
const bcrypt = require('bcryptjs')
const { checkAuthenticated, checkNotAuthenticated } = require('../config/auth')
router.use(flash())

router.post("/cat",checkAuthenticated, async (req, res, next) => { // req is request, res is response

        const username=req.body.username
        const date=req.body.date
        const time=req.body.time
        const subject=req.body.subject
        const attended=req.body.attended
        const user = await Attendance.findOne({
            username: username,
            date:date
        })       
        if(user) {
            var redir = { redirect: "/cat" , message:"New timing added" , userName:req.user.username , user: user};	
			await Attendance.updateOne( 
                { username: username,date:date },
                { $addToSet: { time: [{time,subject,attended}] } }, 
                { new: true })
            return res.json(redir);
        }else{
        	const newStudentDate = new Attendance({
          		username: req.body.username,
          		date:date,
                time: [{time,subject,attended}]
        	});
        	await newStudentDate.save();
        	var redir = { redirect: "/cat", message:"New student's Date Created", user: newStudentDate};
        	return res.json(redir);
        } 	
});



module.exports = router