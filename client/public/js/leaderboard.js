

//Code to populate the leaderboard
async function loadSprintLeaderboard(){
  await httpGetLeaderboardData()
  let table = document.getElementById('leaderboard-table')
  let headerRow = table.insertRow()
    headerRow.innerHTML = `<th>Rank</th><th>Name</th><th>Time</th><th>Blocks</th><th>PPS</th><th>Finesse</th><th>KPP</th><th>Date</th><th>Game Mode</th>`
  for (i=0; i<leaderboardData.length; i++){
    let row = table.insertRow()
    //TODO: Convert date into something more readable
    row.innerHTML =
      `<td>${leaderboardData[i]['rank']}</td>`+
      `<td>${leaderboardData[i]['name']}</td>`+
      `<td>${leaderboardData[i]['time']}</td>`+
      `<td>${leaderboardData[i]['blocks']}</td>`+
      `<td>${((leaderboardData[i]['blocks'])/(leaderboardData[i]['time'])).toFixed(3)}</td>`+
      `<td>${leaderboardData[i]['finesse']}</td>`+
      `<td>${leaderboardData[i]['kpp']}</td>`+
      `<td>${leaderboardData[i]['timestamp']}</td>`+
      `<td>${leaderboardData[i]['gameMode']}</td>`

  }
}

async function loadCheeseLeaderboard(){
  console.log("Solmi cute")
}

switch(window.location.pathname){
  case "/leaderboard/sprint":
    console.log("Sprint pathway")
    break
  case "/leaderboard/cheese":
    console.log("Cheese pathway")
    break
}

loadSprintLeaderboard()
