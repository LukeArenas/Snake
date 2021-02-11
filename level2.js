//GLOBAL VARIABLES
const playButton = document.querySelector('.play-button')
const darkMode = document.querySelector('#dark-mode')

const main = document.querySelector('main')
const body = document.querySelector('body')
const h1 = document.querySelector('h1')
const scoreText = document.querySelector('#score')
const highScoreText = document.querySelector('#high-score')

let gameDirection = 'right'
let interval
let score = 0
let highScore = 5
let head = { posY: 0, posX: 2 }
let currentSnake = [head, { posY: 0, posX: 1 }, { posY: 0, posX: 0 }]
let shouldSnakeGrow

//FUNCTIONS

//CREATE BOARD ONLOAD FUNCTION
const createBoard = () => {
  for (let i = 0; i < 64; i++) {
    let newCell = document.createElement('div')
    newCell.setAttribute('class', 'board')
    newCell.setAttribute('id', `cell${i}`)
    main.appendChild(newCell)
  }
}

const clearBoard = () => {
  for (let i = 0; i < 64; i++) {
    let currentCell = document.querySelector(`#cell${i}`)
    currentCell.setAttribute('class', 'board')
  }
}

//BEGIN GAME FUNCTION

const beginGame = () => {
  main.setAttribute('class', '')
  main.innerHTML = ''
  createBoard()
  gameDirection = 'right'
  for (let i = 0; i < currentSnake.length; i++) {
    const firstPosition = document.querySelector(`#cell${currentSnake[i].posX}`)
    firstPosition.setAttribute('class', 'snake')
  }

  generateFood()
  interval = window.setInterval(stepRight, 300)
}

//TRAVEL (INTERVAL) FUNCTIONS

const travelDown = () => {
  clearInterval(interval) //clear interval so direction of movement doesn't 'stack'
  gameDirection = 'down'
  interval = window.setInterval(stepDown, 300)
}

const travelUp = () => {
  clearInterval(interval)
  gameDirection = 'up'
  interval = window.setInterval(stepUp, 300)
}

const travelRight = () => {
  clearInterval(interval)
  gameDirection = 'right'
  interval = window.setInterval(stepRight, 300)
}

const travelLeft = () => {
  clearInterval(interval)
  gameDirection = 'left'
  interval = window.setInterval(stepLeft, 300)
}

// MOVE BODY PIECES FUNCTION

const moveBodyPieces = () => {
  for (let i = currentSnake.length - 1; i > 0; i--) {
    if (i === currentSnake.length - 1) {
      //start with tail and move all pieces forward
      let cellNum = currentSnake[i].posX + currentSnake[i].posY
      const lastCell = document.querySelector(`#cell${cellNum}`)
      lastCell.setAttribute('class', 'board')
    }
    currentSnake[i].posX = currentSnake[i - 1].posX
    currentSnake[i].posY = currentSnake[i - 1].posY
    let step = currentSnake[i].posX + currentSnake[i].posY
    const nextDiv = document.querySelector(`#cell${step}`) //get div
    const nextCellID = nextDiv.getAttribute('id') //get id
    const nextID = parseInt(nextCellID.replace('cell', '')) //parseint id
    const nextCell = document.querySelector(`#cell${nextID}`) //assign next cell
    nextCell.setAttribute('class', 'snake')
  }
}

const snakeHeadChecks = () => {
  let step = head.posY + head.posX
  const nextDiv = document.querySelector(`#cell${step}`)
  const nextCellID = nextDiv.getAttribute('id')
  const nextCellClass = nextDiv.getAttribute('class')
  checkForFood(nextCellClass) //check if the next cell is food
  checkForHittingBody(nextCellClass) //check if the next cell is a body piece
  const nextID = parseInt(nextCellID.replace('cell', ''))
  checkForEdge(nextID) //check if the next cell is a left or right edge
  const nextCell = document.querySelector(`#cell${nextID}`)
  nextCell.setAttribute('class', 'snake')
}

// STEP (MOVE HEAD) FUNCTIONS

const stepRight = () => {
  //adjust currentSnake array
  moveBodyPieces()
  head = { posY: head.posY, posX: head.posX + 1 }
  let oldHead = currentSnake.shift()
  currentSnake.unshift(head)

  //adjust cell class for visual purposes
  try {
    snakeHeadChecks()
  } catch (error) {
    resetGame()
  }
}

const stepDown = () => {
  //adjust currentSnake array
  moveBodyPieces()
  head = { posY: head.posY + 8, posX: head.posX }
  let oldHead = currentSnake.shift()
  currentSnake.unshift(head)

  //adjust cell class for visual purposes
  try {
    snakeHeadChecks()
  } catch (error) {
    resetGame()
  }
}

const stepUp = () => {
  //adjust currentSnake array
  moveBodyPieces()
  head = { posY: head.posY - 8, posX: head.posX }
  let oldHead = currentSnake.shift()
  currentSnake.unshift(head)

  //adjust cell class for visual purposes
  try {
    snakeHeadChecks()
  } catch (error) {
    resetGame()
  }
}

const stepLeft = () => {
  //adjust currentSnake array
  moveBodyPieces()
  head = { posY: head.posY, posX: head.posX - 1 }
  let oldHead = currentSnake.shift()
  currentSnake.unshift(head)

  //adjust cell class for visual purposes
  try {
    snakeHeadChecks()
  } catch (error) {
    resetGame()
  }
}

//DIE FUNCTIONS

const resetGame = () => {
  head = { posY: 0, posX: 2 }
  currentSnake = [head, { posY: 0, posX: 1 }, { posY: 0, posX: 0 }]
  score = 0
  let resetScore = document.querySelector('#score')
  resetScore.innerText = `Score: ${score}`
  main.innerHTML = '<h3 class="game-over">Game Over!</h3>'
  main.setAttribute('class', 'game-over-box')
  clearInterval(interval)
}

const checkForHittingBody = (nextCellClass) => {
  if (nextCellClass === 'snake') {
    resetGame()
  }
}

const checkForEdge = (nextID) => {
  if (
    gameDirection === 'right' &&
    (nextID === 8 ||
      nextID === 16 ||
      nextID === 24 ||
      nextID === 32 ||
      nextID === 40 ||
      nextID === 48 ||
      nextID === 56)
  ) {
    resetGame()
  } else if (
    gameDirection === 'left' &&
    (nextID === 7 ||
      nextID === 15 ||
      nextID === 23 ||
      nextID === 31 ||
      nextID === 39 ||
      nextID === 59 ||
      nextID === 47 ||
      nextID === 55)
  ) {
    resetGame()
  }
}

//FOOD FUNCTIONS

const generateFood = () => {
  const cellID = Math.floor(Math.random() * 64)
  const foodCell = document.querySelector(`#cell${cellID}`)
  if (foodCell.getAttribute('class') === 'board') {
    foodCell.setAttribute('class', 'food')
  } else {
    generateFood()
  }
}

const checkForFood = (cellClass) => {
  if (cellClass === 'food') {
    score++
    let newScore = document.querySelector('#score')
    newScore.innerText = `Score: ${score}` //adjust score accordingly
    if (score >= highScore) {
      highScore = score
      let newHighScore = document.querySelector('#high-score')
      newHighScore.innerText = `High Score: ${highScore}` //adjust high score if necessary
    }
    generateFood()
    shouldSnakeGrow = true
  }
  if (shouldSnakeGrow) {
    currentSnake.push({
      posY: currentSnake[currentSnake.length - 1].posY,
      posX: currentSnake[currentSnake.length - 1].posX - 1
    })
    shouldSnakeGrow = false
  }
}

//DARK MODE

const goDark = () => {
  if (body.className === '') {
    body.setAttribute('class', 'dark-body')
    h1.setAttribute('class', 'dark-header')
    scoreText.style.color = 'white'
    scoreText.style.transitionDuration = '0.6s'
    highScoreText.style.color = 'white'
    highScoreText.style.transitionDuration = '0.6s'
    playButton.setAttribute('id', 'dark-play-button')
    darkMode.innerText = 'Light'
    darkMode.setAttribute('id', 'day-mode')
    const nextLevelButton = document.querySelector('#next-level-button')
    nextLevelButton.setAttribute('id', 'dark-next-level-button')
  } else {
    body.setAttribute('class', '')
    h1.setAttribute('class', '')
    scoreText.style.color = '#04080f'
    scoreText.style.transitionDuration = '0.6s'
    highScoreText.style.color = '#04080f'
    highScoreText.style.transitionDuration = '0.6s'
    playButton.setAttribute('id', '')
    darkMode.innerText = 'Dark'
    darkMode.setAttribute('id', 'dark-mode')
    const nextLevelButton = document.querySelector('#next-level-button')
    nextLevelButton.setAttribute('id', 'next-level-button')
  }
}

//EVENT LISTENERS

const logKey = (event) => {
  const keyPressed = event.key
  if (keyPressed === 's') {
    travelDown()
  } else if (keyPressed === 'w') {
    travelUp()
  } else if (keyPressed === 'd') {
    travelRight()
  } else if (keyPressed === 'a') {
    travelLeft()
  }
}

playButton.addEventListener('click', beginGame)
darkMode.addEventListener('click', goDark)

document.addEventListener('keypress', logKey)

//SOUND EFFECT LOGIC

let sound = new Audio()
sound.src = './8-bit-retro-success-victory.mp3'
