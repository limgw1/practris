//BASED ON HOW I DESIGNED THE WEBSITE TO BE, LEADERBOARDS SHOULD BE THE ONLY THING AT THE MOMENT THAT REQUIRES SPECIAL ROUTING LIKE THIS, EVERYTHING
//ELSE SHOULD BE ONLY 1 LAYER DEEP
//AT THE MOMENT THIS PAGE IS NOT BEING USED YET
const express = require('express')
const LeaderboardEntry = require('../models/leaderboard.mongo')
const leaderboardController = require('../controllers/leaderboard.controller')
const leaderboardRouter = express.Router()

//Preliminary "get all sprint times" leaderboard, will get it to filter by top times of a
//player or top times period etc etc in the future, which might require way way more routing
leaderboardRouter.get('/', leaderboardController.httpGetLeaderboardData)
//Posts a new score into the leaderboards, this shoud link to a function that is called when a game is completed
leaderboardRouter.post('/', leaderboardController.httpPostLeaderboardData)
//I don't think anyone except the admin should have access to this data, but keeping it incase it becomes useful to wipe the db
leaderboardRouter.delete('/:id', leaderboardController.httpDeleteLeaderboardData)

//Same routes but for cheese

//Just a test route, not used anywhere
leaderboardRouter.get('/solmi', leaderboardController.testFunction)


module.exports = leaderboardRouter