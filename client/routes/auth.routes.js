const express = require('express')
const authRouter = express.Router()
const passport = require('passport')

//For google authentication
authRouter.get('/google', passport.authenticate('google',{
  scope: ['email'] //What data we are requesting from google
}))

authRouter.get('/google/callback', passport.authenticate('google',{
  failureRedirect: '/failure',
  successRedirect: '/',
  session: true,
}), (req, res)=>{
  console.log("Google called us back")
})


//TODO: discord authentication


//Logout route (should work with all types of authentication)
authRouter.get('/logout', (req,res) => {
  req.logout()
  return res.redirect('/')
})

//Failure route
authRouter.get('/failure',(req, res) => {return res.send("Solmi cute, no secret")})

module.exports = authRouter