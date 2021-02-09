console.log('hello')
//GLOBAL VARIABLES
const playButton = document.querySelector('#play-button')

const main = document.querySelector('main')
let gameDirection = 'Right'
let interval
let score = 0
let highScore = 0
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
  for (let i = 0; i < currentSnake.length; i++) {
    const firstPosition = document.querySelector(`#cell${currentSnake[i].posX}`)
    firstPosition.setAttribute('class', 'snake')
  }

  generateFood()
  interval = window.setInterval(stepRight, 1000)
}

//TRAVEL (INTERVAL) FUNCTIONS

const travelDown = () => {
  clearInterval(interval) //clear interval so direction of movement doesn't 'stack'
  interval = window.setInterval(stepDown, 1000)
}

const travelUp = () => {
  clearInterval(interval)
  interval = window.setInterval(stepUp, 1000)
}

const travelRight = () => {
  clearInterval(interval)
  interval = window.setInterval(stepRight, 1000)
}

const travelLeft = () => {
  clearInterval(interval)
  interval = window.setInterval(stepLeft, 1000)
}

// MOVE BODY PIECES FUNCTION

const moveBodyPieces = () => {
  for (let i = currentSnake.length - 1; i > 0; i--) {
    if (i === currentSnake.length - 1) {
      let cellNum = currentSnake[i].posX + currentSnake[i].posY
      const lastCell = document.querySelector(`#cell${cellNum}`)
      lastCell.setAttribute('class', 'board')
    }
    currentSnake[i].posX = currentSnake[i - 1].posX
    currentSnake[i].posY = currentSnake[i - 1].posY
    console.log(currentSnake[2].posX, currentSnake[2].posY)
    let step = currentSnake[i].posX + currentSnake[i].posY
    const nextDiv = document.querySelector(`#cell${step}`) //get div
    const nextCellID = nextDiv.getAttribute('id') //get id
    const nextID = parseInt(nextCellID.replace('cell', '')) //parseint id
    const nextCell = document.querySelector(`#cell${nextID}`) //assign next cell
    nextCell.setAttribute('class', 'snake')
  }
}

// STEP (MOVE HEAD) FUNCTIONS

const stepRight = () => {
  //adjust currentSnake array
  moveBodyPieces()
  head = { posY: head.posY, posX: head.posX + 1 }
  let oldHead = currentSnake.shift()
  currentSnake.unshift(head)

  //adjust cell class for visual purposes
  let step = head.posY + head.posX
  const nextDiv = document.querySelector(`#cell${step}`)
  const nextCellID = nextDiv.getAttribute('id')
  const nextCellClass = nextDiv.getAttribute('class')
  checkForFood(nextCellClass)
  checkForDeath(nextCellClass)
  const nextID = parseInt(nextCellID.replace('cell', ''))
  const nextCell = document.querySelector(`#cell${nextID}`)
  nextCell.setAttribute('class', 'snake')
}

const stepDown = () => {
  //adjust currentSnake array
  moveBodyPieces()
  head = { posY: head.posY + 8, posX: head.posX }
  let oldHead = currentSnake.shift()
  currentSnake.unshift(head)

  //adjust cell class for visual purposes
  let step = head.posY + head.posX
  const nextDiv = document.querySelector(`#cell${step}`)
  const nextCellID = nextDiv.getAttribute('id')
  const nextCellClass = nextDiv.getAttribute('class')
  checkForFood(nextCellClass)
  checkForDeath(nextCellClass)
  const nextID = parseInt(nextCellID.replace('cell', ''))
  const nextCell = document.querySelector(`#cell${nextID}`)
  nextCell.setAttribute('class', 'snake')
}

const stepUp = () => {
  //adjust currentSnake array
  moveBodyPieces()
  head = { posY: head.posY - 8, posX: head.posX }
  let oldHead = currentSnake.shift()
  currentSnake.unshift(head)

  //adjust cell class for visual purposes
  let step = head.posY + head.posX
  const nextDiv = document.querySelector(`#cell${step}`)
  const nextCellID = nextDiv.getAttribute('id')
  const nextCellClass = nextDiv.getAttribute('class')
  checkForFood(nextCellClass)
  checkForDeath(nextCellClass)
  const nextID = parseInt(nextCellID.replace('cell', ''))
  const nextCell = document.querySelector(`#cell${nextID}`)
  nextCell.setAttribute('class', 'snake')
}

const stepLeft = () => {
  //adjust currentSnake array
  moveBodyPieces()
  head = { posY: head.posY, posX: head.posX - 1 }
  let oldHead = currentSnake.shift()
  currentSnake.unshift(head)

  //adjust cell class for visual purposes
  let step = head.posY + head.posX
  const nextDiv = document.querySelector(`#cell${step}`)
  const nextCellID = nextDiv.getAttribute('id')
  const nextCellClass = nextDiv.getAttribute('class')
  checkForFood(nextCellClass)
  checkForDeath(nextCellClass)
  const nextID = parseInt(nextCellID.replace('cell', ''))
  const nextCell = document.querySelector(`#cell${nextID}`)
  nextCell.setAttribute('class', 'snake')
}

//DIE FUNCTIONS

const checkForDeath = (nextCellClass) => {
  if (nextCellClass === 'snake') {
    head = { posY: 0, posX: 2 }
    currentSnake = [head, { posY: 0, posX: 1 }, { posY: 0, posX: 0 }]
    score = 0
    let resetScore = document.querySelector('#score')
    resetScore.innerText = `Score: ${score}`
    alert('you have died')
    clearInterval(interval)
    setTimeout(clearBoard, 1)
  }
}

//FOOD FUNCTIONS

const generateFood = () => {
  const cellID = Math.floor(Math.random() * 60)
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

document.addEventListener('keypress', logKey)
