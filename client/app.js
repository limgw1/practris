const fs = require('fs')
const path = require('path')
const https = require('https')
const helmet = require('helmet')
const express = require('express')
const favicon = require('serve-favicon')
const { engine } = require('express-handlebars')
const passport = require('passport')
const { Strategy } = require('passport-google-oauth20')
const cookieSession = require('cookie-session')
require('dotenv/config')

require('dotenv').config() //For config values

//Importing routes
// const leaderboardRoutes =  require('../server/routes/leaderboard-route.js') Have not implemented multiple page leaderboard yet, atm its only single page
const app = express()
const PORT = process.env.PORT || 5000

//Configuration values
const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
  COOKIE_KEY_3: process.env.COOKIE_KEY_3,
}
//Authentication options for new Strategy()
const AUTH_OPTIONS = {
  callbackURL: '/auth/google/callback',
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
}

//Function for checking if logged in
function checkLoggedIn (req,res,next){
  const isLoggedIn = req.user
  if (!isLoggedIn){
    return res.status(401).json({error: 'You must log in!'})
  }
  next()
}

function verifyCallback(accessToken, refreshToken, profile, done){
  console.log("Google profile: ", profile)
  done(null, profile)
}

// Note: Security related middleware generally added at top of middleware chain
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback)) //Check vid 220 for explanation, Passport helps us go through the oauth flow
// Save session to cookie
passport.serializeUser((user,done) => {
  done(null, user.id)
})
// Read session from cookie
passport.deserializeUser((id,done) => {
  done(null, id)
})
app.use(helmet()) //We want helmet to check all the headers first
app.use(cookieSession({
  name: 'session',
  maxAge: 1000*60*60*24, //1 day session
  keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2, config.COOKIE_KEY_3]
  })) //We want to run this because passport uses it
app.use(passport.initialize())
app.use(passport.session()) //Authenticates the session sent to the server

app.use(express.static(__dirname + '/public')) //Get location of public folders
app.use(favicon(path.join(__dirname,'public','images','favicon.ico'))) //Get location of icon

app.engine('handlebars', engine()) //For the handlebar templates
app.set('view engine', 'handlebars') //
app.set('views', path.join(__dirname, "public", "views"))



//Routing for home page
app.get('/', (req,res) => {
  res.render('home', {homepage:1})
})
//Routing for sprint page
app.get('/sprint', (req,res) => {
  res.render('sprint',{game:1}) //The object is for some handlebar shit that I have not learned yet
})
//Routing for cheese page
app.get('/cheese', (req,res) => {
  res.render('cheese',{game:1})
})
//Routing for settings
app.get('/settings', (req,res) => {
  res.render('settings')
})

//===== Leaderboard Routes =====//
//Will have to make a router when learn how to filter leaderboard
// app.use('/leaderboard', leaderboardRoutes) Use this instead when uncommenting the const leaderboardRoutes = require(...)
app.get('/leaderboard/sprint', (req, res) => {
  res.render('leaderboard')
})

app.get('/leaderboard/cheese', (req, res) => {
  res.render('leaderboard')
})



//Secret Route for testing authentication
app.get('/secret', checkLoggedIn, (req,res) => {
  res.send(`Her real name is not actually Solmi. Port : ${PORT}`)
})

//Import routes from routes folder
const authRoutes = require('./routes/auth.routes')
app.use('/auth', authRoutes)



https.createServer({ //We do it this way so that we can create certs using openSSL to encrypt the http data
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
}, app).listen(PORT, () => {console.log(`Server started at ${PORT}`)})