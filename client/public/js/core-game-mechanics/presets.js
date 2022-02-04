let controls = {
  moveLeft: "ArrowLeft",
  moveRight: "ArrowRight",
  softDrop: "ArrowDown",
  hardDrop: " ",
  hold: "c",
  rotateClockwise: "ArrowUp",
  rotateCounterclockwise: "x",
  rotate180: "z",
  restart: "r",
}

let tuning = {
  delayedAutoShift: 100,
  automaticRepeatRate: 0,
  softDropRepeatRate: 0,
}

// const GAME_CLOCK = 1000/60 // 1000ms
const PIECE_WIDTH = 20 // This means each "block" in a column or row is 30 px
const ROWS = 22
const COLS = 10
const HOLDROWS = 5
const HOLDCOLS = 4
const QUEUEROWS = 20
const QUEUECOLS = 4
const LOCK_DELAY = 500

const SHAPES = [
  //Blank Piece
  [],
  // I piece
  [
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0],
  ],
  // J piece
  [
    [2,0,0],
    [2,2,2],
    [0,0,0],
  ],
  // L piece
  [
    [0,0,3],
    [3,3,3],
    [0,0,0],
  ],
  // O piece
  [
    [4,4],
    [4,4],

  ],
  // S piece
  [
    [0,5,5],
    [5,5,0],
    [0,0,0],
  ],
  // T piece
  [
    [0,6,0],
    [6,6,6],
    [0,0,0],
  ],
  // Z piece
  [
    [7,7,0],
    [0,7,7],
    [0,0,0],
  ],
  // Garbage piece
  [[8]],
]

const COLORS = [
  '#000000',
  '#00FFFF',
  '#0000FF',
  '#FFAA00',
  '#FFFF00',
  '#00FF00',
  '#AA00FF',
  '#AA0000',
  '#808080',
  'rgba(0,0,0,1)',
  'rgba(0,255,255,0.3)',
  'rgba(0,0,255,0.3)',
  'rgba(255,170,0,0.3)',
  'rgba(255,255,0,0.3)',
  'rgba(0,255,0,0.3)',
  'rgba(170,0,255,0.3)',
  'rgba(170,0,0,0.3)',
  'rgba(170,160,170,0.3)',
]

const NAMES = [
  "Blank",
  "I",
  "J",
  "L",
  "O",
  "S",
  "T",
  "Z",
  "garbage",
]

const IWALLKICKDATA = [
  [[-2,0],[1,0],[-2,1],[1,-2]],
  [[-1,0],[2,-0],[-1,-2],[2,1]],
  [[2,0],[-1,0],[2,-1],[-1,2]],
  [[1,0],[-2,0],[1,2],[-2,-1]],
  [[-1,0],[2,0],[-1,-2],[2,1]],
  [[2,0],[-1,0],[2,-1],[-1,2]],
  [[1,0],[-2,0],[1,2],[-2,-1]],
  [[-2,0],[1,0],[-2,1],[1,-2]],
]

const WALLKICKDATA = [
  [[-1,0],[-1,-1],[0,2],[-1,2]], //O>R (CW) 0>1
  [[1,0],[1,1],[0,-2],[1,-2]], //R>2 (CW) 1>2
  [[1,0],[1,-1],[0,2],[1,2]], //2>L (CW) 2>3
  [[-1,0],[-1,1],[0,-2],[-1,-2]], //L>0 (CW) 3>0
  [[1,0],[1,-1],[0,2],[1,2]], //0>L (CCW) 0>3
  [[1,0],[1,1],[0,-2],[1,-2]], //R>0 (CCW) 1>0
  [[-1,0],[-1,1],[0,2],[-1,2]], //2>R (CCW) 2>1
  [[-1,0],[-1,1],[0,-2],[-1,-2]], //L>2 (CCW) 3>2
]
