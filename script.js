console.log('hello')
//GLOBAL VARIABLES
const playButton = document.querySelector('#play-button')
const stopButton = document.querySelector('#stop-button')
const main = document.querySelector('main')
let gameDirection = 'right'
let currentCellID = 0

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
  window.setInterval(moveRight, 2000)
}

const moveRight = () => {
  let step = currentCellID + 1
  const nextDiv = document.querySelector(`#cell${currentCellID}`) //get div
  const nextCellID = nextDiv.getAttribute('id') //get id
  const nextID = parseInt(nextCellID.replace('cell', '')) //parseint id
  const nextCell = document.querySelector(`#cell${nextID}`) //assign next cell
  console.log(nextCell)
  nextCell.setAttribute('class', 'snake')
  currentCellID = step
}

//EVENT LISTENERS

playButton.addEventListener('click', beginGame)
