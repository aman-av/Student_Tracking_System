const router = require('express').Router()
const flash = require('express-flash')
const passport = require('passport')
const User = require('../models/user.models')
const CampusAttendance = require('../models/campus_timing.models')
const HostelAttendance = require('../models/hostel_timing.models')
const bcrypt = require('bcryptjs')
const { checkAuthenticated, checkNotAuthenticated } = require('../config/auth')
router.use(flash())

router.get("/get-record", async (req, res, next) => 
{

    const username=req.headers.username
    const date=req.headers.datee
    const checkuser= await User.findOne({
            username: username
        })
        if(checkuser!=undefined){
            const campusRecord = await CampusAttendance.findOne({
                username: username,
                date:date
            })
            const hostelRecord = await HostelAttendance.findOne({
                username: username,
                date:date
            })
            let campusarr=[];
            let hostelarr=[];       
    if(campusRecord!=undefined) {
        let timing=campusRecord.time;
        let len=timing.length;
        for(let i=0;i<len;i++){
            let  timee=timing[i].time;
            let in_time=timee[0]+timee[1]+":"+timee[2]+timee[3]
            let out_time=timee[4]+timee[5]+":"+timee[6]+timee[7]
            let subject=timing[i].subject
            let attended=timing[i].attended
            campusarr.push({in_time: in_time, out_time: out_time,subject:subject,attended:attended})
        }
    }
    if(hostelRecord!=undefined) {
        let timing=hostelRecord.time;
        let len=timing.length;
        for(let i=0;i<len;i++){
            let  timee=timing[i].time;
            let check=timing[i].check;
            hostelarr.push({time: timee,check:check})
        }
    }
        var redir = { redirect: "/get_record", message:"User's Data'", campusarr:campusarr, hostelarr:hostelarr};
        return res.json(redir);
    }else{
        var redir = { redirect: "/get_record", message:"User not found", arr:arr};
        return res.json(redir);
    } 	
});


module.exports = router