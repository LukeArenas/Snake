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
let highScore = 0
let head = { posY: 0, posX: 2 }
let currentSnake = [head, { posY: 0, posX: 1 }, { posY: 0, posX: 0 }]
let shouldSnakeGrow

//FUNCTIONS

//CREATE BOARD ONLOAD FUNCTION
const createBoard = () => {
  for (let i = 0; i < 100; i++) {
    let newCell = document.createElement('div')
    newCell.setAttribute('class', 'board')
    newCell.setAttribute('id', `cell${i}`)
    main.appendChild(newCell)
  }
} //creates 100 new divs with class: board and id's corresponding to their numeric order

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
  interval = window.setInterval(stepRight, 600)
} //sets the initial conditions for the beginning of a new game; positions initial snake in the top left corner

//TRAVEL (INTERVAL) FUNCTIONS

const travelDown = () => {
  clearInterval(interval) //clear interval so direction of movement doesn't 'stack'
  gameDirection = 'down'
  interval = window.setInterval(stepDown, 600)
} //sets gameDirection (for later use in boundry logic) and sets interval for stepDown function to execute

const travelUp = () => {
  clearInterval(interval)
  gameDirection = 'up'
  interval = window.setInterval(stepUp, 600)
}

const travelRight = () => {
  clearInterval(interval)
  gameDirection = 'right'
  interval = window.setInterval(stepRight, 600)
}

const travelLeft = () => {
  clearInterval(interval)
  gameDirection = 'left'
  interval = window.setInterval(stepLeft, 600)
}

// MOVE BODY PIECES FUNCTION

const moveBodyPieces = () => {
  for (let i = currentSnake.length - 1; i > 0; i--) {
    if (i === currentSnake.length - 1) {
      let cellNum = currentSnake[i].posX + currentSnake[i].posY
      const lastCell = document.querySelector(`#cell${cellNum}`)
      lastCell.setAttribute('class', 'board')
    } //reassigns last cell class to board for CSS purposes

    currentSnake[i].posX = currentSnake[i - 1].posX
    currentSnake[i].posY = currentSnake[i - 1].posY //reassigns the values in the array

    let step = currentSnake[i].posX + currentSnake[i].posY //assigns next div snake class for CSS purposes
    const nextDiv = document.querySelector(`#cell${step}`) //get div
    const nextCellID = nextDiv.getAttribute('id') //get id
    const nextID = parseInt(nextCellID.replace('cell', '')) //parseint id
    const nextCell = document.querySelector(`#cell${nextID}`) //assign next cell
    nextCell.setAttribute('class', 'snake') //assign class
  }
} //moves each snake body piece, beginning with the tail, to the space of the piece immediately before it (using numeric id's).

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

  //adjust cell class for CSS purposes; use try catch blocks so if boundry is met, game will end
  try {
    snakeHeadChecks()
  } catch (error) {
    resetGame()
  }
} //moves body pieces, then reassigns head, then reassigns snake head class for CSS

const stepDown = () => {
  //adjust currentSnake array
  moveBodyPieces()
  head = { posY: head.posY + 10, posX: head.posX }
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
  head = { posY: head.posY - 10, posX: head.posX }
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
} //reset all the conditions changed during the game except the high score

const checkForHittingBody = (nextCellClass) => {
  if (nextCellClass === 'snake') {
    resetGame()
  }
} //if next cell is class snake, end the game

const checkForEdge = (nextID) => {
  if (
    gameDirection === 'right' &&
    (nextID === 10 ||
      nextID === 20 ||
      nextID === 30 ||
      nextID === 40 ||
      nextID === 50 ||
      nextID === 60 ||
      nextID === 70 ||
      nextID === 80 ||
      nextID === 90)
  ) {
    resetGame()
  } else if (
    gameDirection === 'left' &&
    (nextID === 9 ||
      nextID === 19 ||
      nextID === 29 ||
      nextID === 39 ||
      nextID === 49 ||
      nextID === 59 ||
      nextID === 69 ||
      nextID === 79 ||
      nextID === 89)
  ) {
    resetGame()
  }
} //check for left and right edges using gameDirection and div id's

//FOOD FUNCTIONS

const generateFood = () => {
  const cellID = Math.floor(Math.random() * 100) //generate a random number using Math.random
  const foodCell = document.querySelector(`#cell${cellID}`) //assign the number to the id

  //logic to make sure cell is not already assigned to snake body
  if (foodCell.getAttribute('class') === 'board') {
    foodCell.setAttribute('class', 'food')
  } else {
    generateFood()
  }
} //generates a food cell in a random position on the board

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

    //condition to determine when next level should begin
    if (score === 5) {
      resetGame()
      main.style.opacity = 0 //changes opacity to 0 to hide game over message until nextLevel function is executed
      playButton.style.opacity = 0 //also hides the play button from the user
      playButton.style.transitionDuration = '0s'
      setTimeout(nextLevel, 1) //setTimeout for nextLevel function so that it doesn't execute until the rest of the code
    }

    generateFood() //generate new food item
    shouldSnakeGrow = true
  }

  //logic to grow snake if food is found by pushing new piece to back of the array
  if (shouldSnakeGrow) {
    currentSnake.push({
      posY: currentSnake[currentSnake.length - 1].posY,
      posX: currentSnake[currentSnake.length - 1].posX - 1
    })
    shouldSnakeGrow = false
  }
} //checks if the next cell is a food cell and if so, increments the score, grows the snake body, and generates another food

//NEXT LEVEL FUNCTION

const nextLevel = () => {
  main.innerHTML =
    "<h3 class='next-level'>Congrats!</h3><h3 class='next-level'>Ready for the next level?</h3><a href='./secondround.html'><button id='next-level-button'>Let's Go!</button></a>"
  main.style.opacity = 1
  main.setAttribute('class', 'next-level-box')
} //resets the main HTML to display a message and button that directs you to the secondround.html page

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
} //sets various attributes using DOM manipulation depending on the state of the dark mode button

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
} //resolves key press into the four directions of travel

playButton.addEventListener('click', beginGame)
darkMode.addEventListener('click', goDark)

document.addEventListener('keypress', logKey)

//SOUND EFFECT LOGIC

let sound = new Audio()
sound.src = './8-bit-retro-success-victory.mp3'
//creates new Audio object and assigns its source to the mp3
