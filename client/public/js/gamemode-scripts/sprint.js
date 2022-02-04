//=========================================================================================
// This file contains all the unique functionality of Sprint, at the moment only 40L
//=========================================================================================


//Sprint unique variables for the display
let linesLeft = 40
let gameMode = 'sprint'

function updateLinesLeft(){
  linesLeft --
  document.getElementById("lines-left").textContent = `Lines left: ${linesLeft}`
  if (linesLeft <= 0){
    stage = "over"
    renderGameState()
  }
}

function renderSprintStats(){
  if(!document.getElementById('lines-left')){
    elementNode = document.createElement('h2')
    elementNode.id = 'lines-left'
    textNode = document.createTextNode(`Lines left: ${linesLeft}`)
    elementNode.append(textNode)
    stats = document.getElementById('player-stats')
    stats.appendChild(elementNode)
  }
}

async function saveSprintStats(){
  //Takes data from corefunctionality.js and throws it into http request
  const name = "Kim Solmi" //Will change when authentication is implemented
  const rank = 1 //Need to get sorted data from leaderboard if want to dynamically change this
  const time = rawTimer/100
  const blocks = pieceCount
  const gameMode = "Sprint"
  console.log("Solmi saving sprint data")
  const response = await httpPostLeaderboardData({
    rank,
    name,
    time,
    blocks,
    gameMode,
  })
}

