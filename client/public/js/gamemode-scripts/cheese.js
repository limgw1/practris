//=========================================================================================
// This file contains all the unique functionality of Cheese, at the moment only 100L
//=========================================================================================

//Cheese unique variables for the display
let cheeseLinesLeft = 20
let gameMode = 'cheese'
let garbageColumn = 0
let previouslyChosenGarbage = null//DONT IMPLEMENT THIS FOR VS, VS CAN SPAWN IN THE SAME PLACE

function updateCheese(){
  let returnedGarbage = garbageSpawner()
  grid.splice(0, 1)
  grid.push(returnedGarbage)
  updateCheeseLinesLeft()
}

function garbageSpawner(){
  let garbageArray = [8,8,8,8,8,8,8,8,8,8] //Creates full garbage
  randomGarbageGenerator()
  while (garbageColumn == previouslyChosenGarbage){
    randomGarbageGenerator() //To account for repeating garbage same column which we dont want in cheese
  }
  garbageArray[garbageColumn] = 0 //Creates the hole
  previouslyChosenGarbage = garbageColumn
  return garbageArray
}

function checkCheeseHeight(){
  // console.log("Check cheese height")
  for(i=0;i<13;i++){
    for(j=0;j<COLS;j++){
      if (grid[i][j] == 8){
        return true
      }
    }
  }
  return false
}

function correctCheeseHeight(){
  while(!checkCheeseHeight()){
    // console.log(`checkcheeseheight ${checkCheeseHeight()}`)
    updateCheese()
  }
}

function updateCheeseLinesLeft(){
  cheeseLinesLeft --
  document.getElementById("cheese-lines-left").textContent = `Cheese lines left: ${cheeseLinesLeft}`
  if (cheeseLinesLeft <= 0){
    stage = "over"
    renderGameState()
  }
}

function renderCheeseStats(){
  if(!document.getElementById('cheese-lines-left')){
    console.log("This runs")
    elementNode = document.createElement('h2')
    elementNode.id = 'cheese-lines-left'
    textNode = document.createTextNode(`Cheese lines left: ${cheeseLinesLeft-1}`)
    elementNode.append(textNode)
    stats = document.getElementById('player-stats')
    stats.appendChild(elementNode)
  }
}

async function saveCheeseStats(){
  //Takes data from corefunctionality.js and throws it into http request
  const name = "Kim Solmi" //Will change when authentication is implemented
  const rank = 1 //Need to get sorted data from leaderboard if want to dynamically change this
  const time = rawTimer/100
  const blocks = pieceCount
  const gameMode = "Cheese"
  console.log("Solmi saving cheese data")
  const response = await httpPostLeaderboardData({
    rank,
    name,
    time,
    blocks,
    gameMode,
  })
}

