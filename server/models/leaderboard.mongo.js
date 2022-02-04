//File name is capitalized because it is a model
//Models are where you store your data

//All of this is useless because idk wtf happened to my mongodb database it just disappeared the next day
const mongoose = require('mongoose')

//Sprint schema (NOT CHEESE)
const LeaderboardSchema = new mongoose.Schema({
  rank: Number, //I think jez uses this value to not need to run through the entire system atm
  name: String, //Will be achieved when authentication is done
  time: Number, //Current code already has this value
  blocks: Number, //Current code already has this value
  finesse: Number, //Need to be calculated in the game itself
  kpp: Number, //Need to be calculated in the game itself
  timestamp: Date,
  replay: Boolean, //At the moment all false
  gameMode: String,
})

module.exports = mongoose.model('Leaderboard', LeaderboardSchema)