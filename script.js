console.log('hello')
//GLOBAL VARIABLES
const playButton = document.querySelector('#play-button')
const downButton = document.querySelector('#down-button')
const upButton = document.querySelector('#up-button')
const rightButton = document.querySelector('#right-button')
const leftButton = document.querySelector('#left-button')

const main = document.querySelector('main')
let gameDirection = 'right'
let currentCellID = 0
let interval

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
  const firstPosition = document.querySelector('#cell0')
  firstPosition.setAttribute('class', 'snake')
  interval = window.setInterval(stepRight, 1500)
}

const travelDown = () => {
  clearInterval(interval)
  stepDown()
  interval = window.setInterval(stepDown, 1500)
}

const travelUp = () => {
  clearInterval(interval)
  stepUp()
  interval = window.setInterval(stepUp, 1500)
}

const travelRight = () => {
  clearInterval(interval)
  stepRight()
  interval = window.setInterval(stepRight, 1500)
}

const travelLeft = () => {
  clearInterval(interval)
  stepLeft()
  interval = window.setInterval(stepLeft, 1500)
}

//STEP FUNCTIONS

const stepRight = () => {
  let step = currentCellID + 1
  const nextDiv = document.querySelector(`#cell${step}`) //get div
  const nextCellID = nextDiv.getAttribute('id') //get id
  const nextID = parseInt(nextCellID.replace('cell', '')) //parseint id
  const nextCell = document.querySelector(`#cell${nextID}`) //assign next cell
  nextCell.setAttribute('class', 'snake')

  const currentCell = document.querySelector(`#cell${currentCellID}`) //reset cell moved from
  currentCell.setAttribute('class', 'board')
  currentCellID = step
}

const stepDown = () => {
  let step = currentCellID + 4
  const nextDiv = document.querySelector(`#cell${step}`)
  const nextCellID = nextDiv.getAttribute('id')
  const nextID = parseInt(nextCellID.replace('cell', ''))
  const nextCell = document.querySelector(`#cell${nextID}`)
  nextCell.setAttribute('class', 'snake')

  const currentCell = document.querySelector(`#cell${currentCellID}`)
  currentCell.setAttribute('class', 'board')
  currentCellID = step
}

const stepUp = () => {
  let step = currentCellID - 4
  const nextDiv = document.querySelector(`#cell${step}`)
  const nextCellID = nextDiv.getAttribute('id')
  const nextID = parseInt(nextCellID.replace('cell', ''))
  const nextCell = document.querySelector(`#cell${nextID}`)
  nextCell.setAttribute('class', 'snake')

  const currentCell = document.querySelector(`#cell${currentCellID}`)
  currentCell.setAttribute('class', 'board')
  currentCellID = step
}

const stepLeft = () => {
  let step = currentCellID - 1
  const nextDiv = document.querySelector(`#cell${step}`)
  const nextCellID = nextDiv.getAttribute('id')
  const nextID = parseInt(nextCellID.replace('cell', ''))
  const nextCell = document.querySelector(`#cell${nextID}`)
  nextCell.setAttribute('class', 'snake')

  const currentCell = document.querySelector(`#cell${currentCellID}`)
  currentCell.setAttribute('class', 'board')
  currentCellID = step
}

//EVENT LISTENERS

playButton.addEventListener('click', beginGame)
downButton.addEventListener('click', travelDown)
upButton.addEventListener('click', travelUp)
rightButton.addEventListener('click', travelRight)
leftButton.addEventListener('click', travelLeft)
