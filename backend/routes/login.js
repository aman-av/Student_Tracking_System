const router = require('express').Router()
const passport = require('passport')
const flash = require('express-flash')
const User = require('../models/user.models')

router.use(flash())

router.post("/login",  (req, res, next) => { // req is request, res is response
    passport.authenticate("local", (err, user, info) => {
      	if (err) throw err;  
      	if (!user) {
        	var redir = {  message:"Incorrect Username or Wrong Password"};
        	return res.json(redir);
    	} 
      	else {
        	req.logIn(user, async (err) => {
          		if (err) throw err;
				const user = await User.findOne({
					username: req.user.username
				})
				if(user.type==="Admin" && user.department===undefined)
				{
					var redir = { redirect: "/admin" , message:"admin Login Successfully" , userName:req.user.username , user: user};
		        }else if(user.type==="Admin" && user.department==="Warden")
				{
          			var redir = { redirect: "/warden" , message:"warden Login Successfully" , userName:req.user.username , user: user};
				}else if(user.type==="Admin" && user.department==="Campus")
				{
          			var redir = { redirect: "/warden" , message:"campusn Login Successfully" , userName:req.user.username , user: user};
				}else{
					var redir = { redirect: "/student" , message:"student Login Successfully" , userName:req.user.username , user: user};	
				}
          		///// redir is the redirect information passed to front end react app.
          		return res.json(redir);
        	});
      	}
    })(req, res, next);
});

router.get('/login', async (req, res) => {
    if (req.isAuthenticated()) {
		const user = await User.findOne({
			username: req.user.username
		})
		// console.log("login user", user)
        var redir = { redirect: "/" , message:'Already Logged In', userName:req.user.username , user: user};
        return res.json(redir);
    }
    else{
      	var redir = { redirect: "/login", message:'Enter your credentials to Log In' };
        return res.json(redir);
    }
});

router.get('/logout', (req, res) => {
	req.logOut() ;   // logOut function by Passport
	req.session.destroy();
	return res.status(200).json({message: 'LOGOUT_SUCCESS'});
})

module.exports = router