console.log('hello')
//GLOBAL VARIABLES
const playButton = document.querySelector('#play-button')
const downButton = document.querySelector('#down-button')
const upButton = document.querySelector('#up-button')
const rightButton = document.querySelector('#right-button')
const leftButton = document.querySelector('#left-button')

const main = document.querySelector('main')
let gameDirection = 'Right'
let firstCellID = 1
let lastCellID = 0
let interval
let score = 0
let head = { posY: 0, posX: 0 }
let currentSnake = [head]
let shouldSnakeGrow

//FUNCTIONS
// const createBoard = () => {
//   for (let i = 0; i < 16; i++) {
//     let newCell = document.createElement('div')
//     newCell.setAttribute('class', 'board')
//     newCell.setAttribute('id', `cell${i}`)
//     newCell.innerText = 'hello'
//     main.appendChild(newCell)
//   }
// }

const beginGame = () => {
  for (let i = 0; i < currentSnake.length; i++) {
    const firstPosition = document.querySelector(`#cell${currentSnake[0].posX}`)
    firstPosition.setAttribute('class', 'snake')
  }

  generateFood()
  interval = window.setInterval(stepRight, 1500)
}

//TRAVEL (INTERVAL) FUNCTIONS

const travelDown = () => {
  clearInterval(interval) //clear interval so direction of movement doesn't 'stack'
  interval = window.setInterval(stepDown, 1500)
}

const travelUp = () => {
  clearInterval(interval)
  interval = window.setInterval(stepUp, 1500)
}

const travelRight = () => {
  clearInterval(interval)
  interval = window.setInterval(stepRight, 1500)
}

const travelLeft = () => {
  clearInterval(interval)
  interval = window.setInterval(stepLeft, 1500)
}

//STEP FUNCTIONS

const stepRight = () => {
  for (let i = 0; i < currentSnake.length; i++) {
    let step = currentSnake[i].posX + 1
    const nextDiv = document.querySelector(`#cell${step}`) //get div
    const nextCellID = nextDiv.getAttribute('id') //get id
    const nextCellClass = nextDiv.getAttribute('class') //get class
    checkForFood(nextCellClass) //check for food
    const nextID = parseInt(nextCellID.replace('cell', '')) //parseint id
    const nextCell = document.querySelector(`#cell${nextID}`) //assign next cell
    nextCell.setAttribute('class', 'snake')
    currentSnake[i].posX = step
    console.log(currentSnake[0].posY, currentSnake[0].posX)
  }
  if (shouldSnakeGrow) {
    currentSnake.push({ posY: head.posY, posX: head.posX + 1 })
    lastCellID--
    shouldSnakeGrow = false
  }
  const lastCell = document.querySelector(`#cell${lastCellID}`) //reset cell moved from
  lastCell.setAttribute('class', 'board') //reset the class
  firstCellID++ //reassign currentCell for next iteration
  lastCellID++
}

const stepDown = () => {
  head = { posY: head.posY + 8, posX: head.posX }
  currentSnake.unshift(head)
  let step = currentSnake[0].posY + currentSnake[0].posX
  console.log(step)
  const nextDiv = document.querySelector(`#cell${step}`)
  const nextCellID = nextDiv.getAttribute('id')
  const nextCellClass = nextDiv.getAttribute('class')
  checkForFood(nextCellClass)
  const nextID = parseInt(nextCellID.replace('cell', ''))
  const nextCell = document.querySelector(`#cell${nextID}`)
  nextCell.setAttribute('class', 'snake')

  let currentCell = document.querySelector(`#cell${lastCellID}`)
  currentCell.setAttribute('class', 'board')
  lastCellID = lastCellID + 8
}

// const stepDown = () => {
//   let step = firstCellID + 8
//   const nextDiv = document.querySelector(`#cell${step}`)
//   const nextCellID = nextDiv.getAttribute('id')
//   const nextCellClass = nextDiv.getAttribute('class')
//   checkForFood(nextCellClass)
//   const nextID = parseInt(nextCellID.replace('cell', ''))
//   const nextCell = document.querySelector(`#cell${nextID}`)
//   nextCell.setAttribute('class', 'snake')
//   let newSnakeHead = currentSnake.pop() + 8
//   currentSnake.push(newSnakeHead)

//   let currentCell = document.querySelector(`#cell${lastCellID}`)
//   currentCell.setAttribute('class', 'board')

//   for (let i = 0; i < currentSnake.length - 1; i++) {
//     let bodyStep = parseInt(currentSnake[i]) + 1
//     if (firstCellID === bodyStep) {
//       currentCell = document.querySelector(`#cell${lastCellID}`)
//       currentCell.setAttribute('class', 'board')

//       currentSnake[i] = bodyStep
//       lastCellID++
//     } else if (bodyStep + 8 === firstCellID) {
//       //will execute if body need to move down
//       bodyStep = parseInt(currentSnake[i] + 8)
//       console.log('this code is reachable')
//       currentSnake[i] = bodyStep

//       currentCell = document.querySelector(`#cell${lastCellID}`)
//       currentCell.setAttribute('class', 'board')
//       lastCellID = lastCellID + 8
//     }
//   }
//   // currentCell = document.querySelector(`#cell${lastCellID}`)
//   // currentCell.setAttribute('class', 'board')

//   console.log(currentSnake)
//   firstCellID = step
// }

const stepUp = () => {
  let step = firstCellID - 8
  const nextDiv = document.querySelector(`#cell${step}`)
  const nextCellID = nextDiv.getAttribute('id')
  const nextID = parseInt(nextCellID.replace('cell', ''))
  const nextCell = document.querySelector(`#cell${nextID}`)
  nextCell.setAttribute('class', 'snake')

  const currentCell = document.querySelector(`#cell${firstCellID}`)
  currentCell.setAttribute('class', 'board')
  firstCellID = step
}

const stepLeft = () => {
  let step = firstCellID - 1
  const nextDiv = document.querySelector(`#cell${step}`)
  const nextCellID = nextDiv.getAttribute('id')
  const nextID = parseInt(nextCellID.replace('cell', ''))
  const nextCell = document.querySelector(`#cell${nextID}`)
  nextCell.setAttribute('class', 'snake')

  const currentCell = document.querySelector(`#cell${firstCellID}`)
  currentCell.setAttribute('class', 'board')
  firstCellID = step
}

//FOOD FUNCTIONS

const generateFood = () => {
  const cellID = Math.floor(Math.random() * 8)
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

    generateFood()
    shouldSnakeGrow = true
  }
}

//EVENT LISTENERS

playButton.addEventListener('click', beginGame)
downButton.addEventListener('click', travelDown)
upButton.addEventListener('click', travelUp)
rightButton.addEventListener('click', travelRight)
leftButton.addEventListener('click', travelLeft)
