const model = require('../models/leaderboard.model')

//=====Sprint CRUD=====//
async function httpGetLeaderboardData(req, res){
  return res.status(200).json(await model.loadSprintTime())
}

async function httpPostLeaderboardData(req, res){
  const leaderboardEntry = {
    rank: req.body.rank,
    name: req.body.name,
    time: req.body.time,
    blocks: req.body.blocks,
    gameMode: req.body.gameMode,
  }
    model.addNewSprintTime(leaderboardEntry)
    return res.status(201).json({message: "Save completed! Check MongoDB database"})
}

async function httpDeleteLeaderboardData (req, res){
  try{
    const deletedSprintLeaderboardEntry = await LeaderboardEntry.remove({_id: req.params.id})
    res.json(deletedSprintLeaderboardEntry)
  }catch(err){
    res.json({message:err})
  }
}

function testFunction (req, res){
  res.send('solmi cute')
}

// //=====Cheese CRUD=====//
// async function httpGetLeaderboardData(req, res){
//   return res.status(200).json(await model.loadSprintTime())
// }

// async function httpPostLeaderboardData(req, res){
//   const leaderboardEntry = {
//     rank: req.body.rank,
//     name: req.body.name,
//     time: req.body.time,
//     blocks: req.body.blocks,
//     gameMode: req.body.gameMode,
//   }
//     model.addNewSprintTime(leaderboardEntry)
//     return res.status(201).json({message: "Save completed! Check MongoDB database"})
// }

// async function httpDeleteCheeseLeaderboardData (req, res){
//   try{
//     const deletedCheeseLeaderboardEntry = await LeaderboardEntry.remove({_id: req.params.id})
//     res.json(deletedSprintLeaderboardEntry)
//   }catch(err){
//     res.json({message:err})
//   }
// }



module.exports = {
  httpGetLeaderboardData,
  httpPostLeaderboardData,
  httpDeleteLeaderboardData,
  testFunction
}