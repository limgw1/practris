// ALL THE REQUESTS TO THE BACK END WILL BE HERE
let leaderboardData

async function httpGetLeaderboardData(){
  let response = await fetch('https://localhost:5001/leaderboard')
  leaderboardData = await response.json()
}

async function httpPostLeaderboardData(score){
  try{
    let response = await fetch('https://localhost:5001/leaderboard',{
    method : "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(score),
  })
  }catch(err){
    console.log(`Error in httppostLeaderboarddata ${err}`)
  }
}

// async function httpSaveCheeseData(score){
//   try{
//     let response = await fetch('https://localhost:5001/leaderboard',{
//     method : "post",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(score),
//   })
//   }catch(err){
//     console.log(`Error in httpsavesprintdata ${err}`)
//   }
// }