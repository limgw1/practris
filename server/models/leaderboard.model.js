//For mongodb
const leaderboardDatabase = require('./leaderboard.mongo')

// const score = {
//   rank: 1, //Probably need a function to take data out of main db and compare
//   name: "Kim Solmi", //When authentication implemented this will be something
//   time: 32.06,
//   blocks: 102,
//   finesse: 9, //Not coded in yet
//   kpp: 3.66, //Not coded in yet
//   timestamp: Date.now(),
//   replay: false //Not coded in yet
// }

// saveSprintTime(score)

//1 step before saving to database
async function addNewSprintTime(leaderboardEntry){
  const newSprintTime = Object.assign(leaderboardEntry,{
    finesse: 0,
    kpp: 0,
    timestamp: Date.now(),
    replay: false
  })
  console.log(newSprintTime)
  await saveSprintTime(newSprintTime)
}

//Saves it to database
async function saveSprintTime(score){
  await leaderboardDatabase.create({
    rank: score.rank, //Probably need a function to take data out of main db and compare
    name: score.name, //When authentication implemented this will be something
    time: score.time,
    blocks: score.blocks,
    finesse: score.finesse, //Not coded in yet
    kpp: score.kpp, //Not coded in yet
    timestamp: score.timestamp,
    replay: score.replay, //Not coded in yet
    gameMode: score.gameMode
  }, (err) =>{
    if(err){return err}
  })
}

async function loadSprintTime(){
  return await leaderboardDatabase.find({},{'_id': 0, "__v": 0})
}

module.exports = {
  addNewSprintTime,
  saveSprintTime,
  loadSprintTime
}