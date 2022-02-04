const fs = require('fs')
const https = require('https')
const helmet = require('helmet')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')


require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5001
const MONGO_URL = "mongodb+srv://practris-api:pXHYoMiX5H3MqZm3@practriscluster.yzxbc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//Middleware
app.use(cors())
app.use(express.json()) //Parses json

//Import routes from routes folder
const leaderboardRoutes = require('./routes/leaderboard.routes')

//Connect to DB
mongoose.connect(MONGO_URL)

mongoose.connection.once('open', () => {console.log("DB Connected successfully")})
mongoose.connection.on('error', (err) => {console.error(err)})

// Note: Security related middleware generally added at top of middleware chain
app.use(helmet())

//Routes
app.get('/', (req,res) => {
  res.send("Server root page")
})

//Secret Route for testing authentication
app.get('/secret', (req,res) => {
  res.send(`Her real name is not actually Solmi. Port : ${PORT}`)
})

//Leaderboard collection of routes
app.use('/leaderboard', leaderboardRoutes)






https.createServer({ //We do it this way so that we can create certs using openSSL to encrypt the http data
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
}, app).listen(PORT, () => {console.log(`Server started at ${PORT}`)})