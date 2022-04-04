const router = require('express').Router()
const passport = require('passport')
const flash = require('express-flash')
const User = require('../models/user.models')
const Attendance = require('../models/vacation_date.models')
const bcrypt = require('bcryptjs')
const { checkAuthenticated, checkNotAuthenticated } = require('../config/auth')
router.use(flash())

router.post("/vat", async (req, res, next) => { // req is request, res is response

        const username=req.body.username
        const Date=req.body.date
        const time=req.body.time
        const checkuser= await User.findOne({
            username: username
        })
        if(checkuser!=undefined){       
        const user = await Attendance.findOne({
            username: username
        })       
        if(user) {
            const check=req.body.check
        const checkDate=req.body.check
            var redir = { redirect: "/vat" , message:"exisiting vacation date is added" , userName:req.user.username , user: user};	
			await Attendance.updateOne( 
                { username: username },
                { $addToSet: { time: [{time,check}],date:[{Date,checkDate}] } }, 
                { new: true })
            return res.json(redir);
        }else{
            let check="out"
            let checkDate="out"
            console.log("AAAAAAAAAA")
        	const newStudentDate = new Attendance({
          		username: req.body.username,
          		date :[{Date,checkDate}],
                time :[{time,check}]
        	});
        	await newStudentDate.save();
        	var redir = { redirect: "/vat", message:"New student's vacation Created", user: newStudentDate};
        	return res.json(redir);
        }}else{
            var redir = { redirect: "/vat", message:"User not found"};
        	return res.json(redir);
        }
});


router.get("/vat", async (req, res, next) => 
{

    const username=req.headers.username
    const date=req.headers.date
    console.log("USERNAME", username)
    const user = await Attendance.findOne({
        username: username
    })       
    if(user) {
        let timing=user.time;
        let len=timing.length;
        console.log("CheckVacation", timing[len-1].check);
        if(timing[len-1].check=="out"){
        var redir = { redirect: "/vat" , message:"in" , user: user};	
        }else{
        var redir = { redirect: "/vat" , message:"out" , user: user};
        }return res.json(redir);
    }else{
        var redir = { redirect: "/vat" , message:"out" , user: user};
        return res.json(redir);
    } 	
});


module.exports = router