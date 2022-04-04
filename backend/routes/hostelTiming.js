const router = require('express').Router()
const passport = require('passport')
const flash = require('express-flash')
const User = require('../models/user.models')
const Attendance = require('../models/hostel_timing.models')
const bcrypt = require('bcryptjs')
const { checkAuthenticated, checkNotAuthenticated } = require('../config/auth')
router.use(flash())

router.post("/hat",checkAuthenticated, async (req, res, next) => { // req is request, res is response

        const username=req.body.username
        const date=req.body.date
        const time=req.body.time
        const check=req.body.check
        const checkuser= await User.findOne({
            username: username
        })
        if(checkuser!=undefined){       
        const user = await Attendance.findOne({
            username: username,
            date:date
        })       
        if(user) {
            var redir = { redirect: "/hat" , message:"New hostel timing added" , userName:req.user.username , user: user};	
            
            await Attendance.updateOne( 
                { username: username,date:date },
                { $addToSet: { time: [{time,check}] } }, 
                { new: true })
            return res.json(redir);
        }else{
            let check="out"
        	const newStudentDate = new Attendance({
          		username: req.body.username,
          		date:date,
                time: [{time,check}]
        	});
        	await newStudentDate.save();
        	var redir = { redirect: "/hat", message:"New hostel student's Date Created", user: newStudentDate};
        	return res.json(redir);
        }}else{
            var redir = { redirect: "/hat", message:"User not found"};
        	return res.json(redir);
        }
});


router.get("/hat", async (req, res, next) => 
{

    const username=req.headers.username
    const date=req.headers.datee
    console.log("back",username,date)
    const checkuser= await User.findOne({
            username: username
        })
        if(checkuser!=undefined){
    const user = await Attendance.findOne({
        username: username,
        date:date
    })       
    if(user) {
        let timing=user.time;
        let len=timing.length;
        console.log("Check", timing[len-1].check);
        if(timing[len-1].check=="out")
        var redir = { redirect: "/hat" , message:"in" , user: user};	
        else
        var redir = { redirect: "/hat" , message:"out" , user: user};
        return res.json(redir);
    }else{
        var redir = { redirect: "/hat" , message:"out" , user: user};
        return res.json(redir);
    }}else{
        var redir = { redirect: "/hat", message:"User not found"};
        return res.json(redir);
    } 	
});


module.exports = router